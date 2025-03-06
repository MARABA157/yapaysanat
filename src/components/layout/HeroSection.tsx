import { motion } from 'framer-motion';
import { Palette, Sparkles, Music, PartyPopper, Brush } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bounceAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-20, 0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut"
    }
  }
};

const rotateAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut"
    }
  }
};

const letterAnimation = {
  initial: { y: 20, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default function HeroSection() {
  const title = "Sanat Galerisi ";
  const subtitle = "Hayal Et, Üret, Paylaş! ";

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/90 to-background/80">
      {/* Arka plan animasyonları */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          >
            {i % 2 === 0 ? (
              <Palette className="w-16 h-16 text-primary/10" />
            ) : (
              <Brush className="w-16 h-16 text-primary/10" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Ana içerik */}
      <div className="relative z-10 text-center space-y-8">
        {/* Dönen logo */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          {...rotateAnimation}
        >
          <Palette className="absolute inset-0 w-full h-full text-primary" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Music className="w-full h-full text-primary/30" />
          </motion.div>
        </motion.div>

        {/* Başlık */}
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterAnimation}
                initial="initial"
                animate="animate"
                className="text-5xl md:text-6xl lg:text-7xl font-bold inline-block"
                style={{
                  color: char === "" ? "inherit" : "transparent",
                  backgroundClip: char === "" ? "inherit" : "text",
                  backgroundImage: char === "" ? "none" : "linear-gradient(to right, #9333ea, #ec4899, #3b82f6)"
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Alt başlık */}
          <motion.p
            className="text-2xl md:text-3xl text-muted-foreground"
            {...floatAnimation}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Aksiyon butonları */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 group"
          >
            <motion.span {...bounceAnimation}>
               Keşfet
            </motion.span>
            <motion.div
              className="ml-2"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror" as const,
              }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group"
          >
            <motion.span {...bounceAnimation}>
               Başla
            </motion.span>
            <motion.div
              className="ml-2"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "mirror" as const,
              }}
            >
              <PartyPopper className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
