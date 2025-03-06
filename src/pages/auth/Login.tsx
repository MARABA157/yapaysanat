import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Yükleme durumları için state'ler
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);
  
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
      setGoogleLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata!",
        description: "Google ile giriş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  // Apple ile giriş
  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);
      await signInWithApple();
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata!",
        description: "Apple ile giriş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setAppleLoading(false);
    }
  };

  // Microsoft ile giriş
  const handleMicrosoftLogin = async () => {
    try {
      setMicrosoftLoading(true);
      await signInWithMicrosoft();
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata!",
        description: "Microsoft ile giriş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setMicrosoftLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: "Başarılı!",
        description: "Sanat dünyasına hoş geldiniz!",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Hata!",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading || appleLoading || microsoftLoading}
                className="w-full h-11 relative flex items-center justify-center gap-3 px-4 rounded-lg border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-100 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span className="text-sm font-medium">
                  {googleLoading ? "Giriş yapılıyor..." : "Google ile Devam Et"}
                </span>
              </button>

              <button
                onClick={handleAppleLogin}
                disabled={googleLoading || appleLoading || microsoftLoading}
                className="w-full h-11 relative flex items-center justify-center gap-3 px-4 rounded-lg border-2 border-black bg-black text-white hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {appleLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.6 3.44 1.51-3.03 1.81-2.52 5.87.22 7.22-.65 1.29-1.51 2.58-2.25 4.3zm-2.82-16C14.43 2.11 16.17.38 18 0c.14 1.6-.38 3.12-1.37 4.21-.92 1.01-2.38 1.8-3.96 1.71-.15-1.53.4-3.15 1.56-4.14z"
                    />
                  </svg>
                )}
                <span className="text-sm font-medium">
                  {appleLoading ? "Giriş yapılıyor..." : "Apple ID ile Giriş Yap"}
                </span>
              </button>

              <button
                onClick={handleMicrosoftLogin}
                disabled={googleLoading || appleLoading || microsoftLoading}
                className="w-full h-11 relative flex items-center justify-center gap-3 px-4 rounded-lg border-2 border-[#00a4ef] bg-white text-gray-700 hover:bg-blue-50 hover:text-[#00a4ef] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {microsoftLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#00a4ef] border-t-transparent" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#f25022" d="M0 0h11.5v11.5H0z"/>
                    <path fill="#00a4ef" d="M0 12.5h11.5V24H0z"/>
                    <path fill="#7fba00" d="M12.5 0H24v11.5H12.5z"/>
                    <path fill="#ffb900" d="M12.5 12.5H24V24H12.5z"/>
                  </svg>
                )}
                <span className="text-sm font-medium">
                  {microsoftLoading ? "Giriş yapılıyor..." : "Microsoft ile Giriş Yap"}
                </span>
              </button>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sanatci@example.com"
                className="bg-muted/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Süper gizli şifreniz..."
                  className="bg-muted/50 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={googleLoading || appleLoading || microsoftLoading}
            >
              Giriş Yap
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
