import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Play,
  Pause,
  Upload,
  Download,
  RotateCw,
  Film,
  Loader2,
  Wand2,
  Sparkles,
  Camera,
  Volume2,
  Scissors,
  Type,
  Palette,
  Sliders
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";

const EDIT_STYLES = [
  { id: "enhance", name: "Kalite İyileştirme", icon: <Sparkles className="w-4 h-4" /> },
  { id: "stabilize", name: "Stabilizasyon", icon: <Camera className="w-4 h-4" /> },
  { id: "slowmotion", name: "Ağır Çekim", icon: <Play className="w-4 h-4" /> },
  { id: "background", name: "Arka Plan Değiştirme", icon: <Film className="w-4 h-4" /> },
  { id: "style", name: "Stil Transferi", icon: <Wand2 className="w-4 h-4" /> },
  { id: "upscale", name: "Çözünürlük Artırma", icon: <Sliders className="w-4 h-4" /> },
  { id: "trim", name: "Video Kırpma", icon: <Scissors className="w-4 h-4" /> },
  { id: "subtitle", name: "Altyazı Oluşturma", icon: <Type className="w-4 h-4" /> },
  { id: "effects", name: "Özel Efektler", icon: <Palette className="w-4 h-4" /> },
  { id: "audio", name: "Ses İyileştirme", icon: <Volume2 className="w-4 h-4" /> }
];

const VIDEO_SETTINGS = [
  { id: "quality", name: "Kalite", options: ["Düşük (480p)", "Orta (720p)", "Yüksek (1080p)", "Ultra (4K)"] },
  { id: "format", name: "Format", options: ["MP4", "MOV", "AVI", "WebM"] },
  { id: "fps", name: "FPS", options: ["24", "30", "60"] },
  { id: "codec", name: "Codec", options: ["H.264", "H.265", "VP9"] }
];

const VIDEO_FILTERS = [
  { id: "brightness", name: "Parlaklık", min: -100, max: 100, default: 0 },
  { id: "contrast", name: "Kontrast", min: -100, max: 100, default: 0 },
  { id: "saturation", name: "Doygunluk", min: -100, max: 100, default: 0 },
  { id: "temperature", name: "Renk Sıcaklığı", min: -100, max: 100, default: 0 },
  { id: "sharpness", name: "Keskinlik", min: 0, max: 100, default: 0 },
  { id: "noise", name: "Gürültü Azaltma", min: 0, max: 100, default: 0 },
  { id: "volume", name: "Ses Seviyesi", min: 0, max: 200, default: 100 },
  { id: "speed", name: "Oynatma Hızı", min: 25, max: 200, default: 100 }
];

