import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import { 
  supportsWebp, 
  getWebpUrl, 
  loadWebpUrlMapping,
  checkConnectionQuality,
  getImageLoadingPriority
} from '@/lib/utils';
import imagePerformanceMonitor from '@/lib/image-performance';
import networkMonitor from '@/lib/network-monitor';

// Görüntü önbelleği ve yükleme optimizasyonları
const preloadedImages = new Set<string>();
const loadingImages = new Set<string>();
const loadedImages = new Set<string>();
const failedImages = new Set<string>();
const retryCount = new Map<string, number>();
const MAX_RETRY = 2;
const CONCURRENT_LOADS = 4; // Aynı anda yüklenecek maksimum resim sayısı
const LOW_PRIORITY_DELAY = 500; // Düşük öncelikli resimler için gecikme (ms)
let webpSupported: boolean | null = null; // WebP desteği için değişken

// Resim önbelleğe alma kuyruğu
const preloadQueue: Array<{ src: string; priority: number }> = [];
let isProcessingQueue = false;

// Resim önbelleğe alma fonksiyonu
const preloadImage = (src: string, priority = 0): Promise<void> => {
  if (!src || preloadedImages.has(src) || loadingImages.has(src)) {
    return Promise.resolve();
  }

  // Kuyruğa ekle
  preloadQueue.push({ src, priority });
  
  // Önceliğe göre sırala (yüksek öncelik önce)
  optimizeLoadingOrder(preloadQueue);
  
  // Kuyruk işlemeyi başlat
  if (!isProcessingQueue) {
    processPreloadQueue();
  }
  
  return new Promise((resolve) => {
    const img = new Image();
    const handleLoad = () => {
      preloadedImages.add(src);
      loadingImages.delete(src);
      resolve();
    };
    
    const handleError = () => {
      loadingImages.delete(src);
      resolve(); // Hata olsa bile promise'ı resolve et
    };
    
    img.onload = handleLoad;
    img.onerror = handleError;
    
    loadingImages.add(src);
    img.src = src;
  });
};

// Önbelleğe alma kuyruğunu işle
const processPreloadQueue = async () => {
  if (isProcessingQueue || preloadQueue.length === 0) {
    return;
  }
  
  isProcessingQueue = true;
  
  try {
    // Aynı anda yüklenecek resim sayısını sınırla
    const batch = preloadQueue.splice(0, CONCURRENT_LOADS);
    
    if (batch.length > 0) {
      // Tüm resimleri paralel olarak yükle
      await Promise.all(
        batch.map(({ src }) => loadImage(src))
      );
      
      // Kuyruğu işlemeye devam et
      setTimeout(processPreloadQueue, 100);
    }
  } finally {
    isProcessingQueue = false;
  }
};

// Resim yükleme fonksiyonu
const loadImage = (src: string): Promise<void> => {
  if (!src) {
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    // Zaten yüklenmişse hemen döndür
    if (preloadedImages.has(src)) {
      resolve();
      return;
    }
    
    const img = new Image();
    
    const handleLoad = () => {
      preloadedImages.add(src);
      resolve();
    };
    
    const handleError = () => {
      resolve(); // Hata olsa bile promise'ı resolve et
    };
    
    img.onload = handleLoad;
    img.onerror = handleError;
    
    // Resmi yüklemeye başla
    img.src = src;
  });
};

// Bağlantı kalitesine göre önbelleğe alma stratejisi
const preloadStrategy = () => {
  // Bağlantı kalitesini kontrol et
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (connection) {
    // Düşük bağlantı hızlarında önbelleğe almayı sınırla
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return false;
    }
    
    // 3G bağlantılarda sadece yüksek öncelikli resimleri önbelleğe al
    if (connection.effectiveType === '3g') {
      return 'high-only';
    }
  }
  
  return true; // Varsayılan olarak tüm resimleri önbelleğe al
};

// WebP desteğini kontrol et
const checkWebpSupport = () => {
  if (webpSupported === null) {
    webpSupported = supportsWebp();
    console.log(`WebP desteği: ${webpSupported ? 'Evet' : 'Hayır'}`);
  }
};

// Resim öncelikliğini belirle
const getImageLoadingPriority = (role: string): number => {
  switch (role) {
    case 'hero':
      return 100; // En yüksek öncelik
    case 'background':
      return 80;
    case 'gallery':
      return 60;
    case 'thumbnail':
    default:
      return 40;
  }
};

// Resim boyutunu tahmin et
const estimateImageSize = (src: string): number => {
  if (!src) return 0;
  
  // Yüksek çözünürlüklü resimleri tespit et
  if (src.includes('pexels.com') || src.includes('unsplash.com')) {
    // Pexels ve Unsplash genellikle büyük resimler içerir
    return 2000000; // ~2MB
  }
  
  // WebP formatındaki resimler daha küçüktür
  if (src.endsWith('.webp')) {
    return 500000; // ~500KB
  }
  
  // Varsayılan tahmin
  return 1000000; // ~1MB
};

// Resim yükleme sırasını optimize et
const optimizeLoadingOrder = (images: Array<{ src: string; priority: number }>) => {
  return images.sort((a, b) => {
    // Önce önceliğe göre sırala
    const priorityDiff = b.priority - a.priority;
    if (priorityDiff !== 0) return priorityDiff;
    
    // Öncelik aynıysa, tahmini boyuta göre sırala (küçük olanlar önce)
    const sizeA = estimateImageSize(a.src);
    const sizeB = estimateImageSize(b.src);
    return sizeA - sizeB;
  });
};

