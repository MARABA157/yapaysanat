// Browser-safe image optimization utilities
// Not using sharp directly as it's a Node.js library and doesn't work in the browser

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'avif' | 'webp' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  position?: 'center' | 'top' | 'right' | 'bottom' | 'left';
  background?: string;
  withoutEnlargement?: boolean;
}

export class ImageService {
  static async optimizeImage(
    input: string,
    options: ImageOptimizationOptions = {}
  ): Promise<string> {
    // In browser, we just return the original image
    // Real optimization should be done on the server or via CDN
    return input;
  }

  static async generateSrcSet(
    input: string,
    widths: number[] = [320, 640, 768, 1024, 1366, 1600, 1920],
    format: 'avif' | 'webp' | 'jpeg' | 'png' = 'webp'
  ): Promise<string[]> {
    // For external URLs, we can use the same URL with different width parameters
    // For local images, we'd need a server endpoint that can resize images
    
    // Example implementation for demonstration purposes
    // In a real app, you'd use a CDN or server endpoint that supports resizing
    const srcSet: string[] = [];
    
    if (input.startsWith('http') || input.startsWith('/')) {
      // For external or local URLs, we can't resize in the browser
      // Instead, we'll just return the same URL for all widths
      for (const width of widths) {
        srcSet.push(`${input} ${width}w`);
      }
    }
    
    return srcSet;
  }

  static isWebPSupported(): boolean {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  static isAVIFSupported(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check for AVIF support
    const img = new Image();
    return typeof img.decode === 'function' && 'avif' in document.createElement('picture');
  }

  // Helper to determine the best format for the current browser
  static getBestSupportedFormat(): 'avif' | 'webp' | 'jpeg' | 'png' {
    if (this.isAVIFSupported()) return 'avif';
    if (this.isWebPSupported()) return 'webp';
    return 'jpeg';
  }

  // Calculate appropriate sizes attribute based on image role
  static getSizesAttribute(role: 'hero' | 'thumbnail' | 'gallery' | 'full' = 'gallery'): string {
    switch (role) {
      case 'hero':
        return '100vw';
      case 'thumbnail':
        return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
      case 'gallery':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
      case 'full':
        return '(max-width: 1024px) 100vw, 75vw';
      default:
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
  }
}
