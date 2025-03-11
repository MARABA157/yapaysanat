/**
 * ImageService - Görüntü işleme ve optimizasyon servisi
 * 
 * Bu servis, görüntü işleme ve optimizasyon işlemleri için kullanılır.
 * - AVIF ve WebP formatlarında görüntü dönüştürme
 * - Görüntü boyutlandırma ve kırpma
 * - Görüntü sıkıştırma ve optimizasyon
 * - Responsive görüntü desteği
 */

export interface ImageOptimizationOptions {
  format?: 'avif' | 'webp' | 'jpeg' | 'png' | 'original';
  quality?: number; // 0-100 arası
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  position?: string; // 'center', 'top', 'right top', vb.
  background?: string; // Arkaplan rengi (rgba, hex)
  withoutEnlargement?: boolean; // Küçük görüntüleri büyütme
  withoutReduction?: boolean; // Büyük görüntüleri küçültme
  trim?: boolean; // Kenarları kırp
  sharpen?: boolean; // Keskinleştirme uygula
  blur?: number; // Bulanıklaştırma miktarı (0-100)
  rotate?: number; // Döndürme açısı
  flip?: boolean; // Yatay çevir
  flop?: boolean; // Dikey çevir
  grayscale?: boolean; // Gri tonlama
  tint?: string; // Renk tonu (hex)
}

export interface ResponsiveImageSet {
  src: string;
  srcSet: string;
  srcSetWebp?: string;
  srcSetAvif?: string;
  sizes: string;
  width: number;
  height: number;
}

export type ImageRole = 'banner' | 'thumbnail' | 'gallery' | 'avatar' | 'icon' | 'background';

class ImageService {
  private baseUrl: string;
  private defaultQuality: number;
  private supportAvif: boolean;
  private supportWebp: boolean;

  constructor() {
    this.baseUrl = '/assets/images';
    this.defaultQuality = 85;
    this.supportAvif = false;
    this.supportWebp = false;

    // Tarayıcı ortamında format desteğini kontrol et
    if (typeof window !== 'undefined') {
      this.checkFormatSupport();
    }
  }

