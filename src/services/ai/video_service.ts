import axios from 'axios';

const OLLAMA_BASE_URL = 'http://localhost:11434';

interface VideoGenerationOptions {
  prompt: string;
  num_frames?: number;
}

export const generateVideo = async ({
  prompt,
  num_frames = 4
}: VideoGenerationOptions) => {
  try {
    // Birden fazla resim oluştur
    const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
      model: 'sdxl',
      prompt: `High quality, detailed image sequence of: ${prompt}. Show progression or movement.`,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 1024,
      }
    });
    
    const imageData = response.data.images?.[0] || response.data.response;
    if (imageData) {
      // Tek bir resim döndür
      if (imageData.startsWith('data:image')) {
        return {
          frames: [imageData.split(',')[1]]
        };
      } else if (imageData.startsWith('/9j/') || imageData.startsWith('iVBOR')) {
        return {
          frames: [imageData]
        };
      }
    }
    
    throw new Error('Resimler oluşturulamadı. Lütfen "ollama pull stable-diffusion:latest" komutunu çalıştırın.');
  } catch (error: any) {
    console.error('Video generation error:', error);
    throw new Error(error.response?.data?.error || error.message || 'Resim serisi oluşturma hatası');
  }
};
