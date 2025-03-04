import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Palette, Search, User, Sparkles, Crown, GraduationCap, Users, LogIn, UserPlus, Brush, Paintbrush, Pencil, Eraser, Scissors, Wand2, Sun, Moon, Lightbulb, Map } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import '@/styles/navigation.css';
import '@/styles/lamp.css';

const siteMap = {
  "Ana Sayfalar": [
    { title: "Ana Sayfa", path: "/" },
    { title: "Galeri", path: "/gallery" },
    { title: "Keşfet", path: "/explore" },
    { title: "Topluluk", path: "/community" },
    { title: "Eğitimler", path: "/education/tutorials" }
  ],
  "Yapay Zeka": [
    { title: "AI Sanat", path: "/ai-art" },
    { title: "AI Sohbet", path: "/ai-chat" },
    { title: "AI Video", path: "/ai-video" },
    { title: "AI Müzik", path: "/ai-music" },
    { title: "AI Workshop", path: "/ai-workshop" },
    { title: "Görüntü Düzenleme", path: "/ai/image-edit" },
    { title: "Video Düzenleme", path: "/ai/video-edit" },
    { title: "Ses İşleme", path: "/ai/audio" },
    { title: "Senaryo Yazma", path: "/ai/script" },
    { title: "Sanat Üretimi", path: "/ai/generate" }
  ],
  "Kullanıcı": [
    { title: "Giriş", path: "/auth/login" },
    { title: "Kayıt", path: "/auth/register" },
    { title: "Profil", path: "/profile" },
    { title: "Mesajlar", path: "/messages" },
    { title: "Ayarlar", path: "/settings" },
    { title: "Güvenlik Ayarları", path: "/settings/security" },
    { title: "Koleksiyonlarım", path: "/user/collections" },
    { title: "Favorilerim", path: "/user/favorites" },
    { title: "Bildirimler", path: "/notifications" }
  ],
  "İçerik": [
    { title: "Premium", path: "/premium" },
    { title: "Yarışmalar", path: "/competitions" },
    { title: "Etkinlikler", path: "/events" },
    { title: "Eğitim Merkezi", path: "/education" },
    { title: "Video Dersler", path: "/education/videos" },
    { title: "Canlı Atölyeler", path: "/education/workshops" },
    { title: "Hakkımızda", path: "/about" },
    { title: "Gizlilik", path: "/privacy" },
    { title: "Gelişmiş Arama", path: "/search" },
    { title: "API Dokümantasyonu", path: "/docs/api" }
  ]
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHoveringPremium, setIsHoveringPremium] = useState(false);
  const [isHoveringLogin, setIsHoveringLogin] = useState(false);
  const [isHoveringSignup, setIsHoveringSignup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    // Tema tercihini localStorage'dan al
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  // Komik buton animasyonları için rastgele değerler
  const getRandomRotation = () => Math.random() * 10 - 5;
  const getRandomScale = () => 0.95 + Math.random() * 0.1;

  return (
    <header className={`sticky top-0 z-50 w-full toggle-scene ${isScrolled ? 'bg-background/20' : 'bg-transparent'} backdrop-blur-2xl transition-all duration-300`}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <RouterLink to="/" className="flex items-center space-x-2 mr-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 p-2 rounded-lg shadow-lg"
            >
              <Palette className="h-6 w-6 text-white transform transition-transform group-hover:scale-110" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
              whileHover={{ scale: 1.05 }}
            >
              Sanat Galerisi
            </motion.span>
          </RouterLink>

          {/* Site Haritası Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative overflow-hidden group bg-gradient-to-r from-violet-300/10 to-violet-500/10 hover:from-violet-300/20 hover:to-violet-500/20 border border-violet-500/20 text-violet-600 dark:text-violet-300 font-bold"
              >
                <Map className="mr-1 h-4 w-4" />
                <span>Tüm Sayfalar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              {Object.entries(siteMap).map(([category, items]) => (
                <div key={category}>
                  <DropdownMenuLabel className="font-bold text-sm text-violet-600 dark:text-violet-300">
                    {category}
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {items.map((item) => (
                      <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)}>
                        {item.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-4">
          {/* Tema Değiştirme Butonu */}
          <button 
            className={`theme-icon ${isDarkMode ? 'dark' : 'light'}`}
            onClick={toggleTheme}
            aria-label="Tema değiştir"
          >
            <Lightbulb />
          </button>

          {/* Premium Button */}
          <RouterLink to="/premium">
            <motion.div
              className="relative"
              onMouseEnter={() => setIsHoveringPremium(true)}
              onMouseLeave={() => setIsHoveringPremium(false)}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="relative overflow-hidden group bg-gradient-to-r from-amber-300/10 to-amber-500/10 hover:from-amber-300/20 hover:to-amber-500/20 border border-amber-500/20 text-amber-600 dark:text-amber-300 font-bold"
              >
                <motion.div
                  animate={{ 
                    rotate: isHoveringPremium ? [0, getRandomRotation(), -getRandomRotation(), 0] : 0,
                    scale: isHoveringPremium ? [1, getRandomScale(), getRandomScale(), 1] : 1
                  }}
                  transition={{ duration: 0.5, repeat: isHoveringPremium ? Infinity : 0 }}
                  className="absolute inset-0 flex items-center justify-center opacity-20"
                >
                  <Wand2 className="w-20 h-20 text-amber-500" />
                </motion.div>
                <Crown className="mr-1 h-4 w-4" />
                <span>Premium</span>
                <motion.div
                  animate={{ y: isHoveringPremium ? [0, -3, 0, 3, 0] : 0 }}
                  transition={{ duration: 0.5, repeat: isHoveringPremium ? Infinity : 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                </motion.div>
              </Button>
            </motion.div>
          </RouterLink>

          {/* Login Button */}
          <RouterLink to="/auth/login">
            <motion.div
              className="relative"
              onMouseEnter={() => setIsHoveringLogin(true)}
              onMouseLeave={() => setIsHoveringLogin(false)}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="relative overflow-hidden group bg-gradient-to-r from-blue-300/10 to-blue-500/10 hover:from-blue-300/20 hover:to-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-300 font-bold"
              >
                <motion.div
                  animate={{ 
                    rotate: isHoveringLogin ? [0, getRandomRotation(), -getRandomRotation(), 0] : 0,
                    scale: isHoveringLogin ? [1, getRandomScale(), getRandomScale(), 1] : 1
                  }}
                  transition={{ duration: 0.5, repeat: isHoveringLogin ? Infinity : 0 }}
                  className="absolute inset-0 flex items-center justify-center opacity-20"
                >
                  <Brush className="w-20 h-20 text-blue-500" />
                </motion.div>
                <LogIn className="mr-1 h-4 w-4" />
                <span>Giriş Yap</span>
                <motion.div
                  animate={{ rotate: isHoveringLogin ? [0, 360] : 0 }}
                  transition={{ duration: 1, repeat: isHoveringLogin ? Infinity : 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                </motion.div>
              </Button>
            </motion.div>
          </RouterLink>

          {/* Signup Button */}
          <RouterLink to="/auth/register">
            <motion.div
              className="relative"
              onMouseEnter={() => setIsHoveringSignup(true)}
              onMouseLeave={() => setIsHoveringSignup(false)}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="default"
                size="sm"
                className="relative overflow-hidden group bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 border-none font-bold"
              >
                <motion.div
                  animate={{ 
                    rotate: isHoveringSignup ? [0, getRandomRotation(), -getRandomRotation(), 0] : 0,
                    scale: isHoveringSignup ? [1, getRandomScale(), getRandomScale(), 1] : 1
                  }}
                  transition={{ duration: 0.5, repeat: isHoveringSignup ? Infinity : 0 }}
                  className="absolute inset-0 flex items-center justify-center opacity-20"
                >
                  <Paintbrush className="w-20 h-20 text-white" />
                </motion.div>
                <UserPlus className="mr-1 h-4 w-4" />
                <span>Kayıt Oluştur</span>
                <motion.div
                  animate={{ 
                    x: isHoveringSignup ? [0, 3, 0, -3, 0] : 0,
                    y: isHoveringSignup ? [0, -3, 0, 3, 0] : 0
                  }}
                  transition={{ duration: 0.3, repeat: isHoveringSignup ? Infinity : 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </motion.div>
              </Button>
            </motion.div>
          </RouterLink>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative group"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="absolute inset-0 rounded-lg bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 z-50"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 bg-black/30 backdrop-blur-2xl rounded-b-xl shadow-lg">
                <div className="pt-4 space-y-3">
                  <RouterLink to="/premium">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-amber-300/10 to-amber-500/10 hover:from-amber-300/20 hover:to-amber-500/20 border border-amber-500/20 text-amber-600 dark:text-amber-300"
                    >
                      <Crown className="mr-2 h-4 w-4" />
                      <span>Premium</span>
                    </Button>
                  </RouterLink>
                  <RouterLink to="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-blue-300/10 to-blue-500/10 hover:from-blue-300/20 hover:to-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-300"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Giriş Yap</span>
                    </Button>
                  </RouterLink>
                  <RouterLink to="/auth/register">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Kayıt Oluştur</span>
                    </Button>
                  </RouterLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
