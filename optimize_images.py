import os
import json
import re
import subprocess
from pathlib import Path
from collections import defaultdict

# Kategori tanımları ve optimizasyon ayarları
IMAGE_CATEGORIES = {
    "hero": {
        "max_width": 1200,
        "quality": 75,
        "format": "webp"
    },
    "thumbnail": {
        "max_width": 400,
        "quality": 70,
        "format": "webp"
    },
    "background": {
        "max_width": 1600,
        "quality": 65,
        "format": "webp"
    },
    "gallery": {
        "max_width": 800,
        "quality": 75,
        "format": "webp"
    },
    "style": {
        "max_width": 500,
        "quality": 70,
        "format": "webp"
    }
}

# Dosya yolları
IMAGES_DIR = Path("public/images")
OPTIMIZED_DIR = Path("public/images/optimized")
OPTIMIZED_DIR.mkdir(exist_ok=True)

# Dosya ve içerik eşleştirmeleri
file_content_map = {
    "src/components/sections/Hero.tsx": "hero",
    "src/components/sections/Gallery.tsx": "gallery",
    "src/data/artStyles.ts": "style",
    "src/data/artModules.ts": "background",
    "src/pages/generate/video.tsx": "background",
    "src/pages/artist/[id].tsx": "hero"
}

# Resim ve kategori eşleştirmelerini saklamak için sözlük
image_categories = defaultdict(list)

# Resim kullanımlarını bul
for file_path, category in file_content_map.items():
    if not os.path.exists(file_path):
        print(f"Dosya bulunamadı: {file_path}")
        continue
        
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # /images/ ile başlayan dosya yollarını bul
    pattern = r'/images/([^"\'\s)]*)'
    image_paths = re.findall(pattern, content)
    
    for img_path in image_paths:
        full_path = f"/images/{img_path}"
        image_categories[full_path].append(category)

print(f"Toplam {len(image_categories)} benzersiz resim bulundu.")

# Her resmin en önemli kategorisini belirle
image_primary_category = {}
for img_path, categories in image_categories.items():
    # Kategori önceliği: hero > background > gallery > style > thumbnail
    priority_order = ["hero", "background", "gallery", "style", "thumbnail"]
    
    primary_category = "thumbnail"  # Varsayılan kategori
    for cat in priority_order:
        if cat in categories:
            primary_category = cat
            break
    
    image_primary_category[img_path] = primary_category
    print(f"{img_path}: {primary_category} (kullanım: {', '.join(categories)})")

# Optimizasyon komutlarını oluştur
optimization_commands = []

for img_path, category in image_primary_category.items():
    # Dosya adını al
    filename = os.path.basename(img_path)
    input_path = IMAGES_DIR / filename
    
    if not input_path.exists():
        print(f"Dosya bulunamadı: {input_path}")
        continue
    
    # Optimizasyon ayarlarını al
    settings = IMAGE_CATEGORIES[category]
    output_filename = f"{filename.split('.')[0]}.{settings['format']}"
    output_path = OPTIMIZED_DIR / output_filename
    
    # Sharp komutu oluştur
    command = f"npx sharp {input_path} --output {output_path} "
    command += f"--format {settings['format']} "
    command += f"--quality {settings['quality']} "
    command += f"--width {settings['max_width']} "
    
    optimization_commands.append({
        "command": command,
        "input": str(input_path),
        "output": str(output_path),
        "category": category
    })

# Komutları JSON olarak kaydet
with open("optimization_commands.json", 'w', encoding='utf-8') as f:
    json.dump(optimization_commands, f, indent=2, ensure_ascii=False)

print(f"Optimizasyon komutları optimization_commands.json dosyasına kaydedildi.")

# Optimizasyon betiği oluştur
with open("run_optimization.bat", 'w', encoding='utf-8') as f:
    f.write("@echo off\n")
    f.write("echo Resim optimizasyonu başlatılıyor...\n")
    f.write("npm install -g sharp-cli\n\n")
    
    for cmd in optimization_commands:
        f.write(f"echo {cmd['category']} kategorisinde optimizasyon: {os.path.basename(cmd['input'])}\n")
        f.write(f"{cmd['command']}\n")
    
    f.write("\necho Optimizasyon tamamlandı!\n")
    f.write("echo Orijinal ve optimize edilmiş boyutlar karşılaştırılıyor...\n")
    f.write("python compare_sizes.py\n")

print("run_optimization.bat dosyası oluşturuldu.")

