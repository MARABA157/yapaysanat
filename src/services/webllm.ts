// WebLLM API tipleri
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionResponse {
  choices: Array<{
    message: ChatMessage;
  }>;
}

import { HfInference } from '@huggingface/inference';

// Gelişmiş Chat servisi
export class EnhancedChatService {
  private isInitialized = false;
  private hfInference: HfInference;
  private apiKey: string;
  private modelId: string;

  constructor(apiKey: string, modelId: string) {
    this.apiKey = apiKey;
    this.modelId = modelId;
    this.hfInference = new HfInference(this.apiKey);
  }

  /**
   * Servisin hazır olup olmadığını kontrol eder
   */
  isReady(): boolean {
    return this.isInitialized;
  }
  
  /**
   * Servisi başlatır
   * @param progressCallback İlerleme bildirimi için callback
   */
  async initialize(progressCallback?: (progress: {progress: number, text: string}) => void): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      console.log('Chat servisi başlatılıyor...');
      
      // İlerleme bildirimi için simülasyon
      if (progressCallback) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 0.1;
          if (progress <= 1) {
            progressCallback({
              progress,
              text: `Yapay Zeka Asistanı hazırlanıyor... (${Math.round(progress * 100)}%)`
            });
          } else {
            clearInterval(interval);
          }
        }, 200);
      }
      
      // Başlatma işlemini simüle et
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.isInitialized = true;
      console.log('Chat servisi başarıyla başlatıldı');
    } catch (error) {
      console.error('Chat servisi başlatma hatası:', error);
      this.isInitialized = false;
      throw error;
    }
  }
  
  /**
   * Chat mesajı gönderir ve yanıt alır
   * @param messages Mesaj geçmişi
   * @returns Yanıt
   */
  async sendMessage(messages: ChatMessage[]): Promise<ChatCompletionResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    try {
      // Son kullanıcı mesajını al
      const lastUserMessage = messages
        .filter(msg => msg.role === 'user')
        .pop()?.content || '';
      
      // Hugging Face API'si ile yanıt al
      const response = await this.hfInference.textGeneration({
        model: this.modelId,
        inputs: lastUserMessage
      });
      
      // Yanıtı ChatCompletionResponse formatına dönüştür
      return {
        choices: [
          {
            message: {
              role: 'assistant',
              content: response.generated_text
            }
          }
        ]
      };
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      
      // Hata durumunda basit bir yanıt döndür
      return {
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
            }
          }
        ]
      };
    }
  }
}

// Singleton örneği
const apiKey = 'YOUR_HUGGING_FACE_API_KEY';
const modelId = 'MODEL_ID';
export const webLLMService = new EnhancedChatService(apiKey, modelId);
