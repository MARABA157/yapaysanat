import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Settings, 
  BarChart, 
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAdminProtection } from '@/lib/auth';

// Admin Pages
import Dashboard from './Dashboard';
import Appointments from './Appointments';
import Payments from './Payments';
import Messages from './Messages';
import AdminSettings from './Settings';

const menuItems = [
  { 
    title: 'Dashboard', 
    icon: BarChart, 
    path: '/admin',
    description: 'Genel istatistikler ve özet bilgiler'
  },
  { 
    title: 'Randevular', 
    icon: Calendar, 
    path: '/admin/appointments',
    description: 'Danışmanlık ve atölye randevuları'
  },
  { 
    title: 'Ödemeler', 
    icon: DollarSign, 
    path: '/admin/payments',
    description: 'Gelir takibi ve fatura yönetimi'
  },
  { 
    title: 'Mesajlar', 
    icon: MessageSquare, 
    path: '/admin/messages',
    description: 'Kullanıcı mesajları ve talepler'
  },
  { 
    title: 'Ayarlar', 
    icon: Settings, 
    path: '/admin/settings',
    description: 'Site ayarları ve yapılandırma'
  }
];

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoading } = useAdminProtection();

  // Yükleme durumunda yükleme göstergesi göster
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 p-4 z-40 transform transition-transform md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={false}
      >
        <div className="mb-8">
          <h1 className="text-xl font-bold text-violet-500">Admin Panel</h1>
          <p className="text-sm text-gray-400">Sanat Galerisi Yönetimi</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-violet-500/10 hover:text-violet-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={() => {
              localStorage.removeItem('sanat_admin_token');
              navigate('/admin/login');
            }}
          >
            <span>Çıkış Yap</span>
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="md:pl-64">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
