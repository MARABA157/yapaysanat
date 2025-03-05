import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home.tsx';
import { NotFound } from '@/pages/NotFound.tsx';
import Gallery from '@/pages/Gallery.tsx';
import Profile from '@/pages/Profile.tsx';
import { Settings } from '@/pages/Settings.tsx';
import Search from '@/pages/Search.tsx';
import Premium from '@/pages/Premium.tsx';
import About from '@/pages/About.tsx';
import Privacy from '@/pages/Privacy.tsx';
import AdminLogin from '@/pages/auth/login.tsx';
import Register from '@/pages/auth/register.tsx';

// Generate Routes
import ImageGeneration from '@/pages/generate/image.tsx';
import AudioGeneration from '@/pages/generate/audio.tsx';
import { VideoGeneration } from '@/pages/generate/video.tsx';
import ScriptGeneration from '@/pages/generate/script.tsx';

// Edit Routes
import ImageEditor from '@/pages/edit/image.tsx';
import VideoEditor from '@/pages/edit/video.tsx';

// AI Routes
import AIMusicGeneration from '@/pages/ai-music.tsx';
import Chat from '@/pages/chat/Chat.tsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/search" element={<Search />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      
      {/* Auth Routes */}
      <Route path="/auth/login" element={<AdminLogin />} />
      <Route path="/auth/register" element={<Register />} />
      
      {/* Generate Routes */}
      <Route path="/generate/image" element={<ImageGeneration />} />
      <Route path="/generate/audio" element={<AudioGeneration />} />
      <Route path="/generate/video" element={<VideoGeneration />} />
      <Route path="/generate/script" element={<ScriptGeneration />} />
      
      {/* Edit Routes */}
      <Route path="/edit/image" element={<ImageEditor />} />
      <Route path="/edit/video" element={<VideoEditor />} />
      
      {/* AI Routes */}
      <Route path="/ai-music" element={<AIMusicGeneration />} />
      <Route path="/chat" element={<Chat />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
