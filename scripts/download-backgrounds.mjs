import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backgroundImages = [
  {
    name: 'hero-bg.jpg',
    url: 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg'
  },
  {
    name: 'features-bg.jpg',
    url: 'https://images.pexels.com/photos/3222686/pexels-photo-3222686.jpeg'
  },
  {
    name: 'artworks-bg.jpg',
    url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg'
  },
  {
    name: 'bg-1.jpg',
    url: 'https://images.pexels.com/photos/1762973/pexels-photo-1762973.jpeg'
  },
  {
    name: 'bg-2.jpg',
    url: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg'
  },
  {
    name: 'bg-3.jpg',
    url: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg'
  },
  {
    name: 'bg-4.jpg',
    url: 'https://images.pexels.com/photos/3059750/pexels-photo-3059750.jpeg'
  },
  {
    name: 'bg-5.jpg',
    url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg'
  },
  {
    name: 'bg-6.jpg',
    url: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg'
  },
  {
    name: 'bg-7.jpg',
    url: 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg'
  },
  {
    name: 'bg-8.jpg',
    url: 'https://images.pexels.com/photos/3222686/pexels-photo-3222686.jpeg'
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
