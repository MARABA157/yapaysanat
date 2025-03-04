import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { Lumen5Service } from './lumen5_service';
import { PictoryService } from './pictory_service';
import { InVideoService } from './invideo_service';

interface VideoGenerationResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  provider?: string;
}

export type VideoProvider = 'lumen5' | 'pictory' | 'invideo';

export class VideoGeneratorService {
  private ollama: ChatOllama;
  private lumen5: Lumen5Service;
  private pictory: PictoryService;
  private invideo: InVideoService;

  constructor(
    lumen5ApiKey: string,
    pictoryApiKey: string,
    invideoApiKey: string
  ) {
    this.ollama = new ChatOllama({
      baseUrl: 'http://localhost:11434',
      model: 'llama2'
    });
    this.lumen5 = new Lumen5Service(lumen5ApiKey);
    this.pictory = new PictoryService(pictoryApiKey);
    this.invideo = new InVideoService(invideoApiKey);
  }

  async generateVideoScript(topic: string): Promise<string> {
    const prompt = ChatPromptTemplate.fromTemplate(`
      Konu: {topic}
      
      Lütfen bu konu hakkında 60 saniyelik bir video için senaryo yaz.
      Senaryo şunları içermeli:
      1. Dikkat çekici bir giriş
      2. Ana mesajlar (2-3 tane)
      3. Çarpıcı bir sonuç
      4. Her bölüm 2-3 cümleden oluşmalı
      
      Senaryoyu sade ve anlaşılır bir dille yaz.
    `);

    const chain = prompt.pipe(this.ollama).pipe(new StringOutputParser());
    const script = await chain.invoke({ topic });
    return script;
  }

  async generateVideo(
    topic: string,
    provider: VideoProvider = 'lumen5',
    options: any = {}
  ): Promise<VideoGenerationResult> {
    try {
      // 1. Ollama ile senaryo oluştur
      const script = await this.generateVideoScript(topic);

      // 2. Seçilen servis ile video oluştur
      let result: VideoGenerationResult;

      switch (provider) {
        case 'lumen5':
          result = await this.lumen5.generateVideo({
            text: script,
            style: options.style || 'modern',
            format: options.format || 'landscape',
            duration: options.duration || 60
          });
          break;

        case 'pictory':
          result = await this.pictory.generateVideo({
            script: script,
            style: options.style || 'professional',
            aspectRatio: options.aspectRatio || '16:9',
            voiceType: options.voiceType || 'neural'
          });
          break;

        case 'invideo':
          result = await this.invideo.generateVideo({
            script: script,
            template: options.template || 'business',
            resolution: options.resolution || '1080p',
            language: options.language || 'tr'
          });
          break;

        default:
          throw new Error('Invalid video provider');
      }

      return {
        ...result,
        provider
      };
    } catch (error: any) {
      console.error('Video generation error:', error);
      return {
        success: false,
        error: error.message,
        provider
      };
    }
  }
}
