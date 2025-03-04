import axios from 'axios';
import { ColorThief } from 'colorthief';

export interface ColorPalette {
  dominant: string;
  palette: string[];
  complementary: string[];
  analogous: string[];
  seasonal: {
    spring: string[];
    summer: string[];
    autumn: string[];
    winter: string[];
  };
}

export interface PaletteRequest {
  baseColor?: string;
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  mood?: 'energetic' | 'calm' | 'professional' | 'playful' | 'elegant';
  scheme?: 'complementary' | 'analogous' | 'triadic' | 'tetradic';
}

export const colorPaletteService = {
  async generatePalette(options: PaletteRequest): Promise<ColorPalette> {
    try {
      const response = await axios.post('/api/colors/generate', options);
      return response.data;
    } catch (error) {
      console.error('Color palette generation error:', error);
      throw new Error('Failed to generate color palette');
    }
  },

  async extractFromImage(imageUrl: string): Promise<ColorPalette> {
    try {
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const dominantColor = colorThief.getColor(img);
      const palette = colorThief.getPalette(img, 8);

      return {
        dominant: this.rgbToHex(dominantColor),
        palette: palette.map(this.rgbToHex),
        complementary: await this.getComplementaryColors(dominantColor),
        analogous: await this.getAnalogousColors(dominantColor),
        seasonal: await this.getSeasonalVariations(dominantColor)
      };
    } catch (error) {
      console.error('Color extraction error:', error);
      throw new Error('Failed to extract colors from image');
    }
  },

  async suggestPaletteForBrand(brandColors: string[]): Promise<ColorPalette> {
    try {
      const response = await axios.post('/api/colors/brand-palette', { brandColors });
      return response.data;
    } catch (error) {
      console.error('Brand palette suggestion error:', error);
      throw new Error('Failed to suggest brand palette');
    }
  },

  private async getComplementaryColors(rgb: number[]): Promise<string[]> {
    const response = await axios.post('/api/colors/complementary', { rgb });
    return response.data.colors;
  },

  private async getAnalogousColors(rgb: number[]): Promise<string[]> {
    const response = await axios.post('/api/colors/analogous', { rgb });
    return response.data.colors;
  },

  private async getSeasonalVariations(rgb: number[]): Promise<ColorPalette['seasonal']> {
    const response = await axios.post('/api/colors/seasonal', { rgb });
    return response.data.seasonal;
  },

  private rgbToHex([r, g, b]: number[]): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
};
