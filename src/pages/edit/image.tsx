import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload, Scissors, Wand2, Download, Share2, Palette, Layers, Brush, Eraser, Crop, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ImageEditor() {
  const [selectedImage, setSelectedImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const imageEffects = [
    { id: 'brightness', label: 'Parlaklık', icon: '✨' },
    { id: 'contrast', label: 'Kontrast', icon: '🎨' },
    { id: 'saturation', label: 'Doygunluk', icon: '🌈' },
    { id: 'blur', label: 'Bulanıklık', icon: '🌫️' },
    { id: 'sharpen', label: 'Keskinlik', icon: '⚡' },
    { id: 'vintage', label: 'Vintage', icon: '📷' },
  ];

  const filters = [
    { id: 'summer', label: 'Yaz', icon: '🌞' },
    { id: 'winter', label: 'Kış', icon: '❄️' },
    { id: 'retro', label: 'Retro', icon: '🎞️' },
    { id: 'noir', label: 'Noir', icon: '🌙' },
    { id: 'vivid', label: 'Canlı', icon: '🎨' },
    { id: 'dreamy', label: 'Rüya', icon: '✨' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 dark:from-green-900 dark:to-teal-900 p-4">
      {/* Eğlenceli Arka Plan Animasyonları */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/art-pattern.png')",
            backgroundSize: '100px',
          }}
        />
      </div>

      {/* Başlık Animasyonu */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-300 flex items-center justify-center gap-3">
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎨
          </motion.span>
          Resim Düzenleme Stüdyosu
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 dark:text-gray-300 mt-2"
        >
          Resimlerini profesyonel bir şekilde düzenle! 🖼️
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resim Önizleme */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-green-600 dark:text-green-300">
                <ImageIcon className="h-6 w-6" />
                <span>Resim Önizleme</span>
              </div>

              <div className="aspect-video rounded-lg border-2 border-dashed border-green-300 dark:border-green-600 bg-white/50 dark:bg-gray-700/50">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <label className="cursor-pointer text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <ImageIcon className="h-16 w-16 mx-auto mb-2 text-green-500" />
                      <p className="text-gray-500">Resim yüklemek için tıkla 🖼️</p>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Düzenleme Araçları */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-green-600 dark:text-green-300">
                <Brush className="h-6 w-6" />
                <span>Düzenleme Araçları</span>
              </div>

              <Tabs defaultValue="effects" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="effects" className="flex-1">Efektler</TabsTrigger>
                  <TabsTrigger value="filters" className="flex-1">Filtreler</TabsTrigger>
                  <TabsTrigger value="adjust" className="flex-1">Ayarlar</TabsTrigger>
                </TabsList>

                <TabsContent value="effects" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {imageEffects.map((effect) => (
                      <motion.button
                        key={effect.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-xl bg-white/50 hover:bg-green-100 dark:bg-gray-700/50 dark:hover:bg-green-900/50 flex flex-col items-center gap-2"
                      >
                        <span className="text-2xl">{effect.icon}</span>
                        <span>{effect.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="filters" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {filters.map((filter) => (
                      <motion.button
                        key={filter.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-xl bg-white/50 hover:bg-green-100 dark:bg-gray-700/50 dark:hover:bg-green-900/50 flex flex-col items-center gap-2"
                      >
                        <span className="text-2xl">{filter.icon}</span>
                        <span>{filter.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="adjust" className="space-y-4">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Döndürme</label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <RotateCw className="h-4 w-4 mr-2" />
                          90°
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Yatay Çevir
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Dikey Çevir
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kırpma</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                          <Crop className="h-4 w-4 mr-2" />
                          Serbest
                        </Button>
                        <Button variant="outline">
                          1:1
                        </Button>
                        <Button variant="outline">
                          4:3
                        </Button>
                        <Button variant="outline">
                          16:9
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <Button
                  onClick={handleProcess}
                  disabled={!selectedImage || isProcessing}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <ImageIcon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Değişiklikleri Uygula
                    </>
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    İndir
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Paylaş
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Eğlenceli İpuçları */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 text-center"
        >
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-4">
            🎯 Resim Düzenleme İpuçları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Efektleri dengeli kullan!" 🎨
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Renk uyumuna dikkat et!" 🌈
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Kompozisyonu dengele!" ⚖️
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
