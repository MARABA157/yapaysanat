/**
 * Ağ İstekleri İzleme ve Performans Analizi Modülü
 * Bu modül, ağ isteklerini izler, performans metriklerini toplar ve sorunları tespit eder.
 */

// İstek durumlarını izlemek için
interface RequestStats {
  url: string;
  startTime: number;
  endTime?: number;
  status?: number;
  size?: number;
  type?: string;
  success: boolean;
  retries: number;
  error?: string;
}

// Global izleme durumu
class NetworkMonitor {
  private static instance: NetworkMonitor;
  private requests: Map<string, RequestStats> = new Map();
  private slowThreshold = 3000; // 3 saniye
  private failedRequests: RequestStats[] = [];
  private slowRequests: RequestStats[] = [];
  private listeners: Array<(stats: any) => void> = [];
  private enabled = false;

  private constructor() {
    // Singleton
  }

  public static getInstance(): NetworkMonitor {
    if (!NetworkMonitor.instance) {
      NetworkMonitor.instance = new NetworkMonitor();
    }
    return NetworkMonitor.instance;
  }

  public enable(): void {
    if (this.enabled) return;
    this.enabled = true;
    
    if (typeof window !== 'undefined') {
      // Performans API'sini kullanarak ağ isteklerini izle
      this.monitorPerformanceEntries();
      
      // Fetch API'sini izle
      this.monitorFetchRequests();
      
      // XMLHttpRequest'leri izle
      this.monitorXHR();
      
      // Image yüklemelerini izle
      this.monitorImageLoads();
    }
    
    console.info('Network Monitor aktif edildi');
  }

  public disable(): void {
    this.enabled = false;
    console.info('Network Monitor devre dışı bırakıldı');
  }

  public addListener(callback: (stats: any) => void): void {
    this.listeners.push(callback);
  }

  public removeListener(callback: (stats: any) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  public getStats(): any {
    return {
      totalRequests: this.requests.size,
      failedRequests: this.failedRequests.length,
      slowRequests: this.slowRequests.length,
      details: {
        failed: this.failedRequests,
        slow: this.slowRequests
      }
    };
  }

  public logStats(): void {
    console.group('Network Monitor İstatistikleri');
    console.log(`Toplam İstek: ${this.requests.size}`);
    console.log(`Başarısız İstek: ${this.failedRequests.length}`);
    console.log(`Yavaş İstek: ${this.slowRequests.length}`);
    
    if (this.failedRequests.length > 0) {
      console.group('Başarısız İstekler');
      this.failedRequests.forEach(req => {
        console.log(`URL: ${req.url}, Hata: ${req.error}`);
      });
      console.groupEnd();
    }
    
    if (this.slowRequests.length > 0) {
      console.group('Yavaş İstekler');
      this.slowRequests.forEach(req => {
        const duration = req.endTime ? (req.endTime - req.startTime) : 0;
        console.log(`URL: ${req.url}, Süre: ${duration}ms`);
      });
      console.groupEnd();
    }
    
    console.groupEnd();
  }

  private notifyListeners(): void {
    const stats = this.getStats();
    this.listeners.forEach(listener => {
      try {
        listener(stats);
      } catch (error) {
        console.error('Listener notification error:', error);
      }
    });
  }

  private monitorPerformanceEntries(): void {
    if (!window.PerformanceObserver) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            const url = resourceEntry.name;
            const duration = resourceEntry.duration;
            
            // İstek istatistiklerini güncelle
            if (this.requests.has(url)) {
              const stats = this.requests.get(url)!;
              stats.endTime = stats.startTime + duration;
              stats.size = resourceEntry.transferSize;
              stats.type = this.getResourceType(resourceEntry.initiatorType);
              
              // Yavaş istekleri tespit et
              if (duration > this.slowThreshold && !this.slowRequests.some(r => r.url === url)) {
                this.slowRequests.push(stats);
                console.warn(`Yavaş yükleme tespit edildi: ${url} (${duration}ms)`);
              }
              
              this.requests.set(url, stats);
              this.notifyListeners();
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.error('PerformanceObserver error:', error);
    }
  }

  private monitorFetchRequests(): void {
    if (!window.fetch) return;
    
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url;
      
      // İstek başlangıcını kaydet
      const startTime = performance.now();
      this.requests.set(url, {
        url,
        startTime,
        success: false,
        retries: 0
      });
      
      try {
        const response = await originalFetch(input, init);
        
        // İstek sonucunu güncelle
        if (this.requests.has(url)) {
          const stats = this.requests.get(url)!;
          stats.endTime = performance.now();
          stats.status = response.status;
          stats.success = response.ok;
          
          if (!response.ok) {
            stats.error = `HTTP Error: ${response.status}`;
            this.failedRequests.push(stats);
            console.error(`Fetch error: ${url}, Status: ${response.status}`);
          }
          
          this.requests.set(url, stats);
          this.notifyListeners();
        }
        
        return response;
      } catch (error) {
        // Hata durumunu kaydet
        if (this.requests.has(url)) {
          const stats = this.requests.get(url)!;
          stats.endTime = performance.now();
          stats.success = false;
          stats.error = error instanceof Error ? error.message : 'Unknown error';
          this.failedRequests.push(stats);
          this.requests.set(url, stats);
          this.notifyListeners();
        }
        
        console.error(`Fetch exception: ${url}`, error);
        throw error;
      }
    };
  }

