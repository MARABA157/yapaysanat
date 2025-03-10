import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload, Scissors, Wand2, Download, Share2, Palette, Layers, Brush, Eraser, Crop, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ImageState {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  rotate: number;
  flipX: boolean;
  flipY: boolean;
}

export default function ImageEditor() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageState, setImageState] = useState<ImageState>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setSelectedImage(imgUrl);
        
        // Yeni bir Image objesi oluştur
        const img = new Image();
        img.onload = () => {
          imageRef.current = img;
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (ctx) {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
            }
          }
        };
        img.src = imgUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const applyEffects = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Döndürme ve çevirme için canvas'ı ayarla
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((imageState.rotate * Math.PI) / 180);
    ctx.scale(imageState.flipX ? -1 : 1, imageState.flipY ? -1 : 1);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Resmi çiz
    ctx.drawImage(imageRef.current, 0, 0);

    // Efektleri uygula
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Parlaklık
      const brightness = imageState.brightness * 255;
      data[i] = Math.min(255, Math.max(0, data[i] + brightness));     // Kırmızı
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightness)); // Yeşil
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightness)); // Mavi

      // Kontrast
      const contrast = imageState.contrast;
      const factor = (259 * (contrast * 100 + 255)) / (255 * (259 - contrast * 100));
      data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
      data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
      data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
    }

    ctx.putImageData(imageData, 0, 0);
    ctx.restore();
  };

  const handleRotate = (angle: number) => {
    setImageState(prev => ({
      ...prev,
      rotate: (prev.rotate + angle) % 360
    }));
  };

  const handleFlip = (direction: 'horizontal' | 'vertical') => {
    if (direction === 'horizontal') {
      setImageState(prev => ({ ...prev, flipX: !prev.flipX }));
    } else {
      setImageState(prev => ({ ...prev, flipY: !prev.flipY }));
    }
  };

  useEffect(() => {
    if (selectedImage) {
      applyEffects();
    }
  }, [imageState]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    toast.success('Resim başarıyla indirildi!');
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    
    try {
      const blob = await new Promise<Blob>((resolve) => 
        canvasRef.current?.toBlob((blob) => resolve(blob as Blob))
      );
      
      const file = new File([blob], 'edited-image.png', { type: 'image/png' });
      
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: 'Düzenlenmiş Resim',
          text: 'Yapay Sanat ile düzenlenmiş resmim!'
        });
        toast.success('Resim başarıyla paylaşıldı!');
      } else {
        toast.error('Paylaşım özelliği bu cihazda desteklenmiyor.');
      }
    } catch (error) {
      toast.error('Paylaşım sırasında bir hata oluştu.');
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      applyEffects();
      toast.success('Değişiklikler başarıyla uygulandı!');
    } catch (error) {
      toast.error('İşlem sırasında bir hata oluştu.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 dark:from-green-900 dark:to-teal-900 p-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-300">
          Resim Düzenleme Stüdyosu
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Resimlerini profesyonel bir şekilde düzenle!
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resim Önizleme */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-green-600 dark:text-green-300">
                <ImageIcon className="h-6 w-6" />
                <span>Resim Önizleme</span>
              </div>

              <div className="aspect-video rounded-lg border-2 border-dashed border-green-300 dark:border-green-600 bg-white/50 dark:bg-gray-700/50">
                {selectedImage ? (
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <label className="cursor-pointer text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <ImageIcon className="h-16 w-16 mx-auto mb-2 text-green-500" />
                      <p className="text-gray-500">Resim yüklemek için tıkla</p>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Düzenleme Araçları */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-green-600 dark:text-green-300">
                <Brush className="h-6 w-6" />
                <span>Düzenleme Araçları</span>
              </div>

              <Tabs defaultValue="effects" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="effects" className="flex-1">Efektler</TabsTrigger>
                  <TabsTrigger value="adjust" className="flex-1">Ayarlar</TabsTrigger>
                </TabsList>

                <TabsContent value="effects" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Parlaklık</label>
                      <Slider
                        value={[imageState.brightness]}
                        onValueChange={([value]) => setImageState(prev => ({ ...prev, brightness: value }))}
                        min={-1}
                        max={1}
                        step={0.1}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kontrast</label>
                      <Slider
                        value={[imageState.contrast]}
                        onValueChange={([value]) => setImageState(prev => ({ ...prev, contrast: value }))}
                        min={-1}
                        max={1}
                        step={0.1}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="adjust" className="space-y-4">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Döndürme</label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => handleRotate(90)}>
                          <RotateCw className="h-4 w-4 mr-2" />
                          90°
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => handleFlip('horizontal')}>
                          Yatay Çevir
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => handleFlip('vertical')}>
                          Dikey Çevir
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <Button
                  onClick={handleProcess}
                  disabled={!selectedImage || isProcessing}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <ImageIcon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Değişiklikleri Uygula
                    </>
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    İndir
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Paylaş
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
