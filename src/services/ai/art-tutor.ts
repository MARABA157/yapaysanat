import axios from 'axios';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface TutorFeedback {
  strengths: string[];
  improvements: string[];
  exercises: {
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[];
  tips: string[];
}

export interface LearningPath {
  currentLevel: string;
  nextMilestone: string;
  recommendedSkills: string[];
  customExercises: {
    daily: string[];
    weekly: string[];
  };
}

export const artTutorService = {
  async analyzePractice(imageUrl: string): Promise<TutorFeedback> {
    try {
      // OpenAI Vision API ile resim analizi
      const analysis = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this artwork and provide detailed feedback" },
              { type: "image_url", image_url: imageUrl }
            ],
          },
        ],
      });

      // Hugging Face ile teknik analiz
      const technicalAnalysis = await axios.post('/api/tutor/technical-analysis', { imageUrl });

      return {
        strengths: this.extractStrengths(analysis.choices[0].message.content),
        improvements: this.extractImprovements(analysis.choices[0].message.content),
        exercises: await this.generateExercises(technicalAnalysis.data),
        tips: this.generateTips(analysis.choices[0].message.content)
      };
    } catch (error) {
      console.error('Art tutor analysis error:', error);
      throw new Error('Failed to analyze practice');
    }
  },

  async createLearningPath(userId: string): Promise<LearningPath> {
    try {
      // Kullanıcının geçmiş çalışmalarını al
      const userHistory = await axios.get(`/api/users/${userId}/art-history`);
      
      // OpenAI ile kişiselleştirilmiş öğrenme yolu oluştur
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Create a personalized art learning path based on user's history"
          },
          {
            role: "user",
            content: JSON.stringify(userHistory.data)
          }
        ]
      });

      return this.parseLearningPath(completion.choices[0].message.content);
    } catch (error) {
      console.error('Learning path creation error:', error);
      throw new Error('Failed to create learning path');
    }
  },

  private extractStrengths(analysis: string): string[] {
    // OpenAI yanıtından güçlü yönleri çıkar
    return analysis.match(/Strengths:(.*?)Improvements/s)?.[1]
      .split('\n')
      .filter(Boolean)
      .map(s => s.trim());
  },

  private extractImprovements(analysis: string): string[] {
    // OpenAI yanıtından geliştirilecek yönleri çıkar
    return analysis.match(/Improvements:(.*?)Tips/s)?.[1]
      .split('\n')
      .filter(Boolean)
      .map(s => s.trim());
  },

  private async generateExercises(technicalAnalysis: any): Promise<TutorFeedback['exercises']> {
    // Teknik analize göre özelleştirilmiş alıştırmalar oluştur
    const response = await axios.post('/api/tutor/generate-exercises', { analysis: technicalAnalysis });
    return response.data.exercises;
  },

  private generateTips(analysis: string): string[] {
    // OpenAI yanıtından ipuçlarını çıkar
    return analysis.match(/Tips:(.*?)$/s)?.[1]
      .split('\n')
      .filter(Boolean)
      .map(s => s.trim());
  },

  private parseLearningPath(aiResponse: string): LearningPath {
    // AI yanıtını öğrenme yolu formatına dönüştür
    const parsed = JSON.parse(aiResponse);
    return {
      currentLevel: parsed.currentLevel,
      nextMilestone: parsed.nextMilestone,
      recommendedSkills: parsed.recommendedSkills,
      customExercises: parsed.customExercises
    };
  }
};
