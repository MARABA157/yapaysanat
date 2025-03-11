import { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';
import imageService from '@/services/ImageService';

// Görüntü önbelleği
const imageCache = new Map<string, boolean>();

// Preload edilecek resimlerin kuyruğu
const preloadQueue: string[] = [];
let isProcessingQueue = false;

// Preload kuyruğunu işle
const processPreloadQueue = async () => {
  if (isProcessingQueue || preloadQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (preloadQueue.length > 0) {
    const src = preloadQueue.shift();
    if (src && !imageCache.has(src)) {
      try {
        const img = new Image();
        img.src = src;
        await new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve; // Hata durumunda da devam et
          
          // Zaman aşımı ekle
          setTimeout(resolve, 3000);
        });
        imageCache.set(src, true);
      } catch (error) {
        console.error('Image preload error:', error);
      }
    }
    
    // Her resim arasında kısa bir bekleme ekle
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  isProcessingQueue = false;
};

// Resmi preload kuyruğuna ekle
const queueImagePreload = (src: string) => {
  if (!src || imageCache.has(src) || preloadQueue.includes(src)) return;
  
  preloadQueue.push(src);
  processPreloadQueue();
};

// AVIF formatını destekleyip desteklemediğini kontrol et
const checkAvifSupport = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// WebP formatını destekleyip desteklemediğini kontrol et
const checkWebpSupport = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
};

export interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  quality?: number;
  role?: 'banner' | 'thumbnail' | 'gallery' | 'avatar' | 'icon' | 'background';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo(({
  src,
  alt,
  width,
  height,
  className,
  objectFit = 'cover',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  quality = 85,
  role = 'thumbnail',
  sizes,
  onLoad,
  onError
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [supportsAvif, setSupportsAvif] = useState<boolean | null>(null);
  const [supportsWebp, setSupportsWebp] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Format desteğini kontrol et
  useEffect(() => {
    const checkFormats = async () => {
      const avifSupported = await checkAvifSupport();
      const webpSupported = await checkWebpSupport();
      setSupportsAvif(avifSupported);
      setSupportsWebp(webpSupported);
    };
    
    checkFormats();
  }, []);
  
  // Optimize edilmiş kaynak URL'sini al
  const getOptimizedSrc = () => {
    return imageService.optimizeImage(src, {
      format: supportsAvif ? 'avif' : supportsWebp ? 'webp' : 'jpeg',
      quality,
      width,
      height
    });
  };
  
  // Öncelikli görüntüler için preload
  useEffect(() => {
    if (priority && src) {
      const optimizedSrc = getOptimizedSrc();
      queueImagePreload(optimizedSrc);
      
      // Preload link ekle
      const linkEl = document.createElement('link');
      linkEl.rel = 'preload';
      linkEl.as = 'image';
      linkEl.href = optimizedSrc;
      document.head.appendChild(linkEl);
      
      return () => {
        document.head.removeChild(linkEl);
      };
    }
  }, [priority, src, supportsAvif, supportsWebp]);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    // Öncelikli olmayan görüntüler için IntersectionObserver kullan
    if (!priority && typeof window !== 'undefined' && 'IntersectionObserver' in window && imgRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && imgRef.current && !loaded) {
            // Görüntü görünür olduğunda yükle
            const optimizedSrc = getOptimizedSrc();
            imgRef.current.src = optimizedSrc;
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '200px 0px', // Görüntü görünmeden 200px önce yüklemeye başla
        threshold: 0.01
      });
      
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, loaded, supportsAvif, supportsWebp]);
  
  // Görüntü rolüne göre otomatik sizes özniteliği oluştur
  const getSizes = () => {
    if (sizes) return sizes;
    
    switch (role) {
      case 'banner':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';
      case 'thumbnail':
        return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px';
      case 'icon':
        return '32px';
      case 'avatar':
        return '150px';
      case 'background':
        return '100vw';
      default:
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
    }
  };

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto'
      }}
    >
      {/* Placeholder veya bulanık efekt */}
      {!loaded && !error && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse"
          style={{ 
            backgroundImage: `url(${blurDataURL || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23f0f0f0"/%3E%3C/svg%3E'})`,
            filter: 'blur(20px)',
            transform: 'scale(1.2)'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Ana görüntü */}
      <img
        ref={imgRef}
        src={priority ? getOptimizedSrc() : blurDataURL || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23f0f0f0"/%3E%3C/svg%3E'}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-500",
          objectFit === 'cover' && "object-cover",
          objectFit === 'contain' && "object-contain",
          objectFit === 'fill' && "object-fill",
          objectFit === 'none' && "object-none",
          objectFit === 'scale-down' && "object-scale-down",
          loaded ? "opacity-100" : "opacity-0",
          error && "hidden"
        )}
        sizes={getSizes()}
      />
      
      {/* Hata durumu */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>Görüntü yüklenemedi</span>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';
export default LazyImage;
