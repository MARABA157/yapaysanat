import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Sparkles, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getCurrentUser, isUserPremium } from '@/lib/auth';
import { toast } from 'sonner';

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
  const [loading, setLoading] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvc: '',
    name: ''
  });

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

  const handlePaymentSubmit = async () => {
    // Geçici olarak devre dışı
    toast.info('Ödeme sistemi yakında aktif olacak!');
    setShowPaymentDialog(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
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
                  <Button className="w-full bg-green-500 hover:bg-green-600 cursor-default">
                    <Check className="w-4 h-4 mr-2" />
                    Aktif Premium
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                    onClick={() => setShowPaymentDialog(true)}
                  >
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
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                onClick={() => setShowPaymentDialog(true)}
              >
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
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Premium Üyelik - Ödeme</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Kart Üzerindeki İsim</Label>
              <Input
                id="name"
                value={paymentInfo.name}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                placeholder="Ad Soyad"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Kart Numarası</Label>
              <Input
                id="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: formatCardNumber(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expireMonth">Ay</Label>
                <Input
                  id="expireMonth"
                  value={paymentInfo.expireMonth}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expireMonth: e.target.value })}
                  placeholder="MM"
                  maxLength={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expireYear">Yıl</Label>
                <Input
                  id="expireYear"
                  value={paymentInfo.expireYear}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expireYear: e.target.value })}
                  placeholder="YY"
                  maxLength={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  value={paymentInfo.cvc}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              İptal
            </Button>
            <Button 
              onClick={handlePaymentSubmit} 
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  İşleniyor...
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Ödeme Yap
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
