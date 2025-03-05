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

const exploreImages = [
  "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
  "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg",
  "https://images.pexels.com/photos/1123972/pexels-photo-1123972.jpeg",
  "https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg",
  "https://images.pexels.com/photos/2887582/pexels-photo-2887582.jpeg",
  "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg",
  "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg"
];

export { function Home() {
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
        <div className="container mx-auto px-8">
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
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Sanatın Eğlenceli Dünyasına
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Hoş Geldiniz! 🎨
              </span>
            </h1>
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
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={module.link}>
                  <Card className="relative h-[280px] overflow-hidden group bg-white/10 backdrop-blur-sm border border-white/30 hover:border-white/50">
                    <img
                      src={module.bgImage}
                      alt={module.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <motion.div 
                        className={`inline-flex p-3 rounded-full bg-gradient-to-br ${module.gradient} shadow-xl mb-4 shadow-white/10`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <module.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors drop-shadow-lg">{module.title}</h3>
                      <p className="text-sm text-white group-hover:text-white transition-colors line-clamp-2 drop-shadow-lg">{module.description}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-10 relative w-screen overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex gap-4 overflow-x-hidden">
            {exploreImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 10
                }}
                className="relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Explore ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
} }