  /**
   * Tarayıcının desteklediği görüntü formatlarını kontrol et
   */
  private async checkFormatSupport(): Promise<void> {
    // AVIF desteği kontrolü
    const avifSupport = new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });

    // WebP desteği kontrolü
    const webpSupport = new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    });

    // Format desteğini belirle
    this.supportAvif = await avifSupport;
    this.supportWebp = await webpSupport;
  }

  /**
   * Görüntü URL'sini optimize et
   * @param src Görüntü kaynağı
   * @param options Optimizasyon seçenekleri
   * @returns Optimize edilmiş görüntü URL'si
   */
  public optimizeImage(src: string, options: ImageOptimizationOptions = {}): string {
    // Dış kaynak veya veri URL'si ise doğrudan döndür
    if (src.startsWith('data:') || src.startsWith('http') || src.startsWith('blob:')) {
      return src;
    }

    // Temel URL'yi oluştur
    const baseSrc = src.startsWith('/') ? src : `${this.baseUrl}/${src}`;
    
    // Parametre dizisi oluştur
    const params: string[] = [];

    // Format seçimi
    const format = options.format || this.getBestFormat();
    if (format !== 'original') {
      params.push(`format=${format}`);
    }

    // Kalite
    const quality = options.quality || this.defaultQuality;
    params.push(`quality=${quality}`);

    // Boyutlandırma
    if (options.width) params.push(`width=${options.width}`);
    if (options.height) params.push(`height=${options.height}`);
    if (options.fit) params.push(`fit=${options.fit}`);
    if (options.position) params.push(`position=${encodeURIComponent(options.position)}`);
    if (options.background) params.push(`background=${encodeURIComponent(options.background)}`);
    
    // Boyutlandırma kısıtlamaları
    if (options.withoutEnlargement) params.push('withoutEnlargement=true');
    if (options.withoutReduction) params.push('withoutReduction=true');
    
    // Görüntü işleme
    if (options.trim) params.push('trim=true');
    if (options.sharpen) params.push('sharpen=true');
    if (options.blur !== undefined) params.push(`blur=${options.blur}`);
    if (options.rotate !== undefined) params.push(`rotate=${options.rotate}`);
    if (options.flip) params.push('flip=true');
    if (options.flop) params.push('flop=true');
    if (options.grayscale) params.push('grayscale=true');
    if (options.tint) params.push(`tint=${encodeURIComponent(options.tint)}`);

    // Mozjpeg optimizasyonu (JPEG için)
    if (format === 'jpeg') {
      params.push('mozjpeg=true');
      params.push('trellisQuantisation=true');
      params.push('overshootDeringing=true');
      params.push('optimiseScans=true');
    }

    // PNG optimizasyonu
    if (format === 'png') {
      params.push('compressionLevel=9');
      params.push('palette=true');
    }

    // Parametreleri URL'ye ekle
    return params.length > 0 ? `${baseSrc}?${params.join('&')}` : baseSrc;
  }

  /**
   * Tarayıcı için en iyi görüntü formatını belirle
   * @returns En iyi görüntü formatı
   */
  private getBestFormat(): 'avif' | 'webp' | 'jpeg' {
    if (this.supportAvif) return 'avif';
    if (this.supportWebp) return 'webp';
    return 'jpeg';
  }

  /**
   * Responsive görüntü seti oluştur
   * @param src Görüntü kaynağı
   * @param role Görüntü rolü
   * @param options Optimizasyon seçenekleri
   * @returns Responsive görüntü seti
   */
  public getResponsiveImageSet(
    src: string, 
    role: ImageRole = 'thumbnail',
    options: ImageOptimizationOptions = {}
  ): ResponsiveImageSet {
    // Görüntü boyutlarını belirle
    const { width, height } = this.getDimensionsForRole(role);
    
    // Farklı genişlikler için görüntü setleri oluştur
    const widths = this.getWidthsForRole(role);
    
    // Temel srcSet oluştur (JPEG/PNG)
    const srcSet = widths
      .map(w => `${this.optimizeImage(src, { ...options, width: w, format: 'jpeg' })} ${w}w`)
      .join(', ');
    
    // WebP srcSet oluştur
    const srcSetWebp = widths
      .map(w => `${this.optimizeImage(src, { ...options, width: w, format: 'webp' })} ${w}w`)
      .join(', ');
    
    // AVIF srcSet oluştur
    const srcSetAvif = widths
      .map(w => `${this.optimizeImage(src, { ...options, width: w, format: 'avif' })} ${w}w`)
      .join(', ');
    
    // Sizes özniteliği oluştur
    const sizes = this.getSizesForRole(role);
    
    return {
      src: this.optimizeImage(src, { ...options, width, height }),
      srcSet,
      srcSetWebp,
      srcSetAvif,
      sizes,
      width,
      height
    };
  }

  /**
   * Görüntü rolüne göre boyutları belirle
   * @param role Görüntü rolü
   * @returns Genişlik ve yükseklik
   */
  private getDimensionsForRole(role: ImageRole): { width: number; height: number } {
    switch (role) {
      case 'banner':
        return { width: 1920, height: 1080 };
      case 'thumbnail':
        return { width: 400, height: 300 };
      case 'gallery':
        return { width: 800, height: 600 };
      case 'avatar':
        return { width: 150, height: 150 };
      case 'icon':
        return { width: 32, height: 32 };
      case 'background':
        return { width: 1440, height: 900 };
      default:
        return { width: 800, height: 600 };
    }
  }

  /**
   * Görüntü rolüne göre genişlik listesi oluştur
   * @param role Görüntü rolü
   * @returns Genişlik listesi
   */
  private getWidthsForRole(role: ImageRole): number[] {
    switch (role) {
      case 'banner':
        return [640, 960, 1280, 1600, 1920];
      case 'thumbnail':
        return [200, 300, 400, 600];
      case 'gallery':
        return [400, 600, 800, 1200];
      case 'avatar':
        return [80, 150, 300];
      case 'icon':
        return [32, 64];
      case 'background':
        return [640, 960, 1280, 1440, 1920];
      default:
        return [320, 640, 960, 1280];
    }
  }

  /**
   * Görüntü rolüne göre sizes özniteliği oluştur
   * @param role Görüntü rolü
   * @returns Sizes özniteliği
   */
  private getSizesForRole(role: ImageRole): string {
    switch (role) {
      case 'banner':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1920px';
      case 'thumbnail':
        return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px';
      case 'gallery':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
      case 'avatar':
        return '150px';
      case 'icon':
        return '32px';
      case 'background':
        return '100vw';
      default:
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
    }
  }
}

// Singleton örneği oluştur
const imageService = new ImageService();
export default imageService;
