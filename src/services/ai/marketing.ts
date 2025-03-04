import axios from 'axios';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface MarketAnalysis {
  targetAudience: {
    demographics: string[];
    interests: string[];
    buyingPower: 'low' | 'medium' | 'high';
  };
  pricing: {
    suggested: number;
    range: { min: number; max: number };
    factors: string[];
  };
  marketingStrategy: {
    channels: string[];
    content: string[];
    timing: string[];
    keywords: string[];
  };
  competitiveAnalysis: {
    similarArtworks: string[];
    priceComparison: string[];
    uniqueSellingPoints: string[];
  };
}

export interface ArtworkMetadata {
  style: string;
  medium: string;
  size: string;
  theme?: string;
  technique?: string;
  timeInvested?: number;
}

export const marketingService = {
  async analyze(artwork: ArtworkMetadata): Promise<MarketAnalysis> {
    try {
      // OpenAI ile pazar analizi
      const analysis = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze the market potential and suggest strategies for an artwork"
          },
          {
            role: "user",
            content: JSON.stringify(artwork)
          }
        ]
      });

      // Pazar verileri analizi
      const marketData = await this.getMarketData(artwork);

      // Fiyat analizi
      const pricing = await this.analyzePricing(artwork, marketData);

      return {
        targetAudience: await this.analyzeTargetAudience(artwork, analysis.choices[0].message.content),
        pricing: pricing,
        marketingStrategy: await this.generateMarketingStrategy(artwork, analysis.choices[0].message.content),
        competitiveAnalysis: await this.analyzeCompetition(artwork)
      };
    } catch (error) {
      console.error('Marketing analysis error:', error);
      throw new Error('Failed to analyze market potential');
    }
  },

  async generatePromotionalContent(artwork: ArtworkMetadata): Promise<string[]> {
    try {
      const response = await axios.post('/api/marketing/content', { artwork });
      return response.data.content;
    } catch (error) {
      console.error('Content generation error:', error);
      throw new Error('Failed to generate promotional content');
    }
  },

  async suggestHashtags(artwork: ArtworkMetadata): Promise<string[]> {
    try {
      const response = await axios.post('/api/marketing/hashtags', { artwork });
      return response.data.hashtags;
    } catch (error) {
      console.error('Hashtag suggestion error:', error);
      throw new Error('Failed to suggest hashtags');
    }
  },

  private async getMarketData(artwork: ArtworkMetadata) {
    const response = await axios.post('/api/marketing/market-data', { artwork });
    return response.data;
  },

  private async analyzePricing(artwork: ArtworkMetadata, marketData: any): Promise<MarketAnalysis['pricing']> {
    const response = await axios.post('/api/marketing/pricing', {
      artwork,
      marketData
    });
    return response.data.pricing;
  },

  private async analyzeTargetAudience(
    artwork: ArtworkMetadata,
    aiAnalysis: string
  ): Promise<MarketAnalysis['targetAudience']> {
    const response = await axios.post('/api/marketing/target-audience', {
      artwork,
      aiAnalysis
    });
    return response.data.targetAudience;
  },

  private async generateMarketingStrategy(
    artwork: ArtworkMetadata,
    aiAnalysis: string
  ): Promise<MarketAnalysis['marketingStrategy']> {
    const response = await axios.post('/api/marketing/strategy', {
      artwork,
      aiAnalysis
    });
    return response.data.strategy;
  },

  private async analyzeCompetition(
    artwork: ArtworkMetadata
  ): Promise<MarketAnalysis['competitiveAnalysis']> {
    const response = await axios.post('/api/marketing/competition', {
      artwork
    });
    return response.data.competition;
  }
};
