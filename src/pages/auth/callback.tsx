import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        // URL'deki hash veya query parametrelerini işle
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            toast.success('Başarıyla giriş yapıldı!');
            navigate('/', { replace: true });
          } else if (event === 'SIGNED_OUT') {
            navigate('/auth/login', { replace: true });
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'Giriş işlemi başarısız oldu');
        toast.error('Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.');
        navigate('/auth/login', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/auth/login')}
            className="text-primary hover:underline"
          >
            Giriş sayfasına dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-lg">Giriş yapılıyor...</p>
      </div>
    </div>
  );
}
