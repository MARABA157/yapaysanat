import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

export const useSEO = ({ title, description, image, type = 'website' }: SEOProps) => {
  useEffect(() => {
    // Sayfa başlığını güncelle
    document.title = `${title} | Sanat Galerisi`;

    // Meta etiketlerini güncelle
    const metaTags = {
      description,
      'og:title': title,
      'og:description': description,
      'og:type': type,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
    };

    if (image) {
      metaTags['og:image'] = image;
      metaTags['twitter:image'] = image;
    }

    // Mevcut meta etiketlerini güncelle veya yenilerini oluştur
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[property="${name}"]`);
      if (!meta) {
        meta = document.querySelector(`meta[name="${name}"]`);
      }
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });
  }, [title, description, image, type]);
};
