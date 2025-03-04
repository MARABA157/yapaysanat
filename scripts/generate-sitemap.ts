import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function generateSitemap() {
  const baseUrl = 'https://sanat-galerisi.com'; // Projenizin URL'sini buraya yazın
  
  // Statik sayfalar
  const staticPages = [
    '',
    '/kesfet',
    '/koleksiyonlar',
    '/sanatcilar',
  ];

  // Dinamik sayfalar için verileri çek
  const { data: artworks } = await supabase
    .from('artworks')
    .select('id')
    .eq('is_published', true);

  const { data: collections } = await supabase
    .from('collections')
    .select('id')
    .eq('is_private', false);

  const { data: artists } = await supabase
    .from('profiles')
    .select('id')
    .eq('is_artist', true);

  // XML oluştur
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Statik sayfaları ekle
  staticPages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}${page}</loc>\n`;
    sitemap += `    <changefreq>daily</changefreq>\n`;
    sitemap += `    <priority>0.7</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Sanat eserleri sayfalarını ekle
  artworks?.forEach(artwork => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/eser/${artwork.id}</loc>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Koleksiyon sayfalarını ekle
  collections?.forEach(collection => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/koleksiyon/${collection.id}</loc>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>0.6</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Sanatçı sayfalarını ekle
  artists?.forEach(artist => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/sanatci/${artist.id}</loc>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.9</priority>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += '</urlset>';

  // Sitemap dosyasını kaydet
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap başarıyla oluşturuldu!');
}

generateSitemap().catch(console.error);
