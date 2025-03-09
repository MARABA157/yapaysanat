import {
  MessageSquare,
  ImagePlus,
  Video,
  Music,
  Headphones,
  BookOpen,
  Edit,
  Film
} from 'lucide-react';

export const artModules = [
  {
    title: "AI Chat Asistanı",
    description: "Yapay zeka destekli sanat asistanınız ile sohbet edin",
    icon: MessageSquare,
    gradient: "from-purple-600 to-blue-600",
    bgImage: "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg",
    link: "/chat"
  },
  {
    title: "Resim Oluşturma",
    description: "Hayal ettiğin resimleri yapay zeka ile yarat! ",
    icon: ImagePlus,
    gradient: "from-pink-500 via-rose-400 to-orange-500",
    bgImage: "https://images.pexels.com/photos/20072/pexels-photo.jpg",
    link: "/generate/image"
  },
  {
    title: "Video Oluşturma",
    description: "Metinden videoya, hayallerini canlandır! ",
    icon: Video,
    gradient: "from-purple-500 via-violet-400 to-indigo-500",
    bgImage: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
    link: "/generate/video"
  },
  {
    title: "Ses Asistanı",
    description: "Yapay zeka ile sesli asistan deneyimi! ",
    icon: Headphones,
    gradient: "from-teal-500 via-emerald-400 to-green-500",
    bgImage: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg",
    link: "/generate/audio"
  },
  {
    title: "Müzik Yapay Zekası",
    description: "Kendi müziğini yapay zeka ile bestele! ",
    icon: Music,
    gradient: "from-red-500 via-orange-400 to-yellow-500",
    bgImage: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg",
    link: "/ai-music"
  },
  {
    title: "Senaryo Asistanı",
    description: "Hikayeler ve senaryolar yapay zeka ile yazılır! ",
    icon: BookOpen,
    gradient: "from-cyan-500 via-blue-400 to-indigo-500",
    bgImage: "https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg",
    link: "/generate/script"
  },
  {
    title: "Resim Düzenleme",
    description: "Fotoğraflarını profesyonelce düzenle! ",
    icon: Edit,
    gradient: "from-fuchsia-500 via-purple-400 to-pink-500",
    bgImage: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg",
    link: "/edit/image"
  },
  {
    title: "Video Düzenleme",
    description: "Videolarını yapay zeka ile düzenle! ",
    icon: Film,
    gradient: "from-violet-500 via-purple-400 to-fuchsia-500",
    bgImage: "https://images.pexels.com/photos/2544554/pexels-photo-2544554.jpeg",
    link: "/edit/video"
  }
];
