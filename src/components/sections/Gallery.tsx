import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArtworkCard } from '@/components/gallery/ArtworkCard';
import { type Artwork } from '@/types';

const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Yağlı Boya Portre",
    image_url: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg",
    user_id: "1",
    artist_id: "1",
    artist: {
      id: "1",
      email: "ahmet@example.com",
      username: "Ahmet Yılmaz"
    },
    category: "Portre"
  },
  {
    id: "2",
    title: "Modern Soyut",
    image_url: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg",
    user_id: "2",
    artist_id: "2",
    artist: {
      id: "2",
      email: "zeynep@example.com",
      username: "Zeynep Kaya"
    },
    category: "Soyut"
  },
  {
    id: "3",
    title: "Şehir Manzarası",
    image_url: "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg",
    user_id: "3",
    artist_id: "3",
    artist: {
      id: "3",
      email: "mehmet@example.com",
      username: "Mehmet Demir"
    },
    category: "Manzara"
  },
  {
    id: "4",
    title: "Natürmort",
    image_url: "https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg",
    user_id: "4",
    artist_id: "4",
    artist: {
      id: "4",
      email: "ayse@example.com",
      username: "Ayşe Can"
    },
    category: "Natürmort"
  },
  {
    id: "5",
    title: "Deniz Manzarası",
    image_url: "https://images.pexels.com/photos/1931379/pexels-photo-1931379.jpeg",
    user_id: "5",
    artist_id: "5",
    artist: {
      id: "5",
      email: "can@example.com",
      username: "Can Yıldız"
    },
    category: "Manzara"
  }
];

const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'painting', label: 'Resim' },
  { id: 'digital', label: 'Dijital' },
  { id: 'sculpture', label: 'Heykel' },
  { id: 'photography', label: 'Fotoğraf' },
];

export function Gallery() {
  const [visibleArtworks, setVisibleArtworks] = useState<Artwork[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = mockArtworks.filter(
      artwork => activeFilter === 'all' || artwork.category === activeFilter
    );
    setVisibleArtworks(filtered.slice(0, page * 12));
  }, [activeFilter, page]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ArtworkCard artwork={artwork} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleArtworks.length > 0 && visibleArtworks.length % 12 === 0 && (
          <div className="flex justify-center mt-8">
            <Button onClick={loadMore} variant="outline">
              Daha Fazla Yükle
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
