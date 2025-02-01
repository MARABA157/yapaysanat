import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe2 } from 'lucide-react';

const cities = [
  {
    name: "İstanbul",
    description: "Kültürlerin Buluşma Noktası",
    image: "https://images.pexels.com/photos/3551662/pexels-photo-3551662.jpeg"
  },
  {
    name: "Paris",
    description: "Sanatın Başkenti",
    image: "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg"
  },
  {
    name: "New York",
    description: "Modern Sanatın Merkezi",
    image: "https://images.pexels.com/photos/2224861/pexels-photo-2224861.jpeg"
  }
];

export default function Hero() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCityIndex((prev) => (prev + 1) % cities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Transition */}
      {cities.map((city, index) => (
        <motion.div
          key={city.name}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentCityIndex ? 1 : 0,
            scale: index === currentCityIndex ? 1.1 : 1
          }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/60" />
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/20967/pexels-photo.jpg';
            }}
          />
          <div className="absolute bottom-8 right-8 text-white/60 text-lg">
            {city.name} - {city.description}
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 text-white text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              SANAT GALERİSİ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500">
                Dijital Geleceği
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-xl mx-auto">
              Yapay zeka destekli platformumuzda global sanat ağına katılın ve 
              sanatın geleceğini keşfedin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" variant="outline" className="gap-2 border-white/20 bg-white/10 hover:bg-white/20 text-white">
                  Keşfet <Globe2 className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-white"
          />
        </motion.div>
      </div>
    </section>
  );
}
