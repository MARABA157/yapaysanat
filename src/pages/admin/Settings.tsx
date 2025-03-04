import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Settings as SettingsIcon,
  Save,
  Bell,
  Mail,
  Lock,
  User,
  Globe,
  Palette
} from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      appointments: true,
      messages: true
    },
    appearance: {
      darkMode: true,
      compactMode: false
    },
    profile: {
      name: "Admin User",
      email: "admin@example.com",
      phone: "+90 555 123 4567"
    },
    site: {
      title: "Sanat Galerisi",
      description: "Modern sanat galerisi ve topluluk platformu",
      address: "İstanbul, Türkiye",
      contact: "info@sanatgalerisi.com"
    }
  });

  const handleNotificationChange = (key: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };

  const handleAppearanceChange = (key: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: !prev.appearance[key as keyof typeof prev.appearance]
      }
    }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value
      }
    }));
  };

  const handleSiteChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      site: {
        ...prev.site,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Ayarlar</h2>
          <p className="text-gray-400">Site ve kullanıcı ayarları</p>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Bell className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold">Bildirimler</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">E-posta Bildirimleri</p>
                <p className="text-sm text-gray-400">Önemli güncellemeler için e-posta al</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={() => handleNotificationChange('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Anlık Bildirimler</p>
                <p className="text-sm text-gray-400">Tarayıcı bildirimleri</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={() => handleNotificationChange('push')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Randevu Bildirimleri</p>
                <p className="text-sm text-gray-400">Yeni ve güncellenen randevular</p>
              </div>
              <Switch
                checked={settings.notifications.appointments}
                onCheckedChange={() => handleNotificationChange('appointments')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mesaj Bildirimleri</p>
                <p className="text-sm text-gray-400">Yeni mesajlar</p>
              </div>
              <Switch
                checked={settings.notifications.messages}
                onCheckedChange={() => handleNotificationChange('messages')}
              />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <Palette className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold">Görünüm</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Koyu Mod</p>
                <p className="text-sm text-gray-400">Koyu tema kullan</p>
              </div>
              <Switch
                checked={settings.appearance.darkMode}
                onCheckedChange={() => handleAppearanceChange('darkMode')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kompakt Mod</p>
                <p className="text-sm text-gray-400">Daha sıkışık yerleşim</p>
              </div>
              <Switch
                checked={settings.appearance.compactMode}
                onCheckedChange={() => handleAppearanceChange('compactMode')}
              />
            </div>
          </div>
        </Card>

        {/* Profile Settings */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/10 rounded-full">
              <User className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Profil Ayarları</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">İsim</label>
              <Input
                value={settings.profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">E-posta</label>
              <Input
                type="email"
                value={settings.profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Telefon</label>
              <Input
                type="tel"
                value={settings.profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Site Settings */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-500/10 rounded-full">
              <Globe className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold">Site Ayarları</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Site Başlığı</label>
              <Input
                value={settings.site.title}
                onChange={(e) => handleSiteChange('title', e.target.value)}
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Açıklama</label>
              <Textarea
                value={settings.site.description}
                onChange={(e) => handleSiteChange('description', e.target.value)}
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Adres</label>
              <Input
                value={settings.site.address}
                onChange={(e) => handleSiteChange('address', e.target.value)}
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">İletişim E-postası</label>
              <Input
                type="email"
                value={settings.site.contact}
                onChange={(e) => handleSiteChange('contact', e.target.value)}
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
