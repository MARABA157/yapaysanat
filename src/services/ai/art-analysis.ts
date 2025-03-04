import axios from 'axios';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export interface ArtAnalysisResult {
  style: string;
  period: string;
  techniques: string[];
  similarArtists: string[];
  composition: {
    balance: number;
    goldenRatio: boolean;
    focalPoints: { x: number; y: number }[];
  };
  colors: {
    dominant: string[];
    palette: string[];
    mood: string;
  };
}

export const artAnalysisService = {
  async analyze(imageUrl: string): Promise<ArtAnalysisResult> {
    try {
      // Stil analizi
      const styleAnalysis = await hf.imageClassification({
        model: 'microsoft/resnet-50',
        data: await (await fetch(imageUrl)).blob(),
      });

      // Renk analizi
      const colorAnalysis = await axios.post('/api/analyze/colors', { imageUrl });

      // Kompozisyon analizi
      const compositionAnalysis = await axios.post('/api/analyze/composition', { imageUrl });

      return {
        style: styleAnalysis.label,
        period: await this.detectPeriod(imageUrl),
        techniques: await this.detectTechniques(imageUrl),
        similarArtists: await this.findSimilarArtists(styleAnalysis.label),
        composition: compositionAnalysis.data,
        colors: colorAnalysis.data
      };
    } catch (error) {
      console.error('Art analysis error:', error);
      throw new Error('Failed to analyze artwork');
    }
  },

  async detectPeriod(imageUrl: string): Promise<string> {
    const response = await hf.imageClassification({
      model: 'art-period-classifier',
      data: await (await fetch(imageUrl)).blob(),
    });
    return response.label;
  },

  async detectTechniques(imageUrl: string): Promise<string[]> {
    const response = await axios.post('/api/analyze/techniques', { imageUrl });
    return response.data.techniques;
  },

  async findSimilarArtists(style: string): Promise<string[]> {
    const response = await axios.post('/api/analyze/similar-artists', { style });
    return response.data.artists;
  }
};
