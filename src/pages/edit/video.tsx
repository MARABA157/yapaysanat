import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Upload, Scissors, Wand2, Download, Share2, Play, Pause, Film, Clapperboard, FastForward, Rewind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function VideoEditor() {
  const [selectedVideo, setSelectedVideo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const videoEffects = [
    { id: 'blur', label: 'Bulanıklaştır', icon: '🌫️' },
    { id: 'bright', label: 'Parlaklık', icon: '✨' },
    { id: 'contrast', label: 'Kontrast', icon: '🎨' },
    { id: 'saturation', label: 'Doygunluk', icon: '🌈' },
    { id: 'speed', label: 'Hız', icon: '⚡' },
    { id: 'reverse', label: 'Ters Oynat', icon: '↩️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900 dark:to-purple-900 p-4">
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
            backgroundImage: "url('/images/video-pattern.png')",
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
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-300 flex items-center justify-center gap-3">
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎬
          </motion.span>
          Video Düzenleme Stüdyosu
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎥
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 dark:text-gray-300 mt-2"
        >
          Videolarını profesyonel bir şekilde düzenle! 🎨
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Önizleme */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                <Film className="h-6 w-6" />
                <span>Video Önizleme</span>
              </div>

              <div className="aspect-video rounded-lg border-2 border-dashed border-indigo-300 dark:border-indigo-600 bg-white/50 dark:bg-gray-700/50">
                {selectedVideo ? (
                  <video
                    src={selectedVideo}
                    className="w-full h-full rounded-lg"
                    controls
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <label className="cursor-pointer text-center">
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                      <Clapperboard className="h-16 w-16 mx-auto mb-2 text-indigo-500" />
                      <p className="text-gray-500">Video yüklemek için tıkla 📽️</p>
                    </label>
                  </div>
                )}
              </div>

              {selectedVideo && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="icon">
                      <Rewind className="h-4 w-4" />
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
                      <FastForward className="h-4 w-4" />
                    </Button>
                  </div>
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Düzenleme Araçları */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                <Scissors className="h-6 w-6" />
                <span>Düzenleme Araçları</span>
              </div>

              <Tabs defaultValue="effects" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="effects" className="flex-1">Efektler</TabsTrigger>
                  <TabsTrigger value="trim" className="flex-1">Kırpma</TabsTrigger>
                  <TabsTrigger value="text" className="flex-1">Yazı</TabsTrigger>
                </TabsList>
                <TabsContent value="effects" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {videoEffects.map((effect) => (
                      <motion.button
                        key={effect.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-xl bg-white/50 hover:bg-indigo-100 dark:bg-gray-700/50 dark:hover:bg-indigo-900/50 flex flex-col items-center gap-2"
                      >
                        <span className="text-2xl">{effect.icon}</span>
                        <span>{effect.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="trim" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Başlangıç Noktası</label>
                      <Slider defaultValue={[0]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bitiş Noktası</label>
                      <Slider defaultValue={[100]} max={100} step={1} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="text" className="space-y-4">
                  <Input
                    placeholder="Metni girin..."
                    className="bg-white/50 dark:bg-gray-700/50"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      Yazı Ekle
                    </Button>
                    <Button variant="outline">
                      Altyazı Ekle
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <Button
                  onClick={handleProcess}
                  disabled={!selectedVideo || isProcessing}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Video className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Videoyu İşle
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
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
            🎯 Video Düzenleme İpuçları
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
              "Geçişleri yumuşak yap!" 🌊
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg"
            >
              "Müzik ve ses efektleri ekle!" 🎵
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
