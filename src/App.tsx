import { useEffect } from 'react';
import { useLocation, BrowserRouter as Router } from 'react-router-dom';
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
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <title>Sanat Galerisi - Dijital Sanat Platformu</title>
            <meta name="description" content="Dijital sanat platformu" />
            
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
            <meta name="referrer" content="strict-origin-when-cross-origin" />
            
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            
            <meta name="theme-color" content="#000000" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          </Helmet>

          <Router>
            <div className="min-h-screen bg-background text-white flex">
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
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