// LazyImage bileşeni
export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  role?: 'hero' | 'background' | 'gallery' | 'thumbnail';
  objectFit?: string;
  objectPosition?: string;
}

// LazyImage bileşenini memo ile sararak gereksiz render'ları önle
export const LazyImage = memo(function LazyImage({
  src,
  alt = '',
  className = '',
  fallbackSrc = '/placeholder.svg',
  priority = false,
  role = 'thumbnail',
  objectFit,
  objectPosition,
  style,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // WebP desteğini kontrol et
  useEffect(() => {
    checkWebpSupport();
    // WebP URL eşleştirme dosyasını yükle
    loadWebpUrlMapping();
  }, []);
  
  // WebP desteği varsa ve URL eşleştirme yapılabiliyorsa WebP versiyonunu kullan
  const actualSrc = useMemo(() => {
    if (src && webpSupported) {
      return getWebpUrl(src);
    }
    return src;
  }, [src]);
  
  useEffect(() => {
    // Performans izleme modülünü aktif et
    if (typeof imagePerformanceMonitor.enable === 'function') {
      imagePerformanceMonitor.enable();
    } else {
      console.error('ImagePerformanceMonitor.enable fonksiyonu bulunamadı');
    }
    if (typeof networkMonitor.enable === 'function') {
      networkMonitor.enable();
    } else {
      console.error('NetworkMonitor.enable fonksiyonu bulunamadı');
    }
    
    return () => {
      // Component unmount olduğunda devre dışı bırak
      // if (typeof imagePerformanceMonitor.disable === 'function') {
      //   imagePerformanceMonitor.disable();
      // } else {
      //   console.error('ImagePerformanceMonitor.disable fonksiyonu bulunamadı');
      // }
    };
  }, []);
  
  useEffect(() => {
    if (!actualSrc) return;
    
    // Resim daha önce yüklenmişse veya hata almışsa işlem yapma
    if (loadedImages.has(actualSrc)) {
      setLoaded(true);
      return;
    }
    
    if (failedImages.has(actualSrc)) {
      setError(true);
      return;
    }
    
    // Resim öncelikli ise veya görünür ise hemen yükle
    if (priority || isElementInViewport(imgRef.current)) {
      const loadPriority = getImageLoadingPriority(role);
      preloadImage(actualSrc, loadPriority)
        .then(() => {
          setLoaded(true);
        })
        .catch(() => {
          setError(true);
        });
    } else {
      // Öncelikli değilse önbelleğe alma stratejisine göre yükle
      const strategy = preloadStrategy();
      
      if (strategy === true || 
          (strategy === 'high-only' && (role === 'hero' || role === 'background')) || 
          isElementNearViewport(imgRef.current)) {
        const loadPriority = getImageLoadingPriority(role);
        preloadImage(actualSrc, loadPriority);
      }
    }
  }, [actualSrc, priority, role]);
  
  // Görüntü yükleme olayları
  const handleLoad = () => {
    loadedImages.add(actualSrc);
    setLoaded(true);
  };
  
  const handleError = () => {
    // Hata bilgisini konsola yazdır
    console.error(`Image load error: ${actualSrc}`);
    
    // Hata durumunu kaydet
    failedImages.add(actualSrc);
    setError(true);
    
    // Yeniden deneme sayısını kontrol et
    const currentRetryCount = retryCount.get(actualSrc) || 0;
    
    if (currentRetryCount < MAX_RETRY) {
      // Yeniden deneme sayısını artır
      retryCount.set(actualSrc, currentRetryCount + 1);
      
      // Kısa bir gecikme sonrası yeniden dene
      setTimeout(() => {
        const newImg = new Image();
        newImg.src = actualSrc;
      }, 1000 * (currentRetryCount + 1)); // Her denemede daha uzun bekle
    }
  };
  
  // Responsive görüntü boyutları
  const sizes = useMemo(() => {
    switch (role) {
      case 'hero':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw';
      case 'background':
        return '100vw';
      case 'gallery':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
      case 'thumbnail':
      default:
        return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
    }
  }, [role]);
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <svg className="w-8 h-8 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={error ? fallbackSrc : actualSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        style={style || {}}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          error && 'grayscale opacity-50',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down',
          objectPosition === 'center' && 'object-center',
          objectPosition === 'top' && 'object-top',
          objectPosition === 'bottom' && 'object-bottom',
          objectPosition === 'left' && 'object-left',
          objectPosition === 'right' && 'object-right',
          className
        )}
        {...props}
      />
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted bg-opacity-50">
          <svg className="w-8 h-8 text-muted-foreground mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-muted-foreground">Görüntü yüklenemedi</p>
        </div>
      )}
    </div>
  );
});

// Yardımcı fonksiyonlar
function isElementInViewport(el: HTMLElement | null): boolean {
  if (!el) return false;
  
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top >= -rect.height &&
    rect.left >= -rect.width &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width
  );
}

function isElementNearViewport(el: HTMLElement | null, margin: number = 300): boolean {
  if (!el) return false;
  
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top >= -(rect.height + margin) &&
    rect.left >= -(rect.width + margin) &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height + margin &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width + margin
  );
}

export default LazyImage;
