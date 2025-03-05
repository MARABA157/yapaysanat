import { motion } from "framer-motion";
import {
  MessageSquare,
  ImagePlus,
  Video,
  Music,
  Headphones,
  BookOpen,
  Edit,
  Film
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";

const artModules = [
  {
    title: "AI Chat Asistanı",
    description: "Yapay zeka destekli sanat asistanınız ile sohbet edin",
    icon: MessageSquare,
    gradient: "from-purple-600 to-blue-600",
    bgImage: "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg",
    link: "/chat"
  },
  {
    title: "Resim Oluşturma",
    description: "Hayal ettiğin resimleri yapay zeka ile yarat! ",
    icon: ImagePlus,
    gradient: "from-pink-500 via-rose-400 to-orange-500",
    bgImage: "https://images.pexels.com/photos/20072/pexels-photo.jpg",
    link: "/generate/image"
  },
  {
    title: "Video Oluşturma",
    description: "Metinden videoya, hayallerini canlandır! ",
    icon: Video,
    gradient: "from-purple-500 via-violet-400 to-indigo-500",
    bgImage: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
    link: "/generate/video"
  },
  {
    title: "Ses Asistanı",
    description: "Yapay zeka ile sesli asistan deneyimi! ",
    icon: Headphones,
    gradient: "from-teal-500 via-emerald-400 to-green-500",
    bgImage: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg",
    link: "/generate/audio"
  },
  {
    title: "Müzik Yapay Zekası",
    description: "Kendi müziğini yapay zeka ile bestele! ",
    icon: Music,
    gradient: "from-red-500 via-orange-400 to-yellow-500",
    bgImage: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg",
    link: "/ai-music"
  },
  {
    title: "Senaryo Asistanı",
    description: "Hikayeler ve senaryolar yapay zeka ile yazılır! ",
    icon: BookOpen,
    gradient: "from-cyan-500 via-blue-400 to-indigo-500",
    bgImage: "https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg",
    link: "/generate/script"
  },
  {
    title: "Resim Düzenleme",
    description: "Fotoğraflarını profesyonelce düzenle! ",
    icon: Edit,
    gradient: "from-fuchsia-500 via-purple-400 to-pink-500",
    bgImage: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg",
    link: "/edit/image"
  },
  {
    title: "Video Düzenleme",
    description: "Videolarını yapay zeka ile düzenle! ",
    icon: Film,
    gradient: "from-violet-500 via-purple-400 to-fuchsia-500",
    bgImage: "https://images.pexels.com/photos/2544554/pexels-photo-2544554.jpeg",
    link: "/edit/video"
  }
];

const artStyles = [
  {
    name: "Japon Sokakları",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
    description: "Gece ışıklarıyla parlayan geleneksel Japon sokakları"
  },
  {
    name: "New York Sokakları",
    image: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg",
    description: "New York'un ikonik caddeleri ve gökdelenleri"
  },
  {
    name: "İstanbul Sokakları",
    image: "https://images.pexels.com/photos/3629813/pexels-photo-3629813.jpeg",
    description: "İstanbul'un tarihi sokaklarından büyüleyici bir manzara"
  },
  {
    name: "Hindistan Sokakları",
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg",
    description: "Hindistan'ın renkli ve canlı sokak yaşamı"
  },
  {
    name: "Venedik Kanalları",
    image: "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg",
    description: "Venedik'in romantik kanalları ve gondolları"
  },
  {
    name: "Amsterdam Kanalları",
    image: "https://images.pexels.com/photos/1796701/pexels-photo-1796701.jpeg",
    description: "Amsterdam'ın pitoresk kanal evleri"
  },
  {
    name: "Santorini Manzarası",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
    description: "Yunanistan'ın beyaz evleri ve mavi kubbeleri"
  },
  {
    name: "Kyoto Bahçeleri",
    image: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg",
    description: "Japon bahçe sanatının en güzel örnekleri"
  },
  {
    name: "Rio Sokakları",
    image: "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg",
    description: "Brezilya'nın renkli ve canlı sokak sanatı"
  },
  {
    name: "Dubai Mimarisi",
    image: "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg",
    description: "Modern mimarinin en etkileyici örnekleri"
  }
];

export function Home() {
  return (
    <div className="flex-1 w-screen">
      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden w-screen" style={{ height: '100vh' }}>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=1500" 
            alt="Art Gallery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="h-full relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.5,
              delay: 0.5,
              ease: "easeOut"
            }}
            className="text-center space-y-6 relative z-10"
          >
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Picasso'nun fırçası kadar yetenekli olmana gerek yok! 
              Yapay zeka ile sen de bir sanat dehası olabilirsin! 🚀
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link 
                to="/chat"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Hemen Başla! 🎯
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('art-modules')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="px-8 py-3 rounded-full bg-black text-white font-medium border border-white/20 hover:bg-black/80 hover:border-white/30 transform hover:scale-105 transition-all duration-300"
              >
                Yapay Zekaları Keşfet 🤖
              </button>
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl"
              >
                👋
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Art Modules Grid */}
      <section id="art-modules" className="py-20 relative w-screen">
        <div 
          className="absolute inset-0 bg-black/60"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="h-full relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
            {artModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, -2, 0],
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className="relative group"
              >
                <Link to={module.link}>
                  <Card className="relative overflow-hidden h-full bg-black">
                    <img 
                      src={module.bgImage} 
                      alt={module.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                    />
                    <div className="relative h-full p-6 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <module.icon className="w-8 h-8 text-white" />
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${module.gradient} opacity-75`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
                        <p className="text-gray-300 text-sm">{module.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Keşfet Section */}
      <section className="h-[300px] bg-black relative w-screen overflow-hidden">
        <div className="h-full relative">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-4 absolute h-full"
            style={{ width: "fit-content" }}
          >
            {[...artStyles, ...artStyles].map((style, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative w-72 h-72 flex-shrink-0 overflow-hidden my-auto rounded-lg"
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}