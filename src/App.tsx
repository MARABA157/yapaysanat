import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppRoutes } from '@/routes';

export function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Helmet>
            <title>Sanat Galerisi</title>
            <meta name="description" content="Modern sanat galerisi platformu" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          </Helmet>

          <div className="min-h-screen bg-black text-white flex">
            <Sidebar />
            <div className="flex-1 ml-64">
              <Header />
              <main className="min-h-[calc(100vh-4rem)]">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
