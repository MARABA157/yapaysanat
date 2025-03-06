import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceIcon = './public/sanatai.png'; // Ana logo
const outputDir = './public/icons';

async function generateIcons() {
  try {
    // Output dizinini oluştur
    await fs.mkdir(outputDir, { recursive: true });

    // Her boyut için ikon oluştur
    for (const size of sizes) {
      await sharp(sourceIcon)
        .resize(size, size)
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      
      console.log(`✓ ${size}x${size} ikon oluşturuldu`);
    }

    console.log('Tüm ikonlar başarıyla oluşturuldu!');
  } catch (error) {
    console.error('Hata:', error);
  }
}

generateIcons();
