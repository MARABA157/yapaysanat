import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

// Pages
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Audio from '@/pages/ai/Audio';
import Chat from '@/pages/ai/Chat';
import Video from '@/pages/ai/Video';
import Script from '@/pages/ai/Script';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Search from '@/pages/Search';
import ArtistProfile from '@/pages/artist/[id]';
import AdminDashboard from '@/pages/admin';
import About from '@/pages/About';
import Tutorials from '@/pages/education/Tutorials';
import Community from '@/pages/community/Community';
import ImageGenerate from '@/pages/ai/ImageGenerate';
import ImageEdit from '@/pages/ai/image-edit';
import VideoEdit from '@/pages/ai/video-edit';
import AIMusic from '@/pages/ai-music';
import Privacy from '@/pages/Privacy';
import AdminLogin from '@/pages/admin/login';
import AdminLayout from '@/pages/admin';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <title>Sanat Galerisi - Dijital Sanat Platformu</title>
        <meta name="description" content="Yapay zeka destekli dijital sanat platformu" />
        
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

      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/artist/:id" element={<ArtistProfile />} />
            
            {/* AI Routes */}
            <Route path="/ai/chat" element={<Chat />} />
            <Route path="/ai/audio" element={<Audio />} />
            <Route path="/ai/video" element={<Video />} />
            <Route path="/ai/script" element={<Script />} />
            <Route path="/ai/image-generate" element={<ImageGenerate />} />
            <Route path="/ai/image-edit" element={<ImageEdit />} />
            <Route path="/ai/video-edit" element={<VideoEdit />} />
            <Route path="/ai-music" element={<AIMusic />} />

            {/* Education Routes */}
            <Route path="/education" element={<Tutorials />} />

            {/* Community Routes */}
            <Route path="/community" element={<Community />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
