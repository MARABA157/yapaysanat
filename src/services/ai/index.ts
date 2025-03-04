import axios from 'axios';

// API Configuration
const API_CONFIG = {
  CHAT: {
    endpoint: import.meta.env.VITE_CHAT_API_URL || 'https://api.openai.com/v1',
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  },
  AUDIO: {
    endpoint: import.meta.env.VITE_AUDIO_API_URL || 'https://api.elevenlabs.io/v1',
    apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY
  },
  VIDEO: {
    endpoint: import.meta.env.VITE_VIDEO_API_URL || 'https://api.replicate.com/v1',
    apiKey: import.meta.env.VITE_REPLICATE_API_KEY
  }
};

// Chat Service
const chatService = {
  async sendMessage(message: string) {
    try {
      const response = await axios.post(`${API_CONFIG.CHAT.endpoint}/chat/completions`, {
        model: "gpt-4",
        messages: [{ role: "user", content: message }]
      }, {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.CHAT.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }
};

// Audio Service
const audioService = {
  async generateAudio(text: string) {
    try {
      const response = await axios.post(`${API_CONFIG.AUDIO.endpoint}/text-to-speech`, {
        text,
        voice_id: "21m00Tcm4TlvDq8ikWAM", // Default voice ID
        model_id: "eleven_multilingual_v2"
      }, {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.AUDIO.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Audio generation error:', error);
      throw error;
    }
  }
};

// Video Service
const videoService = {
  async generateVideo(prompt: string) {
    try {
      const response = await axios.post(`${API_CONFIG.VIDEO.endpoint}/predictions`, {
        version: "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2", // Stable Video Diffusion
        input: {
          prompt: prompt
        }
      }, {
        headers: {
          'Authorization': `Token ${API_CONFIG.VIDEO.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Video generation error:', error);
      throw error;
    }
  }
};

// Export all services
export { chatService, audioService, videoService };
