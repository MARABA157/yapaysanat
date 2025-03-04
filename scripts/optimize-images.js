// Görsel optimizasyon script'i
// Bu script, projedeki görselleri optimize eder
// Kullanım: node scripts/optimize-images.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Optimize edilecek klasörler
const IMAGE_DIRS = [
  path.join(__dirname, '../public/images'),
  path.join(__dirname, '../src/assets')
];

// Desteklenen görsel formatları
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Optimize edilmeyecek dosyalar (logo, ikonlar vb.)
const EXCLUDED_FILES = ['logo', 'icon', 'favicon'];

// Optimize edilecek görsel boyutları
const IMAGE_SIZES = {
  thumbnail: { width: 200, height: 200, fit: 'cover' },
  small: { width: 400, height: 400, fit: 'inside' },
  medium: { width: 800, height: 800, fit: 'inside' },
  large: { width: 1200, height: 1200, fit: 'inside' },
  original: null // Orijinal boyut, sadece kalite optimizasyonu
};

// WebP kalitesi
const WEBP_QUALITY = 80;

// AVIF kalitesi
const AVIF_QUALITY = 65;

// Optimize edilecek görselleri bul
async function findImages() {
  let images = [];
  
  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) continue;
    
    for (const ext of IMAGE_EXTENSIONS) {
      const files = glob.sync(`${dir}/**/*${ext}`);
      images = [...images, ...files];
    }
  }
  
  // Hariç tutulan dosyaları filtrele
  return images.filter(img => !EXCLUDED_FILES.some(excluded => path.basename(img).includes(excluded)));
}

// Görsel optimizasyonu
async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath);
  const dir = path.dirname(imagePath);
  const baseName = path.basename(imagePath, ext);
  
  console.log(`Optimizing: ${imagePath}`);
  
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Her boyut için optimize et
    for (const [size, dimensions] of Object.entries(IMAGE_SIZES)) {
      if (!dimensions) {
        // Orijinal boyut, sadece kalite optimizasyonu
        // WebP formatına dönüştür
        await image
          .webp({ quality: WEBP_QUALITY })
          .toFile(path.join(dir, `${baseName}.webp`));
          
        // AVIF formatına dönüştür (daha iyi sıkıştırma ama daha az tarayıcı desteği)
        await image
          .avif({ quality: AVIF_QUALITY })
          .toFile(path.join(dir, `${baseName}.avif`));
          
        continue;
      }
      
      // Boyutlandırma ve WebP dönüşümü
      await image
        .resize(dimensions)
        .webp({ quality: WEBP_QUALITY })
        .toFile(path.join(dir, `${baseName}-${size}.webp`));
        
      // Boyutlandırma ve AVIF dönüşümü
      await image
        .resize(dimensions)
        .avif({ quality: AVIF_QUALITY })
        .toFile(path.join(dir, `${baseName}-${size}.avif`));
    }
    
    console.log(`✅ Optimized: ${imagePath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error);
  }
}

// Ana fonksiyon
async function main() {
  console.log('🔍 Finding images...');
  const images = await findImages();
  console.log(`Found ${images.length} images to optimize`);
  
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log('✨ Image optimization complete!');
}

main().catch(console.error);
