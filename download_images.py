import os
import re
import requests
import json
from pathlib import Path
from urllib.parse import urlparse

# Resimlerin indirileceği klasör
IMAGES_DIR = Path("public/images")
IMAGES_DIR.mkdir(exist_ok=True)

# Pexels URL'lerini içeren dosyalar
files_to_check = [
    "src/pages/artist/[id].tsx",
    "src/pages/generate/video.tsx",
    "src/data/artStyles.ts",
    "src/data/artModules.ts",
    "src/components/sections/Hero.tsx",
    "src/components/sections/Gallery.tsx",
    "Home.tsx"  # Kök dizindeki dosya
]

# URL'leri ve dosya yollarını saklamak için bir sözlük
url_to_path = {}
url_to_files = {}

# URL'leri bul
for file_path in files_to_check:
    if not os.path.exists(file_path):
        print(f"Dosya bulunamadı: {file_path}")
        continue
        
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # URL'leri bul
    pattern = r'https://images\.pexels\.com/photos/[^"\'\s)]*'
    urls = re.findall(pattern, content)
    
    for url in urls:
        if url not in url_to_files:
            url_to_files[url] = []
        url_to_files[url].append(file_path)

print(f"Toplam {len(url_to_files)} benzersiz resim URL'si bulundu.")

# Resimleri indir ve dosya yollarını oluştur
for url, files in url_to_files.items():
    # URL'den dosya adını çıkar
    parsed_url = urlparse(url)
    path_parts = parsed_url.path.split('/')
    
    # Pexels ID'sini bul
    pexels_id = None
    for part in path_parts:
        if "pexels-photo" in part:
            pexels_id = part.replace("pexels-photo-", "").replace(".jpeg", "").replace(".jpg", "")
            break
    
    if not pexels_id:
        pexels_id = path_parts[-1].split('.')[0]  # Son kısmı al
    
    # Dosya uzantısını belirle
    extension = ".jpg"
    if ".jpeg" in url:
        extension = ".jpeg"
    elif ".png" in url:
        extension = ".png"
    
    # Yerel dosya adını oluştur
    local_filename = f"pexels-{pexels_id}{extension}"
    local_path = IMAGES_DIR / local_filename
    
    # URL'yi yerel dosya yoluna eşle
    url_to_path[url] = f"/images/{local_filename}"
    
    # Dosya zaten varsa indirme
    if local_path.exists():
        print(f"Dosya zaten var: {local_path}")
        continue
    
    # Resmi indir
    try:
        print(f"İndiriliyor: {url}")
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(local_path, 'wb') as out_file:
            for chunk in response.iter_content(chunk_size=8192):
                out_file.write(chunk)
        
        print(f"İndirildi: {local_path}")
    except Exception as e:
        print(f"Hata: {url} indirilirken bir sorun oluştu: {e}")

# Eşleştirme sözlüğünü JSON olarak kaydet
with open("url_mapping.json", 'w', encoding='utf-8') as f:
    json.dump(url_to_path, f, indent=2, ensure_ascii=False)

print(f"URL eşleştirmeleri url_mapping.json dosyasına kaydedildi.")

# Dosyalardaki URL'leri değiştir
for file_path in files_to_check:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Her URL'yi yerel dosya yoluyla değiştir
    for url, local_path in url_to_path.items():
        content = content.replace(url, local_path)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Dosya güncellendi: {file_path}")

print("İşlem tamamlandı!")
