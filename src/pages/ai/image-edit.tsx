import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Upload, Wand2, Download, Share2, Loader2, Image as ImageIcon, Undo, Redo, Crop, Palette, Sliders, RotateCw, Sparkles, Eraser, Layers, Camera } from 'lucide-react';
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
import { Footer } from "@/components/layout/Footer";

const EDIT_STYLES = [
  { id: "enhance", name: "Kaliteyi Artır", icon: <Sparkles className="w-4 h-4" /> },
  { id: "restore", name: "Eski Fotoğraf Onarımı", icon: <Camera className="w-4 h-4" /> },
  { id: "colorize", name: "Renklendirme", icon: <Palette className="w-4 h-4" /> },
  { id: "background", name: "Arka Plan Değiştirme", icon: <Layers className="w-4 h-4" /> },
  { id: "upscale", name: "Boyut Büyütme", icon: <Crop className="w-4 h-4" /> },
  { id: "style", name: "Stil Transferi", icon: <Wand2 className="w-4 h-4" /> },
  { id: "portrait", name: "Portre İyileştirme", icon: <ImageIcon className="w-4 h-4" /> },
  { id: "remove", name: "Nesne Silme", icon: <Eraser className="w-4 h-4" /> },
  { id: "relight", name: "Aydınlatma Düzenleme", icon: <Sliders className="w-4 h-4" /> }
];

const FILTERS = [
  { id: "brightness", name: "Parlaklık", min: -100, max: 100, default: 0 },
  { id: "contrast", name: "Kontrast", min: -100, max: 100, default: 0 },
  { id: "saturation", name: "Doygunluk", min: -100, max: 100, default: 0 },
  { id: "temperature", name: "Renk Sıcaklığı", min: -100, max: 100, default: 0 },
  { id: "blur", name: "Bulanıklık", min: 0, max: 20, default: 0 },
  { id: "sharpen", name: "Keskinlik", min: 0, max: 100, default: 0 },
  { id: "hue", name: "Renk Tonu", min: -180, max: 180, default: 0 },
  { id: "sepia", name: "Sepya", min: 0, max: 100, default: 0 },
  { id: "noise", name: "Gürültü Azaltma", min: 0, max: 100, default: 0 },
  { id: "vignette", name: "Kenar Karartma", min: 0, max: 100, default: 0 }
];

export default function ImageEdit() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [editedImage, setEditedImage] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState(EDIT_STYLES[0].id);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, number>>(
    Object.fromEntries(FILTERS.map(f => [f.id, f.default]))
  );
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        return;
      }

      if (!file.type.startsWith('image/')) {
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setHistory([url]);
      setHistoryIndex(0);
    }
  };

  const handleEdit = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEditedImage(previewUrl);
    } catch (error) {
      console.error('Error editing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterId: string, value: number) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const handleUndo = () => {
    if (canUndo) {
      setHistoryIndex(prev => prev - 1);
      setEditedImage(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      setHistoryIndex(prev => prev + 1);
      setEditedImage(history[historyIndex + 1]);
    }
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
            AI Resim Düzenleyici
          </h1>
          <p className="text-gray-400 text-lg">
            Fotoğraflarınızı yapay zeka ile profesyonel düzeyde düzenleyin ✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <Tabs defaultValue="upload">
                <TabsList className="w-full bg-white/10 border-b border-white/10">
                  <TabsTrigger value="upload" className="flex-1">Yükleme</TabsTrigger>
                  <TabsTrigger value="edit" className="flex-1">Düzenleme</TabsTrigger>
                  <TabsTrigger value="filters" className="flex-1">Filtreler</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload">
                  <CardContent className="space-y-4 pt-6">
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-900/10 transition-all duration-300">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Upload className="w-12 h-12 mb-4 text-white/50" />
                        </motion.div>
                        <p className="text-white/70">Fotoğraf seçmek için tıklayın</p>
                        <p className="text-sm text-white/50 mt-2">
                          PNG, JPG veya WEBP (max. 10MB)
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
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Örnek Görsel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="edit">
                  <CardContent className="space-y-4 pt-6">
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

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        onClick={handleUndo}
                        disabled={!canUndo}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Undo className="w-4 h-4 mr-2" />
                        Geri Al
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleRedo}
                        disabled={!canRedo}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Redo className="w-4 h-4 mr-2" />
                        İleri Al
                      </Button>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="filters">
                  <CardContent className="space-y-6 pt-6">
                    {FILTERS.map((filter) => (
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

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl('');
                    setEditedImage('');
                    setHistory([]);
                    setHistoryIndex(-1);
                    setFilters(Object.fromEntries(FILTERS.map(f => [f.id, f.default])));
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
                <CardTitle className="text-lg">Yapay Zeka Asistanı</CardTitle>
                <CardDescription className="text-white/70">
                  Düzenleme önerileri alın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-white/80">
                    "Fotoğrafımdaki arka planı değiştir" veya "Portre modunda iyileştir" gibi doğal dil komutları kullanarak düzenlemeler yapabilirsiniz.
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

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Önizleme</span>
                  {editedImage && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Undo className="w-4 h-4 mr-1" />
                        Önceki
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Crop className="w-4 h-4 mr-1" />
                        Kırp
                      </Button>
                    </div>
                  )}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {editedImage ? 'Düzenlenmiş fotoğraf' : 'Orijinal fotoğraf'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-lg overflow-hidden bg-white/5 relative group">
                  {(previewUrl || editedImage) ? (
                    <>
                      <img
                        src={editedImage || previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="w-full flex justify-between items-center">
                          <div className="text-xs text-white/80">
                            {selectedFile?.name || "Görsel"}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/20 text-white hover:bg-white/10">
                              <Crop className="w-4 h-4" />
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
                        <ImageIcon className="w-16 h-16 text-white/20" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </CardContent>
              {editedImage && (
                <CardFooter className="flex gap-4">
                  <Button className="flex-1 bg-white/10 hover:bg-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                  <Button className="flex-1 bg-white/10 hover:bg-white/20">
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
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
