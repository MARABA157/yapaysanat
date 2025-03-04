import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Home,
  Image,
  Users,
  Book,
  Settings,
  Heart,
  PenTool,
  Music,
  Video,
  MessageSquare,
  Palette,
  User
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Ana Sayfa', path: '/' },
  { icon: Image, label: 'Galeri', path: '/gallery' },
  { icon: Users, label: 'Topluluk', path: '/community' },
  { icon: Book, label: 'Blog', path: '/blog' },
  { icon: Heart, label: 'Favoriler', path: '/favorites' },
  { icon: PenTool, label: 'Çizim', path: '/draw' },
  { icon: Music, label: 'Müzik', path: '/music' },
  { icon: Video, label: 'Video', path: '/video' },
  { icon: MessageSquare, label: 'Mesajlar', path: '/messages' },
  { icon: Palette, label: 'Atölye', path: '/workshop' },
  { icon: User, label: 'Profil', path: '/profile' },
  { icon: Settings, label: 'Ayarlar', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-gray-800 h-screen fixed left-0 top-0">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">Sanat Galerisi</span>
        </Link>
      </div>
      
      <ScrollArea className="h-[calc(100vh-5rem)] px-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-800"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </motion.div>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
