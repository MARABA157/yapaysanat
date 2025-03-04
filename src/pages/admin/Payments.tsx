import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  ArrowUpDown
} from 'lucide-react';

// Örnek veri - Gerçek uygulamada API'den gelecek
const payments = [
  {
    id: 1,
    client: "Ahmet Yılmaz",
    service: "Sanat Danışmanlığı",
    date: "2025-02-22",
    amount: 499,
    status: "Ödendi",
    paymentMethod: "Kredi Kartı"
  },
  {
    id: 2,
    client: "Ayşe Demir",
    service: "Atölye Kullanımı",
    date: "2025-02-22",
    amount: 799,
    status: "Beklemede",
    paymentMethod: "Havale"
  },
  {
    id: 3,
    client: "Mehmet Kaya",
    service: "Koleksiyon Değerlendirmesi",
    date: "2025-02-23",
    amount: 299,
    status: "Ödendi",
    paymentMethod: "Kredi Kartı"
  }
];

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const totalRevenue = payments.reduce((sum, payment) => 
    payment.status === "Ödendi" ? sum + payment.amount : sum, 0
  );

  const pendingRevenue = payments.reduce((sum, payment) => 
    payment.status === "Beklemede" ? sum + payment.amount : sum, 0
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Ödemeler</h2>
          <p className="text-gray-400">Ödeme takibi ve yönetimi</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Rapor İndir
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-full">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400">Toplam Gelir</p>
              <p className="text-2xl font-bold">₺{totalRevenue}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-full">
              <DollarSign className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400">Bekleyen Ödemeler</p>
              <p className="text-2xl font-bold">₺{pendingRevenue}</p>
            </div>
          </div>
        </Card>
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
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="bg-gray-800 border-gray-700"
              placeholder="Başlangıç tarihi"
            />
          </div>
          <div className="w-[200px]">
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="bg-gray-800 border-gray-700"
              placeholder="Bitiş tarihi"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrele
          </Button>
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-gray-400">Müşteri</th>
                <th className="text-left p-4 text-gray-400">Hizmet</th>
                <th className="text-left p-4 text-gray-400">Tarih</th>
                <th className="text-left p-4 text-gray-400">Tutar</th>
                <th className="text-left p-4 text-gray-400">Ödeme Yöntemi</th>
                <th className="text-left p-4 text-gray-400">Durum</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-800 last:border-0"
                >
                  <td className="p-4">{payment.client}</td>
                  <td className="p-4">{payment.service}</td>
                  <td className="p-4">{payment.date}</td>
                  <td className="p-4">₺{payment.amount}</td>
                  <td className="p-4">{payment.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === 'Ödendi'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {payment.status}
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
