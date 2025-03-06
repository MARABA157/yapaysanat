import sharp from 'sharp';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export class ImageService {
  static async optimizeImage(
    input: Buffer | string,
    options: ImageOptimizationOptions = {}
  ): Promise<Buffer> {
    const {
      width,
      height,
      quality = 80,
      format = 'webp'
    } = options;

    let pipeline = sharp(input);

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'cover',
        withoutEnlargement: true
      });
    }

    // Convert to specified format
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality });
        break;
      case 'png':
        pipeline = pipeline.png({ quality });
        break;
    }

    return pipeline.toBuffer();
  }

  static async generateSrcSet(
    input: Buffer | string,
    widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    format: 'webp' | 'jpeg' | 'png' = 'webp'
  ): Promise<string[]> {
    const srcSet: string[] = [];

    for (const width of widths) {
      const optimized = await this.optimizeImage(input, {
        width,
        format,
        quality: 80
      });

      const base64 = optimized.toString('base64');
      srcSet.push(`data:image/${format};base64,${base64} ${width}w`);
    }

    return srcSet;
  }

  static isWebPSupported(): boolean {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}
