import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Palette, Search, User, Sparkles, Crown, GraduationCap, Users, LogIn, UserPlus, Brush, Paintbrush, Pencil, Eraser, Scissors, Wand2, Sun, Moon, Lightbulb, LogOut } from 'lucide-react';
import '@/styles/navigation.css';
import '@/styles/lamp.css';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHoveringPremium, setIsHoveringPremium] = useState(false);
  const [isHoveringLogin, setIsHoveringLogin] = useState(false);
  const [isHoveringSignup, setIsHoveringSignup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    setIsMobileMenuOpen(false);
  };

  // Komik buton animasyonları için rastgele değerler
  const getRandomRotation = () => Math.random() * 10 - 5;
  const getRandomScale = () => 0.95 + Math.random() * 0.1;

  // Navigasyon menüsü öğeleri
  const navItems = [
    { name: 'Ana Sayfa', path: '/', icon: Sparkles },
    { name: 'Galeri', path: '/gallery', icon: Palette },
    { name: 'Arama', path: '/search', icon: Search },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full h-12 md:h-14 toggle-scene ${isScrolled ? 'bg-background/20' : 'bg-transparent'} backdrop-blur-2xl transition-all duration-300`}>
      <div className="container flex h-full max-w-screen-2xl items-center justify-between px-2 sm:px-4">
        <div className="flex items-center">
          <RouterLink to={user ? "/" : "/auth/login"} className="flex items-center space-x-2 mr-4 sm:mr-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 p-1.5 sm:p-2 rounded-lg shadow-lg"
            >
              <Palette className="h-4 w-4 sm:h-6 sm:w-6 text-white transform transition-transform group-hover:scale-110" />
            </motion.div>
            <motion.span 
              className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
              whileHover={{ scale: 1.05 }}
            >
              Sanat Galerisi
            </motion.span>
          </RouterLink>

          {/* Giriş yapmış kullanıcılar için navigasyon menüsü */}
          {user && (
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <RouterLink
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 -z-10"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </RouterLink>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Tema Değiştirme Butonu */}
          <button 
            className={`theme-icon ${isDarkMode ? 'dark' : 'light'} w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center`}
            onClick={toggleTheme}
            aria-label="Tema değiştir"
          >
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Giriş yapmamış kullanıcılar için butonlar */}
          {!user && (
            <>
              {/* Login Button */}
              <RouterLink to="/auth/login" className="hidden sm:block">
                <motion.div
                  className="relative"
                  onMouseEnter={() => setIsHoveringLogin(true)}
                  onMouseLeave={() => setIsHoveringLogin(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative overflow-hidden group bg-gradient-to-r from-violet-300/10 to-pink-500/10 hover:from-violet-300/20 hover:to-pink-500/20 border border-pink-500/20 text-pink-600 dark:text-pink-300 font-bold"
                  >
                    <motion.div
                      animate={{ 
                        rotate: isHoveringLogin ? [0, getRandomRotation(), -getRandomRotation(), 0] : 0,
                        scale: isHoveringLogin ? [1, getRandomScale(), getRandomScale(), 1] : 1
                      }}
                      transition={{ duration: 0.5, repeat: isHoveringLogin ? Infinity : 0 }}
                      className="absolute inset-0 flex items-center justify-center opacity-20"
                    >
                      <Brush className="w-20 h-20 text-pink-500" />
                    </motion.div>
                    <LogIn className="mr-1 h-4 w-4" />
                    <span>Giriş Yap</span>
                    <motion.div
                      animate={{ rotate: isHoveringLogin ? [0, 360] : 0 }}
                      transition={{ duration: 1, repeat: isHoveringLogin ? Infinity : 0 }}
                      className="absolute -top-1 -right-1"
                    >
                      <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
                    </motion.div>
                  </Button>
                </motion.div>
              </RouterLink>

              {/* Signup Button - Mobil için gizli, sadece menüde gösteriliyor */}
              <RouterLink to="/auth/register" className="hidden sm:block">
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
            </>
          )}

          {/* Giriş yapmış kullanıcılar için butonlar */}
          {user && (
            <>
              {/* Premium butonu */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsHoveringPremium(true)}
                onHoverEnd={() => setIsHoveringPremium(false)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center space-x-1 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20 text-amber-500"
                  onClick={() => navigate('/premium')}
                >
                  <Crown className="h-4 w-4" />
                  <span>Premium</span>
                </Button>
              </motion.div>

              {/* Profil butonu */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 hover:from-violet-500/20 hover:to-fuchsia-500/20 text-violet-500"
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Profilim</span>
                </Button>
              </motion.div>

              {/* Çıkış butonu */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline ml-1">Çıkış</span>
                </Button>
              </motion.div>
            </>
          )}

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
                {/* Giriş yapmış kullanıcılar için mobil menü */}
                {user ? (
                  <div className="pt-2 space-y-3">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;
                      return (
                        <RouterLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button
                            variant="ghost"
                            size="lg"
                            className={`w-full justify-start ${
                              isActive
                                ? 'bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80 text-white'
                                : 'bg-gradient-to-r from-violet-300/10 to-fuchsia-500/10 text-gray-300 hover:text-white'
                            }`}
                          >
                            <Icon className="mr-2 h-5 w-5" />
                            <span className="text-base">{item.name}</span>
                          </Button>
                        </RouterLink>
                      );
                    })}
                    <RouterLink to="/premium" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start bg-gradient-to-r from-amber-300/10 to-amber-500/10 hover:from-amber-300/20 hover:to-amber-500/20 border border-amber-500/20 text-amber-600 dark:text-amber-300"
                      >
                        <Crown className="mr-2 h-5 w-5" />
                        <span className="text-base">Premium</span>
                      </Button>
                    </RouterLink>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleLogout}
                      className="w-full justify-start bg-gradient-to-r from-red-300/10 to-red-500/10 hover:from-red-300/20 hover:to-red-500/20 border border-red-500/20 text-red-600 dark:text-red-300"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      <span className="text-base">Çıkış</span>
                    </Button>
                  </div>
                ) : (
                  /* Giriş yapmamış kullanıcılar için mobil menü */
                  <div className="pt-2 space-y-3">
                    <RouterLink to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start bg-gradient-to-r from-violet-300/10 to-pink-500/10 hover:from-violet-300/20 hover:to-pink-500/20 border border-pink-500/20 text-pink-600 dark:text-pink-300"
                      >
                        <LogIn className="mr-2 h-5 w-5" />
                        <span className="text-base">Giriş Yap</span>
                      </Button>
                    </RouterLink>
                    <RouterLink to="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full justify-start bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600"
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        <span className="text-base">Kayıt Oluştur</span>
                      </Button>
                    </RouterLink>
                    <RouterLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start bg-gradient-to-r from-blue-300/10 to-blue-500/10 hover:from-blue-300/20 hover:to-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-300"
                      >
                        <GraduationCap className="mr-2 h-5 w-5" />
                        <span className="text-base">Hakkımızda</span>
                      </Button>
                    </RouterLink>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
