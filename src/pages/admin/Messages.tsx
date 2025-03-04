import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MessageSquare,
  Search,
  Star,
  Trash2,
  Mail,
  Filter,
  MailOpen
} from 'lucide-react';

// Örnek veri - Gerçek uygulamada API'den gelecek
const messages = [
  {
    id: 1,
    sender: "Ahmet Yılmaz",
    subject: "Sanat Danışmanlığı Hakkında",
    message: "Merhaba, sanat danışmanlığı hizmetiniz hakkında detaylı bilgi almak istiyorum...",
    date: "2025-02-22 14:30",
    read: true,
    important: true
  },
  {
    id: 2,
    sender: "Ayşe Demir",
    subject: "Atölye Kullanımı",
    message: "Atölye kullanım saatleri ve ücretlendirme hakkında bilgi alabilir miyim?",
    date: "2025-02-22 15:45",
    read: false,
    important: false
  },
  {
    id: 3,
    sender: "Mehmet Kaya",
    subject: "Koleksiyon Değerlendirmesi",
    message: "Koleksiyonumun değerlendirilmesi için randevu almak istiyorum...",
    date: "2025-02-23 09:15",
    read: false,
    important: true
  }
];

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, unread, important

  const unreadCount = messages.filter(m => !m.read).length;
  const importantCount = messages.filter(m => m.important).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Mesajlar</h2>
          <p className="text-gray-400">Gelen kutusu yönetimi</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400">Toplam Mesaj</p>
              <p className="text-2xl font-bold">{messages.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-full">
              <MailOpen className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400">Okunmamış</p>
              <p className="text-2xl font-bold">{unreadCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-400">Önemli</p>
              <p className="text-2xl font-bold">{importantCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-gray-900 border-gray-800">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Mesajlarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('all')}
          >
            Tümü
          </Button>
          <Button
            variant={selectedFilter === 'unread' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('unread')}
            className="gap-2"
          >
            <MailOpen className="w-4 h-4" />
            Okunmamış
          </Button>
          <Button
            variant={selectedFilter === 'important' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('important')}
            className="gap-2"
          >
            <Star className="w-4 h-4" />
            Önemli
          </Button>
        </div>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className={`p-6 bg-gray-900 border-gray-800 ${!message.read ? 'border-l-4 border-l-blue-500' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{message.sender}</h3>
                    {message.important && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="font-medium">{message.subject}</p>
                  <p className="text-gray-400">{message.message}</p>
                  <p className="text-sm text-gray-500">{message.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Star className={`w-4 h-4 ${message.important ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
