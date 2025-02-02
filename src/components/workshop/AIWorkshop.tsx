import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Paintbrush, Wand2, Share2, Download } from 'lucide-react';

export function AIWorkshop() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = async () => {
    if (!selectedImage || !prompt) return;
    setIsLoading(true);
    
    try {
      // API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simülasyon
      setEnhancedImage(selectedImage); // Geçici olarak aynı resmi kullanıyoruz
    } catch (error) {
      console.error('Geliştirme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!enhancedImage) return;
    // Paylaşım mantığı eklenecek
  };

  const handleDownload = () => {
    if (!enhancedImage) return;
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = 'enhanced-artwork.png';
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Tabs defaultValue="enhance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enhance" className="gap-2">
            <Wand2 className="w-4 h-4" />
            {t('workshop.enhance')}
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-2">
            <Paintbrush className="w-4 h-4" />
            {t('workshop.create')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enhance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orijinal Resim */}
            <div className="space-y-4">
              <div className="text-lg font-medium text-white">
                {t('workshop.original')}
              </div>
              
              <div className="aspect-square relative rounded-lg overflow-hidden bg-black/50 border border-white/10">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Original artwork"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="ghost"
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {t('workshop.upload')}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('workshop.promptPlaceholder')}
                className="w-full"
              />

              <Button
                onClick={handleEnhance}
                className="w-full gap-2"
                disabled={!selectedImage || !prompt || isLoading}
              >
                <Wand2 className="w-4 h-4" />
                {isLoading ? t('common.loading') : t('workshop.enhance')}
              </Button>
            </div>

            {/* Geliştirilmiş Resim */}
            <div className="space-y-4">
              <div className="text-lg font-medium text-white">
                {t('workshop.enhanced')}
              </div>
              
              <div className="aspect-square relative rounded-lg overflow-hidden bg-black/50 border border-white/10">
                {enhancedImage ? (
                  <img
                    src={enhancedImage}
                    alt="Enhanced artwork"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {t('workshop.noEnhancedImage')}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex-1 gap-2"
                  disabled={!enhancedImage}
                >
                  <Share2 className="w-4 h-4" />
                  {t('workshop.share')}
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex-1 gap-2"
                  disabled={!enhancedImage}
                >
                  <Download className="w-4 h-4" />
                  {t('workshop.download')}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          {/* Yeni eser oluşturma özelliği eklenecek */}
          <div className="text-center text-gray-400 py-12">
            {t('workshop.comingSoon')}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
