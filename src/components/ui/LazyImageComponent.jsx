import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const LazyImageComponent = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  priority = false,
  role = 'thumbnail'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    
    // WebP URL'ini al
    const optimizedSrc = typeof window !== 'undefined' && window.getWebpUrl 
      ? window.getWebpUrl(src) 
      : src;

    console.log(`Loading image: ${optimizedSrc}`);

    // Öncelikli resimler için hemen yükle
    if (priority || role === 'hero' || role === 'banner') {
      img.src = optimizedSrc;
      console.log(`Image loaded immediately: ${optimizedSrc}`);
      return;
    }

    // Lazy loading için IntersectionObserver
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.src = optimizedSrc;
          console.log(`Image loaded on intersection: ${optimizedSrc}`);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observerRef.current.observe(img);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, role]);

  const handleLoad = () => {
    setIsLoaded(true);
    console.log(`Image load complete: ${src}`);
  };

  const handleError = () => {
    setError(true);
    console.error(`Image failed to load: ${src}`);
  };

  return (
    <div className={cn(
      'relative overflow-hidden',
      'transition-opacity duration-500',
      className
    )}>
      {/* Yükleme durumu göstergesi */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}

      {/* Resim */}
      <img
        ref={imgRef}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'w-full h-full object-cover',
          isLoaded ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-500'
        )}
        loading={priority || role === 'hero' || role === 'banner' ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Hata durumu */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span>Resim yüklenemedi</span>
        </div>
      )}
    </div>
  );
};

export default LazyImageComponent;
