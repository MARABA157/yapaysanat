import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AutoTrainer } from '@/services/ai/AutoTrainer';

// Pages
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import AiArt from '@/pages/AiArt';
import AiAudio from '@/pages/AiAudio';
import AiChat from '@/pages/AiChat';
import AiVideo from '@/pages/AiVideo';
import Competitions from '@/pages/Competitions';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import Search from '@/pages/search';
import StyleTransfer from '@/pages/ai/style-transfer';
import GenerateArt from '@/pages/ai/generate';
import VideoGenerate from '@/pages/ai/video-generate';
import ArtistProfile from '@/pages/artist/[id]';
import Premium from '@/pages/Premium';
import AdminDashboard from './pages/admin';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  useEffect(() => {
    window.scrollTo(0, 0);
    // AutoTrainer'ı başlat
    const trainer = AutoTrainer.getInstance();
    
    // İlk eğitimi başlat
    trainer.forceTraining().catch(console.error);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <Helmet>
        {/* Temel Meta Etiketleri */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content="Sanat Galerisi - Sanat eserlerinizi paylaşın ve keşfedin" />
        <title>Sanat Galerisi</title>

        {/* Güvenlik Başlıkları */}
        <meta httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; 
                   script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
                   style-src 'self' 'unsafe-inline';
                   img-src 'self' data: https:;
                   font-src 'self' data:;
                   connect-src 'self' https://*.supabase.co" 
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Performance Optimizasyonları */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        
        {/* PWA Desteği */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>

      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/*" element={<Gallery />} />
        <Route path="/ai/art" element={<AiArt />} />
        <Route path="/ai/audio" element={<AiAudio />} />
        <Route path="/ai/chat" element={<AiChat />} />
        <Route path="/ai/video" element={<AiVideo />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ai/style-transfer" element={<StyleTransfer />} />
        <Route path="/ai/generate" element={<GenerateArt />} />
        <Route path="/ai/video-generate" element={<VideoGenerate />} />
        <Route path="/artist/:id" element={<ArtistProfile />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      {!isAuthPage && <Footer />}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
