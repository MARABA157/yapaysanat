import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDropzone } from 'react-dropzone';
import {
  Video,
  Music,
  Download,
  Share2,
  Save,
  Loader2,
  Upload,
  RefreshCcw,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { OpenSourceAI } from '@/services/ai/OpenSourceAI';

const VIDEO_STYLES = [
  { id: 'cinematic', name: 'Sinematik' },
  { id: 'anime', name: 'Anime' },
  { id: '3d', name: '3D Animasyon' },
  { id: 'realistic', name: 'Gerçekçi' },
  { id: 'cartoon', name: 'Çizgi Film' }
];

export default function AiVideo() {
  const [prompt, setPrompt] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState(VIDEO_STYLES[0].id);

  const [settings, setSettings] = useState({
    duration: 10, // saniye
    fps: 24,
    quality: 0.8
  });

  // Ses dosyası yükleme için dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav']
    },
    maxFiles: 1
  });

  const handleGenerate = async () => {
    if (!prompt) return;

    setGenerating(true);
    try {
      const ai = OpenSourceAI.getInstance();
      const result = await ai.generateVideo(prompt, {
        style: selectedStyle,
        duration: settings.duration,
        fps: settings.fps,
        quality: settings.quality,
        audio_file: audioFile
      });

      setResult(result.url);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const toggleAudio = () => {
    const audio = document.getElementById('audio-preview') as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-black/95 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 mb-4">
              AI ile Video Üret
            </h1>
            <p className="text-white/60">
              Hayalinizdeki videoyu yapay zeka ile oluşturun. Müzik ekleyin, stil seçin ve AI'nin sizin için harika bir video oluşturmasını izleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80">
                  Videonuzu tanımlayın
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Örnek: Gün batımında sahilde yürüyen bir çift, romantik ve sinematik"
                  className="h-32 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80">
                  Video Stili
                </label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VIDEO_STYLES.map(style => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/80">
                    Video Uzunluğu: {settings.duration} saniye
                  </label>
                  <Slider
                    value={[settings.duration]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, duration: value }))}
                    min={5}
                    max={30}
                    step={1}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/80">
                    FPS: {settings.fps}
                  </label>
                  <Slider
                    value={[settings.fps]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, fps: value }))}
                    min={15}
                    max={60}
                    step={1}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/80">
                    Kalite: {Math.round(settings.quality * 100)}%
                  </label>
                  <Slider
                    value={[settings.quality]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, quality: value }))}
                    min={0.5}
                    max={1}
                    step={0.1}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80">
                  Müzik (Opsiyonel)
                </label>
                <div
                  {...getRootProps()}
                  className="rounded-xl border-2 border-dashed p-8 flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:border-primary/80 bg-white/5 border-white/20"
                >
                  <input {...getInputProps()} />
                  <div className="text-center">
                    <Music className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Müzik dosyası sürükle veya seç</p>
                    <p className="text-white/40 text-sm mt-2">MP3 veya WAV</p>
                  </div>
                </div>
                {audioUrl && (
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleAudio}
                      className="h-8 w-8"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <span className="text-white/60 text-sm truncate">
                      {audioFile?.name}
                    </span>
                    <audio
                      id="audio-preview"
                      src={audioUrl}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || !prompt}
                className="w-full h-12"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Video Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5 mr-2" />
                    Video Oluştur
                  </>
                )}
              </Button>
            </div>

            {/* Result Section */}
            <div className="space-y-6">
              <div
                className={`
                  aspect-video rounded-xl border-2 border-dashed
                  ${result ? 'p-0' : 'p-8'}
                  flex items-center justify-center relative overflow-hidden
                  ${generating ? 'animate-pulse' : ''}
                  bg-white/5 border-white/20
                `}
              >
                {result ? (
                  <video
                    src={result}
                    controls
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : generating ? (
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">AI videonuzu oluşturuyor...</p>
                    <p className="text-white/40 text-sm mt-2">Bu işlem birkaç dakika sürebilir</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Video className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">
                      Oluşturulan video burada görünecek
                    </p>
                  </div>
                )}
              </div>

              {result && (
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Download className="w-5 h-5 mr-2" />
                    İndir
                  </Button>
                  <Button className="flex-1">
                    <Save className="w-5 h-5 mr-2" />
                    Galeriye Kaydet
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-5 h-5 mr-2" />
                    Paylaş
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
