import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Video, Music, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "AI Resim",
    description: "Yapay zeka ile sanat eserleri oluşturun",
    icon: Wand2,
    color: "bg-purple-100",
    textColor: "text-purple-600",
    path: "/ai/art"
  },
  {
    title: "AI Video",
    description: "Videolarınızı yapay zeka ile dönüştürün",
    icon: Video,
    color: "bg-blue-100",
    textColor: "text-blue-600",
    path: "/ai/video"
  },
  {
    title: "AI Müzik",
    description: "Yapay zeka ile müzik besteleri oluşturun",
    icon: Music,
    color: "bg-green-100",
    textColor: "text-green-600",
    path: "/ai/audio"
  },
  {
    title: "AI Sohbet",
    description: "Sanat asistanı ile sohbet edin",
    icon: MessageSquare,
    color: "bg-orange-100",
    textColor: "text-orange-600",
    path: "/ai/chat"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}`}>
                      <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
