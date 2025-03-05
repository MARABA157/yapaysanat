import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Chat } from '@/pages/Chat';
import { Gallery } from '@/pages/Gallery';
import { Settings } from '@/pages/Settings';
import { ImageGeneration } from '@/pages/generate/image';
import { AudioGeneration } from '@/pages/generate/audio';
import { ScriptGeneration } from '@/pages/generate/script';
import { AIMusicGeneration } from '@/pages/ai-music';
import { ImageEdit } from '@/pages/edit/image';
import { VideoEdit } from '@/pages/edit/video';
import { VideoGeneration } from '@/pages/generate/video';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/generate/image" element={<ImageGeneration />} />
      <Route path="/generate/audio" element={<AudioGeneration />} />
      <Route path="/generate/script" element={<ScriptGeneration />} />
      <Route path="/generate/video" element={<VideoGeneration />} />
      <Route path="/ai-music" element={<AIMusicGeneration />} />
      <Route path="/edit/image" element={<ImageEdit />} />
      <Route path="/edit/video" element={<VideoEdit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
