import axios from 'axios';

const SD_API_URL = 'http://localhost:7860/sdapi/v1';

export class StableDiffusionService {
  async generateImage(prompt: string, negativePrompt: string = ''): Promise<string> {
    try {
      const payload = {
        prompt,
        negative_prompt: negativePrompt,
        steps: 20,
        width: 512,
        height: 512,
        cfg_scale: 7,
        sampler_name: 'Euler a'
      };

      const response = await axios.post(`${SD_API_URL}/txt2img`, payload);
      return response.data.images[0];
    } catch (error) {
      console.error('Stable Diffusion API Error:', error);
      throw error;
    }
  }

  async getModels(): Promise<string[]> {
    try {
      const response = await axios.get(`${SD_API_URL}/sd-models`);
      return response.data.map((model: any) => model.title);
    } catch (error) {
      console.error('Stable Diffusion API Error:', error);
      throw error;
    }
  }
}
