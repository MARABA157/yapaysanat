import { useState, useEffect } from 'react';
import { ImageService } from '@/lib/image';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  fallbackFormat?: 'jpeg' | 'png';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  fallbackFormat = 'jpeg',
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [srcSet, setSrcSet] = useState<string>('');
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isWebPSupported, setIsWebPSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebPSupported(ImageService.isWebPSupported());
    }
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    const loadImage = async () => {
      try {
        const format = isWebPSupported ? 'webp' : fallbackFormat;
        const response = await fetch(src);
        const buffer = await response.arrayBuffer();

        // Generate optimized image and srcSet
        const optimizedImage = await ImageService.optimizeImage(Buffer.from(buffer), {
          width,
          height,
          quality,
          format
        });

        const srcSetSizes = await ImageService.generateSrcSet(
          Buffer.from(buffer),
          [640, 750, 828, 1080, 1200, 1920],
          format
        );

        if (!didCancel) {
          setImageSrc(`data:image/${format};base64,${optimizedImage.toString('base64')}`);
          setSrcSet(srcSetSizes.join(', '));
        }
      } catch (error) {
        console.error('Image optimization failed:', error);
        if (!didCancel) {
          setImageSrc(src); // Fallback to original image
        }
      }
    };

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                loadImage();
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imageRef);
      } else {
        loadImage();
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef, width, height, quality, isWebPSupported, fallbackFormat]);

  return (
    <picture>
      {isWebPSupported && srcSet && (
        <source
          type="image/webp"
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 750px) 75vw, 50vw"
        />
      )}
      <img
        ref={setImageRef}
        src={imageSrc || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
        srcSet={!isWebPSupported ? srcSet : undefined}
        sizes={!isWebPSupported ? "(max-width: 640px) 100vw, (max-width: 750px) 75vw, 50vw" : undefined}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </picture>
  );
};

export default LazyImage;
