import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimize edilmiş görsel bileşeni
 * - Otomatik WebP/AVIF formatı seçimi
 * - Lazy loading
 * - Responsive boyutlandırma
 * - Blur efekti ile yükleme
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  objectFit = 'cover',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Görsel yolu oluşturma
  useEffect(() => {
    if (!src) return;
    
    // Görsel boyutu belirleme
    let sizeSuffix = '';
    if (width && width <= 200) {
      sizeSuffix = '-thumbnail';
    } else if (width && width <= 400) {
      sizeSuffix = '-small';
    } else if (width && width <= 800) {
      sizeSuffix = '-medium';
    } else if (width && width <= 1200) {
      sizeSuffix = '-large';
    }
    
    // Dosya uzantısını ve adını ayır
    const lastDotIndex = src.lastIndexOf('.');
    if (lastDotIndex === -1) {
      setImgSrc(src);
      return;
    }
    
    const basePath = src.substring(0, lastDotIndex);
    
    // WebP veya AVIF formatını kullan
    setImgSrc(`${basePath}${sizeSuffix}.webp`);
  }, [src, width]);
  
  // Görsel yüklenemezse orijinal kaynağa geri dön
  const handleError = () => {
    setImgSrc(src);
    if (onError) onError();
  };
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Stil oluşturma
  const imageStyle: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
  };
  
  // Yükleme göstergesi
  const placeholderStyle: React.CSSProperties = {
    background: 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '200px',
    borderRadius: '4px',
    display: isLoaded ? 'none' : 'block',
  };
  
  return (
    <div className={`relative ${className}`} style={{ width: width ? `${width}px` : '100%' }}>
      {!priority && <div style={placeholderStyle} />}
      
      <picture>
        {/* AVIF formatı */}
        <source 
          srcSet={imgSrc.replace('.webp', '.avif')} 
          type="image/avif" 
        />
        {/* WebP formatı */}
        <source 
          srcSet={imgSrc} 
          type="image/webp" 
        />
        {/* Fallback görsel */}
        <LazyLoadImage
          src={src}
          alt={alt}
          effect="blur"
          threshold={100}
          style={imageStyle}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          wrapperClassName={`w-full h-full object-${objectFit}`}
        />
      </picture>
    </div>
  );
}

// CSS animasyonu için stil
const shimmerStyle = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`;

// Stil ekle
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = shimmerStyle;
  document.head.appendChild(styleElement);
}
