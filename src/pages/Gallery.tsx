import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GalleryFilters from '@/components/gallery/GalleryFilters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorFallback from '@/components/common/ErrorFallback';
import supabase from '@/lib/supabase';
import { Artwork } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';

export default function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setArtworks(data || []);
    } catch (err) {
      setError(err as Error);
      toast({
        title: 'Hata',
        description: 'Eserler yüklenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={fetchArtworks} />;
  }

  return (
    <>
      <Helmet>
        <title>Galeri - Sanat Galerisi</title>
        <meta name="description" content="Sanatçıların eserlerini keşfedin" />
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sanat Galerisi</h1>
        
        <GalleryFilters />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="bg-card rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
                  <p className="text-muted-foreground">{artwork.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {new Date(artwork.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-medium">
                      {artwork.artist_name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
