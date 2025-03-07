import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Kimlik doğrulama kontrolü hatası:', error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Eğer hala yükleniyor veya kimlik doğrulama kontrolü devam ediyorsa, yükleme göster
  if (loading || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Kimlik doğrulama kontrolü tamamlandı, kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!user && !isAuthenticated) {
    // Kullanıcının erişmek istediği tam URL'yi state olarak login sayfasına gönder
    // Yönlendirme bilgisini localStorage'a da kaydedelim
    localStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/auth/login" replace />;
  }

  // Kullanıcı giriş yapmışsa, istenen sayfayı göster
  return <>{children}</>;
}
