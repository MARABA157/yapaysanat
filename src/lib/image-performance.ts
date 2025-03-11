/**
 * Resim Yükleme Performansı İzleme Modülü
 * Bu modül, resim yükleme performansını izler ve sorunları tespit eder.
 */

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

  public getStats(): any {
    const totalImages = this.imageStats.size;
    const successfulLoads = [...this.imageStats.values()].filter(stat => stat.status === 'success').length;
    const failedLoads = [...this.imageStats.values()].filter(stat => stat.status === 'error').length;
    const timeoutLoads = [...this.imageStats.values()].filter(stat => stat.status === 'timeout').length;
    const slowLoads = [...this.imageStats.values()].filter(stat => 
      stat.status === 'success' && stat.loadTime > this.slowThreshold
    ).length;
    
    // Ortalama yükleme süresi hesapla
    const avgLoadTime = this.imageLoadTimes.length > 0 
      ? this.imageLoadTimes.reduce((sum, time) => sum + time, 0) / this.imageLoadTimes.length 
      : 0;
    
    // En yavaş 5 resmi bul
    const slowestImages = [...this.imageStats.values()]
      .filter(stat => stat.status === 'success')
      .sort((a, b) => b.loadTime - a.loadTime)
      .slice(0, 5);
    
    // Başarısız resimleri listele
    const failedImages = [...this.imageStats.values()]
      .filter(stat => stat.status === 'error' || stat.status === 'timeout');
    
    return {
      totalImages,
      successfulLoads,
      failedLoads,
      timeoutLoads,
      slowLoads,
      avgLoadTime: Math.round(avgLoadTime),
      slowestImages,
      failedImages,
      problematicImages: Array.from(this.problematicImages)
    };
  }

  public logStats(): void {
    const stats = this.getStats();
    
    console.group('Resim Performans İstatistikleri');
    console.log(`Toplam Resim: ${stats.totalImages}`);
    console.log(`Başarılı Yükleme: ${stats.successfulLoads}`);
    console.log(`Başarısız Yükleme: ${stats.failedLoads}`);
    console.log(`Zaman Aşımı: ${stats.timeoutLoads}`);
    console.log(`Yavaş Yükleme: ${stats.slowLoads}`);
    console.log(`Ortalama Yükleme Süresi: ${stats.avgLoadTime}ms`);
    
    if (stats.slowestImages.length > 0) {
      console.group('En Yavaş Resimler');
      stats.slowestImages.forEach((img: ImageLoadStats, index: number) => {
        console.log(`${index + 1}. ${img.src} - ${img.loadTime}ms`);
      });
      console.groupEnd();
    }
    
    if (stats.failedImages.length > 0) {
      console.group('Başarısız Resimler');
      stats.failedImages.forEach((img: ImageLoadStats, index: number) => {
        console.log(`${index + 1}. ${img.src} - ${img.status}`);
      });
      console.groupEnd();
    }
    
    if (this.problematicImages.size > 0) {
      console.group('Sorunlu Resimler (Tekrarlanan Hatalar)');
      Array.from(this.problematicImages).forEach((src, index) => {
        console.log(`${index + 1}. ${src}`);
      });
      console.groupEnd();
    }
    
    console.groupEnd();
  }

  public markImageAsPreloaded(src: string): void {
    if (!src) return;
    this.preloadCache.add(src);
  }

  public isImagePreloaded(src: string): boolean {
    return this.preloadCache.has(src);
  }

  public getProblematicImages(): string[] {
    return Array.from(this.problematicImages);
  }

  private patchImagePrototype(): void {
    if (typeof window === 'undefined' || !window.Image) return;
    
    // Orijinal src property descriptor'ını kaydet
    this.originalImagePrototype = Object.getOwnPropertyDescriptor(window.Image.prototype, 'src');
    
    // Yeni bir src property descriptor'ı oluştur
    Object.defineProperty(window.Image.prototype, 'src', {
      get: function() {
        return this._monitorSrc || '';
      },
      set: function(src: string) {
        this._monitorSrc = src;
        
        if (!src || !ImagePerformanceMonitor.getInstance().enabled) {
          // Orijinal setter'ı çağır
          ImagePerformanceMonitor.getInstance().originalImagePrototype.set.call(this, src);
          return;
        }
        
        const startTime = performance.now();
        const instance = ImagePerformanceMonitor.getInstance();
        
        // Resim istatistiklerini başlat
        instance.imageStats.set(src, {
          src,
          loadTime: 0,
          status: 'success',
          timestamp: Date.now(),
          retries: instance.imageStats.has(src) ? (instance.imageStats.get(src)?.retries || 0) + 1 : 0,
          cached: instance.preloadCache.has(src)
        });
        
        // Yükleme olaylarını dinle
        const onLoad = () => {
          const loadTime = performance.now() - startTime;
          
          if (instance.imageStats.has(src)) {
            const stats = instance.imageStats.get(src)!;
            stats.loadTime = loadTime;
            stats.status = 'success';
            instance.imageStats.set(src, stats);
            
            // Yükleme süresini kaydet
            instance.imageLoadTimes.push(loadTime);
            
            // Yükleme süreleri listesini 100 ile sınırla
            if (instance.imageLoadTimes.length > 100) {
              instance.imageLoadTimes.shift();
            }
            
            // Yavaş yükleme uyarısı
            if (loadTime > instance.slowThreshold) {
              console.warn(`Yavaş resim yükleme: ${src} (${Math.round(loadTime)}ms)`);
            }
          }
          
          this.removeEventListener('load', onLoad);
          this.removeEventListener('error', onError);
        };
        
        const onError = () => {
          if (instance.imageStats.has(src)) {
            const stats = instance.imageStats.get(src)!;
            stats.status = 'error';
            stats.loadTime = performance.now() - startTime;
            instance.imageStats.set(src, stats);
            
            // Sorunlu resimleri izle
            if (stats.retries >= 2) {
              instance.problematicImages.add(src);
              console.error(`Sorunlu resim tespit edildi (${stats.retries} deneme): ${src}`);
            }
          }
          
          this.removeEventListener('load', onLoad);
          this.removeEventListener('error', onError);
        };
        
        this.addEventListener('load', onLoad);
        this.addEventListener('error', onError);
        
        // 10 saniye zaman aşımı
        const timeoutId = setTimeout(() => {
          if (instance.imageStats.has(src) && instance.imageStats.get(src)!.status !== 'success') {
            const stats = instance.imageStats.get(src)!;
            stats.status = 'timeout';
            stats.loadTime = performance.now() - startTime;
            instance.imageStats.set(src, stats);
            
            // Sorunlu resimleri izle
            instance.problematicImages.add(src);
            console.error(`Resim yükleme zaman aşımı: ${src}`);
            
            this.removeEventListener('load', onLoad);
            this.removeEventListener('error', onError);
          }
        }, 10000);
        
        // Orijinal setter'ı çağır
        ImagePerformanceMonitor.getInstance().originalImagePrototype.set.call(this, src);
      },
      configurable: true
    });
  }

  private observeVisibleImages(): void {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    try {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
            const img = entry.target;
            const src = img.src;
            
            if (src && !this.imageStats.has(src)) {
              // Görünür alana giren resmi izlemeye başla
              this.imageStats.set(src, {
                src,
                loadTime: 0,
                status: img.complete ? 'success' : 'success',
                timestamp: Date.now(),
                retries: 0,
                cached: this.preloadCache.has(src)
              });
            }
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });
      
      // Sayfa yüklendiğinde mevcut resimleri izle
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img').forEach(img => {
          observer.observe(img);
        });
      });
      
      // Dinamik olarak eklenen resimleri izlemek için MutationObserver kullan
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Eklenen element bir resim mi?
              if (element.tagName === 'IMG') {
                observer.observe(element);
              }
              
              // Eklenen elementin içinde resimler var mı?
              element.querySelectorAll('img').forEach(img => {
                observer.observe(img);
              });
            }
          });
        });
      });
      
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } catch (error) {
      console.error('IntersectionObserver error:', error);
    }
  }
}

// Singleton instance
const imagePerformanceMonitor = ImagePerformanceMonitor.getInstance();

import { getImagePreloadStrategy } from './utils';

// Resim yükleme önceliğini belirle
export const getImageLoadingPriority = (url: string) => {
  // Kritik resimlere yüksek öncelik ver
  if (url.includes('hero') || url.includes('banner') || url.includes('logo')) {
    return 'high';
  }
  
  // Viewport içinde görünür olacak resimlere orta öncelik ver
  if (url.includes('thumbnail') || url.includes('featured')) {
    return 'medium';
  }
  
  // Diğer tüm resimlere düşük öncelik ver
  return 'low';
};

// Performans modülünü başlat
export const initPerformanceMonitoring = () => {
  imagePerformanceMonitor.enable();
  
  // Resim yükleme önceliğini belirle
  document.querySelectorAll('img').forEach(img => {
    const src = img.src;
    const priority = getImageLoadingPriority(src);
    
    if (priority === 'low') {
      // Düşük öncelikli resimleri lazy load yap
      img.loading = 'lazy';
    }
  });
};

export default imagePerformanceMonitor;
