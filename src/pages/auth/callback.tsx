import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { activateFreePremium } from '@/lib/auth';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuthCallback() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Yeni kullanıcı için free premium aktivasyonu
          await activateFreePremium(user.id);
          
          // Ana sayfaya yönlendir
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/auth/login', { replace: true });
      }
    }

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Giriş yapılıyor...</p>
      </div>
    </div>
  );
}
