import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const artworks = [
  {
    id: 1,
    title: "Yaz Rüyası",
    artist: "Ayşe Yılmaz",
    image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg"
  },
  {
    id: 2,
    title: "Modern Çağ",
    artist: "Mehmet Demir",
    image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg"
  },
  {
    id: 3,
    title: "Sonsuzluk",
    artist: "Zeynep Kaya",
    image: "https://images.pexels.com/photos/1270184/pexels-photo-1270184.jpeg"
  }
];

export default function Gallery() {
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArtworkIndex((prev) => (prev + 1) % artworks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 overflow-hidden bg-black/95">
      <div className="container">
        <div className="text-center space-y-4 mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl -z-10" />
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
            Öne Çıkan Eserler
          </h2>
          <p className="text-lg text-white/80 font-medium tracking-wide">
            Seçkin sanatçıların en beğenilen eserleri
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative">
          <div className="flex gap-6 transition-transform duration-1000 ease-out"
               style={{ transform: `translateX(-${currentArtworkIndex * 100}%)` }}>
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-4"
              >
                <div className="relative group aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/20967/pexels-photo.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-xl mb-2">{artwork.title}</h3>
                      <p className="text-white/90 font-medium">{artwork.artist}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
