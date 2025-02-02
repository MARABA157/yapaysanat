import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Globe2, Sparkles, Zap } from 'lucide-react';

// Lazy loaded components
const Hero = lazy(() => import('@/components/sections/Hero'));
const Features = lazy(() => import('@/components/sections/Features'));
const Gallery = lazy(() => import('@/components/sections/Gallery'));

// Loading component with skeleton
const SectionLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center bg-black">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
      <p className="text-sm text-gray-400">Yükleniyor...</p>
    </div>
  </div>
);

const cities = [
  {
    name: 'İstanbul',
    image: '/images/cities/istanbul.jpg',
    artworks: [
      {
        title: 'Boğaz Manzarası',
        artist: 'Ahmet Yılmaz',
        image: '/images/artworks/istanbul1.jpg'
      },
      // ... diğer eserler
    ]
  },
  // ... diğer şehirler
];

const features = [
  {
    title: "Global Sanat Ağı",
    description: "Dünyanın dört bir yanından sanatçılar ve eserlerle tanışın.",
    icon: Globe2,
    color: "bg-blue-500/10",
    textColor: "text-blue-500"
  },
  {
    title: "AI Destekli Keşif",
    description: "Yapay zeka ile size özel sanat önerileri ve içgörüler.",
    icon: Sparkles,
    color: "bg-purple-500/10",
    textColor: "text-purple-500"
  },
  {
    title: "Anlık Sanat Analizi",
    description: "Eserlerin hikayesini ve tekniğini yapay zeka ile keşfedin.",
    icon: Zap,
    color: "bg-amber-500/10",
    textColor: "text-amber-500"
  }
];

const artworks = [
  {
    id: 1,
    title: "Yağlı Boya Portre",
    artist: "Ahmet Yılmaz",
    image: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg"
  },
  {
    id: 2,
    title: "Modern Soyut",
    artist: "Zeynep Kaya",
    image: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg"
  },
  {
    id: 3,
    title: "Şehir Manzarası",
    artist: "Mehmet Demir",
    image: "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg"
  },
  {
    id: 4,
    title: "Natürmort",
    artist: "Ayşe Can",
    image: "https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg"
  },
  {
    id: 5,
    title: "Deniz Manzarası",
    artist: "Can Yıldız",
    image: "https://images.pexels.com/photos/1931379/pexels-photo-1931379.jpeg"
  }
];

export default function Home() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);

  useEffect(() => {
    // Şehir geçişleri için interval
    const cityInterval = setInterval(() => {
      setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 5000);

    // Sanat eserleri için interval
    const artworkInterval = setInterval(() => {
      setCurrentArtworkIndex((prevIndex) => (prevIndex + 1) % artworks.length);
    }, 3000);

    return () => {
      clearInterval(cityInterval);
      clearInterval(artworkInterval);
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 bg-black"
    >
      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
    </motion.main>
  );
}
