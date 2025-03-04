import { motion } from 'framer-motion';
import { Palette, Brush, Users, Sparkles, Image, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Sanat Keşfi',
    description: 'Binlerce sanat eserini keşfedin ve ilham alın.'
  },
  {
    icon: <Brush className="w-6 h-6" />,
    title: 'Dijital Sanat',
    description: 'AI destekli araçlarla kendi sanat eserlerinizi oluşturun.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Sanat Topluluğu',
    description: 'Sanatçılarla etkileşime geçin ve deneyimlerinizi paylaşın.'
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI Teknolojisi',
    description: 'En son AI teknolojileriyle sanatınızı geliştirin.'
  },
  {
    icon: <Image className="w-6 h-6" />,
    title: 'Koleksiyonlar',
    description: 'Kendi sanat koleksiyonunuzu oluşturun ve yönetin.'
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Eğitimler',
    description: 'Uzman sanatçılardan eğitimler ve ipuçları alın.'
  }
];

const stats = [
  { value: '10K+', label: 'Sanat Eseri' },
  { value: '5K+', label: 'Sanatçı' },
  { value: '100K+', label: 'Topluluk Üyesi' },
  { value: '1M+', label: 'Aylık Görüntülenme' }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Bölümü */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1577083552431-6e5fd75a9260?auto=format&fit=crop&q=80&w=2400&h=1350" 
            alt="Art Gallery Interior" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
              Sanat Dünyasına Hoş Geldiniz
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Sanat Galerisi, sanatın dijital dünyayla buluştuğu yenilikçi bir platformdur. Modern teknolojileri kullanarak, sanatı herkes için erişilebilir kılmayı ve sanat tutkunlarını bir araya getirmeyi amaçlıyoruz.
            </p>
            <p className="text-lg text-gray-400">
              Yapay zeka destekli araçlarımız, zengin sanat koleksiyonumuz ve canlı sanatçı topluluğumuzla, sanatın geleceğini şekillendiriyoruz. Amacımız, hem geleneksel sanatı yaşatmak hem de dijital sanatın sınırlarını zorlamaktır.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Misyon ve Vizyon */}
      <section className="py-20 bg-black/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                Misyonumuz
              </h2>
              <p className="text-gray-300">
                Sanatı demokratikleştirmek ve herkes için erişilebilir kılmak. Yapay zeka teknolojilerini kullanarak, sanatçılara yeni ifade araçları sunmak ve sanat dünyasının dijital dönüşümüne öncülük etmek.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-pink-500">
                Vizyonumuz
              </h2>
              <p className="text-gray-300">
                Dünyanın en büyük dijital sanat platformu olmak. Yapay zeka ve sanatın mükemmel uyumunu yakalayarak, geleceğin sanat anlayışını şekillendirmek ve sanat severlere unutulmaz deneyimler sunmak.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Özellikler Bölümü */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Özelliklerimiz</h2>
            <p className="text-muted-foreground">
              Modern sanat dünyasının ihtiyaçlarına uygun, yenilikçi çözümler sunuyoruz.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 bg-card rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* İstatistikler Bölümü */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
