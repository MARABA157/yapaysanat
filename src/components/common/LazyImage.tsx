import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  blurEffect?: boolean;
  role?: 'banner' | 'thumbnail' | 'presentation' | 'icon';
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23f0f0f0"/%3E%3C/svg%3E',
  blurEffect = true,
  role = 'presentation',
  sizes,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  
  // AVIF formatını destekleyip desteklemediğini kontrol et
  const [supportsAvif, setSupportsAvif] = useState<boolean | null>(null);
  
  useEffect(() => {
    // AVIF desteğini kontrol et
    const checkAvifSupport = async () => {
      if (typeof window !== 'undefined') {
        const testImage = new Image();
        testImage.onload = () => setSupportsAvif(true);
        testImage.onerror = () => setSupportsAvif(false);
        testImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      }
    };
    
    checkAvifSupport();
  }, []);
  
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
      default:
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
    }
  };
  
  // Görüntü formatını optimize et
  const getOptimizedSrc = () => {
    // Eğer src zaten bir veri URL'si ise veya dış kaynak ise değiştirme
    if (src.startsWith('data:') || src.startsWith('http') || src.startsWith('blob:')) {
      return src;
    }
    
    // Yerel görüntüler için format optimizasyonu
    const baseSrc = src.split('?')[0]; // URL parametrelerini kaldır
    const ext = baseSrc.split('.').pop()?.toLowerCase();
    
    // Zaten optimize edilmiş formatlar
    if (ext === 'webp' || ext === 'avif') {
      return src;
    }
    
    // Tarayıcı AVIF'i destekliyorsa AVIF kullan, yoksa WebP
    if (supportsAvif === true) {
      return `${baseSrc}?format=avif&quality=80`;
    } else if (supportsAvif === false) {
      return `${baseSrc}?format=webp&quality=85`;
    }
    
    // Destek belirlenmemişse orijinal kaynağı kullan
    return src;
  };
  
  useEffect(() => {
    // Görüntü öncelikli değilse ve IntersectionObserver destekleniyorsa lazy loading uygula
    if (!priority && 'IntersectionObserver' in window && imgRef.current) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            // Görüntü görünür olduğunda gerçek kaynağı yükle
            imgRef.current.src = getOptimizedSrc();
            observer.current?.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '200px', // Görüntü görünmeden 200px önce yüklemeye başla
        threshold: 0.01
      });
      
      observer.current.observe(imgRef.current);
    }
    
    return () => {
      observer.current?.disconnect();
    };
  }, [src, priority, supportsAvif]);
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  const handleError = () => {
    setError(true);
    onError?.();
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
    >
      {/* Placeholder veya bulanık efekt */}
      {!isLoaded && !error && blurEffect && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse"
          style={{ backgroundImage: `url(${placeholder})`, filter: 'blur(10px)' }}
        />
      )}
      
      {/* Ana görüntü */}
      <img
        ref={imgRef}
        src={priority ? getOptimizedSrc() : placeholder}
        data-src={!priority ? getOptimizedSrc() : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes={getSizes()}
      />
      
      {/* Hata durumu */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span>Görüntü yüklenemedi</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
