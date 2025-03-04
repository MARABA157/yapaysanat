import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';
import type { Artwork } from '@/types';
import { ArtworkCard } from '@/components/gallery/ArtworkCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function TrendingArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTrendingArtworks();
  }, []);

  const fetchTrendingArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          artist:profiles(*),
          likes(count)
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        throw error;
      }

      setArtworks(data || []);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Eserler yüklenirken bir hata oluştu.',
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

  if (artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Henüz trend eser bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