# Boyut karşılaştırma betiği oluştur
with open("compare_sizes.py", 'w', encoding='utf-8') as f:
    f.write("""import os
import json
from pathlib import Path

# Dosya yolları
IMAGES_DIR = Path("public/images")
OPTIMIZED_DIR = Path("public/images/optimized")

# Optimizasyon komutlarını yükle
with open("optimization_commands.json", 'r', encoding='utf-8') as f:
    commands = json.load(f)

# Toplam boyut tasarrufu
total_original_size = 0
total_optimized_size = 0
savings_by_category = {}

print("\\nOptimizasyon Sonuçları:")
print("-" * 80)
print(f"{'Dosya Adı':<30} {'Kategori':<12} {'Orijinal':<10} {'Optimize':<10} {'Tasarruf':<10} {'Oran':<6}")
print("-" * 80)

for cmd in commands:
    input_path = cmd['input']
    output_path = cmd['output']
    category = cmd['category']
    
    if os.path.exists(input_path) and os.path.exists(output_path):
        original_size = os.path.getsize(input_path)
        optimized_size = os.path.getsize(output_path)
        
        savings = original_size - optimized_size
        savings_percent = (savings / original_size) * 100 if original_size > 0 else 0
        
        # Toplam istatistikleri güncelle
        total_original_size += original_size
        total_optimized_size += optimized_size
        
        # Kategori bazında istatistikleri güncelle
        if category not in savings_by_category:
            savings_by_category[category] = {
                "original": 0,
                "optimized": 0,
                "count": 0
            }
        
        savings_by_category[category]["original"] += original_size
        savings_by_category[category]["optimized"] += optimized_size
        savings_by_category[category]["count"] += 1
        
        # Sonuçları yazdır
        print(f"{os.path.basename(input_path):<30} {category:<12} "
              f"{original_size/1024:.1f} KB   {optimized_size/1024:.1f} KB   "
              f"{savings/1024:.1f} KB    {savings_percent:.1f}%")

# Toplam tasarruf
total_savings = total_original_size - total_optimized_size
total_savings_percent = (total_savings / total_original_size) * 100 if total_original_size > 0 else 0

print("-" * 80)
print(f"{'TOPLAM':<30} {'Tüm':<12} "
      f"{total_original_size/1024:.1f} KB   {total_optimized_size/1024:.1f} KB   "
      f"{total_savings/1024:.1f} KB    {total_savings_percent:.1f}%")
print("-" * 80)

# Kategori bazında sonuçlar
print("\\nKategori Bazında Sonuçlar:")
print("-" * 80)
print(f"{'Kategori':<12} {'Resim Sayısı':<12} {'Orijinal':<10} {'Optimize':<10} {'Tasarruf':<10} {'Oran':<6}")
print("-" * 80)

for category, stats in savings_by_category.items():
    cat_original = stats["original"]
    cat_optimized = stats["optimized"]
    cat_savings = cat_original - cat_optimized
    cat_savings_percent = (cat_savings / cat_original) * 100 if cat_original > 0 else 0
    
    print(f"{category:<12} {stats['count']:<12} "
          f"{cat_original/1024:.1f} KB   {cat_optimized/1024:.1f} KB   "
          f"{cat_savings/1024:.1f} KB    {cat_savings_percent:.1f}%")

print("-" * 80)
""")

print("compare_sizes.py dosyası oluşturuldu.")

# URL güncelleme betiği oluştur
with open("update_image_paths.py", 'w', encoding='utf-8') as f:
    f.write("""import os
import json
import re
from pathlib import Path

# Optimizasyon komutlarını yükle
with open("optimization_commands.json", 'r', encoding='utf-8') as f:
    commands = json.load(f)

# Dosya yolları eşleştirmelerini oluştur
path_mapping = {}
for cmd in commands:
    input_filename = os.path.basename(cmd['input'])
    output_filename = os.path.basename(cmd['output'])
    
    # Orijinal yol: /images/filename.jpg
    # Optimize yol: /images/optimized/filename.webp
    original_path = f"/images/{input_filename}"
    optimized_path = f"/images/optimized/{output_filename}"
    
    path_mapping[original_path] = optimized_path

# Dosyalardaki yolları güncelle
files_to_update = [
    "src/components/sections/Hero.tsx",
    "src/components/sections/Gallery.tsx",
    "src/data/artStyles.ts",
    "src/data/artModules.ts",
    "src/pages/generate/video.tsx",
    "src/pages/artist/[id].tsx",
    "Home.tsx"
]

for file_path in files_to_update:
    if not os.path.exists(file_path):
        print(f"Dosya bulunamadı: {file_path}")
        continue
        
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Her yolu güncelle
    for original_path, optimized_path in path_mapping.items():
        content = content.replace(original_path, optimized_path)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Dosya güncellendi: {file_path}")

print("Tüm dosya yolları güncellendi!")
""")

print("update_image_paths.py dosyası oluşturuldu.")

print("\nTüm betikler oluşturuldu. Optimizasyon işlemini başlatmak için şu komutu çalıştırın:")
print("run_optimization.bat")
print("\nOptimizasyon tamamlandıktan sonra, dosya yollarını güncellemek için şu komutu çalıştırın:")
print("python update_image_paths.py")
