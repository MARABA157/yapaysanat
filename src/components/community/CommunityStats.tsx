import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Users, Image, Heart, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Stats {
  users: number;
  artworks: number;
  likes: number;
  comments: number;
}

export function CommunityStats() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    artworks: 0,
    likes: 0,
    comments: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: users },
        { count: artworks },
        { count: likes },
        { count: comments }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('artworks').select('*', { count: 'exact' }),
        supabase.from('likes').select('*', { count: 'exact' }),
        supabase.from('comments').select('*', { count: 'exact' })
      ]);

      setStats({
        users: users || 0,
        artworks: artworks || 0,
        likes: likes || 0,
        comments: comments || 0
      });
    }

    void fetchStats();
  }, []);

  const statItems = [
    { icon: Users, label: 'Sanatçı', value: stats.users },
    { icon: Image, label: 'Eser', value: stats.artworks },
    { icon: Heart, label: 'Beğeni', value: stats.likes },
    { icon: MessageCircle, label: 'Yorum', value: stats.comments }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-violet-900/10 to-pink-900/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Büyüyen Sanat Topluluğumuz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Her gün büyüyen topluluğumuzla birlikte sanatı keşfedin ve paylaşın
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl border shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <CountUp
                  end={item.value}
                  duration={2}
                  separator=","
                  className="text-3xl font-bold"
                />
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-xl aspect-[4/3] group"
          >
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000"
              alt="Sanat Eseri 1"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                En Çok Beğenilenler
              </h3>
              <p className="text-white/80">
                Topluluğumuzun en beğenilen eserleri
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden rounded-xl aspect-[4/3] group"
          >
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000"
              alt="Sanat Eseri 2"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Yeni Yetenekler
              </h3>
              <p className="text-white/80">
                Keşfedilmeyi bekleyen genç sanatçılar
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative overflow-hidden rounded-xl aspect-[4/3] group"
          >
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000"
              alt="Sanat Eseri 3"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Trend Konular
              </h3>
              <p className="text-white/80">
                Bu haftanın en popüler sanat trendleri
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
