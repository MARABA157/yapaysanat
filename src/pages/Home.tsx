import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Loader2,
  MessageSquare,
  Music,
  Video,
  Sparkles,
  Palette,
  Brain,
  Wand2,
  ArrowRight,
  Camera,
  Brush,
  Coffee,
  Laugh,
  Heart,
  Star,
  Zap,
  Image,
  Users,
  GraduationCap,
  Mic,
  Film,
  Scroll,
  Clock,
  Play,
  Book,
  Camera as CameraIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommunityStats } from '@/components/community/CommunityStats';
import { Footer } from '@/components/layout/Footer';

// Loading component with skeleton
const SectionLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center bg-black">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
      <p className="text-sm text-gray-400">Yükleniyor...</p>
    </div>
  </div>
);

const featuredArtists = [
  {
    name: "Dijital Sanat",
    image: "https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg",
    specialty: "Dijital Sanat"
  },
  {
    name: "Soyut Sanat",
    image: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg",
    specialty: "Modern Soyut"
  },
  {
    name: "Dijital Fantezi",
    image: "https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg",
    specialty: "Fantastik Sanat"
  },
  {
    name: "Dijital Portre",
    image: "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg",
    specialty: "Portre"
  },
  {
    name: "Renk Patlaması",
    image: "https://images.pexels.com/photos/3699259/pexels-photo-3699259.jpeg",
    specialty: "Renk Kompozisyonu"
  },
  {
    name: "Dijital Portre",
    image: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg",
    specialty: "Portre"
  },
  {
    name: "Fraktal Sanat",
    image: "https://images.pexels.com/photos/5022847/pexels-photo-5022847.jpeg",
    specialty: "Matematiksel Sanat"
  },
  {
    name: "Gelecek Vizyonu",
    image: "https://images.pexels.com/photos/4577122/pexels-photo-4577122.jpeg",
    specialty: "Fütüristik"
  },
  {
    name: "Işık Oyunları",
    image: "https://images.pexels.com/photos/4577179/pexels-photo-4577179.jpeg",
    specialty: "Işık Sanatı"
  },
  {
    name: "Uzay Sanatı",
    image: "https://images.pexels.com/photos/4577547/pexels-photo-4577547.jpeg",
    specialty: "Kozmik Sanat"
  }
];

const artModules = [
  {
    title: "Dijital Sanat",
    description: "Modern dijital sanat teknikleriyle eserler yaratın! 🎨 Hayal gücünüzü özgürce kullanın! 🌈",
    icon: Palette,
    gradient: "from-pink-500 via-purple-400 to-indigo-500",
    bgImage: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg",
    link: "/gallery"
  },
  {
    title: "Resim Galerisi",
    description: "Binlerce sanat eserini keşfedin! 🎨 İlham alın ve kendi tarzınızı oluşturun! 🌈",
    icon: Image,
    gradient: "from-orange-500 via-red-400 to-pink-500",
    bgImage: "https://images.pexels.com/photos/7034639/pexels-photo-7034639.jpeg",
    link: "/gallery"
  },
  {
    title: "Video Sanatı",
    description: "Video sanatının büyülü dünyasına adım atın! 🎬 Hareketli görüntülerle hikayeler anlatın! 🎮",
    icon: Video,
    gradient: "from-blue-500 via-cyan-400 to-teal-500",
    bgImage: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
    link: "/video"
  },
  {
    title: "Sanat Yazıları",
    description: "Sanat dünyasından en güncel yazılar! 📝 Sanat tarihinden modern sanata uzanan bir yolculuk! 🎭",
    icon: Scroll,
    gradient: "from-green-500 via-emerald-400 to-teal-500",
    bgImage: "https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg",
    link: "/blog"
  },
  {
    title: "Müzik ve Sanat",
    description: "Müzik ve görsel sanatın muhteşem uyumu! 🎵 Ses ve görüntünün dansına tanık olun! 🎹",
    icon: Music,
    gradient: "from-yellow-500 via-amber-400 to-orange-500",
    bgImage: "https://images.pexels.com/photos/4498140/pexels-photo-4498140.jpeg",
    link: "/music"
  },
  {
    title: "Ses Sanatı",
    description: "Ses ile sanatın buluşması! 🎤 Deneysel ses çalışmalarını keşfedin! 🎧",
    icon: Mic,
    gradient: "from-cyan-500 via-blue-400 to-indigo-500",
    bgImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2072&auto=format&fit=crop",
    link: "/audio"
  },
  {
    title: "Fotoğraf Sanatı",
    description: "Fotoğrafçılığın büyülü dünyası! 📸 Anı yakalayın, sanata dönüştürün! ✨",
    icon: Image,
    gradient: "from-fuchsia-500 via-purple-400 to-pink-500",
    bgImage: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070&auto=format&fit=crop",
    link: "/photography"
  },
  {
    title: "Video Sanatı",
    description: "Video sanatının sınırlarını zorlayın! 🎬 Deneysel video sanatı projeleri! 🎮✨",
    icon: Film,
    gradient: "from-violet-500 via-purple-400 to-fuchsia-500",
    bgImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2070&auto=format&fit=crop",
    link: "/video-art"
  }
];

export function Home() {
  return (
    <>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ height: 'calc(100vh - 400px)' }}>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=3000&h=1600" 
              alt="Art Gallery" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
                  Sanat Dünyasına
                </span>
                <br />
                Hoş Geldiniz
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Modern teknolojiler ve sanatın sınırlarını zorluyoruz. 
                Geleceğin sanat dünyasını birlikte şekillendirmeye hazır mısınız?
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Link to="/gallery">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CameraIcon className="w-5 h-5 mr-2" />
                    Galeri
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Keşfet
                  </Button>
                </Link>
                <Link to="/community">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Users className="w-5 h-5 mr-2" />
                    Topluluk
                  </Button>
                </Link>
                <Link to="/workshop">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Wand2 className="w-5 h-5 mr-2" />
                    Atölye
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sanat Hizmetleri Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Deniz-Sahil Arka Planı */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat" 
            style={{ 
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop")',
            }}
          />
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artModules.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative h-[320px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="absolute inset-[2px] rounded-[10px] overflow-hidden">
                    <img
                      src={module.bgImage}
                      alt={module.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-purple-500/10 pointer-events-none" />
                  <Link to={module.link} className="block p-4 relative h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${module.gradient} shadow-xl mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight">
                          {module.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="secondary"
                          className="w-full mt-3 bg-white/20 hover:bg-white/30 border-white/40 hover:border-white transition-all duration-300"
                        >
                          <span className="mr-2">Keşfet</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sanat Galerileri Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold mb-4"
              >  
                Sanat Galerilerimizi Keşfedin
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-400"
              >
                En seçkin sanat galerilerimizi gezin ve ilham alın
              </motion.p>
            </div>

            <div className="relative overflow-hidden">
              <motion.div 
                animate={{ 
                  x: [0, -2000],
                  transition: {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  },
                }}
                className="flex gap-8"
              >
                {[...featuredArtists, ...featuredArtists].map((artist, index) => (
                  <motion.div
                    key={index}
                    className="w-[400px] flex-shrink-0"
                  >
                    <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}