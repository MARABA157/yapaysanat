import os
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
