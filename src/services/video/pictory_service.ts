import axios from 'axios';

interface PictoryVideoParams {
  script: string;
  style?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  voiceType?: string;
}

interface PictoryResponse {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

export class PictoryService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.pictory.ai/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateVideo(params: PictoryVideoParams): Promise<PictoryResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/videos/create`,
        {
          script: params.script,
          style: params.style || 'professional',
          aspect_ratio: params.aspectRatio || '16:9',
          voice_type: params.voiceType || 'neural'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        videoUrl: response.data.video_url
      };
    } catch (error: any) {
      console.error('Pictory video generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async checkVideoStatus(videoId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/videos/${videoId}/status`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error checking video status:', error);
      throw error;
    }
  }
}
