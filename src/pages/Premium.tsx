import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Crown, Sparkles, Star, Zap } from 'lucide-react';

const PREMIUM_FEATURES = [
  {
    title: 'AI Sanat Asistanı Pro',
    description: 'Gelişmiş yapay zeka destekli sanat üretimi ve düzenleme araçları',
    price: '199',
    features: [
      'Sınırsız AI görsel üretimi',
      'Özel stil transferi',
      'Yüksek çözünürlüklü çıktılar',
      'Batch processing',
      'Özel filtreler'
    ],
    icon: Sparkles,
    popular: false
  },
  {
    title: 'Profesyonel Sanatçı',
    description: 'Profesyonel sanatçılar için özel araçlar ve özellikler',
    price: '299',
    features: [
      'AI Sanat Asistanı Pro özellikleri',
      'Özel portföy sayfası',
      'Satış platformu entegrasyonu',
      'Analytics dashboard',
      'Öncelikli destek'
    ],
    icon: Star,
    popular: true
  },
  {
    title: 'Stüdyo',
    description: 'Kurumsal müşteriler ve stüdyolar için tam kapsamlı çözüm',
    price: '599',
    features: [
      'Profesyonel Sanatçı özellikleri',
      'Çoklu kullanıcı desteği',
      'API erişimi',
      'Özel eğitim ve danışmanlık',
      'SLA garantisi'
    ],
    icon: Crown,
    popular: false
  },
  {
    title: 'Ultimate',
    description: 'En gelişmiş AI sanat üretim ve düzenleme paketi',
    price: '999',
    features: [
      'Stüdyo özellikleri',
      'Sınırsız depolama',
      'Özel AI model eğitimi',
      'White-label çözümler',
      '7/24 özel destek'
    ],
    icon: Zap,
    popular: false
  }
];

export default function Premium() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Üyelik Paketleri
          </h1>
          <p className="text-xl text-white/80">
            Sanatınızı bir üst seviyeye taşıyın
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PREMIUM_FEATURES.map((plan) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`relative h-full ${
                plan.popular ? 'border-2 border-primary shadow-xl' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    En Popüler
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <plan.icon className="w-8 h-8 text-primary" />
                    <div className="text-2xl font-bold">
                      {plan.price}₺<span className="text-sm font-normal text-muted-foreground">/ay</span>
                    </div>
                  </div>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-secondary hover:bg-secondary/90'
                    }`}
                  >
                    Paketi Seç
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Özel İhtiyaçlarınız mı Var?
          </h2>
          <p className="text-white/80 mb-8">
            Kurumsal çözümler için bizimle iletişime geçin
          </p>
          <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20">
            İletişime Geç
          </Button>
        </div>
      </div>
    </div>
  );
}
