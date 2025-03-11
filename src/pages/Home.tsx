import { useCallback, useMemo, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { artModules } from "@/data/artModules";
import { artStyles } from "@/data/artStyles";
import LazyImage from "@/components/ui/lazy-image";

// Resimleri önceden yüklemek için yardımcı fonksiyon
const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

// Optimize edilmiş animasyon konfigürasyonları
const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const titleAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }
};

// Optimize edilmiş bileşenler
const ArtModuleCard = memo(({ module, index }: { module: any, index: number }) => {
  // Modül arka plan resmini önceden yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = module.bgImage;
    }
  }, [module.bgImage]);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0.6, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.03, 0.15) // Daha kısa gecikme
      }}
      className="relative group"
    >
      <Link to={module.link}>
        <Card className="relative overflow-hidden h-full bg-black">
          <div className="absolute inset-0 w-full h-full">
            <LazyImage
              src={module.bgImage}
              alt={module.title}
              role="gallery"
              priority={index < 4} // İlk 4 modül için öncelikli yükleme
              className="w-full h-full opacity-60 group-hover:opacity-40 transition-opacity duration-300"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="relative h-full p-3 sm:p-4 md:p-6 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <module.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r ${module.gradient} opacity-75`} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{module.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">{module.description}</p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
});

const ArtStyleItem = memo(({ style, index, priority = false }: { style: any, index: number, priority?: boolean }) => (
  <motion.div
    key={index}
    whileHover={{ scale: 1.05 }}
    className="relative w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 flex-shrink-0 overflow-hidden my-auto rounded-lg shadow-lg"
  >
    <LazyImage
      src={style.image}
      alt={style.name}
      role="gallery"
      priority={priority}
      className="w-full h-full"
      objectFit="cover"
    />
    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
  </motion.div>
));

const HeroSection = memo(() => (
  <section className="relative py-10 md:py-20 flex items-center justify-center overflow-hidden w-screen" style={{ height: '100vh' }}>
    <div className="absolute inset-0">
      <LazyImage 
        src="/images/backgrounds/hero-bg.jpg" 
        alt="Art Gallery" 
        role="background"
        priority={true}
        className="w-full h-full"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
    <div className="container mx-auto px-4 z-10 text-center">
      <motion.div
        {...fadeInAnimation}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
            animate={{
              y: [-5, 0, -3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Sanat
          </motion.span>{" "}
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{
              y: [0, -5, 0, -3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            Galerisi
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            animate={{
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            🎨
          </motion.span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 px-4 md:px-0">
          Yapay zeka ile sanatın sınırlarını keşfedin ve kendi benzersiz eserlerinizi yaratın.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              document.getElementById('art-modules')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-black text-white font-medium border border-white/20 hover:bg-black/80 hover:border-white/30 transform hover:scale-105 transition-all duration-300"
          >
            Yapay Zekaları Keşfet 🤖
          </button>
          <Link 
            to="/chat"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
          >
            Hemen Başla! 🎯
          </Link>
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 6, // 3'ten 6'ya çıkardım
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl"
          >
            👋
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
));

// Art Modules Grid bileşeni
const ArtModulesGrid = memo(() => {
  // useMemo ile modülleri memoize et
  const memoizedArtModules = useMemo(() => artModules, []);
  
  // Modül resimlerini önceden yükle
  useEffect(() => {
    // Sadece görünür alandaki modüllerin resimlerini önceden yükle
    const preloadVisibleModuleImages = async () => {
      // İlk 8 modülün resimlerini önceden yükle (tipik olarak görünür alandaki modüller)
      const visibleModules = memoizedArtModules.slice(0, 8);
      await Promise.all(
        visibleModules.map(module => preloadImage(module.bgImage))
      );
    };
    
    preloadVisibleModuleImages();
  }, [memoizedArtModules]);
  
  return (
    <section id="art-modules" className="py-12 md:py-20 relative w-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/70">
        <LazyImage 
          src="/images/art-background.jpg" 
          alt="Art Background" 
          role="gallery"
          priority={true}
          className="w-full h-full"
          objectFit="cover"
        />
      </div>
      <div className="h-full relative">
        <motion.div
          initial={{ opacity: 0.8 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="container mx-auto px-4 py-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white">
            <motion.span
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true, amount: 0.8 }}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            >
              Yapay Zeka Araçları
            </motion.span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 h-full">
            {memoizedArtModules.map((module, index) => (
              <ArtModuleCard key={module.title} module={module} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

// Keşfet bölümü bileşeni
const ArtStylesCarousel = memo(() => {
  // useMemo ile stilleri memoize et
  const memoizedArtStyles = useMemo(() => {
    // Artık sadece 4 stil var, tekrar etmek için 3 kez göster
    return [...artStyles, ...artStyles, ...artStyles];
  }, []);
  
  // Resimleri önceden yükle
  useEffect(() => {
    // İlk 4 resmi önceden yükle
    const preloadImages = async () => {
      await Promise.all(
        artStyles.map(style => preloadImage(style.image))
      );
    };
    
    preloadImages();
  }, []);
  
  return (
    <section className="h-[250px] sm:h-[280px] bg-black relative w-screen overflow-hidden py-4">
      <div className="h-full relative">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 120, // Daha hızlı animasyon
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-5 absolute h-full items-center"
          style={{ width: "fit-content" }}
        >
          {memoizedArtStyles.map((style, index) => (
            <ArtStyleItem 
              key={`${style.name}-${index}`} 
              style={style} 
              index={index} 
              priority={index < 4} // İlk 4 resim için öncelikli yükleme
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default function Home() {
  useEffect(() => {
    // Arka plan resimlerini önceden yükleyin
    const preloadBackgroundImages = async () => {
      await Promise.all([
        preloadImage("/images/backgrounds/hero-bg.jpg"),
        preloadImage("/images/art-background.jpg"),
      ]);
    };
    preloadBackgroundImages();
  }, []);

  return (
    <div className="flex-1 w-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Art Modules Grid */}
      <ArtModulesGrid />

      {/* Keşfet Section */}
      <ArtStylesCarousel />
    </div>
  );
}