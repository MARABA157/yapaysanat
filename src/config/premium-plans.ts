export const PREMIUM_PLANS = {
  FREE: {
    name: 'Ücretsiz',
    price: 0,
    features: {
      chat: {
        enabled: true,
        dailyLimit: 10,
        maxTokens: 500
      },
      image: {
        enabled: false,
        dailyLimit: 0,
        resolution: '512x512'
      },
      video: {
        enabled: false,
        dailyLimit: 0,
        maxDuration: 0
      },
      audio: {
        enabled: false,
        dailyLimit: 0,
        maxDuration: 0
      },
      artAnalysis: {
        enabled: false,
        dailyLimit: 0
      },
      artTutor: {
        enabled: false,
        dailyLimit: 0
      },
      colorPalette: {
        enabled: false,
        dailyLimit: 0
      },
      composition: {
        enabled: false,
        dailyLimit: 0
      },
      marketing: {
        enabled: false,
        dailyLimit: 0
      }
    }
  },
  BASIC: {
    name: 'Başlangıç',
    price: 99,
    features: {
      chat: {
        enabled: true,
        dailyLimit: 50,
        maxTokens: 1000
      },
      image: {
        enabled: true,
        dailyLimit: 20,
        resolution: '512x512'
      },
      video: {
        enabled: false,
        dailyLimit: 0,
        maxDuration: 0
      },
      audio: {
        enabled: false,
        dailyLimit: 0,
        maxDuration: 0
      },
      artAnalysis: {
        enabled: true,
        dailyLimit: 5
      },
      artTutor: {
        enabled: false,
        dailyLimit: 0
      },
      colorPalette: {
        enabled: true,
        dailyLimit: 10
      },
      composition: {
        enabled: false,
        dailyLimit: 0
      },
      marketing: {
        enabled: false,
        dailyLimit: 0
      }
    }
  },
  PRO: {
    name: 'Profesyonel',
    price: 199,
    features: {
      chat: {
        enabled: true,
        dailyLimit: 100,
        maxTokens: 2000
      },
      image: {
        enabled: true,
        dailyLimit: 50,
        resolution: '1024x1024'
      },
      video: {
        enabled: true,
        dailyLimit: 10,
        maxDuration: 30
      },
      audio: {
        enabled: false,
        dailyLimit: 0,
        maxDuration: 0
      },
      artAnalysis: {
        enabled: true,
        dailyLimit: 20
      },
      artTutor: {
        enabled: true,
        dailyLimit: 10
      },
      colorPalette: {
        enabled: true,
        dailyLimit: 15
      },
      composition: {
        enabled: true,
        dailyLimit: 10
      },
      marketing: {
        enabled: false,
        dailyLimit: 0
      }
    }
  },
  UNLIMITED: {
    name: 'Sınırsız',
    price: 399,
    features: {
      chat: {
        enabled: true,
        dailyLimit: -1,
        maxTokens: 4000
      },
      image: {
        enabled: true,
        dailyLimit: -1,
        resolution: '2048x2048'
      },
      video: {
        enabled: true,
        dailyLimit: -1,
        maxDuration: 120
      },
      audio: {
        enabled: true,
        dailyLimit: -1,
        maxDuration: 300
      },
      artAnalysis: {
        enabled: true,
        dailyLimit: -1
      },
      artTutor: {
        enabled: true,
        dailyLimit: -1
      },
      colorPalette: {
        enabled: true,
        dailyLimit: -1
      },
      composition: {
        enabled: true,
        dailyLimit: -1
      },
      marketing: {
        enabled: true,
        dailyLimit: -1
      }
    }
  }
} as const;

export type PlanType = keyof typeof PREMIUM_PLANS;
export type FeatureType = 
  | 'chat' 
  | 'image' 
  | 'video' 
  | 'audio'
  | 'artAnalysis'
  | 'artTutor'
  | 'colorPalette'
  | 'composition'
  | 'marketing';
