import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getCurrentUser, isUserPremium } from '@/lib/auth';

interface PremiumFeature {
  title: string;
  description: string;
}

const premiumFeatures: PremiumFeature[] = [
  {
    title: "Sınırsız Sanat Üretimi",
    description: "Günlük sınırlama olmadan dilediğiniz kadar sanat eseri oluşturun"
  },
  {
    title: "Yüksek Çözünürlük",
    description: "4K kalitesinde görüntüler oluşturun"
  },
  {
    title: "Öncelikli Erişim",
    description: "Yeni özelliklere ilk siz erişin"
  },
  {
    title: "Özel Stiller",
    description: "Premium kullanıcılara özel sanat stilleri"
  }
];

export default function Premium() {
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserStatus() {
      try {
        const currentUser = await getCurrentUser();
        const premiumStatus = await isUserPremium();
        setUser(currentUser);
        setIsPremium(premiumStatus);
      } catch (error) {
        console.error('Premium status check failed:', error);
      } finally {
        setLoading(false);
      }
    }

    checkUserStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Üyelik</h1>
          <p className="text-xl text-muted-foreground">
            Sınırsız yaratıcılık için premium özelliklere erişin
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Free Premium Plan */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
            {user && !isPremium && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  Ücretsiz 30 Gün
                </span>
              </div>
            )}
            <div className="text-center mb-6">
              <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Free Premium</h2>
              <p className="text-muted-foreground">30 günlük premium deneyim</p>
            </div>

            <ul className="space-y-4 mb-8">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-center">
              {user ? (
                isPremium ? (
                  <Button disabled className="w-full">
                    <Crown className="w-4 h-4 mr-2" />
                    Aktif Premium
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Hemen Başla
                  </Button>
                )
              ) : (
                <Button disabled className="w-full">
                  Giriş Yapın
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Pro Premium Plan */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 relative overflow-hidden border-2 border-primary bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                Popüler
              </span>
            </div>
            <div className="text-center mb-6">
              <Crown className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Pro Premium</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold">₺199</span>
                <span className="text-muted-foreground">/ay</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[...premiumFeatures, 
        { title: "7/24 Öncelikli Destek", description: "Size özel destek ekibi" },
        { title: "Özel AI Modelleri", description: "Gelişmiş yapay zeka modelleri" }
      ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                <Crown className="w-4 h-4 mr-2" />
                Pro'ya Yükselt
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Enterprise Plan */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
            <div className="text-center mb-6">
              <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
              <p className="text-muted-foreground">Kurumsal çözümler</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[...premiumFeatures,
        { title: "Özel API Erişimi", description: "Kendi uygulamalarınıza entegre edin" },
        { title: "Kurumsal Destek", description: "Size özel çözümler" },
        { title: "Özelleştirme", description: "Kurumunuza özel AI modelleri" }
      ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Button variant="outline" className="w-full">
                İletişime Geç
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
