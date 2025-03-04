import axios from 'axios';

interface VideoGenerationParams {
  text: string;
  style?: string;
  format?: 'landscape' | 'portrait' | 'square';
  duration?: number;
}

interface VideoResponse {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

export class Lumen5Service {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.lumen5.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateVideo(params: VideoGenerationParams): Promise<VideoResponse> {
    try {
      // Lumen5 API'ye istek gönder
      const response = await axios.post(
        `${this.baseUrl}/videos`,
        {
          text: params.text,
          style: params.style || 'modern',
          format: params.format || 'landscape',
          duration: params.duration || 60
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
      console.error('Lumen5 video generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getVideoStatus(videoId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/videos/${videoId}`,
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
