import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Piano, Guitar, Drum, Download, Share2, Play, Pause, SkipBack, SkipForward, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export default function AIMusicGeneration() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState('piano');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedMusic('/music/sample-generated.mp3');
      setIsGenerating(false);
    }, 2000);
  };

  const instruments = [
    { id: 'piano', icon: Piano, label: 'Piyano' },
    { id: 'guitar', icon: Guitar, label: 'Gitar' },
    { id: 'drums', icon: Drum, label: 'Davul' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900 dark:to-purple-900 p-4">
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
            backgroundImage: "url('/images/music-pattern.png')",
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
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-300 flex items-center justify-center gap-3">
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎹
          </motion.span>
          AI Müzik Stüdyosu
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎸
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 dark:text-gray-300 mt-2"
        >
          Hayal et, AI bestelesin! 🎼
        </motion.p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Müzik Oluşturma Kartı */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-pink-600 dark:text-pink-300">
                <Wand2 className="h-6 w-6" />
                <span>Müziğini Tasarla</span>
              </div>

              {/* Enstrüman Seçimi */}
              <div className="grid grid-cols-3 gap-4">
                {instruments.map((instrument) => (
                  <motion.button
                    key={instrument.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedInstrument(instrument.id)}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                      selectedInstrument === instrument.id
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/50 hover:bg-pink-100 dark:bg-gray-700/50 dark:hover:bg-pink-900/50'
                    }`}
                  >
                    <instrument.icon className="h-8 w-8" />
                    <span>{instrument.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Müzik Detayları */}
              <div className="space-y-4">
                <Input
                  placeholder="Örnek: Neşeli bir pop şarkısı, 120 BPM, majör tonalite 🎵"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-white/50 dark:bg-gray-700/50"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tempo (BPM)</label>
                  <Slider
                    defaultValue={[120]}
                    max={200}
                    min={60}
                    step={1}
                    className="py-4"
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Music className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Müzik Oluştur!
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Müzik Çalar Kartı */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-pink-600 dark:text-pink-300">
                <Music className="h-6 w-6" />
                <span>Müzik Çalar</span>
              </div>

              <div className="aspect-square rounded-lg border-2 border-dashed border-pink-300 dark:border-pink-600 flex items-center justify-center bg-white/50 dark:bg-gray-700/50">
                {generatedMusic ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full p-4 space-y-4"
                  >
                    <div className="w-full h-48 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: isPlaying ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                      >
                        <Music className="h-16 w-16 text-pink-500" />
                      </motion.div>
                    </div>
                    <audio
                      src={generatedMusic}
                      controls
                      className="w-full hidden"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" size="icon">
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="icon">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <p>Müziğin burada çalacak! 🎵</p>
                  </motion.div>
                )}
              </div>

              {generatedMusic && (
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
          <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-300 mb-4">
            🎯 Müzik Fikirleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Yaz akşamı plaj partisi müziği" 🏖️
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Retro video oyunu müziği" 🎮
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Uzay temalı ambient müzik" 🚀
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
