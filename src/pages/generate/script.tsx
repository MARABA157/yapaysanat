import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Wand2, Download, Share2, Copy, FileText, BookMarked, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ScriptGeneration() {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript('Bir varmış bir yokmuş, uzak bir galakside...');
      setIsGenerating(false);
    }, 2000);
  };

  const genres = [
    { value: 'fantasy', label: 'Fantastik ' },
    { value: 'scifi', label: 'Bilim Kurgu ' },
    { value: 'romance', label: 'Romantik ' },
    { value: 'mystery', label: 'Gizem ' },
    { value: 'adventure', label: 'Macera ' },
    { value: 'horror', label: 'Korku ' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900 dark:to-orange-900 p-4">
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
            backgroundImage: "url('/images/story-pattern.png')",
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
        <h1 className="text-4xl font-bold text-orange-600 dark:text-orange-300 flex items-center justify-center gap-3">
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            
          </motion.span>
          Senaryo Sihirbazı
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 dark:text-gray-300 mt-2"
        >
          Hayal et, hikayeni canlandır! 
        </motion.p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Senaryo Oluşturma Kartı */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-orange-600 dark:text-orange-300">
                <Pencil className="h-6 w-6" />
                <span>Hikayeni Anlat</span>
              </div>

              {/* Tür Seçimi */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Hikaye Türü</label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-700/50">
                    <SelectValue placeholder="Bir tür seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre.value} value={genre.value}>
                        {genre.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Hikaye Detayları */}
              <div className="space-y-4">
                <Input
                  placeholder="Hikayenin başlığı..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-white/50 dark:bg-gray-700/50"
                />
                <Textarea
                  placeholder="Hikayeni kısaca anlat... Örnek: Uzak bir galakside yaşayan genç bir kaşif, gizemli bir harita bulur..."
                  rows={4}
                  className="bg-white/50 dark:bg-gray-700/50 resize-none"
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt || !genre || isGenerating}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <BookOpen className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Hikayeyi Oluştur!
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Senaryo Önizleme Kartı */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-orange-600 dark:text-orange-300">
                <BookMarked className="h-6 w-6" />
                <span>Hikayenin Burada</span>
              </div>

              <div className="min-h-[400px] rounded-lg border-2 border-dashed border-orange-300 dark:border-orange-600 bg-white/50 dark:bg-gray-700/50 p-4">
                {generatedScript ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="prose dark:prose-invert max-w-none">
                      {generatedScript}
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Kopyala
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        İndir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Paylaş
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full flex items-center justify-center text-center text-gray-500 dark:text-gray-400"
                  >
                    <div>
                      <FileText className="h-16 w-16 mx-auto mb-2" />
                      <p>Hikayeni burada göreceksin! </p>
                    </div>
                  </motion.div>
                )}
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
          <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300 mb-4">
            
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Zamanda yolculuk yapan bir kedi" 
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Uzaylılarla arkadaş olan bir robot" 
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Sihirli bir kitapçıdaki maceralar" 
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
