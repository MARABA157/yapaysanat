import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, ShieldCheck } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/premium"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500/50 via-amber-500/50 to-orange-500/50 p-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-full rounded-lg bg-black/90 p-4 flex flex-col items-center justify-center text-center hover:bg-black/80 transition-colors"
            >
              <Crown className="w-8 h-8 mb-2 text-yellow-400" />
              <h3 className="font-semibold text-white mb-1">Premium</h3>
              <p className="text-sm text-white/60">Premium özelliklere erişin</p>
            </motion.div>
          </Link>

          <Link
            to="/admin"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50 p-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative h-full rounded-lg bg-black/90 p-4 flex flex-col items-center justify-center text-center hover:bg-black/80 transition-colors"
            >
              <ShieldCheck className="w-8 h-8 mb-2 text-indigo-400" />
              <h3 className="font-semibold text-white mb-1">Admin Paneli</h3>
              <p className="text-sm text-white/60">Yönetici kontrol paneli</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
