import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Gallery from '@/pages/Gallery';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Search from '@/pages/Search';
import Premium from '@/pages/Premium';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';

// Generate Routes
import ImageGeneration from '@/pages/generate/image';
import AudioGeneration from '@/pages/generate/audio';
import VideoGeneration from '@/pages/generate/video';
import ScriptGeneration from '@/pages/generate/script';

// Edit Routes
import ImageEditor from '@/pages/edit/image';
import VideoEditor from '@/pages/edit/video';

// AI Routes
import AIMusicGeneration from '@/pages/ai-music';
import Chat from '@/pages/chat/Chat';

const AppRoutes = () => {
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
};

export default AppRoutes;
