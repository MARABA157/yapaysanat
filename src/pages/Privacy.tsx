import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, Server } from 'lucide-react';

export default function Privacy() {
  const sections = [
    {
      icon: Shield,
      title: "Veri Güvenliği",
      content: "Kullanıcılarımızın verilerini en üst düzey güvenlik protokolleri ile koruyoruz. SSL şifreleme ve güvenli veri depolama yöntemleri kullanıyoruz."
    },
    {
      icon: Lock,
      title: "Kişisel Bilgiler",
      content: "E-posta adresi ve profil bilgileri gibi kişisel verileriniz, yalnızca platformun işleyişi için gerekli olan durumlarda kullanılır ve asla üçüncü taraflarla paylaşılmaz."
    },
    {
      icon: Eye,
      title: "Çerezler ve İzleme",
      content: "Kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz. Bu çerezler, tercihlerinizi hatırlamak ve hizmetlerimizi geliştirmek için kullanılır."
    },
    {
      icon: UserCheck,
      title: "Kullanıcı Hakları",
      content: "Kullanıcılarımız kendi verilerini görüntüleme, düzenleme ve silme hakkına sahiptir. Hesabınızı istediğiniz zaman kapatabilir ve verilerinizin silinmesini talep edebilirsiniz."
    },
    {
      icon: Database,
      title: "Veri Saklama",
      content: "Sanat eserleriniz ve profil bilgileriniz güvenli sunucularda saklanır. Verileriniz, hesabınız aktif olduğu sürece korunur ve talep ettiğinizde tamamen silinir."
    },
    {
      icon: Server,
      title: "Üçüncü Taraf Hizmetler",
      content: "Platformumuzda kullanılan AI servisleri ve ödeme sistemleri gibi üçüncü taraf hizmetler, kendi gizlilik politikalarına tabidir. Bu hizmetlerin kullanımı sırasında ilgili politikalar geçerlidir."
    }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070")',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-[2px] py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Gizlilik Politikası</h1>
              <p className="text-white/90">
                Verilerinizin güvenliği bizim için önemli. İşte size nasıl güvenli bir deneyim sunduğumuz.
              </p>
            </div>

            {/* Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center text-white/60 text-sm mt-12">
              <p>
                Bu gizlilik politikası en son 22 Şubat 2024 tarihinde güncellenmiştir.
                Politikamız hakkında sorularınız için bize ulaşabilirsiniz.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
