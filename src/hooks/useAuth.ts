import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { checkPasswordStrength, generateSecureToken } from '@/lib/crypto';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase ile oturum kontrolü
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'Kullanıcı',
            role: session.user.user_metadata?.role || 'user'
          });
        }
      } catch (error) {
        console.error('Oturum kontrolü hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Oturum değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Kullanıcı bilgilerini güncelle
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'Kullanıcı',
            role: session.user.user_metadata?.role || 'user'
          });

          // Oturum güvenliği için token yenileme
          if (event === 'SIGNED_IN') {
            const token = generateSecureToken();
            await supabase.auth.refreshSession();
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Rate limiting kontrolü
      const rateLimitKey = `login_attempts_${email}`;
      const attempts = localStorage.getItem(rateLimitKey);
      const now = Date.now();

      if (attempts) {
        const { count, timestamp } = JSON.parse(attempts);
        const timeDiff = now - timestamp;

        // 15 dakika içinde 5'ten fazla başarısız deneme varsa engelle
        if (count >= 5 && timeDiff < 15 * 60 * 1000) {
          const remainingTime = Math.ceil((15 * 60 * 1000 - timeDiff) / 60000);
          toast.error(`Çok fazla başarısız deneme. Lütfen ${remainingTime} dakika bekleyin.`);
          return false;
        }

        // 15 dakika geçmişse sayacı sıfırla
        if (timeDiff >= 15 * 60 * 1000) {
          localStorage.setItem(rateLimitKey, JSON.stringify({ count: 1, timestamp: now }));
        }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Başarısız deneme sayısını artır
        const currentAttempts = localStorage.getItem(rateLimitKey);
        const attempts = currentAttempts 
          ? JSON.parse(currentAttempts)
          : { count: 0, timestamp: now };

        localStorage.setItem(rateLimitKey, JSON.stringify({
          count: attempts.count + 1,
          timestamp: attempts.timestamp
        }));

        throw error;
      }

      if (data.user) {
        // Başarılı giriş, rate limit sayacını sıfırla
        localStorage.removeItem(rateLimitKey);

        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || 'Kullanıcı',
          role: data.user.user_metadata?.role || 'user'
        });

        // Başarılı girişte oturum tokenini yenile
        const token = generateSecureToken();
        await supabase.auth.refreshSession();

        toast.success('Giriş başarılı!');
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Giriş başarısız');
      return false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Şifre gücünü kontrol et
      const { isStrong, errors } = checkPasswordStrength(password);
      if (!isStrong) {
        toast.error(errors.join('\n'));
        return false;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'user'
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast.success('Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.');
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.message || 'Kayıt başarısız');
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/auth/login');
      toast.success('Çıkış yapıldı');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Çıkış başarısız');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) throw error;
      toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
      return true;
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Şifre sıfırlama başarısız');
      return false;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      // Şifre gücünü kontrol et
      const { isStrong, errors } = checkPasswordStrength(newPassword);
      if (!isStrong) {
        toast.error(errors.join('\n'));
        return false;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      toast.success('Şifreniz başarıyla güncellendi.');
      return true;
    } catch (error: any) {
      console.error('Password update error:', error);
      toast.error(error.message || 'Şifre güncelleme başarısız');
      return false;
    }
  };

  return { 
    user, 
    loading, 
    login, 
    logout, 
    register, 
    resetPassword,
    updatePassword
  };
};
