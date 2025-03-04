import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import { createCanvas, loadImage } from 'canvas';

export interface CompositionAnalysis {
  balance: {
    score: number;
    suggestions: string[];
  };
  goldenRatio: {
    adherence: number;
    points: { x: number; y: number }[];
  };
  focalPoints: {
    primary: { x: number; y: number };
    secondary: { x: number; y: number }[];
  };
  symmetry: {
    score: number;
    type: 'horizontal' | 'vertical' | 'radial' | 'none';
  };
}

export interface CompositionSuggestion {
  type: 'move' | 'crop' | 'adjust';
  element: string;
  action: string;
  reason: string;
}

export const compositionService = {
  async analyze(imageUrl: string): Promise<CompositionAnalysis> {
    try {
      // Görüntüyü yükle ve hazırla
      const image = await loadImage(imageUrl);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      // Temel analiz
      const basicAnalysis = await this.performBasicAnalysis(canvas);
      
      // AI ile detaylı analiz
      const aiAnalysis = await axios.post('/api/composition/analyze', {
        imageUrl,
        basicAnalysis
      });

      return {
        balance: await this.analyzeBalance(canvas),
        goldenRatio: await this.checkGoldenRatio(canvas),
        focalPoints: await this.detectFocalPoints(canvas),
        symmetry: await this.analyzeSymmetry(canvas)
      };
    } catch (error) {
      console.error('Composition analysis error:', error);
      throw new Error('Failed to analyze composition');
    }
  },

  async suggest(analysis: CompositionAnalysis): Promise<CompositionSuggestion[]> {
    try {
      const response = await axios.post('/api/composition/suggest', { analysis });
      return response.data.suggestions;
    } catch (error) {
      console.error('Composition suggestion error:', error);
      throw new Error('Failed to generate composition suggestions');
    }
  },

  async optimizeCrop(imageUrl: string): Promise<{ x: number; y: number; width: number; height: number }> {
    try {
      const response = await axios.post('/api/composition/optimize-crop', { imageUrl });
      return response.data.crop;
    } catch (error) {
      console.error('Crop optimization error:', error);
      throw new Error('Failed to optimize crop');
    }
  },

  private async performBasicAnalysis(canvas: any) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // TensorFlow.js ile görüntü analizi
    const tensor = tf.browser.fromPixels(imageData);
    const normalized = tensor.div(255);
    
    return {
      dimensions: {
        width: canvas.width,
        height: canvas.height,
        ratio: canvas.width / canvas.height
      },
      intensity: await this.calculateIntensityMap(normalized),
      edges: await this.detectEdges(normalized)
    };
  },

  private async analyzeBalance(canvas: any): Promise<CompositionAnalysis['balance']> {
    const response = await axios.post('/api/composition/balance', {
      canvas: canvas.toDataURL()
    });
    return response.data.balance;
  },

  private async checkGoldenRatio(canvas: any): Promise<CompositionAnalysis['goldenRatio']> {
    const response = await axios.post('/api/composition/golden-ratio', {
      canvas: canvas.toDataURL()
    });
    return response.data.goldenRatio;
  },

  private async detectFocalPoints(canvas: any): Promise<CompositionAnalysis['focalPoints']> {
    const response = await axios.post('/api/composition/focal-points', {
      canvas: canvas.toDataURL()
    });
    return response.data.focalPoints;
  },

  private async analyzeSymmetry(canvas: any): Promise<CompositionAnalysis['symmetry']> {
    const response = await axios.post('/api/composition/symmetry', {
      canvas: canvas.toDataURL()
    });
    return response.data.symmetry;
  },

  private async calculateIntensityMap(tensor: tf.Tensor3D): Promise<number[][]> {
    const grayscale = tensor.mean(2);
    return await grayscale.array();
  },

  private async detectEdges(tensor: tf.Tensor3D): Promise<number[][]> {
    const grayscale = tensor.mean(2);
    const sobelKernel = tf.tensor2d([[-1, -2, -1], [0, 0, 0], [1, 2, 1]]);
    const edges = tf.conv2d(
      grayscale.expandDims(0).expandDims(-1),
      sobelKernel.expandDims(0).expandDims(-1),
      1,
      'same'
    );
    return await edges.squeeze().array();
  }
};
