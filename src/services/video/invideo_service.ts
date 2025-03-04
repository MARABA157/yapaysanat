import axios from 'axios';

interface InVideoParams {
  script: string;
  template?: string;
  resolution?: '1080p' | '720p';
  language?: string;
}

interface InVideoResponse {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

export class InVideoService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.invideo.io/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateVideo(params: InVideoParams): Promise<InVideoResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/videos`,
        {
          script: params.script,
          template: params.template || 'business',
          resolution: params.resolution || '1080p',
          language: params.language || 'tr'
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
      console.error('InVideo generation error:', error);
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