  private monitorXHR(): void {
    if (!window.XMLHttpRequest) return;
    
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method: string, url: string) {
      this._monitorUrl = url;
      return originalOpen.apply(this, arguments as any);
    };
    
    XMLHttpRequest.prototype.send = function(body?: Document | XMLHttpRequestBodyInit) {
      if (this._monitorUrl) {
        const url = this._monitorUrl;
        const startTime = performance.now();
        
        // İstek başlangıcını kaydet
        NetworkMonitor.getInstance().requests.set(url, {
          url,
          startTime,
          success: false,
          retries: 0
        });
        
        // Yanıt olaylarını dinle
        this.addEventListener('load', function() {
          if (NetworkMonitor.getInstance().requests.has(url)) {
            const stats = NetworkMonitor.getInstance().requests.get(url)!;
            stats.endTime = performance.now();
            stats.status = this.status;
            stats.success = this.status >= 200 && this.status < 300;
            
            if (!stats.success) {
              stats.error = `HTTP Error: ${this.status}`;
              NetworkMonitor.getInstance().failedRequests.push(stats);
              console.error(`XHR error: ${url}, Status: ${this.status}`);
            }
            
            NetworkMonitor.getInstance().requests.set(url, stats);
            NetworkMonitor.getInstance().notifyListeners();
          }
        });
        
        this.addEventListener('error', function() {
          if (NetworkMonitor.getInstance().requests.has(url)) {
            const stats = NetworkMonitor.getInstance().requests.get(url)!;
            stats.endTime = performance.now();
            stats.success = false;
            stats.error = 'Network Error';
            NetworkMonitor.getInstance().failedRequests.push(stats);
            NetworkMonitor.getInstance().requests.set(url, stats);
            NetworkMonitor.getInstance().notifyListeners();
          }
        });
        
        this.addEventListener('timeout', function() {
          if (NetworkMonitor.getInstance().requests.has(url)) {
            const stats = NetworkMonitor.getInstance().requests.get(url)!;
            stats.endTime = performance.now();
            stats.success = false;
            stats.error = 'Timeout';
            NetworkMonitor.getInstance().failedRequests.push(stats);
            NetworkMonitor.getInstance().requests.set(url, stats);
            NetworkMonitor.getInstance().notifyListeners();
          }
        });
      }
      
      return originalSend.apply(this, arguments as any);
    };
  }

  private monitorImageLoads(): void {
    // Resim yüklemelerini izle
    document.addEventListener('load', function(event) {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        const url = img.src;
        
        if (!NetworkMonitor.getInstance().requests.has(url)) {
          NetworkMonitor.getInstance().requests.set(url, {
            url,
            startTime: performance.now() - 100, // Yaklaşık başlangıç zamanı
            endTime: performance.now(),
            success: true,
            retries: 0
          });
        }
      }
    }, true);
    
    // Resim yükleme hatalarını izle
    document.addEventListener('error', function(event) {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        const url = img.src;
        
        if (!NetworkMonitor.getInstance().requests.has(url)) {
          const stats = {
            url,
            startTime: performance.now() - 100, // Yaklaşık başlangıç zamanı
            endTime: performance.now(),
            success: false,
            retries: 0,
            error: 'Image load error'
          };
          
          NetworkMonitor.getInstance().requests.set(url, stats);
          NetworkMonitor.getInstance().failedRequests.push(stats);
          NetworkMonitor.getInstance().notifyListeners();
        }
        
        console.error(`Image load error: ${url}`);
      }
    }, true);
  }

  private getResourceType(initiatorType: string): string {
    switch (initiatorType) {
      case 'img': return 'image';
      case 'css': return 'stylesheet';
      case 'script': return 'script';
      case 'fetch': return 'api';
      case 'xmlhttprequest': return 'api';
      default: return initiatorType;
    }
  }
}

// Singleton instance
const networkMonitor = NetworkMonitor.getInstance();

export default networkMonitor;
