import { motion } from 'framer-motion';
import { Timer, Mail, MapPin, Phone } from 'lucide-react';

function Contact() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Üst Başlık Animasyonu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">İletişim</h1>
          <p className="text-gray-400">Yakında sizinle burada buluşacağız!</p>
        </motion.div>

        {/* Yakında Geliyoruz Kartı */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-2xl mb-12 backdrop-blur-sm border border-white/10"
        >
          <Timer className="w-16 h-16 mx-auto mb-6 text-purple-400" />
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Çok Yakında Buradayız!
          </h2>
          <p className="text-gray-300 mb-6">
            İletişim sayfamız şu anda güncelleniyor. Çok yakında size daha iyi hizmet verebilmek için burada olacağız.
          </p>
        </motion.div>

        {/* İletişim Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10"
          >
            <Mail className="w-8 h-8 mx-auto mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">E-posta</h3>
            <p className="text-gray-400">Yakında</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10"
          >
            <MapPin className="w-8 h-8 mx-auto mb-4 text-green-400" />
            <h3 className="text-xl font-semibold mb-2">Adres</h3>
            <p className="text-gray-400">Yakında</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10"
          >
            <Phone className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-xl font-semibold mb-2">Telefon</h3>
            <p className="text-gray-400">Yakında</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
