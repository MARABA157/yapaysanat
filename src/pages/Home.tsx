import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Loader2,
  Music,
  Video,
  Palette,
  Image,
  Mic,
  Film,
  Scroll
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

// Lazy load components
const LazyImage = lazy(() => import('@/components/ui/lazy-image'));

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
    description: "Modern dijital sanat teknikleriyle eserler yaratın! Hayal gücünüzü özgürce kullanın!",
    icon: Palette,
    gradient: "from-pink-500 via-purple-400 to-indigo-500",
    bgImage: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg",
    link: "/gallery"
  },
  {
    title: "Resim Galerisi",
    description: "Binlerce sanat eserini keşfedin! İlham alın ve kendi tarzınızı oluşturun!",
    icon: Image,
    gradient: "from-orange-500 via-red-400 to-pink-500",
    bgImage: "https://images.pexels.com/photos/7034639/pexels-photo-7034639.jpeg",
    link: "/gallery"
  },
  {
    title: "Video Sanatı",
    description: "Video sanatının büyülü dünyasına adım atın! Hareketli görüntülerle hikayeler anlatın!",
    icon: Video,
    gradient: "from-blue-500 via-cyan-400 to-teal-500",
    bgImage: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
    link: "/video"
  },
  {
    title: "Sanat Yazıları",
    description: "Sanat dünyasından en güncel yazılar! Sanat tarihinden modern sanata uzanan bir yolculuk!",
    icon: Scroll,
    gradient: "from-green-500 via-emerald-400 to-teal-500",
    bgImage: "https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg",
    link: "/blog"
  },
  {
    title: "Müzik ve Sanat",
    description: "Müzik ve görsel sanatın muhteşem uyumu! Ses ve görüntünün dansına tanık olun!",
    icon: Music,
    gradient: "from-yellow-500 via-amber-400 to-orange-500",
    bgImage: "https://images.pexels.com/photos/4498140/pexels-photo-4498140.jpeg",
    link: "/music"
  },
  {
    title: "Ses Sanatı",
    description: "Ses ile sanatın buluşması! Deneysel ses çalışmalarını keşfedin!",
    icon: Mic,
    gradient: "from-cyan-500 via-blue-400 to-indigo-500",
    bgImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2072&auto=format&fit=crop",
    link: "/audio"
  },
  {
    title: "Fotoğraf Sanatı",
    description: "Fotoğrafçılığın büyülü dünyası! Anı yakalayın, sanata dönüştürün!",
    icon: Image,
    gradient: "from-fuchsia-500 via-purple-400 to-pink-500",
    bgImage: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070&auto=format&fit=crop",
    link: "/photography"
  },
  {
    title: "Video Sanatı",
    description: "Video sanatının sınırlarını zorlayın! Deneysel video sanatı projeleri!",
    icon: Film,
    gradient: "from-violet-500 via-purple-400 to-fuchsia-500",
    bgImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2070&auto=format&fit=crop",
    link: "/video-art"
  }
];

export function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ height: 'calc(100vh - 400px)' }}>
        <div className="absolute inset-0">
          <Suspense fallback={<SectionLoader />}>
            <LazyImage 
              src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=1500" 
              alt="Art Gallery" 
              className="w-full h-full object-cover"
            />
          </Suspense>
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
                  <Image className="w-5 h-5 mr-2" />
                  Galeri
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Music className="w-5 h-5 mr-2" />
                  Keşfet
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Mic className="w-5 h-5 mr-2" />
                  Topluluk
                </Button>
              </Link>
              <Link to="/workshop">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Mic className="w-5 h-5 mr-2" />
                  Atölye
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <Suspense fallback={<SectionLoader />}>
                  <LazyImage
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{artist.name}</h3>
                  <p className="text-lg text-white/80">{artist.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Modules Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={module.link}>
                  <Card className="relative h-[400px] overflow-hidden group">
                    <Suspense fallback={<SectionLoader />}>
                      <LazyImage
                        src={module.bgImage}
                        alt={module.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Suspense>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${module.gradient} shadow-xl mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                      <p className="text-lg text-white/80">{module.description}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <CommunityStats />
        </div>
      </section>
    </div>
  );
}