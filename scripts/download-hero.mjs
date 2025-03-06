import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const heroImage = {
  name: 'hero-bg.jpg',
  url: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=1500'
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filename);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}`);
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function downloadHeroImage() {
  const backgroundsDir = path.join(__dirname, '..', 'public', 'images', 'backgrounds');
  
  if (!fs.existsSync(backgroundsDir)) {
    fs.mkdirSync(backgroundsDir, { recursive: true });
  }

  const filename = path.join(backgroundsDir, heroImage.name);
  console.log(`Downloading ${heroImage.name}...`);
  try {
    await downloadImage(heroImage.url, filename);
    console.log(`Successfully downloaded ${heroImage.name}`);
  } catch (error) {
    console.error(`Error downloading ${heroImage.name}:`, error);
  }
}

downloadHeroImage();
