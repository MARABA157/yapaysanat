import { supabase } from '@/lib/supabase';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  private static instance: Analytics;
  private initialized = false;
  private userId: string | null = null;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  async trackEvent(event: AnalyticsEvent) {
    if (!this.initialized) {
      this.init();
    }

    if (!this.userId) return;

    try {
      await supabase.from('analytics_events').insert({
        user_id: this.userId,
        event_name: event.name,
        properties: event.properties,
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  trackPageView(path: string) {
    this.trackEvent({
      name: 'page_view',
      properties: { path },
    });
  }

  trackError(error: Error) {
    this.trackEvent({
      name: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
      },
    });
  }

  trackAIGeneration(prompt: string, success: boolean) {
    this.trackEvent({
      name: 'ai_generation',
      properties: {
        prompt,
        success,
      },
    });
  }

  trackImageGeneration(prompt: string, success: boolean) {
    this.trackEvent({
      name: 'image_generation',
      properties: {
        prompt,
        success,
      },
    });
  }

  trackVideoGeneration(prompt: string, success: boolean) {
    this.trackEvent({
      name: 'video_generation',
      properties: {
        prompt,
        success,
      },
    });
  }
}

export const analytics = Analytics.getInstance();
