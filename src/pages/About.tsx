import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Users, Star, Trophy } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Sanat ve Teknoloji',
    description: 'Modern teknolojiler ve yapay zeka ile sanatın sınırlarını zorluyoruz.'
  },
  {
    icon: Users,
    title: 'Topluluk',
    description: 'Sanatçılar ve sanatseverler için canlı bir topluluk platformu sunuyoruz.'
  },
  {
    icon: Star,
    title: 'Kalite',
    description: 'En yüksek kalitede sanat eserleri ve dijital içerikler üretiyoruz.'
  },
  {
    icon: Trophy,
    title: 'Başarı',
    description: 'Sanatçılarımızın başarılarını destekliyor ve kutluyoruz.'
  }
];

const stats = [
  { number: '10K+', label: 'Sanatçı' },
  { number: '50K+', label: 'Eser' },
  { number: '100K+', label: 'Kullanıcı' },
  { number: '1M+', label: 'Aylık Görüntülenme' }
];

export default function About() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=100&w=3840&h=2160")',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-bold text-white mb-6">
                Sanat Galerisi Hakkında
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Sanat Galerisi, sanat ve teknolojiyi bir araya getirerek yeni nesil bir sanat deneyimi sunuyor. 
                Yapay zeka destekli araçlarımız ve canlı topluluğumuz ile sanatın geleceğini şekillendiriyoruz.
              </p>
              <Button 
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white"
                asChild
              >
                <Link to="/gallery">
                  Galeriyi Keşfet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <feature.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Vizyonumuz</h2>
              <p className="text-xl text-gray-300">
                Sanat Galerisi olarak amacımız, sanatı herkes için erişilebilir kılmak ve 
                yapay zeka teknolojileri ile sanatçıların yaratıcılığını desteklemektir. 
                Geleceğin sanat dünyasını birlikte inşa ediyoruz.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
