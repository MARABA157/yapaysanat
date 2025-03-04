import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Check,
  X
} from 'lucide-react';

// Örnek veri - Gerçek uygulamada API'den gelecek
const appointments = [
  {
    id: 1,
    client: "Ahmet Yılmaz",
    service: "Sanat Danışmanlığı",
    date: "2025-02-22",
    time: "14:00",
    status: "Onaylandı",
    notes: "İlk danışmanlık görüşmesi"
  },
  {
    id: 2,
    client: "Ayşe Demir",
    service: "Atölye Kullanımı",
    date: "2025-02-22",
    time: "16:30",
    status: "Beklemede",
    notes: "Yağlı boya çalışması"
  },
  {
    id: 3,
    client: "Mehmet Kaya",
    service: "Koleksiyon Değerlendirmesi",
    date: "2025-02-23",
    time: "10:00",
    status: "Onaylandı",
    notes: "5 parçalık koleksiyon"
  }
];

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Randevular</h2>
          <p className="text-gray-400">Randevu ve görüşme takibi</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Yeni Randevu
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-gray-900 border-gray-800">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Müşteri veya hizmet ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="w-[200px]">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrele
          </Button>
        </div>
      </Card>

      {/* Appointments Table */}
      <Card className="bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-gray-400">Müşteri</th>
                <th className="text-left p-4 text-gray-400">Hizmet</th>
                <th className="text-left p-4 text-gray-400">Tarih</th>
                <th className="text-left p-4 text-gray-400">Saat</th>
                <th className="text-left p-4 text-gray-400">Durum</th>
                <th className="text-left p-4 text-gray-400">Notlar</th>
                <th className="text-right p-4 text-gray-400">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-800 last:border-0"
                >
                  <td className="p-4">{appointment.client}</td>
                  <td className="p-4">{appointment.service}</td>
                  <td className="p-4">{appointment.date}</td>
                  <td className="p-4">{appointment.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'Onaylandı'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{appointment.notes}</td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="icon">
                      <Check className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
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
