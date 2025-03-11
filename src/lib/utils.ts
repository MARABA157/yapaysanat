import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Global state for lazy loading
export const loadedImages = new Set<string>();
export const failedImages = new Set<string>();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ağ isteklerini optimize etmek için yardımcı fonksiyonlar
 */

// Ağ bağlantı kalitesini kontrol et
export function getConnectionQuality(): 'slow' | 'medium' | 'fast' | 'unknown' {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection;
  
  if (!connection) {
    return 'unknown';
  }

  const { effectiveType, downlink, rtt } = connection;

  if (effectiveType === '4g' && downlink >= 5 && rtt < 100) {
    return 'fast';
  } else if (effectiveType === '4g' || (effectiveType === '3g' && downlink >= 1)) {
    return 'medium';
  } else {
    return 'slow';
  }
}

// Tarayıcı önbelleğini kontrol et
export async function isBrowserCacheEnabled(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  // Basit bir test: Aynı URL'ye iki istek yap ve zamanlamayı karşılaştır
  try {
    const testUrl = `/api/cache-test?t=${Date.now()}`;
    const start = performance.now();
    
    await fetch(testUrl);
    const firstRequestTime = performance.now() - start;
    const secondStart = performance.now();
    
    await fetch(testUrl);
    const secondRequestTime = performance.now() - secondStart;
    
    // İkinci istek belirgin şekilde daha hızlıysa, önbellek çalışıyor olabilir
    return secondRequestTime < firstRequestTime * 0.7;
  } catch (error) {
    return false;
  }
}

// Resim yükleme stratejisini belirle
export function getImageLoadingStrategy() {
  const connectionQuality = getConnectionQuality();
  
  switch (connectionQuality) {
    case 'fast':
      return {
        preloadCount: 8,     // Önceden yüklenecek resim sayısı
        lazyLoadThreshold: 0.1, // Görünürlük eşiği (IntersectionObserver için)
        lowQualityPlaceholder: false, // Düşük kaliteli yer tutucu kullan
        timeout: 10000       // Zaman aşımı (ms)
      };
    case 'medium':
      return {
        preloadCount: 4,
        lazyLoadThreshold: 0.2,
        lowQualityPlaceholder: true,
        timeout: 15000
      };
    case 'slow':
      return {
        preloadCount: 2,
        lazyLoadThreshold: 0.5,
        lowQualityPlaceholder: true,
        timeout: 20000
      };
    default:
      return {
        preloadCount: 4,
        lazyLoadThreshold: 0.2,
        lowQualityPlaceholder: true,
        timeout: 15000
      };
  }
}

// Ağ hatalarını işle ve yeniden dene
export async function fetchWithRetry(
  url: string, 
  options: RequestInit = {}, 
  maxRetries = 3, 
  backoffFactor = 1.5
): Promise<Response> {
  let retries = 0;
  let lastError: Error;

  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      retries++;
      
      if (retries >= maxRetries) {
        break;
      }
      
      // Üstel geri çekilme stratejisi
      const backoffTime = Math.pow(backoffFactor, retries) * 1000;
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }
  
  throw lastError;
}

// URL'den dosya uzantısını al
export function getFileExtension(url: string): string {
  if (!url) return '';
  
  const filename = url.split('/').pop() || '';
  const extension = filename.split('.').pop() || '';
  
  return extension.toLowerCase();
}

// Resim formatını destekleyip desteklemediğini kontrol et
export function isImageFormatSupported(format: string): boolean {
  if (typeof document === 'undefined') return false;
  
  const formats: Record<string, string> = {
    'webp': 'image/webp',
    'avif': 'image/avif',
    'heic': 'image/heic',
    'jxl': 'image/jxl'
  };
  
  if (!formats[format]) return true; // Bilinmeyen formatlar için true döndür (varsayılan olarak destekleniyor)
  
  try {
    const video = document.createElement('video');
    return !!video && video.canPlayType && video.canPlayType(formats[format]) !== '';
  } catch (e) {
    // Tarayıcı desteklemiyorsa veya hata oluşursa false döndür
    return false;
  }
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDistanceToNow(date: string | Date) {
  const now = new Date();
  const target = new Date(date);
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  const intervals = {
    yıl: 31536000,
    ay: 2592000,
    hafta: 604800,
    gün: 86400,
    saat: 3600,
    dakika: 60,
    saniye: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diff / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 'lar' : ''} önce`;
    }
  }

  return 'şimdi';
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(price);
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export function getContrastColor(hexcolor: string): string {
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// WebP URL eşleştirme
let webpUrlMapping: Record<string, string> | null = null;

// WebP URL eşleştirme dosyasını yükle
export const loadWebpUrlMapping = async () => {
  if (webpUrlMapping) return; // Zaten yüklüyse tekrar yükleme
  
  try {
    const response = await fetch('/webp_url_mapping.json');
    if (!response.ok) throw new Error('WebP mapping yüklenemedi');
    webpUrlMapping = await response.json();
  } catch (error) {
    console.error('WebP URL eşleştirme hatası:', error);
    webpUrlMapping = {};
  }
};

// Orijinal URL'yi WebP URL'sine dönüştür
export const getWebpUrl = (url: string): string => {
  if (!url || !webpUrlMapping) return url;
  
  try {
    // URL'yi normalize et
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    
    // WebP versiyonunu bul
    const webpUrl = webpUrlMapping[normalizedUrl];
    if (webpUrl) {
      // Tam yolu döndür
      return webpUrl.startsWith('/') ? webpUrl : `/${webpUrl}`;
    }
  } catch (error) {
    console.error('WebP URL dönüştürme hatası:', error);
  }
  
  return url;
};

// WebP desteğini kontrol et - basitleştirilmiş versiyon
export const supportsWebp = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    return false;
  }
};

// Resim yükleme önceliğini belirle
export const getImageLoadingPriority = (src: string): 'high' | 'low' => {
  // Pexels resimleri ve hero/banner resimleri yüksek öncelikli
  if (src.includes('pexels') || src.includes('hero') || src.includes('banner')) {
    return 'high';
  }
  return 'low';
};

// Resim önbelleğe alma stratejisini belirle
export function getImagePreloadStrategy(src: string): 'eager' | 'lazy' {
  // Yüksek öncelikli resimler
  if (
    src.includes('hero') ||
    src.includes('banner') ||
    src.includes('logo') ||
    getImageLoadingPriority(src) === 'high'
  ) {
    return 'eager';
  }

  // Bağlantı kalitesine göre karar ver
  const connectionQuality = getConnectionQuality();
  if (connectionQuality === 'fast') {
    return 'eager';
  }

  // Varsayılan olarak lazy loading kullan
  return 'lazy';
}
