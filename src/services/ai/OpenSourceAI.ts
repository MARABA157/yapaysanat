import { AI_MODELS } from './models';

export class OpenSourceAI {
  private static instance: OpenSourceAI;
  private readonly API_ENDPOINTS = {
    // Resim Oluşturma Modelleri
    STABLE_DIFFUSION: 'https://api.stability.ai/v1/generation',
    KANDINSKY: 'https://api.kandinsky.ai/v1/generate',
    WUERSTCHEN: 'https://api.wuerstchen.ai/v1/generate',
    DALLE_MINI: 'https://api.dalle-mini.ai/v1/generate',
    LATENT_DIFFUSION: 'https://api.latent-diffusion.ai/v1/generate',
    COGVIEW: 'https://api.cogview.ai/v1/generate',
    
    // Video Oluşturma Modelleri
    MODELSCOPE: 'https://api.modelscope.cn/sample/text-to-video/1.0',
    ZEROSCOPE: 'https://api.zeroscope.ai/generate',
    ANIMOV: 'https://api.animov.org/generate',
    PHENAKI: 'https://api.phenaki.ai/v1/generate',
    MAKE_A_VIDEO: 'https://api.make-a-video.ai/v1/generate',
    NUWA: 'https://api.nuwa.ai/v1/generate',
    
    // Stil Transfer Modelleri
    ADAATTN: 'https://api.adaattn.ai/v1/transfer',
    ARBITRARY_STYLE: 'https://api.arbitrary-style.ai/v1/transfer',
    MAGENTA_ARBITRARY_STYLE: 'https://api.magenta.ai/v1/style-transfer',
    CYCLE_GAN: 'https://api.cycle-gan.ai/v1/transfer',
    
    // Ses ve Müzik Modelleri
    MUSICGEN: 'https://api.musicgen.ai/v1/generate',
    AUDIOCRAFT: 'https://api.audiocraft.ai/v1/generate',
    BARK: 'https://api.bark.ai/v1/generate',
    
    // 3D Model Oluşturma
    GET3D: 'https://api.get3d.ai/v1/generate',
    SHAP_E: 'https://api.shap-e.ai/v1/generate',
    DREAMFUSION: 'https://api.dreamfusion.ai/v1/generate'
  };

  private constructor() {}

  public static getInstance(): OpenSourceAI {
    if (!OpenSourceAI.instance) {
      OpenSourceAI.instance = new OpenSourceAI();
    }
    return OpenSourceAI.instance;
  }

