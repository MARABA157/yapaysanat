import os
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

print("\nOptimizasyon Sonuçları:")
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
print("\nKategori Bazında Sonuçlar:")
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
