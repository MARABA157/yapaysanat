import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backgroundImages = [
  {
    name: 'hero-bg.jpg',
    url: 'https://source.unsplash.com/random/1920x1080?art'
  },
  {
    name: 'bg-1.jpg',
    url: 'https://source.unsplash.com/random/800x600?art'
  },
  {
    name: 'bg-2.jpg',
    url: 'https://source.unsplash.com/random/800x600?music'
  },
  {
    name: 'bg-3.jpg',
    url: 'https://source.unsplash.com/random/800x600?video'
  },
  {
    name: 'bg-4.jpg',
    url: 'https://source.unsplash.com/random/800x600?writing'
  },
  {
    name: 'bg-5.jpg',
    url: 'https://source.unsplash.com/random/800x600?design'
  },
  {
    name: 'bg-6.jpg',
    url: 'https://source.unsplash.com/random/800x600?audio'
  },
  {
    name: 'bg-7.jpg',
    url: 'https://source.unsplash.com/random/800x600?3d'
  },
  {
    name: 'bg-8.jpg',
    url: 'https://source.unsplash.com/random/800x600?animation'
  }
];

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

async function downloadAllImages() {
  const backgroundsDir = path.join(__dirname, '..', 'public', 'images', 'backgrounds');
  
  if (!fs.existsSync(backgroundsDir)) {
    fs.mkdirSync(backgroundsDir, { recursive: true });
  }

  for (const image of backgroundImages) {
    const filename = path.join(backgroundsDir, image.name);
    console.log(`Downloading ${image.name}...`);
    try {
      await downloadImage(image.url, filename);
      console.log(`Successfully downloaded ${image.name}`);
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error);
    }
  }
}

downloadAllImages();
