import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    title: 'Renkli Soyut',
    artist: 'AI Artist'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
    title: 'Modern Sanat',
    artist: 'AI Creator'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    title: 'Dijital Dünya',
    artist: 'AI Designer'
  }
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sanat Galerisi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                  <p className="text-gray-600">{image.artist}</p>
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
