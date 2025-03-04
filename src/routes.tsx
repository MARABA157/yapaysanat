import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Profile from '@/pages/Profile';
import { NotFound } from '@/pages/NotFound';
import Chat from '@/pages/chat/Chat';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
