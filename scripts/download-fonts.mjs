import https from 'https';
import fs from 'fs';
import path from 'path';

const FONTS = [
  {
    weight: 400,
    name: 'regular'
  },
  {
    weight: 500,
    name: 'medium'
  },
  {
    weight: 600,
    name: 'semibold'
  },
  {
    weight: 700,
    name: 'bold'
  }
];

async function downloadFont(weight, name) {
  const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`;
  
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const woff2Url = data.match(/src: url\((.*?\.woff2)\)/)?.[1];
        
        if (!woff2Url) {
          reject(new Error(`Could not find woff2 URL for weight ${weight}`));
          return;
        }
        
        const fontPath = path.join(process.cwd(), 'public', 'fonts', `inter-${name}.woff2`);
        
        https.get(woff2Url, (res) => {
          const fileStream = fs.createWriteStream(fontPath);
          res.pipe(fileStream);
          
          fileStream.on('finish', () => {
            console.log(`Downloaded Inter ${name} (${weight})`);
            resolve();
          });
          
          fileStream.on('error', (err) => {
            reject(err);
          });
        }).on('error', reject);
      });
    }).on('error', reject);
  });
}

async function downloadAllFonts() {
  try {
    await Promise.all(FONTS.map(font => downloadFont(font.weight, font.name)));
    console.log('All fonts downloaded successfully!');
  } catch (error) {
    console.error('Error downloading fonts:', error);
    process.exit(1);
  }
}

downloadAllFonts();
