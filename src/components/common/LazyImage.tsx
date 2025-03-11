import React, { useState, useEffect, useRef } from 'react';
import { recordImageLoadStart, recordImageLoadComplete } from '../../lib/image-performance';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  role?: 'hero' | 'banner' | 'thumbnail';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  role = 'thumbnail'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // WebP URL'ini al - Basitleştirilmiş
  const getOptimizedSrc = () => {
    if (!src || typeof window === 'undefined') return src;
    return window.getWebpUrl?.(src) || src;
  };

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const optimizedSrc = getOptimizedSrc();

    // Yükleme başlangıcını kaydet
    recordImageLoadStart(optimizedSrc);

    // Öncelikli resimler veya hero/banner resimleri için hemen yükle
    if (priority || role === 'hero' || role === 'banner') {
      img.src = optimizedSrc;
      return;
    }

    // Lazy loading için IntersectionObserver
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.src = optimizedSrc;
          observer.current?.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.current.observe(img);
    return () => observer.current?.disconnect();
  }, [src, priority, role]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (imgRef.current?.src) {
      recordImageLoadComplete(imgRef.current.src);
    }
  };

  const handleError = () => {
    setError(true);
    console.error('Resim yüklenemedi:', src);
  };

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imgRef}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority || role === 'hero' || role === 'banner' ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Yükleme durumu */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      
      {/* Hata durumu */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span>Resim yüklenemedi</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
