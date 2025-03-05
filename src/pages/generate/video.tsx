import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Video } from 'lucide-react';

const VIDEO_STYLES = [
  {
    id: 'cinematic',
    name: 'Sinematik',
    description: 'Film kalitesinde profesyonel görünüm',
    bgImage: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japon anime tarzında çizim',
    bgImage: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: '3d-animation',
    name: '3D Animasyon',
    description: 'Üç boyutlu animasyon tarzı',
    bgImage: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'realistic',
    name: 'Gerçekçi',
    description: 'Gerçeğe yakın görünüm',
    bgImage: 'https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'cartoon',
    name: 'Çizgi Film',
    description: 'Klasik çizgi film tarzı',
    bgImage: 'https://images.pexels.com/photos/3045825/pexels-photo-3045825.jpeg',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'pixel-art',
    name: 'Piksel Sanatı',
    description: 'Retro oyun tarzında piksel görünüm',
    bgImage: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
    gradient: 'from-red-500 to-rose-600',
  }
];

export function VideoGeneration() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(VIDEO_STYLES[0].id);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Hata",
        description: "Lütfen bir açıklama girin",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Burada video oluşturma API'si entegre edilecek
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedVideo('example.mp4');
      
      toast({
        title: "Başarılı!",
        description: "Video başarıyla oluşturuldu",
      });
    } catch (error: any) {
      toast({
        title: "Hata!",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-slate-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/video-studio-bg.jpg')"
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-slate-800">
                Video Oluştur
              </h1>
              <p className="text-slate-600">
                Yapay zeka ile yaratıcı videolar oluşturun
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 bg-black/80 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-lg">
                {/* Prompt */}
                <div className="space-y-2">
                  <Label className="text-white">Video Açıklaması</Label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Videoda görmek istediğiniz şeyleri detaylı bir şekilde açıklayın..."
                    className="min-h-[100px] bg-black/50 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                {/* Style Selection */}
                <div className="space-y-2">
                  <Label className="text-white">Video Stili</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {VIDEO_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`relative h-32 rounded-xl text-left transition-all overflow-hidden group ${
                          selectedStyle === style.id
                            ? 'ring-2 ring-offset-2 ring-offset-black ring-white/50 scale-[1.02]'
                            : 'hover:ring-1 hover:ring-white/30 hover:scale-[1.01]'
                        }`}
                      >
                        {/* Style Background Image */}
                        <div className="absolute inset-0">
                          <img
                            src={style.bgImage}
                            alt={style.name}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} ${
                            selectedStyle === style.id
                              ? 'opacity-20'
                              : 'opacity-25 group-hover:opacity-20'
                            } transition-opacity`}
                          />
                        </div>
                        
                        {/* Style Content */}
                        <div className="relative h-full p-4 flex flex-col justify-between">
                          <div className="font-medium text-lg text-white">
                            {style.name}
                          </div>
                          <div className="text-sm text-white/90">
                            {style.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Video Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Video Oluştur
                    </>
                  )}
                </Button>
              </div>

              {/* Preview */}
              <div className="bg-black/80 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Önizleme</h2>
                {generatedVideo ? (
                  <video
                    src={generatedVideo}
                    controls
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="aspect-video rounded-lg bg-black/50 flex items-center justify-center">
                    <p className="text-white/40">Video oluşturulduktan sonra burada görünecek</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
