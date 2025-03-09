import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import { useAuth } from '@/hooks/useAuth';

// Eager loaded components
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

// Lazy loaded components
const Gallery = lazy(() => import('@/pages/Gallery'));
const Profile = lazy(() => import('@/pages/profile/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));
const Search = lazy(() => import('@/pages/Search'));
const Premium = lazy(() => import('@/pages/Premium'));
const AdminLogin = lazy(() => import('@/pages/auth/AdminLogin'));

// Generate Routes - lazy loaded
const ImageGeneration = lazy(() => import('@/pages/generate/image'));
const AudioGeneration = lazy(() => import('@/pages/generate/audio'));
const VideoGeneration = lazy(() => import('@/pages/generate/video'));
const ScriptGeneration = lazy(() => import('@/pages/generate/script'));

// Edit Routes - lazy loaded
const ImageEditor = lazy(() => import('@/pages/edit/image'));
const VideoEditor = lazy(() => import('@/pages/edit/video'));

// AI Routes - lazy loaded
const AIMusicGeneration = lazy(() => import('@/pages/ai-music'));
const Chat = lazy(() => import('@/pages/chat/Chat'));

// Yükleme bileşeni
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

export function AppRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Kullanıcı yükleniyor ise yükleme ekranı göster
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Herkese açık sayfalar */}
        <Route path="/auth/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/auth/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
        <Route path="/auth/admin" element={!user ? <AdminLogin /> : <Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        {/* Korumalı sayfalar */}
        <Route path="/gallery" element={
          <PrivateRoute>
            <Gallery />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        } />
        <Route path="/search" element={
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        } />
        <Route path="/premium" element={
          <PrivateRoute>
            <Premium />
          </PrivateRoute>
        } />
        
        {/* Generate Routes */}
        <Route path="/generate/image" element={
          <PrivateRoute>
            <ImageGeneration />
          </PrivateRoute>
        } />
        <Route path="/generate/audio" element={
          <PrivateRoute>
            <AudioGeneration />
          </PrivateRoute>
        } />
        <Route path="/generate/video" element={
          <PrivateRoute>
            <VideoGeneration />
          </PrivateRoute>
        } />
        <Route path="/generate/script" element={
          <PrivateRoute>
            <ScriptGeneration />
          </PrivateRoute>
        } />
        
        {/* Edit Routes */}
        <Route path="/edit/image" element={
          <PrivateRoute>
            <ImageEditor />
          </PrivateRoute>
        } />
        <Route path="/edit/video" element={
          <PrivateRoute>
            <VideoEditor />
          </PrivateRoute>
        } />
        
        {/* AI Routes */}
        <Route path="/ai-music" element={
          <PrivateRoute>
            <AIMusicGeneration />
          </PrivateRoute>
        } />
        <Route path="/chat" element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        } />
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