export default function VideoEdit() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [editedVideo, setEditedVideo] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState(EDIT_STYLES[0].id);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSettings, setVideoSettings] = useState({
    quality: "Yüksek (1080p)",
    format: "MP4",
    fps: "30",
    codec: "H.264"
  });
  const [filters, setFilters] = useState<Record<string, number>>(
    Object.fromEntries(VIDEO_FILTERS.map(f => [f.id, f.default]))
  );
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        return;
      }

      if (!file.type.startsWith('video/')) {
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleEdit = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setProgress(0);
    
    try {
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setEditedVideo(previewUrl);
    } catch (error) {
      console.error('Error editing video:', error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleFilterChange = (filterId: string, value: number) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const handleSettingChange = (settingId: string, value: string) => {
    setVideoSettings(prev => ({ ...prev, [settingId]: value }));
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-purple-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            AI Video Düzenleyici
          </h1>
          <p className="text-gray-400 text-lg">
            Videolarınızı yapay zeka ile profesyonel düzeyde düzenleyin ✨
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Video Yükle</CardTitle>
                <CardDescription className="text-white/70">
                  Düzenlemek istediğiniz videoyu seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-900/10 transition-all duration-300">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Upload className="w-12 h-12 mb-4 text-white/50" />
                    </motion.div>
                    <p className="text-white/70">Video seçmek için tıklayın</p>
                    <p className="text-sm text-white/50 mt-2">
                      MP4, MOV veya AVI (max. 100MB)
                    </p>
                  </label>
                </div>

                <div className="text-center">
                  <p className="text-sm text-white/50 mt-4">veya</p>
                  <div className="flex gap-2 mt-2 justify-center">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Camera className="w-4 h-4 mr-2" />
                      Kamera
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Film className="w-4 h-4 mr-2" />
                      Örnek Video
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/90">Düzenleme Stili</label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      {EDIT_STYLES.map((style) => (
                        <SelectItem key={style.id} value={style.id} className="flex items-center gap-2">
                          {style.icon}
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/90">Video Ayarları</label>
                  {VIDEO_SETTINGS.map((setting) => (
                    <Select key={setting.id} value={videoSettings[setting.id]} onValueChange={(value) => handleSettingChange(setting.id, value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/20 text-white">
                        {setting.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>

                <Tabs defaultValue="settings">
                  <TabsList className="w-full bg-white/10 border-b border-white/10">
                    <TabsTrigger value="settings" className="flex-1">Video Ayarları</TabsTrigger>
                    <TabsTrigger value="filters" className="flex-1">Filtreler</TabsTrigger>
                  </TabsList>
                  <TabsContent value="settings">
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <label className="text-sm text-white/90">Kalite</label>
                        <Select defaultValue="high">
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/20 text-white">
                            <SelectItem value="low">Düşük</SelectItem>
                            <SelectItem value="medium">Orta</SelectItem>
                            <SelectItem value="high">Yüksek</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-white/90">Format</label>
                        <Select defaultValue="mp4">
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/20 text-white">
                            <SelectItem value="mp4">MP4</SelectItem>
                            <SelectItem value="mov">MOV</SelectItem>
                            <SelectItem value="avi">AVI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </TabsContent>
                  <TabsContent value="filters">
                    <CardContent className="space-y-6 pt-6">
                      {VIDEO_FILTERS.map((filter) => (
                        <div key={filter.id} className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm text-white/90">{filter.name}</label>
                            <span className="text-sm text-white/50">{filters[filter.id]}</span>
                          </div>
                          <Slider
                            min={filter.min}
                            max={filter.max}
                            step={1}
                            value={[filters[filter.id]]}
                            onValueChange={([value]) => handleFilterChange(filter.id, value)}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl('');
                    setEditedVideo('');
                  }}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  Sıfırla
                </Button>
                <Button
                  onClick={handleEdit}
                  disabled={!selectedFile || loading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Düzenle
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Yapay Zeka Video Asistanı</CardTitle>
                <CardDescription className="text-white/70">
                  Düzenleme önerileri alın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-white/80">
                    "Videoyu stabilize et" veya "Arka planı bulanıklaştır" gibi doğal dil komutları kullanarak düzenlemeler yapabilirsiniz.
                  </p>
                  <div className="flex mt-4">
                    <Input 
                      placeholder="Düzenleme isteğinizi yazın..." 
                      className="flex-1 bg-white/10 border-white/20 text-white"
                    />
                    <Button className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500">
                      <Wand2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Önizleme</span>
                  {editedVideo && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Scissors className="w-4 h-4 mr-1" />
                        Kırp
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Volume2 className="w-4 h-4 mr-1" />
                        Ses
                      </Button>
                    </div>
                  )}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {editedVideo ? 'Düzenlenmiş video' : 'Orijinal video'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden bg-white/5 relative group">
                  {(previewUrl || editedVideo) ? (
                    <>
                      <video
                        src={editedVideo || previewUrl}
                        className="w-full h-full object-cover"
                        controls={true}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                      {loading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                            <div className="text-sm">İşleniyor... {progress}%</div>
                            <div className="w-48 h-1 bg-white/20 rounded-full mt-2">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="w-full flex justify-between items-center">
                          <div className="text-xs text-white/80">
                            {selectedFile?.name || "Video"}
                            {duration > 0 && ` • ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/20 text-white hover:bg-white/10">
                              <Scissors className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/20 text-white hover:bg-white/10">
                              <Palette className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <Film className="w-16 h-16 text-white/20" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </CardContent>
              {editedVideo && (
                <CardFooter className="flex gap-4">
                  <Button className="flex-1 bg-white/10 hover:bg-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                  <Button className="flex-1 bg-white/10 hover:bg-white/20">
                    <Type className="w-4 h-4 mr-2" />
                    Altyazı
                  </Button>
                  <Button className="flex-1 bg-white/10 hover:bg-white/20">
                    <Camera className="w-4 h-4 mr-2" />
                    Kaydet
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
