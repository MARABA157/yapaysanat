import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* Arka plan görselleri grid'i */}
      <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 opacity-60">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg transform hover:scale-105 hover:z-10 transition-all duration-500"
          >
            <img
              src={`/images/artwork-${i + 1}.jpg`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter brightness-100 hover:brightness-110 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/90" />
      
      {/* İçerik */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center space-y-8 max-w-4xl px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
              Sanatın Dijital Dünyasına
            </span>
            <br />
            <span className="text-foreground">Hoş Geldiniz</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Binlerce sanat eserini keşfedin, kendi koleksiyonunuzu oluşturun ve sanat topluluğumuzun bir parçası olun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white group"
              onClick={() => navigate('/gallery')}
            >
              Keşfetmeye Başla
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary/20 hover:bg-primary/10 group"
              onClick={() => navigate('/about')}
            >
              Nasıl Çalışır?
              <Info className="w-5 h-5 ml-2 transform group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
