import os
import subprocess
import json
from pathlib import Path
import glob

# Dosya yolları
IMAGES_DIR = Path("public/images")
WEBP_DIR = Path("public/images/webp")
WEBP_DIR.mkdir(exist_ok=True)

# Pexels resimlerini bul
pexels_images = []
for img_path in IMAGES_DIR.glob("pexels-*.jpeg"):
    pexels_images.append(img_path)
for img_path in IMAGES_DIR.glob("pexels-*.jpg"):
    pexels_images.append(img_path)

print(f"Toplam {len(pexels_images)} Pexels resmi bulundu.")

# Optimizasyon komutlarını oluştur
commands = []

for input_path in pexels_images:
    # Dosya adını al
    filename = input_path.name
    output_filename = f"{filename.split('.')[0]}.webp"
    output_path = WEBP_DIR / output_filename
    
    # Sharp komutu oluştur
    command = f"npx sharp {input_path} --output {output_path} "
    command += f"--format webp "
    command += f"--quality 75 "
    command += f"--width 1200 "
    
    commands.append({
        "command": command,
        "input": str(input_path),
        "output": str(output_path)
    })

# Optimizasyon betiği oluştur
with open("optimize_pexels.bat", 'w', encoding='utf-8') as f:
    f.write("@echo off\n")
    f.write("echo Pexels resimlerinin optimizasyonu başlatılıyor...\n")
    f.write("npm install -g sharp-cli\n\n")
    
    for cmd in commands:
        f.write(f"echo Optimizasyon: {os.path.basename(cmd['input'])}\n")
        f.write(f"{cmd['command']}\n")
    
    f.write("\necho Optimizasyon tamamlandı!\n")

print("optimize_pexels.bat dosyası oluşturuldu.")

# Optimizasyonu başlat
print("Optimizasyon başlatılıyor...")
subprocess.call(["optimize_pexels.bat"], shell=True)

# Boyut karşılaştırması yap
print("\nBoyut karşılaştırması:")
print(f"{'Dosya Adı':<30} {'Orijinal':<10} {'Optimize':<10} {'Tasarruf':<10} {'Oran':<6}")
print("-" * 80)

total_original = 0
total_optimized = 0

for cmd in commands:
    input_path = cmd['input']
    output_path = cmd['output']
    
    if os.path.exists(output_path):
        original_size = os.path.getsize(input_path)
        optimized_size = os.path.getsize(output_path)
        saved = original_size - optimized_size
        ratio = (saved / original_size) * 100 if original_size > 0 else 0
        
        total_original += original_size
        total_optimized += optimized_size
        
        print(f"{os.path.basename(input_path):<30} {original_size/1024:.1f} KB    {optimized_size/1024:.1f} KB    {saved/1024:.1f} KB    {ratio:.1f}%")

# Toplam tasarruf
total_saved = total_original - total_optimized
total_ratio = (total_saved / total_original) * 100 if total_original > 0 else 0

print("-" * 80)
print(f"{'TOPLAM':<30} {total_original/1024:.1f} KB    {total_optimized/1024:.1f} KB    {total_saved/1024:.1f} KB    {total_ratio:.1f}%")

# WebP URL eşleştirme dosyasını güncelle
webp_url_mapping_path = Path("public/webp_url_mapping.json")
webp_mapping = {}

if webp_url_mapping_path.exists():
    with open(webp_url_mapping_path, 'r', encoding='utf-8') as f:
        try:
            webp_mapping = dict(json.load(f))
        except:
            webp_mapping = {}

# Yeni eşleştirmeleri ekle
for cmd in commands:
    original_url = f"/images/{os.path.basename(cmd['input'])}"
    webp_url = f"/images/webp/{os.path.basename(cmd['output'])}"
    webp_mapping[original_url] = webp_url

# Eşleştirme dosyasını kaydet
with open(webp_url_mapping_path, 'w', encoding='utf-8') as f:
    json.dump(webp_mapping, f, indent=2, ensure_ascii=False)

print(f"\nWebP URL eşleştirme dosyası güncellendi: {webp_url_mapping_path}")
