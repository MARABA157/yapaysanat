import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  Video as VideoIcon,
  Download,
  RefreshCw
} from "lucide-react";
import { videoService } from "@/services/ai";

const VIDEO_STYLES = [
  { id: "cinematic", name: "Sinematik" },
  { id: "anime", name: "Anime" },
  { id: "3d", name: "3D Animasyon" },
  { id: "realistic", name: "Gerçekçi" }
];

export default function AiVideo() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(VIDEO_STYLES[0].id);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    duration: 10, // saniye
    fps: 24,
    quality: 0.8
  });

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Hata",
        description: "Lütfen bir açıklama girin",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const fullPrompt = `${prompt} in ${selectedStyle} style`;
      const result = await videoService.generateVideo(fullPrompt);
      setVideoUrl(result.output);
      toast({
        title: "Başarılı",
        description: "Video oluşturuldu!"
      });
    } catch (error) {
      console.error("Video generation error:", error);
      toast({
        title: "Hata",
        description: "Video oluşturulurken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // handle download logic here
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=100&w=3840&h=2160")',
      }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-[2px] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">AI Video Oluşturucu</h1>
              <p className="text-white/90">Yapay zeka ile etkileyici videolar oluşturun</p>
            </div>

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Video Detayları</CardTitle>
                <CardDescription className="text-white/70">Video için açıklama ve stil seçin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/90">Video Açıklaması</label>
                  <Textarea
                    placeholder="Videonuzu açıklayın..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/90">Video Stili</label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      {VIDEO_STYLES.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/90">Süre (sn)</label>
                    <Input
                      type="number"
                      value={settings.duration}
                      onChange={(e) => setSettings({ ...settings, duration: Number(e.target.value) })}
                      min={5}
                      max={60}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/90">FPS</label>
                    <Input
                      type="number"
                      value={settings.fps}
                      onChange={(e) => setSettings({ ...settings, fps: Number(e.target.value) })}
                      min={24}
                      max={60}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/90">Kalite</label>
                    <Input
                      type="number"
                      value={settings.quality}
                      onChange={(e) => setSettings({ ...settings, quality: Number(e.target.value) })}
                      min={0.1}
                      max={1}
                      step={0.1}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPrompt("");
                    setSelectedStyle(VIDEO_STYLES[0].id);
                    setSettings({ duration: 10, fps: 24, quality: 0.8 });
                  }}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sıfırla
                </Button>
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <VideoIcon className="w-4 h-4 mr-2" />
                  {loading ? "Oluşturuluyor..." : "Video Oluştur"}
                </Button>
              </CardFooter>
            </Card>

            {videoUrl && (
              <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Oluşturulan Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <video
                    src={videoUrl}
                    controls
                    className="w-full rounded-lg"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleDownload}
                    className="bg-white/20 hover:bg-white/30 text-white ml-auto"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
