import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const artworks = [
  {
    id: 1,
    title: "Yağlı Boya Portre",
    artist: "Ahmet Yılmaz",
    image: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg",
    category: "Portre"
  },
  {
    id: 2,
    title: "Modern Soyut",
    artist: "Zeynep Kaya",
    image: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg",
    category: "Soyut"
  },
  {
    id: 3,
    title: "Şehir Manzarası",
    artist: "Mehmet Demir",
    image: "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg",
    category: "Manzara"
  },
  {
    id: 4,
    title: "Natürmort",
    artist: "Ayşe Can",
    image: "https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg",
    category: "Natürmort"
  },
  {
    id: 5,
    title: "Deniz Manzarası",
    artist: "Can Yıldız",
    image: "https://images.pexels.com/photos/1931379/pexels-photo-1931379.jpeg",
    category: "Manzara"
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Önceden yükle
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % artworks.length;
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    
    [currentIndex, nextIndex, prevIndex].forEach(index => {
      const img = new Image();
      img.src = artworks[index].image;
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(index));
        if (index === currentIndex) setIsLoading(false);
      };
    });
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  }, []);

  const currentArtwork = artworks[currentIndex];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(100,50,255,0.1),transparent_50%)]" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
            Galeri
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sanatçılarımızın en beğenilen eserleri
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-[16/9] relative overflow-hidden rounded-2xl bg-gray-900 border border-violet-500/20">
            {/* Görsel */}
            <motion.img
              key={currentArtwork.id}
              src={currentArtwork.image}
              alt={currentArtwork.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                loadedImages.has(currentIndex) ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Yükleme göstergesi */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Bilgi kartı */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-8"
            >
              <div className="flex flex-col items-center text-white">
                <span className="text-sm text-violet-400 mb-2">{currentArtwork.category}</span>
                <h3 className="text-2xl font-bold mb-2">{currentArtwork.title}</h3>
                <p className="text-gray-300">{currentArtwork.artist}</p>
              </div>
            </motion.div>
          </div>

          {/* Navigasyon butonları */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-colors"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </Button>
          </div>

          {/* Küçük resimler */}
          <div className="flex justify-center gap-2 mt-4">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-violet-500 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
