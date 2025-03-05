import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Image, Download, Share2, Sparkles, Camera, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImage('/images/sample-generated.jpg');
      setIsGenerating(false);
    }, 2000);
  };

  const funnyBackgrounds = [
    "url('/images/funny-bg-1.jpg')",
    "url('/images/funny-bg-2.jpg')",
    "url('/images/funny-bg-3.jpg')",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900 dark:to-purple-900 p-4">
      {/* Eğlenceli Arka Plan Animasyonları */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/doodles.png')",
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
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-300 flex items-center justify-center gap-3">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎨
          </motion.span>
          Resim Oluşturucu
          <motion.span
            animate={{ rotate: [0, -10, 10, 0] }}
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
          Hayal et, biz gerçeğe dönüştürelim! 🌈
        </motion.p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Prompt Giriş Kartı */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-purple-600 dark:text-purple-300">
                <Palette className="h-6 w-6" />
                <span>Ne Çizmemi İstersin?</span>
              </div>
              <Textarea
                placeholder="Örnek: Gökkuşağı renkli bir unicorn, pembe bulutların üzerinde dans ediyor 🦄"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32 bg-white/50 dark:bg-gray-700/50"
              />
              <Button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Resmi Oluştur!
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Resim Önizleme Kartı */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-purple-600 dark:text-purple-300">
                <Camera className="h-6 w-6" />
                <span>Resmin Burada Görünecek!</span>
              </div>
              <div className="aspect-square rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-600 flex items-center justify-center bg-white/50 dark:bg-gray-700/50">
                {generatedImage ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={generatedImage}
                    alt="Generated artwork"
                    className="rounded-lg max-w-full h-auto"
                  />
                ) : (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-center text-gray-500 dark:text-gray-400"
                  >
                    <Image className="h-16 w-16 mx-auto mb-2" />
                    <p>Hayal gücünü konuştur! ✨</p>
                  </motion.div>
                )}
              </div>
              {generatedImage && (
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
          <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-300 mb-4">
            🎯 Komik İpuçları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Uzayda pizza yiyen astronot kedi" 🐱🍕
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Dinozor kostümlü süper kahraman" 🦖🦸‍♂️
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Bale yapan robot" 🤖💃
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ImageGeneration;
