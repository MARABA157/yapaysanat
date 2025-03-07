import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, LogIn, ArrowRight, Loader2, Palette, Music } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import confetti from 'canvas-confetti';
import { signInWithEmail, signInWithGoogle, signInWithApple, signInWithMicrosoft } from '@/lib/auth';
import { FaGoogle, FaApple, FaMicrosoft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { BsMicrosoft } from 'react-icons/bs';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Yükleme durumları için state'ler
  const [isLoading, setIsLoading] = useState({
    google: false,
    apple: false,
    microsoft: false,
    email: false
  });
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Google ile giriş
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(prev => ({ ...prev, google: true }));
      console.log("Google giriş işlemi başlatılıyor...");
      
      // localStorage'dan yönlendirme bilgisini kontrol et
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      
      // Google giriş işlemini başlat
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error("Google giriş hatası:", error);
        toast({
          title: "Giriş Hatası",
          description: error.message || "Google ile giriş yapılırken bir hata oluştu.",
          variant: "destructive",
        });
      }
      // Başarılı durumda yönlendirme otomatik olarak gerçekleşecek
    } catch (error: any) {
      console.error("Beklenmeyen hata:", error);
      toast({
        title: "Giriş Hatası",
        description: error.message || "Beklenmeyen bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, google: false }));
    }
  };

  // Apple ile giriş
  const handleAppleLogin = async () => {
    try {
      setIsLoading(prev => ({ ...prev, apple: true }));
      const { error } = await signInWithApple();
      
      if (error) {
        console.error('Apple login error:', error);
        toast({
          title: "Giriş Hatası",
          description: "Apple ID ile giriş başarısız. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Apple login error:', error);
      toast({
        title: "Giriş Hatası",
        description: "Apple ID ile giriş başarısız. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, apple: false }));
    }
  };

  // Microsoft ile giriş
  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading(prev => ({ ...prev, microsoft: true }));
      const { error } = await signInWithMicrosoft();
      
      if (error) {
        console.error('Microsoft login error:', error);
        toast({
          title: "Giriş Hatası",
          description: "Microsoft ile giriş başarısız. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Microsoft login error:', error);
      toast({
        title: "Giriş Hatası",
        description: "Microsoft ile giriş başarısız. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, microsoft: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(prev => ({ ...prev, email: true }));
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: "Başarılı!",
        description: "Sanat dünyasına hoş geldiniz!",
      });

      // Confetti efekti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // localStorage'dan yönlendirme bilgisini al
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      // Yönlendirme bilgisini temizle
      localStorage.removeItem('redirectAfterLogin');
      
      // Kullanıcıyı yönlendir
      navigate(redirectPath);
    } catch (error: any) {
      toast({
        title: "Hata!",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, email: false }));
    }
  };

  // Sayfa yüklendiğinde localStorage'dan yönlendirme bilgisini kontrol et
  useEffect(() => {
    // Boş useEffect, gerekirse burada işlemler yapılabilir
  }, [location]);

  // Sayfa yüklendiğinde localStorage'dan yönlendirme bilgisini kontrol et
  useEffect(() => {
    // Eğer kullanıcı doğrudan login sayfasına geldiyse ve localStorage'da yönlendirme bilgisi yoksa
    // localStorage'a varsayılan yönlendirme olarak ana sayfayı ekle
    if (!localStorage.getItem('redirectAfterLogin')) {
      localStorage.setItem('redirectAfterLogin', '/');
    }
  }, []);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Sol Panel - Dekoratif Alan */}
      <div className="hidden lg:block relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: 'url("/images/art-gallery.jpg")',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />
        
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white"
            >
              Sanat Dünyasına Hoş Geldiniz!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/80 max-w-md"
            >
              Sanat galerisi sizi bekliyor! Hemen giriş yapın ve yaratıcılığınızı keşfedin.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Sağ Panel - Giriş Formu */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <LogIn className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="mt-6 text-2xl font-bold">Tekrar Hoş Geldiniz!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hesabınız yok mu?{" "}
              <Link to="/auth/register" className="font-medium text-primary hover:text-primary/90">
                Hemen Kaydolun
              </Link>
            </p>

            {/* Sosyal Medya Girişleri */}
            <div className="mt-8 space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 opacity-70"
                onClick={() => toast({
                  title: "Google Giriş Hatası",
                  description: "Google giriş özelliği şu anda bakımda. Lütfen e-posta ve şifre ile giriş yapın.",
                  variant: "destructive",
                })}
                disabled={true}
              >
                <FcGoogle className="w-5 h-5" />
                Google ile devam et (Bakımda)
              </Button>

              {/* Apple ve Microsoft butonlarını geçici olarak devre dışı bırak */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 opacity-70"
                onClick={() => toast({
                  title: "Giriş Hatası",
                  description: "Bu özellik şu anda kullanılamıyor. Lütfen e-posta ve şifre ile giriş yapın.",
                  variant: "destructive",
                })}
                disabled={true}
              >
                {isLoading.apple ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
                ) : (
                  <AiFillApple className="w-5 h-5" />
                )}
                {isLoading.apple ? 'Giriş yapılıyor...' : 'Apple ID ile devam et (Yakında)'}
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 opacity-70"
                onClick={() => toast({
                  title: "Giriş Hatası",
                  description: "Bu özellik şu anda kullanılamıyor. Lütfen e-posta ve şifre ile giriş yapın.",
                  variant: "destructive",
                })}
                disabled={true}
              >
                {isLoading.microsoft ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
                ) : (
                  <BsMicrosoft className="w-5 h-5" />
                )}
                {isLoading.microsoft ? 'Giriş yapılıyor...' : 'Microsoft ile devam et (Yakında)'}
              </Button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">veya e-posta ile devam et</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="ornek@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Şifre</Label>
                  <Link to="/auth/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
                    Şifremi Unuttum
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Giriş Yap
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
