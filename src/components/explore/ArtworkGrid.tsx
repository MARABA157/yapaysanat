import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import HeartIcon from '@/components/icons/HeartIcon';
import MessageCircleIcon from '@/components/icons/MessageCircleIcon';
import Masonry from 'react-masonry-css';
import { Artwork } from '@/types/models';
import { useToast } from '@/hooks/useToast';

interface ArtworkGridProps {
  artworks?: Artwork[];
  loading?: boolean;
  userId?: string;
  limit?: number;
  showLoadMore?: boolean;
  onLoadMore?: () => Promise<void>;
}

export function ArtworkGrid({ 
  artworks: propArtworks,
  loading: propLoading,
  userId, 
  limit = 12, 
  showLoadMore = true,
  onLoadMore
}: ArtworkGridProps) {
  const [artworks, setArtworks] = useState<Artwork[]>(propArtworks || []);
  const [loading, setLoading] = useState(propLoading || !propArtworks);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToast();
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (propArtworks) {
      setArtworks(propArtworks);
      setLoading(false);
    }
  }, [propArtworks]);

  useEffect(() => {
    if (inView && !loading && hasMore && onLoadMore) {
      handleLoadMore();
    }
  }, [inView, loading, hasMore]);

  const handleLoadMore = async () => {
    if (!onLoadMore) return;
    
    try {
      setLoading(true);
      await onLoadMore();
      // Burada hasMore durumunu güncellemek için bir mantık eklenebilir
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      showToast('Eserler yüklenirken bir hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const breakpointColumns = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  const ArtworkImage = ({ artwork }: { artwork: Artwork }) => {
    const [imgSrc, setImgSrc] = useState(artwork.image_url);
    const fallbackImages = [
      'https://source.unsplash.com/800x600/?artwork',
      'https://source.unsplash.com/800x600/?painting',
      'https://source.unsplash.com/800x600/?art'
    ];
    const [fallbackIndex, setFallbackIndex] = useState(0);

    const handleImageError = () => {
      if (fallbackIndex < fallbackImages.length) {
        setImgSrc(`${fallbackImages[fallbackIndex]}?sig=${artwork.id}`);
        setFallbackIndex(prev => prev + 1);
      }
    };

    return (
      <LazyLoadImage
        src={imgSrc}
        alt={artwork.title || 'Sanat Eseri'}
        effect="blur"
        className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        onError={handleImageError}
        placeholder={
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse rounded-lg" />
        }
      />
    );
  };

  return (
    <div className="space-y-8">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {loading && artworks.length === 0 ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mb-4">
              <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
            </div>
          ))
        ) : (
          artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              ref={index === artworks.length - 1 ? loadMoreRef : null}
              className="mb-4"
            >
              <Link
                to={`/artwork/${artwork.id}`}
                className="group block overflow-hidden rounded-lg bg-background shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <ArtworkImage artwork={artwork} />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">{artwork.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-1">{artwork.artist}</p>
                    
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center text-white">
                        <HeartIcon className="mr-1 h-4 w-4" />
                        <span className="text-xs">{artwork.likes_count || 0}</span>
                      </div>
                      <div className="flex items-center text-white">
                        <MessageCircleIcon className="mr-1 h-4 w-4" />
                        <span className="text-xs">{artwork.comments_count || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </Masonry>

      {showLoadMore && hasMore && artworks.length > 0 && (
        <div className="flex justify-center">
          <Button 
            onClick={handleLoadMore} 
            disabled={loading}
            variant="outline"
            className="min-w-[200px]"
          >
            {loading ? 'Yükleniyor...' : 'Daha Fazla Göster'}
          </Button>
        </div>
      )}
    </div>
  );
}
