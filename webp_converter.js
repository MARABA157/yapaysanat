import sharp from 'sharp';
import fs from 'fs/promises';
import { existsSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname eşdeğeri oluştur
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Klasör yolları
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const WEBP_DIR = path.join(__dirname, 'public', 'images', 'webp');

// WebP klasörünü oluştur
try {
  if (!existsSync(WEBP_DIR)) {
    await fs.mkdir(WEBP_DIR, { recursive: true });
  }
} catch (error) {
  console.error('WebP klasörü oluşturulamadı:', error);
}

// Resim kategorileri ve optimizasyon ayarları
const IMAGE_CATEGORIES = {
  hero: {
    width: 1200,
    quality: 75
  },
  background: {
    width: 1600,
    quality: 65
  },
  gallery: {
    width: 800,
    quality: 75
  },
  thumbnail: {
    width: 400,
    quality: 70
  }
};

// Dosya uzantılarına göre resim dosyalarını filtrele
const isImageFile = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
};

// Dosya adından kategori tahmin et
const guessCategoryFromFilename = (filename) => {
  if (filename.includes('hero') || filename.includes('cover')) {
    return 'hero';
  } else if (filename.includes('bg') || filename.includes('background')) {
    return 'background';
  } else if (filename.includes('gallery')) {
    return 'gallery';
  } else {
    return 'thumbnail';
  }
};

// Dosya boyutunu formatla
const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
};

// Ana fonksiyon
const convertImagesToWebP = async () => {
  try {
    // Resim dosyalarını oku
    const files = await fs.readdir(IMAGES_DIR);
    
    // Sadece resim dosyalarını filtrele
    const imageFiles = [];
    for (const file of files) {
      try {
        const filePath = path.join(IMAGES_DIR, file);
        const stat = await fs.stat(filePath);
        if (isImageFile(file) && !stat.isDirectory()) {
          imageFiles.push(file);
        }
      } catch (err) {
        console.error(`Dosya kontrol edilemedi: ${file}`, err);
      }
    }

    console.log(`Toplam ${imageFiles.length} resim dosyası bulundu.`);
    console.log('WebP dönüşümü başlatılıyor...');

    // İstatistikler
    let totalOriginalSize = 0;
    let totalWebpSize = 0;
    const results = [];

    // Her resmi WebP'ye dönüştür
    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const category = guessCategoryFromFilename(file);
      const settings = IMAGE_CATEGORIES[category];
      
      // Dosya adını WebP uzantısıyla oluştur
      const outputFilename = path.basename(file, path.extname(file)) + '.webp';
      const outputPath = path.join(WEBP_DIR, outputFilename);

      try {
        // Orijinal dosya boyutu
        const originalStat = await fs.stat(inputPath);
        const originalSize = originalStat.size;
        totalOriginalSize += originalSize;

        // WebP dönüşümü
        await sharp(inputPath)
          .resize({ 
            width: settings.width,
            withoutEnlargement: true
          })
          .webp({ 
            quality: settings.quality,
            effort: 6 // 0-6 arası, 6 en yüksek sıkıştırma çabası
          })
          .toFile(outputPath);

        // WebP dosya boyutu
        const webpStat = await fs.stat(outputPath);
        const webpSize = webpStat.size;
        totalWebpSize += webpSize;

        // Tasarruf hesapla
        const savings = originalSize - webpSize;
        const savingsPercent = ((savings / originalSize) * 100).toFixed(2);

        results.push({
          file,
          category,
          originalSize,
          webpSize,
          savings,
          savingsPercent
        });

        console.log(`${file} (${category}): ${formatFileSize(originalSize)} -> ${formatFileSize(webpSize)} (${savingsPercent}% tasarruf)`);
      } catch (error) {
        console.error(`Hata: ${file} dönüştürülürken bir sorun oluştu:`, error);
      }
    }

    // Toplam tasarruf
    const totalSavings = totalOriginalSize - totalWebpSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(2);

    console.log('\n--- Dönüşüm Özeti ---');
    console.log(`Toplam Orijinal Boyut: ${formatFileSize(totalOriginalSize)}`);
    console.log(`Toplam WebP Boyut: ${formatFileSize(totalWebpSize)}`);
    console.log(`Toplam Tasarruf: ${formatFileSize(totalSavings)} (${totalSavingsPercent}%)`);

    // Kategoriye göre grupla ve özet oluştur
    const categoryStats = {};
    results.forEach(result => {
      if (!categoryStats[result.category]) {
        categoryStats[result.category] = {
          count: 0,
          originalSize: 0,
          webpSize: 0
        };
      }
      
      categoryStats[result.category].count++;
      categoryStats[result.category].originalSize += result.originalSize;
      categoryStats[result.category].webpSize += result.webpSize;
    });

    console.log('\n--- Kategori Bazında Özet ---');
    Object.entries(categoryStats).forEach(([category, stats]) => {
      const savings = stats.originalSize - stats.webpSize;
      const savingsPercent = ((savings / stats.originalSize) * 100).toFixed(2);
      
      console.log(`${category} (${stats.count} resim):`);
      console.log(`  Orijinal: ${formatFileSize(stats.originalSize)}`);
      console.log(`  WebP: ${formatFileSize(stats.webpSize)}`);
      console.log(`  Tasarruf: ${formatFileSize(savings)} (${savingsPercent}%)`);
    });

    // URL eşleştirme dosyası oluştur
    const urlMapping = {};
    imageFiles.forEach(file => {
      const webpFilename = path.basename(file, path.extname(file)) + '.webp';
      urlMapping[`/images/${file}`] = `/images/webp/${webpFilename}`;
    });

    await fs.writeFile(
      path.join(__dirname, 'webp_url_mapping.json'), 
      JSON.stringify(urlMapping, null, 2)
    );
    
    console.log('\nURL eşleştirme dosyası oluşturuldu: webp_url_mapping.json');
    console.log('Dönüşüm tamamlandı!');
    
  } catch (error) {
    console.error('Hata:', error);
  }
};

// Fonksiyonu çalıştır
convertImagesToWebP();
