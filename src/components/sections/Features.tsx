import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Paintbrush, Palette, BookOpen, Lightbulb, Sparkles, Brush, Camera, PenTool, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Sanat akımlarından ilham alan modüller
const artModules = [
  {
    title: "Empresyonizm Atölyesi",
    description: "Işık ve renk kullanımını keşfedin, anlık izlenimleri tuvale aktarın",
    icon: <Palette className="w-8 h-8 text-[#91C4F2]" />,
    path: "/modules/impressionism",
    color: "from-[#91C4F2] to-[#8CA0D7]",
    size: "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
    artStyle: "empresyonizm",
    bgPattern: "bg-[url('/patterns/impressionism.png')]"
  },
  {
    title: "Kübizm Keşfi",
    description: "Geometrik formlar ve çoklu perspektifler ile nesneleri yeniden yorumlayın",
    icon: <Layers className="w-8 h-8 text-[#D8A7B1]" />,
    path: "/modules/cubism",
    color: "from-[#D8A7B1] to-[#B6666F]",
    size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    artStyle: "kübizm",
    bgPattern: "bg-[url('/patterns/cubism.png')]"
  },
  {
    title: "Sürrealizm Dünyası",
    description: "Bilinçaltı ve rüyalardan ilham alan sıradışı sanat eserleri yaratın",
    icon: <Lightbulb className="w-8 h-8 text-[#F4D35E]" />,
    path: "/modules/surrealism",
    color: "from-[#F4D35E] to-[#EE964B]",
    size: "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
    artStyle: "sürrealizm",
    bgPattern: "bg-[url('/patterns/surrealism.png')]"
  },
  {
    title: "Dijital Sanat Laboratuvarı",
    description: "Modern teknolojiler ile sınırsız sanatsal ifade olanakları",
    icon: <PenTool className="w-8 h-8 text-[#9381FF]" />,
    path: "/modules/digital",
    color: "from-[#9381FF] to-[#B8B8FF]",
    size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    artStyle: "dijital",
    bgPattern: "bg-[url('/patterns/digital.png')]"
  },
  {
    title: "Sanat Tarihi Yolculuğu",
    description: "Mağara resimlerinden modern sanata uzanan bir keşif",
    icon: <BookOpen className="w-8 h-8 text-[#F25F5C]" />,
    path: "/modules/history",
    color: "from-[#F25F5C] to-[#FF8C64]",
    size: "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
    artStyle: "tarih",
    bgPattern: "bg-[url('/patterns/history.png')]"
  },
  {
    title: "Fotoğraf Sanatı",
    description: "Kompozisyon, ışık ve hikaye anlatımı teknikleri",
    icon: <Camera className="w-8 h-8 text-[#70C1B3]" />,
    path: "/modules/photography",
    color: "from-[#70C1B3] to-[#247BA0]",
    size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    artStyle: "fotoğraf",
    bgPattern: "bg-[url('/patterns/photography.png')]"
  },
  {
    title: "Sanatsal Teknikler",
    description: "Yağlı boya, suluboya, akrilik ve daha fazlası",
    icon: <Brush className="w-8 h-8 text-[#FFB997]" />,
    path: "/modules/techniques",
    color: "from-[#FFB997] to-[#F67E7D]",
    size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    artStyle: "teknik",
    bgPattern: "bg-[url('/patterns/techniques.png')]"
  }
];

export default function Features() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeModule, setActiveModule] = useState<number | null>(null);
  
  // Fare pozisyonunu izle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Özel fare imleci - fırça efekti */}
      <div 
        className="hidden md:block fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Paintbrush className="text-white opacity-70" />
      </div>
      
      {/* Deniz-Sahil Arka Planı */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat" 
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop")',
        }}
      />
      
      {/* İçerik */}
      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 tracking-tight">
            Sanat Modülleri
          </h2>
          <p className="text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-light italic">
            Sanatın farklı akımlarını ve tekniklerini keşfedin
          </p>
          
          {/* Fırça darbesi dekoratif element */}
          <div className="relative h-12 mt-6">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "180px" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto"
            ></motion.div>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto mt-2"
            ></motion.div>
          </div>
        </motion.div>

        {/* Asimetrik grid düzeni */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto">
          {artModules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${module.size} group`}
              onMouseEnter={() => setActiveModule(index)}
              onMouseLeave={() => setActiveModule(null)}
            >
              <Link to={module.path} className="block h-full">
                <Card className={`h-full relative overflow-hidden backdrop-blur-sm bg-white/50 border-0 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px] rounded-xl`}>
                  {/* Sanat akımına özgü arka plan deseni */}
                  <div className={`absolute inset-0 opacity-60 ${module.bgPattern} bg-repeat`}></div>
                  
                  {/* Renk gradyanı */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  
                  {/* Çerçeve efekti */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-xl"></div>
                  
                  {/* İçerik */}
                  <div className="p-6 space-y-4 relative z-10 h-full flex flex-col">
                    <motion.div 
                      className="text-white p-3 rounded-full bg-gradient-to-br bg-white/30 backdrop-blur-sm w-fit"
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {module.icon}
                    </motion.div>
                    
                    <div className="space-y-2 flex-grow">
                      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                        {module.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {module.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center text-sm font-medium text-gray-900/90 dark:text-white/90 group-hover:text-gray-900 dark:group-hover:text-white"
                      >
                        <span>Keşfet</span>
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </div>
                    
                    {/* Spot ışığı efekti */}
                    {activeModule === index && (
                      <motion.div 
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ 
                          background: `radial-gradient(circle 100px at ${cursorPosition.x - 200}px ${cursorPosition.y - 200}px, rgba(255,255,255,0.15), transparent)` 
                        }}
                      />
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Alt kısım CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white border-0 rounded-full px-8">
            <Link to="/modules">
              <span className="flex items-center">
                Tüm Modülleri Keşfet
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
