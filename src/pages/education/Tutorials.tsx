import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Book, Palette, Video, Star, Clock, Users, Trophy } from 'lucide-react';

const TUTORIALS = {
  beginner: [
    {
      title: "Temel Sanat Teknikleri",
      description: "Çizim ve boyama tekniklerinin temelleri",
      duration: "2 saat",
      students: 1240,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2071",
      level: "Başlangıç"
    },
    {
      title: "Dijital Sanatın Temelleri",
      description: "Dijital araçlarla sanat üretmeye giriş",
      duration: "3 saat",
      students: 890,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2071",
      level: "Başlangıç"
    }
  ],
  intermediate: [
    {
      title: "İleri Seviye Portre Çizimi",
      description: "Portre çiziminde profesyonel teknikler",
      duration: "4 saat",
      students: 750,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2071",
      level: "Orta Seviye"
    },
    {
      title: "Dijital İllüstrasyon",
      description: "Profesyonel illüstrasyon teknikleri",
      duration: "5 saat",
      students: 620,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2071",
      level: "Orta Seviye"
    }
  ],
  advanced: [
    {
      title: "AI ile Sanat Üretimi",
      description: "Yapay zeka destekli sanat üretim teknikleri",
      duration: "6 saat",
      students: 480,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2071",
      level: "İleri Seviye"
    },
    {
      title: "3D Sanat ve Modelleme",
      description: "3D modelleme ve render teknikleri",
      duration: "8 saat",
      students: 340,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2071",
      level: "İleri Seviye"
    }
  ]
};

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sanat Eğitimleri
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Başlangıç seviyesinden profesyonelliğe, size uygun eğitim programını seçin
          </p>
        </motion.div>

        <Tabs defaultValue="beginner" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="beginner">Başlangıç</TabsTrigger>
            <TabsTrigger value="intermediate">Orta Seviye</TabsTrigger>
            <TabsTrigger value="advanced">İleri Seviye</TabsTrigger>
          </TabsList>

          {Object.entries(TUTORIALS).map(([level, tutorials]) => (
            <TabsContent key={level} value={level}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tutorials.map((tutorial) => (
                  <motion.div
                    key={tutorial.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
                      <div className="relative h-48">
                        <img
                          src={tutorial.image}
                          alt={tutorial.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Button variant="secondary" size="lg" className="gap-2">
                            <Play className="w-5 h-5" />
                            Şimdi İzle
                          </Button>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{tutorial.level}</Badge>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm">{tutorial.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-white">{tutorial.title}</CardTitle>
                        <CardDescription className="text-white/70">
                          {tutorial.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-white/60">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{tutorial.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{tutorial.students} öğrenci</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Özel Eğitim mi Arıyorsunuz?
          </h2>
          <p className="text-white/80 mb-8">
            Size özel hazırlanmış eğitim programları için bizimle iletişime geçin
          </p>
          <Button variant="secondary" size="lg" className="gap-2">
            <Book className="w-5 h-5" />
            Özel Eğitim Talebi
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
