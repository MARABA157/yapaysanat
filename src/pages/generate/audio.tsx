import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Mic, Play, Download, Share2, Wand2, Volume2, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function AudioGeneration() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedAudio('/audio/sample-generated.mp3');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900 p-4">
      {/* Eğlenceli Arka Plan Animasyonları */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/music-notes.png')",
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Başlık Animasyonu */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300 flex items-center justify-center gap-3">
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎵
          </motion.span>
          Ses Oluşturucu
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎧
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 dark:text-gray-300 mt-2"
        >
          Hayalindeki sesleri gerçeğe dönüştür! 🎶
        </motion.p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ses Oluşturma Kartı */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-blue-600 dark:text-blue-300">
                <Mic className="h-6 w-6" />
                <span>Nasıl Bir Ses Olsun?</span>
              </div>
              <Input
                placeholder="Örnek: Yağmur sesi eşliğinde neşeli bir melodi 🌧️"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-white/50 dark:bg-gray-700/50"
              />
              <Button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Radio className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Sesi Oluştur!
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Ses Önizleme Kartı */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-blue-600 dark:text-blue-300">
                <Volume2 className="h-6 w-6" />
                <span>Sesin Burada Çalacak!</span>
              </div>
              <div className="aspect-[2/1] rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-600 flex items-center justify-center bg-white/50 dark:bg-gray-700/50">
                {generatedAudio ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full p-4"
                  >
                    <audio controls className="w-full">
                      <source src={generatedAudio} type="audio/mp3" />
                    </audio>
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center text-gray-500 dark:text-gray-400"
                  >
                    <Music className="h-16 w-16 mx-auto mb-2" />
                    <p>Müziğin ritmine kulak ver! 🎵</p>
                  </motion.div>
                )}
              </div>
              {generatedAudio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-center"
                >
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    İndir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Paylaş
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Eğlenceli İpuçları */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 text-center"
        >
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-4">
            🎯 Eğlenceli Ses Fikirleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Kahkaha atan kediler korosu" 😺🎵
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Uzay gemisi ve delfin sesleri" 🚀🐬
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Neşeli bir orman konseri" 🌳🎺
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
