import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const galleryImages = [
  {
    id: 1,
    url: 'images/gallery-visitor.jpg',
    title: 'Galeri Ziyaretçisi',
    artist: 'Modern Sanat'
  },
  {
    id: 2,
    url: 'images/art-background.jpg',
    title: 'Sanat Arka Planı',
    artist: 'Soyut Sanat'
  },
  {
    id: 3,
    url: 'images/video-bg.jpg',
    title: 'Video Sanatı',
    artist: 'Medya Sanatı'
  }
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Sanat Galerisi</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden bg-gray-900 text-white border-gray-800">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                  <p className="text-gray-400">{image.artist}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
