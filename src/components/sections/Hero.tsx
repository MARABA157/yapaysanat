import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

const cities = [
  {
    name: "İstanbul",
    description: "Kültürlerin Buluşma Noktası",
    image: "/images/pexels-3551662.jpeg"
  },
  {
    name: "Paris",
    description: "Sanatın Başkenti",
    image: "/images/pexels-2082103.jpeg"
  },
  {
    name: "New York",
    description: "Modern Sanatın Merkezi",
    image: "/images/pexels-2224861.jpeg"
  }
];

export default function Hero() {
  const [currentCityIndex, setCurrentCityIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCityIndex((prev) => (prev + 1) % cities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-background">
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
              target.src = '/images/pexels-pexels-photo.jpg';
            }}
          />
          <div className="absolute bottom-8 right-8 text-white/60 text-lg">
            {city.name} - {city.description}
          </div>
        </motion.div>
      ))}
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sanat ve Yapay Zeka
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Yapay zeka ile sanatın sınırlarını keşfedin. Yeni nesil sanat galerisi deneyimi için hoş geldiniz.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg">
              Keşfetmeye Başla
            </Button>
          </motion.div>
        </div>
      </Container>

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#c7d2fe,transparent)]" />
      </div>
    </section>
  );
}
