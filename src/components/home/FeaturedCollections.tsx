import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';
import type { Collection } from '@/types';
import { CollectionCard } from '@/components/collections/CollectionCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function FeaturedCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedCollections();
  }, []);

  const fetchFeaturedCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('collections')
        .select(`
          *,
          owner:profiles(*),
          artworks:collection_artworks(
            artwork:artworks(*)
          )
        `)
        .eq('is_featured', true)
        .limit(6);

      if (error) {
        throw error;
      }

      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching featured collections:', error);
      toast({
        title: 'Hata',
        description: 'Öne çıkan koleksiyonlar yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center h-[300px] rounded-lg bg-muted"
          >
            <LoadingSpinner size="lg" />
          </div>
        ))}
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Henüz öne çıkan koleksiyon bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
