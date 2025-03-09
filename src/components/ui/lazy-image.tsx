import { useState, useEffect, useRef, memo } from 'react';
import { ImageService } from '@/lib/image';
import { cn } from '@/lib/utils';

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

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  fallbackFormat?: 'jpeg' | 'png';
  role?: 'hero' | 'thumbnail' | 'gallery' | 'full';
  placeholderColor?: string;
  blurDataURL?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

const LazyImage = memo(({
  src,
  alt,
  width,
  height,
  quality = 80,
  fallbackFormat = 'jpeg',
  role = 'gallery',
  placeholderColor = '#f3f4f6',
  blurDataURL,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  className,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(imageCache.has(src));
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isWebPSupported, setIsWebPSupported] = useState(true);
  const [isAVIFSupported, setIsAVIFSupported] = useState(false);
  const [sizes, setSizes] = useState<string>('');

  // Generate a simple blur hash placeholder if not provided
  const placeholder = blurDataURL || `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 100} ${height || 100}'%3E%3Crect width='100%25' height='100%25' fill='${placeholderColor.replace('#', '%23')}'/%3E%3C/svg%3E`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebPSupported(ImageService.isWebPSupported());
      setIsAVIFSupported(ImageService.isAVIFSupported());
      setSizes(ImageService.getSizesAttribute(role));
    }
  }, [role]);

  // Öncelikli resimleri hemen yükle
  useEffect(() => {
    if (priority && src && !imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.set(src, true);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setError(true);
      };
    }
  }, [priority, src]);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    // If priority is true or already loaded, no need for intersection observer
    if (priority || isLoaded) {
      return;
    }

    // Otherwise use intersection observer for lazy loading
    if (imageRef.current) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                // Görünür alana girdiğinde resmi yükle
                if (imageRef.current) {
                  if (imageRef.current.loading === 'lazy') {
                    imageRef.current.loading = 'eager';
                  }
                  
                  // Resmi önbelleğe ekle
                  if (!imageCache.has(src)) {
                    queueImagePreload(src);
                  }
                }
                
                observer.unobserve(imageRef.current!);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '200px', // Load images when they're 200px from viewport
          }
        );
        observer.observe(imageRef.current);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve && imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [priority, isLoaded, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    // Görüntüyü önbelleğe ekle
    imageCache.set(src, true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        !isLoaded && "bg-gray-200",
        className
      )}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : 'auto'
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        style={{
          objectFit,
          objectPosition,
          width: '100%',
          height: '100%',
          transition: 'opacity 0.2s ease-in-out',
          opacity: isLoaded ? 1 : 0
        }}
        {...props}
      />
      
      {/* Yükleme durumu gösterimi */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Hata durumu gösterimi */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Resim yüklenemedi</span>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
