import axios from 'axios';

const COMFY_API_URL = '/comfyui';
const TIMEOUT_DURATION = 900000; // 15 dakika

interface ComfyGenerationOptions {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  cfg?: number;
  sampler?: string;
  seed?: number;
}

export class ComfyService {
  private readonly defaultWorkflow = {
    "1": {
      "inputs": {
        "ckpt_name": "v1-5-pruned.ckpt"
      },
      "class_type": "CheckpointLoaderSimple"
    },
    "2": {
      "inputs": {
        "text": "",
        "clip": ["1", 1]
      },
      "class_type": "CLIPTextEncode"
    },
    "3": {
      "inputs": {
        "text": "blurry, low quality, distorted, deformed, ugly, bad anatomy",
        "clip": ["1", 1]
      },
      "class_type": "CLIPTextEncode"
    },
    "4": {
      "inputs": {
        "width": 512,
        "height": 512,
        "batch_size": 1
      },
      "class_type": "EmptyLatentImage"
    },
    "5": {
      "inputs": {
        "samples": ["6", 0],
        "vae": ["1", 2]
      },
      "class_type": "VAEDecode"
    },
    "6": {
      "inputs": {
        "seed": 156815340852075,
        "steps": 20,
        "cfg": 7,
        "sampler_name": "euler",
        "scheduler": "normal",
        "denoise": 1,
        "model": ["1", 0],
        "positive": ["2", 0],
        "negative": ["3", 0],
        "latent_image": ["4", 0]
      },
      "class_type": "KSampler"
    },
    "7": {
      "inputs": {
        "filename_prefix": "ComfyUI",
        "images": ["5", 0]
      },
      "class_type": "SaveImage"
    }
  };

  private readonly axiosInstance = axios.create({
    baseURL: COMFY_API_URL,
    timeout: TIMEOUT_DURATION,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    withCredentials: false
  });

  async generateHorseArt(prompt: string, options: Partial<ComfyGenerationOptions> = {}): Promise<string> {
    try {
      console.log('Generating art with prompt:', prompt);
      
      // ComfyUI'ye doğrudan istek gönder
      const workflow = this.createWorkflow(prompt, options);
      console.log('Workflow created:', JSON.stringify(workflow, null, 2));
      
      // Prompt'u gönder
      const response = await this.axiosInstance.post('/prompt', { prompt: workflow });
      console.log('Prompt response:', response.data);
      
      if (!response.data || !response.data.prompt_id) {
        throw new Error('ComfyUI yanıt vermedi');
      }

      const promptId = response.data.prompt_id;
      console.log('Prompt ID:', promptId);

      // Görüntü üretimini bekle
      const result = await this.waitForResult(promptId);
      console.log('Generated image URL:', result);
      return result;

    } catch (error: any) {
      console.error('Hata detayı:', error);
      if (error.response) {
        console.error('Sunucu yanıtı:', error.response.data);
      }
      throw error;
    }
  }

  private async waitForResult(promptId: string): Promise<string> {
    let attempts = 0;
    const maxAttempts = 10; // 10 saniye
    const delayMs = 1000;

    while (attempts < maxAttempts) {
      try {
        // Doğrudan history endpoint'ine istek at
        const historyResponse = await this.axiosInstance.get('/history');
        console.log('History yanıtı:', historyResponse.data);
        
        if (historyResponse.data && historyResponse.data[promptId]) {
          const promptData = historyResponse.data[promptId];
          console.log('Prompt data:', promptData);
          
          if (promptData.outputs && promptData.outputs['7']?.images?.length > 0) {
            const imageUrl = `${COMFY_API_URL}/view?filename=${promptData.outputs['7'].images[0].filename}`;
            console.log('Image URL:', imageUrl);
            
            // Görüntünün varlığını kontrol et
            try {
              await this.axiosInstance.head(imageUrl);
              return imageUrl;
            } catch {
              throw new Error('Görüntü dosyası bulunamadı');
            }
          }
          
          if (promptData.status?.error) {
            throw new Error(`ComfyUI hatası: ${promptData.status.error}`);
          }
        }

        await new Promise(resolve => setTimeout(resolve, delayMs));
        attempts++;
        console.log(`Attempt ${attempts}/${maxAttempts}`);
        
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw new Error('ComfyUI çalışmıyor veya erişilemiyor');
        }
        throw error;
      }
    }

    throw new Error('ComfyUI yanıt vermiyor. Lütfen sunucunun çalıştığından emin olun.');
  }

  private createWorkflow(prompt: string, options: Partial<ComfyGenerationOptions>): any {
    const workflow = JSON.parse(JSON.stringify(this.defaultWorkflow));
    
    // Update prompt
    workflow['2'].inputs.text = prompt;
    
    // Update options if provided
    if (options.width || options.height) {
      workflow['4'].inputs.width = options.width || 512;
      workflow['4'].inputs.height = options.height || 512;
    }
    
    if (options.steps) {
      workflow['6'].inputs.steps = options.steps;
    }
    
    if (options.cfg) {
      workflow['6'].inputs.cfg = options.cfg;
    }
    
    if (options.sampler) {
      workflow['6'].inputs.sampler_name = options.sampler;
    }
    
    if (options.seed) {
      workflow['6'].inputs.seed = options.seed;
    } else {
      workflow['6'].inputs.seed = Math.floor(Math.random() * 1000000000);
    }
    
    console.log('Prompt data:', workflow);
    
    return workflow;
  }
}
