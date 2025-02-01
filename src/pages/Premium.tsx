import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, Shield, Palette, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const plans = [
  {
    name: 'Temel',
    price: 'Ücretsiz',
    description: 'Temel özelliklerle başlayın',
    features: [
      'Sınırlı AI kredisi (günlük 3)',
      'Temel arama özellikleri',
      'Standart destek',
      'Reklamlı deneyim'
    ],
    icon: Star,
    popular: false
  },
  {
    name: 'Premium',
    price: '199 ₺/ay',
    description: 'Profesyonel sanatçılar için',
    features: [
      'Sınırsız AI kredisi',
      'Gelişmiş arama özellikleri',
      'Öncelikli destek',
      'Reklamsız deneyim',
      'Özel etkinlik erişimi',
      'Sanatçı rozeti',
      'Özel analitik raporları'
    ],
    icon: Crown,
    popular: true
  },
  {
    name: 'Kurumsal',
    price: 'İletişime geçin',
    description: 'Galeriler ve kurumlar için',
    features: [
      'Tüm Premium özellikleri',
      'API erişimi',
      'Özel entegrasyonlar',
      'Dedicated destek',
      'Çoklu kullanıcı yönetimi',
      'Özel eğitimler',
      'SLA garantisi'
    ],
    icon: Shield,
    popular: false
  }
];

const features = [
  {
    icon: Zap,
    title: 'Sınırsız AI Kredisi',
    description: 'Yapay zeka özelliklerini sınırsız kullanın'
  },
  {
    icon: Palette,
    title: 'Gelişmiş Stil Transferi',
    description: 'Özel sanat stilleri ve filtreler'
  },
  {
    icon: ImageIcon,
    title: 'Yüksek Çözünürlük',
    description: '4K çözünürlükte görsel işleme'
  },
  {
    icon: Shield,
    title: 'NFT Sertifikası',
    description: 'Eserlerinizi blockchain ile koruyun'
  }
];

export default function Premium() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    // Ödeme mantığı burada implement edilecek
    toast({
      title: 'Bilgi',
      description: 'Ödeme sistemi yakında eklenecek',
    });
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Premium Üyelik</h1>
        <p className="text-xl text-muted-foreground">
          Sınırsız yaratıcılık ve profesyonel özellikler için Premium'a yükseltin
        </p>
      </motion.div>

      {/* Özellikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Planlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className={`relative h-full ${plan.popular ? 'border-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                  En Popüler
                </Badge>
              )}
              <CardHeader>
                <plan.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.name === 'Kurumsal' ? 'İletişime Geç' : 'Abone Ol'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Premium üyelik ne zaman başlar?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ödemeniz onaylandıktan hemen sonra Premium özellikler hesabınızda aktif olur.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İstediğim zaman iptal edebilir miyim?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Evet, üyeliğinizi dilediğiniz zaman iptal edebilirsiniz. Kalan süre boyunca Premium özellikleri kullanmaya devam edersiniz.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI kredileri nasıl çalışır?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Premium üyeler sınırsız AI kredisine sahiptir. Temel üyelikte günlük 3 kredi verilir.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kurumsal plan için nasıl başvurabilirim?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Kurumsal plan için iletişim formumuzu doldurabilir veya doğrudan bizimle iletişime geçebilirsiniz.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
