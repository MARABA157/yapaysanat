import React from 'react';
import { ImagePlus, Settings, Compass, Shield, MessageSquare, Palette, Users, FolderHeart, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileActions() {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <button 
        onClick={() => navigate('/explore')}
        className="flex items-center justify-center space-x-2 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition duration-200"
      >
        <Compass size={20} />
        <span>Keşfet</span>
      </button>

      <button 
        onClick={() => navigate('/settings/security')}
        className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition duration-200"
      >
        <Shield size={20} />
        <span>Güvenlik Ayarları</span>
      </button>

      <button 
        onClick={() => navigate('/messages')}
        className="flex items-center justify-center space-x-2 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition duration-200"
      >
        <MessageSquare size={20} />
        <span>Mesajlar</span>
      </button>

      <button 
        onClick={() => navigate('/settings')}
        className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition duration-200"
      >
        <Settings size={20} />
        <span>Profil Ayarları</span>
      </button>

      <button 
        onClick={() => navigate('/artist/profile')}
        className="flex items-center justify-center space-x-2 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition duration-200"
      >
        <Palette size={20} />
        <span>Sanatçı Profilim</span>
      </button>

      <button 
        onClick={() => navigate('/artist/123')} {/* Örnek ID */}
        className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition duration-200"
      >
        <Users size={20} />
        <span>Sanatçı Profili</span>
      </button>

      <button 
        onClick={() => navigate('/artist/collections')}
        className="flex items-center justify-center space-x-2 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition duration-200"
      >
        <FolderHeart size={20} />
        <span>Sanatçı Koleksiyonu</span>
      </button>

      <button 
        onClick={() => navigate('/artist/stats')}
        className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition duration-200"
      >
        <BarChart2 size={20} />
        <span>Sanatçı İstatistikleri</span>
      </button>
    </div>
  );
}
