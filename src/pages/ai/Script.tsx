import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scroll, RefreshCw, Download } from "lucide-react";

const SCRIPT_TYPES = [
  { id: "story", name: "Hikaye" },
  { id: "poem", name: "Şiir" },
  { id: "dialogue", name: "Diyalog" },
  { id: "description", name: "Betimleme" },
  { id: "creative", name: "Yaratıcı Yazı" }
];

export default function Script() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState(SCRIPT_TYPES[0].id);
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Hata",
        description: "Lütfen bir açıklama girin",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // API çağrısı simülasyonu
    setTimeout(() => {
      setGeneratedText(
        "Bu bir örnek AI tarafından oluşturulmuş metindir. " +
        "Gerçek API entegrasyonunda bu kısım dinamik olarak güncellenecektir. " +
        "Şu anda sadece demo amaçlı statik bir metin gösterilmektedir."
      );
      setLoading(false);
      toast({
        title: "Başarılı",
        description: "Metin oluşturuldu!"
      });
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=100&w=3840&h=2160")',
      }}
    >
      <div className="min-h-screen bg-black/30 backdrop-blur-[2px] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">AI Senaryo Yazarı</h1>
              <p className="text-white/90">Yapay zeka ile yaratıcı metinler oluşturun</p>
            </div>

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Metin Detayları</CardTitle>
                <CardDescription className="text-white/70">Metin için açıklama ve tür seçin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/90">Metin Açıklaması</label>
                  <Textarea
                    placeholder="Metninizi açıklayın..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/90">Metin Türü</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      {SCRIPT_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPrompt("");
                    setSelectedType(SCRIPT_TYPES[0].id);
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
                  <Scroll className="w-4 h-4 mr-2" />
                  {loading ? "Oluşturuluyor..." : "Metin Oluştur"}
                </Button>
              </CardFooter>
            </Card>

            {generatedText && (
              <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Oluşturulan Metin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{generatedText}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedText);
                      toast({
                        title: "Kopyalandı",
                        description: "Metin panoya kopyalandı"
                      });
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white ml-auto"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Metni Kopyala
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
