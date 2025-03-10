import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy loaded components
const Home = lazy(() => import('@/pages/Home'));
const Chat = lazy(() => import('@/pages/chat/Chat'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Settings = lazy(() => import('@/pages/Settings'));
const ImageGeneration = lazy(() => import('@/pages/generate/image'));
const AudioGeneration = lazy(() => import('@/pages/generate/audio'));
const ScriptGeneration = lazy(() => import('@/pages/generate/script'));
const VideoGeneration = lazy(() => import('@/pages/generate/video'));
const AIMusicGeneration = lazy(() => import('@/pages/ai-music'));
const ImageEdit = lazy(() => import('@/pages/edit/image'));
const VideoEdit = lazy(() => import('@/pages/edit/video'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/generate">
          <Route path="image" element={<ImageGeneration />} />
          <Route path="audio" element={<AudioGeneration />} />
          <Route path="script" element={<ScriptGeneration />} />
          <Route path="video" element={<VideoGeneration />} />
        </Route>
        <Route path="/ai-music" element={<AIMusicGeneration />} />
        <Route path="/edit">
          <Route path="image" element={<ImageEdit />} />
          <Route path="video" element={<VideoEdit />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
