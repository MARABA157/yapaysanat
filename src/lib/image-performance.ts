/**
 * Resim Yükleme Performansı İzleme Modülü
 * Bu modül, resim yükleme performansını izler ve sorunları tespit eder.
 */

import { getImagePreloadStrategy, getImageLoadingPriority, getConnectionQuality } from './utils';

interface ImageLoadStats {
  src: string;
  loadTime: number;
  size?: number;
  status: 'success' | 'error' | 'timeout';
  timestamp: number;
  retries: number;
  cached: boolean;
}

class ImagePerformanceMonitor {
  private static instance: ImagePerformanceMonitor;
  private imageStats: Map<string, ImageLoadStats> = new Map();
  private slowThreshold = 2000; // 2 saniye
  private enabled = false;
  private originalImagePrototype: any = null;
  private preloadCache: Set<string> = new Set();
  private problematicImages: Set<string> = new Set();
  private imageLoadTimes: number[] = [];

  private constructor() {
    // Singleton
  }

  public static getInstance(): ImagePerformanceMonitor {
    if (!ImagePerformanceMonitor.instance) {
      ImagePerformanceMonitor.instance = new ImagePerformanceMonitor();
    }
    return ImagePerformanceMonitor.instance;
  }

  public enable(): void {
    if (this.enabled || typeof window === 'undefined') return;
    this.enabled = true;

    // Image prototipini kaydet ve monkey patch uygula
    this.patchImagePrototype();
    
    // Intersection Observer ile görünür resimleri izle
    this.observeVisibleImages();
    
    console.info('Image Performance Monitor aktif edildi');
  }

  public disable(): void {
    if (!this.enabled) return;
    this.enabled = false;
    
    // Orijinal Image prototipini geri yükle
    if (this.originalImagePrototype) {
      Object.defineProperty(window.Image.prototype, 'src', this.originalImagePrototype);
    }
    
    console.info('Image Performance Monitor devre dışı bırakıldı');
  }

  private shouldPreloadImage(src: string): boolean {
    const strategy = getImagePreloadStrategy(src);
    return strategy === 'eager';
  }

  private async preloadImage(src: string): Promise<void> {
    if (this.preloadCache.has(src)) return;

    try {
      const img = new Image();
      img.src = src;
      await img.decode();
      this.preloadCache.add(src);
    } catch (error) {
      console.warn(`Resim önbelleğe alınamadı: ${src}`, error);
    }
  }

  private patchImagePrototype(): void {
    if (!window.Image || !window.Image.prototype) return;

    // Orijinal src property descriptor'ını kaydet
    this.originalImagePrototype = Object.getOwnPropertyDescriptor(window.Image.prototype, 'src');

    // Yeni src property descriptor'ı oluştur
    Object.defineProperty(window.Image.prototype, 'src', {
      set: function(url: string) {
        const startTime = performance.now();
        
        // Resim yükleme istatistiklerini başlat
        ImagePerformanceMonitor.instance.trackImageLoad(url, startTime);
        
        // Orijinal src set fonksiyonunu çağır
        if (ImagePerformanceMonitor.instance.originalImagePrototype?.set) {
          ImagePerformanceMonitor.instance.originalImagePrototype.set.call(this, url);
        }
      },
      get: function() {
        if (ImagePerformanceMonitor.instance.originalImagePrototype?.get) {
          return ImagePerformanceMonitor.instance.originalImagePrototype.get.call(this);
        }
        return '';
      }
    });
  }

  private observeVisibleImages(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
            const img = entry.target;
            const src = img.getAttribute('data-src') || img.src;
            if (src) {
              this.optimizeImageLoading(src);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    // Tüm img elementlerini gözlemle
    document.querySelectorAll('img').forEach(img => observer.observe(img));
  }

  private trackImageLoad(src: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    
    this.imageLoadTimes.push(loadTime);
    
    const stats: ImageLoadStats = {
      src,
      loadTime,
      status: loadTime < this.slowThreshold ? 'success' : 'timeout',
      timestamp: Date.now(),
      retries: 0,
      cached: this.preloadCache.has(src)
    };
    
    this.imageStats.set(src, stats);
    
    if (loadTime > this.slowThreshold) {
      this.problematicImages.add(src);
      console.warn(`Yavaş yüklenen resim: ${src} (${Math.round(loadTime)}ms)`);
    }
  }

  public async optimizeImageLoading(src: string): Promise<void> {
    if (this.shouldPreloadImage(src)) {
      await this.preloadImage(src);
    }
  }

  public recordImageLoadStart(src: string): void {
    if (!this.enabled || !src) return;
    
    const startTime = performance.now();
    this.imageStats.set(src, {
      src,
      loadTime: 0,
      status: 'success',
      timestamp: startTime,
      retries: 0,
      cached: this.preloadCache.has(src)
    });
  }

  public recordImageLoadComplete(src: string): void {
    if (!this.enabled || !src) return;
    
    const stat = this.imageStats.get(src);
    if (stat) {
      const loadTime = performance.now() - stat.timestamp;
      stat.loadTime = loadTime;
      this.imageLoadTimes.push(loadTime);
      
      if (loadTime > this.slowThreshold) {
        this.problematicImages.add(src);
        console.warn(`Yavaş yüklenen resim: ${src} (${Math.round(loadTime)}ms)`);
      }
    }
  }

  public getStats(): any {
    return {
      totalImages: this.imageStats.size,
      averageLoadTime: this.getAverageLoadTime(),
      problematicImages: Array.from(this.problematicImages),
      cachedImages: Array.from(this.preloadCache),
      imageStats: Array.from(this.imageStats.values())
    };
  }

  private getAverageLoadTime(): number {
    if (this.imageLoadTimes.length === 0) return 0;
    const sum = this.imageLoadTimes.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.imageLoadTimes.length);
  }

  public logStats(): void {
    const stats = this.getStats();
    
    console.group('Resim Performans İstatistikleri');
    console.log(`Toplam Resim: ${stats.totalImages}`);
    console.log(`Ortalama Yükleme Süresi: ${stats.averageLoadTime}ms`);
    
    if (stats.problematicImages.length > 0) {
      console.group('Sorunlu Resimler');
      stats.problematicImages.forEach((src: string, index: number) => {
        console.log(`${index + 1}. ${src}`);
      });
      console.groupEnd();
    }
    
    if (stats.cachedImages.length > 0) {
      console.group('Önbellekteki Resimler');
      stats.cachedImages.forEach((src: string, index: number) => {
        console.log(`${index + 1}. ${src}`);
      });
      console.groupEnd();
    }
    
    console.groupEnd();
  }
}

// Singleton instance
const imagePerformanceMonitor = ImagePerformanceMonitor.getInstance();

export default imagePerformanceMonitor;
