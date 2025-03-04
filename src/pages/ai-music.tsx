import { useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  Play,
  Pause,
  Wand2,
  Download,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const MUSIC_STYLES = [
  "Classical",
  "Jazz",
  "Electronic",
  "Rock",
  "Ambient",
  "Folk"
];

export default function AIMusic() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Hata",
        description: "Lütfen bir açıklama girin",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simüle edilmiş AI müzik üretimi
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedAudio("demo-music.mp3");
      toast({
        title: "Başarılı",
        description: "Müzik oluşturuldu"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Müzik oluşturulurken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=100&w=3840&h=2160")',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-[2px] py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">AI Müzik Stüdyosu</h1>
              <p className="text-white/90">
                Yapay zeka ile kendi müziğinizi oluşturun
              </p>
            </div>

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Müzik Oluştur</CardTitle>
                <CardDescription className="text-white/70">
                  Müziğinizi açıklayın veya bir stil seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Örnek: Yağmurlu bir günde çalan hüzünlü bir piyano melodisi..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                />

                <div className="grid grid-cols-3 gap-2">
                  {MUSIC_STYLES.map((style) => (
                    <Button
                      key={style}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setPrompt(style + " tarzında bir müzik")}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setPrompt("")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Temizle
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Oluştur
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {generatedAudio && (
              <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Oluşturulan Müzik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Durdur
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Oynat
                        </>
                      )}
                    </Button>
                    <Button
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      İndir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
