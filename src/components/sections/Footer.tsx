import React from 'react';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Sanat Galerisi',
    links: [
      { label: 'Hakkımızda', href: '/about' },
      { label: 'İletişim', href: '/contact' },
      { label: 'SSS', href: '/faq' },
    ],
  },
  {
    title: 'Keşfet',
    links: [
      { label: 'Sanat Eserleri', href: '/artworks' },
      { label: 'Sanatçılar', href: '/artists' },
      { label: 'Koleksiyonlar', href: '/collections' },
    ],
  },
  {
    title: 'Sosyal Medya',
    links: [
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold mb-3">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sanat Galerisi. Tüm hakları saklıdır.</p>
        </div>
      </Container>
    </footer>
  );
}
