import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabase';
import type { Artwork } from '@/types';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArtworkCard } from '@/components/gallery/ArtworkCard';

interface UserArtworksProps {
  userId: string;
}

export function UserArtworks({ userId }: UserArtworksProps) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const perPage = 12;

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const fetchArtworks = async (pageNumber: number) => {
    try {
      const from = (pageNumber - 1) * perPage;
      const to = from + perPage - 1;

      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          artist:profiles(*),
          likes(count)
        `)
        .eq('user_id', userId)
        .range(from, to)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        if (pageNumber === 1) {
          setArtworks(data);
        } else {
          setArtworks((prev) => [...prev, ...data]);
        }
        setHasMore(data.length === perPage);
      }
    } catch (error) {
      setError('Eserler yüklenirken bir hata oluştu.');
      toast({
        title: 'Hata',
        description: 'Eserler yüklenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(1);
  }, [userId]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchArtworks(nextPage);
        return nextPage;
      });
    }
  }, [inView, hasMore, loading]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (loading && page === 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-[300px]">
            <Skeleton className="w-full h-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Henüz eser yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          <Button variant="ghost" disabled>
            <LoadingSpinner size="sm" className="mr-2" />
            Yükleniyor...
          </Button>
        </div>
      )}
    </div>
  );
}
