import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Palette, Sparkles, Heart, ArrowRight, Brush, Brain, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  about: [
    { name: 'Hakkımızda', href: '/about' },
    { name: 'Ekibimiz', href: '/team' },
    { name: 'İletişim', href: '/contact' },
    { name: 'SSS', href: '/faq' },
    { name: 'Gizlilik Politikası', href: '/privacy' },
  ],
  ai: [
    { name: 'AI Chat Asistanı', href: '/chat' },
    { name: 'Resim Oluşturma', href: '/generate/image' },
    { name: 'Video Oluşturma', href: '/generate/video' },
    { name: 'Ses Asistanı', href: '/generate/audio' },
    { name: 'Müzik Yapay Zekası', href: '/ai-music' },
    { name: 'Senaryo Asistanı', href: '/generate/script' }
  ],
  explore: [
    { name: 'Sanatçılar', href: '/artists' },
    { name: 'Sergiler', href: '/exhibitions' },
    { name: 'Koleksiyonlar', href: '/collections' },
    { name: 'Etkinlikler', href: '/events' },
    { name: 'Yeni Gelenler', href: '/new-arrivals' },
  ],
  social: [
    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook, color: 'from-blue-600 to-blue-400' },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter, color: 'from-sky-500 to-blue-300' },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram, color: 'from-pink-600 via-purple-500 to-orange-400' },
    { name: 'Youtube', href: 'https://youtube.com', icon: Youtube, color: 'from-red-600 to-red-400' },
  ],
};

const categoryIcons = {
  about: { icon: Brush, color: 'from-pink-500 to-rose-500', label: 'Hakkımızda' },
  ai: { icon: Brain, color: 'from-purple-500 to-indigo-500', label: 'Yapay Zeka' },
  explore: { icon: Compass, color: 'from-cyan-500 to-blue-500', label: 'Keşfet' },
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-12 pb-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Arkaplan Desenleri */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Ana İçerik */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Logo ve Slogan */}
          <div className="md:col-span-3 flex flex-col justify-start">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="sticky top-0"
            >
              <Link to="/" className="flex flex-col gap-3 group">
                <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-2.5 rounded-xl shadow-lg shadow-fuchsia-500/20 w-fit">
                  <Palette className="h-6 w-6 text-white transform group-hover:rotate-180 transition-transform duration-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
                    Sanat Galerisi
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">Sanatın Eğlenceli Dünyası</p>
                </div>
              </Link>
            </motion.div>
            <div className="mt-6 space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                Sanat Galerisi, dijital sanat dünyasında size ilham verici bir deneyim sunmak için burada. Yenilikçi ve modern yaklaşımımızla sanata farklı bir bakış açısı getiriyoruz.
              </p>
              <div className="flex flex-col gap-2">
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { repeat: Infinity, duration: 2 }
                    }}
                  >
                    <Heart className="h-4 w-4 text-pink-500/70" />
                  </motion.div>
                  Bizimle İletişime Geçin
                </Link>
              </div>
            </div>
          </div>

          {/* Ana Kategoriler */}
          {Object.entries(categoryIcons).map(([key, { icon: Icon, color, label }]) => (
            <motion.div
              key={key}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group md:col-span-3"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl -z-10 transform group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4">
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${color} shadow-lg mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{label}</h3>
                <ul className="space-y-2.5">
                  {footerLinks[key].map((link) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      className="group/item"
                    >
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-base"
                      >
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alt Bilgi ve Sosyal Medya */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              {footerLinks.social.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${item.color} p-2.5 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>&copy; {currentYear} Sanat Galerisi</span>
              <span className="text-gray-600">•</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
              >
                <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
              </motion.div>
              <span className="text-gray-600">•</span>
              <motion.div
                animate={{
                  rotate: [0, 360],
                  transition: { repeat: Infinity, duration: 4 }
                }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </footer>
  );
};
