import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

// Örnek veri - Gerçek uygulamada API'den gelecek
const stats = [
  {
    title: "Aylık Gelir",
    value: "₺12,450",
    change: "+12%",
    icon: DollarSign,
    color: "text-green-500"
  },
  {
    title: "Aktif Randevular",
    value: "24",
    change: "+5",
    icon: Calendar,
    color: "text-blue-500"
  },
  {
    title: "Bekleyen Talepler",
    value: "8",
    change: "-2",
    icon: Clock,
    color: "text-orange-500"
  },
  {
    title: "Değerlendirmeler",
    value: "4.8",
    change: "+0.2",
    icon: Star,
    color: "text-yellow-500"
  }
];

const recentAppointments = [
  {
    id: 1,
    client: "Ahmet Yılmaz",
    service: "Sanat Danışmanlığı",
    date: "22 Şubat 2025",
    time: "14:00",
    status: "Onaylandı"
  },
  {
    id: 2,
    client: "Ayşe Demir",
    service: "Atölye Kullanımı",
    date: "22 Şubat 2025",
    time: "16:30",
    status: "Beklemede"
  },
  {
    id: 3,
    client: "Mehmet Kaya",
    service: "Koleksiyon Değerlendirmesi",
    date: "23 Şubat 2025",
    time: "10:00",
    status: "Onaylandı"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-400">Hoş geldiniz, işte güncel istatistikleriniz</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-gray-900 border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card className="p-6 bg-gray-900 border-gray-800">
        <h3 className="text-xl font-semibold mb-6">Yaklaşan Randevular</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-3 text-gray-400">Müşteri</th>
                <th className="pb-3 text-gray-400">Hizmet</th>
                <th className="pb-3 text-gray-400">Tarih</th>
                <th className="pb-3 text-gray-400">Saat</th>
                <th className="pb-3 text-gray-400">Durum</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((appointment) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-800 last:border-0"
                >
                  <td className="py-4">{appointment.client}</td>
                  <td className="py-4">{appointment.service}</td>
                  <td className="py-4">{appointment.date}</td>
                  <td className="py-4">{appointment.time}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'Onaylandı' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