  // Resim Oluşturma
  public async generateImage(prompt: string, options: {
    negative_prompt?: string;
    num_inference_steps?: number;
    guidance_scale?: number;
    seed?: number;
    model?: 'stable-diffusion' | 'kandinsky' | 'wuerstchen' | 'dalle-mini' | 'latent-diffusion' | 'cogview';
  } = {}) {
    const model = options.model || 'stable-diffusion';
    let endpoint = '';
    let requestBody = {};

    switch (model) {
      case 'stable-diffusion':
        endpoint = this.API_ENDPOINTS.STABLE_DIFFUSION;
        requestBody = {
          prompt,
          negative_prompt: options.negative_prompt,
          steps: options.num_inference_steps || 30,
          cfg_scale: options.guidance_scale || 7.5,
          seed: options.seed || Math.floor(Math.random() * 1000000)
        };
        break;
      
      case 'kandinsky':
        endpoint = this.API_ENDPOINTS.KANDINSKY;
        requestBody = {
          prompt,
          negative_prompt: options.negative_prompt,
          num_steps: options.num_inference_steps || 30,
          guidance_scale: options.guidance_scale || 7.5,
          seed: options.seed
        };
        break;
      
      case 'wuerstchen':
        endpoint = this.API_ENDPOINTS.WUERSTCHEN;
        requestBody = {
          prompt,
          negative_prompt: options.negative_prompt,
          steps: options.num_inference_steps || 30,
          guidance: options.guidance_scale || 7.5,
          seed: options.seed
        };
        break;

      case 'dalle-mini':
        endpoint = this.API_ENDPOINTS.DALLE_MINI;
        requestBody = {
          prompt,
          num_images: 1,
          size: "512x512"
        };
        break;

      case 'latent-diffusion':
        endpoint = this.API_ENDPOINTS.LATENT_DIFFUSION;
        requestBody = {
          prompt,
          negative_prompt: options.negative_prompt,
          steps: options.num_inference_steps || 30,
          scale: options.guidance_scale || 7.5
        };
        break;

      case 'cogview':
        endpoint = this.API_ENDPOINTS.COGVIEW;
        requestBody = {
          prompt,
          num_images: 1,
          image_size: 512
        };
        break;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Image generation failed');
      }

      const data = await response.json();
      return {
        url: data.output[0],
        model
      };
    } catch (error) {
      console.error('Image generation error:', error);
      throw error;
    }
  }

  // Video Oluşturma
  public async generateVideo(prompt: string, options: {
    style?: string;
    duration?: number;
    fps?: number;
    quality?: number;
    audio_file?: File;
    model?: 'modelscope' | 'zeroscope' | 'animov' | 'phenaki' | 'make-a-video' | 'nuwa';
  } = {}) {
    const model = options.model || 'modelscope';
    let endpoint = '';
    const formData = new FormData();

    switch (model) {
      case 'modelscope':
        endpoint = this.API_ENDPOINTS.MODELSCOPE;
        formData.append('prompt', prompt);
        formData.append('duration', String(options.duration || 10));
        formData.append('fps', String(options.fps || 24));
        if (options.audio_file) formData.append('audio', options.audio_file);
        break;
      
      case 'zeroscope':
        endpoint = this.API_ENDPOINTS.ZEROSCOPE;
        formData.append('prompt', prompt);
        formData.append('style', options.style || 'cinematic');
        formData.append('duration', String(options.duration || 10));
        formData.append('fps', String(options.fps || 24));
        formData.append('quality', String(options.quality || 0.8));
        if (options.audio_file) formData.append('audio', options.audio_file);
        break;
      
      case 'animov':
        endpoint = this.API_ENDPOINTS.ANIMOV;
        formData.append('prompt', prompt);
        formData.append('style', options.style || 'anime');
        formData.append('duration', String(options.duration || 10));
        formData.append('fps', String(options.fps || 24));
        if (options.audio_file) formData.append('audio', options.audio_file);
        break;

      case 'phenaki':
        endpoint = this.API_ENDPOINTS.PHENAKI;
        formData.append('prompt', prompt);
        formData.append('duration', String(options.duration || 10));
        formData.append('fps', String(options.fps || 24));
        break;

      case 'make-a-video':
        endpoint = this.API_ENDPOINTS.MAKE_A_VIDEO;
        formData.append('prompt', prompt);
        formData.append('duration', String(options.duration || 10));
        formData.append('quality', String(options.quality || 0.8));
        break;

      case 'nuwa':
        endpoint = this.API_ENDPOINTS.NUWA;
        formData.append('prompt', prompt);
        formData.append('duration', String(options.duration || 10));
        formData.append('style', options.style || 'realistic');
        break;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Video generation failed');
      }

      const data = await response.json();
      return {
        url: data.output_url,
        model
      };
    } catch (error) {
      console.error('Video generation error:', error);
      throw error;
    }
  }

  // Stil Transferi
  public async transferStyle(
    sourceImage: string,
    styleImage: string,
    strength: number = 0.75,
    model: 'adaattn' | 'arbitrary-style' | 'magenta' | 'cycle-gan' = 'adaattn'
  ) {
    let endpoint;
    switch (model) {
      case 'adaattn':
        endpoint = this.API_ENDPOINTS.ADAATTN;
        break;
      case 'arbitrary-style':
        endpoint = this.API_ENDPOINTS.ARBITRARY_STYLE;
        break;
      case 'magenta':
        endpoint = this.API_ENDPOINTS.MAGENTA_ARBITRARY_STYLE;
        break;
      case 'cycle-gan':
        endpoint = this.API_ENDPOINTS.CYCLE_GAN;
        break;
    }
    
    try {
      const formData = new FormData();
      formData.append('source_image', this.dataURLtoFile(sourceImage, 'source.png'));
      formData.append('style_image', this.dataURLtoFile(styleImage, 'style.png'));
      formData.append('strength', String(strength));

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Style transfer failed');
      }

      const data = await response.json();
      return {
        url: data.output_url,
        model
      };
    } catch (error) {
      console.error('Style transfer error:', error);
      throw error;
    }
  }

  // Ses ve Müzik Oluşturma
  public async generateAudio(prompt: string, options: {
    duration?: number;
    model?: 'musicgen' | 'audiocraft' | 'bark';
    type?: 'music' | 'speech' | 'sound';
  } = {}) {
    const model = options.model || 'musicgen';
    let endpoint;

    switch (model) {
      case 'musicgen':
        endpoint = this.API_ENDPOINTS.MUSICGEN;
        break;
      case 'audiocraft':
        endpoint = this.API_ENDPOINTS.AUDIOCRAFT;
        break;
      case 'bark':
        endpoint = this.API_ENDPOINTS.BARK;
        break;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          duration: options.duration || 10,
          type: options.type || 'music'
        })
      });

      if (!response.ok) {
        throw new Error('Audio generation failed');
      }

      const data = await response.json();
      return {
        url: data.output_url,
        model
      };
    } catch (error) {
      console.error('Audio generation error:', error);
      throw error;
    }
  }

  // 3D Model Oluşturma
  public async generate3DModel(prompt: string, options: {
    model?: 'get3d' | 'shap-e' | 'dreamfusion';
    quality?: 'draft' | 'normal' | 'high';
    format?: 'glb' | 'obj' | 'usdz';
  } = {}) {
    const model = options.model || 'get3d';
    let endpoint;

    switch (model) {
      case 'get3d':
        endpoint = this.API_ENDPOINTS.GET3D;
        break;
      case 'shap-e':
        endpoint = this.API_ENDPOINTS.SHAP_E;
        break;
      case 'dreamfusion':
        endpoint = this.API_ENDPOINTS.DREAMFUSION;
        break;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          quality: options.quality || 'normal',
          format: options.format || 'glb'
        })
      });

      if (!response.ok) {
        throw new Error('3D model generation failed');
      }

      const data = await response.json();
      return {
        url: data.output_url,
        model
      };
    } catch (error) {
      console.error('3D model generation error:', error);
      throw error;
    }
  }

  private dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
