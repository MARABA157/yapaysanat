import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Wand2, Image as ImageIcon, Download, Share2, Loader2 } from 'lucide-react';

export default function ImageGenerate() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [style, setStyle] = useState('realistic');

  const artStyles = [
    { id: 'realistic', name: 'Gerçekçi', icon: '🎨' },
    { id: 'anime', name: 'Anime', icon: '🌸' },
    { id: 'digital-art', name: 'Dijital Sanat', icon: '💻' },
    { id: 'oil-painting', name: 'Yağlı Boya', icon: '🖼️' },
    { id: 'watercolor', name: 'Suluboya', icon: '🌊' },
    { id: 'sketch', name: 'Karakalem', icon: '✏️' },
    { id: 'pop-art', name: 'Pop Art', icon: '🎪' },
    { id: 'abstract', name: 'Soyut', icon: '🎯' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API entegrasyonu buraya gelecek
    setTimeout(() => {
      setGeneratedImage('https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            AI Resim Oluşturma
          </h1>
          <p className="text-gray-400 text-lg">
            Hayal ettiğiniz her şeyi sanata dönüştürün! ✨
          </p>
        </motion.div>

        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol Taraf - Kontroller */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Resminizi Tanımlayın</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Örnek: Yağmurlu bir günde neon ışıklarıyla aydınlanmış Tokyo sokağı, cyberpunk tarzında..."
                  className="h-32 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Stil Seçimi */}
              <div>
                <label className="block text-white mb-2">Sanat Stili</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {artStyles.map((artStyle) => (
                    <Button
                      key={artStyle.id}
                      type="button"
                      onClick={() => setStyle(artStyle.id)}
                      className={`h-auto py-3 px-4 ${
                        style === artStyle.id
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <span className="text-xl mr-2">{artStyle.icon}</span>
                      <span>{artStyle.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Oluştur Butonu */}
              <Button
                type="submit"
                disabled={loading || !prompt}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Resmi Oluştur
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Sağ Taraf - Önizleme */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/10 border-2 border-white/20">
              {generatedImage ? (
                <>
                  <img
                    src={generatedImage}
                    alt="Generated artwork"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Download className="w-5 h-5 mr-2" />
                        İndir
                      </Button>
                      <Button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Share2 className="w-5 h-5 mr-2" />
                        Paylaş
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Resminiz burada görünecek</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* İpuçları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">✨ İpuçları</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-400">
            <li className="flex items-start space-x-2">
              <span className="text-purple-400">•</span>
              <span>Detaylı açıklamalar daha iyi sonuçlar verir</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400">•</span>
              <span>Sanat stilini belirtmek resmi daha karakteristik yapar</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400">•</span>
              <span>Renk ve kompozisyon tercihlerinizi belirtin</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
