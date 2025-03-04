import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import type { Database } from '@/types/supabase';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { MessageCircleIcon } from '@/components/icons/MessageCircleIcon';
import Masonry from 'react-masonry-css';

type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  likes_count: number;
  comments_count: number;
  user: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
};

interface ArtworkGridProps {
  artworks?: Artwork[];
  loading?: boolean;
  userId?: string;
  limit?: number;
  showLoadMore?: boolean;
}

export function ArtworkGrid({ 
  artworks: propArtworks,
  loading: propLoading,
  userId, 
  limit = 12, 
  showLoadMore = true 
}: ArtworkGridProps) {
  const [artworks, setArtworks] = useState<Artwork[]>(propArtworks || []);
  const [loading, setLoading] = useState(propLoading || !propArtworks);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!propArtworks) {
      void fetchArtworks();
    }
  }, [userId, propArtworks]);

  useEffect(() => {
    if (propArtworks) {
      setArtworks(propArtworks);
      setLoading(false);
    }
  }, [propArtworks]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('artworks')
        .select(`
          *,
          likes_count:likes(count),
          comments_count:comments(count),
          user:profiles(username, full_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setArtworks(prev => [...prev, ...(data as Artwork[])]);
      setHasMore(data.length === limit);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      toast({
        title: 'Hata',
        description: 'Eserler yüklenirken bir hata oluştu.',
        variant: 'destructive',
      });
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

  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        void fetchArtworks();
      }
    };

    const obs = new IntersectionObserver(handleIntersect, options);
    setObserver(obs);

    return () => {
      if (obs) {
        obs.disconnect();
      }
    };
  }, [loading, hasMore]);

  const lastArtworkRef = (node: HTMLElement | null) => {
    if (observer) {
      if (node) {
        observer.observe(node);
      }
    }
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
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mb-4">
              <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
            </div>
          ))
        ) : (
          artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              ref={index === artworks.length - 1 ? lastArtworkRef : null}
              className="mb-4"
            >
              <Link
                to={`/artwork/${artwork.id}`}
                className="group relative block overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-all duration-300"
              >
                <ArtworkImage artwork={artwork} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold truncate">{artwork.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={artwork.user?.avatar_url || '/default-avatar.png'}
                          alt={artwork.user?.username || 'Kullanıcı'}
                          className="w-6 h-6 rounded-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/default-avatar.png';
                          }}
                        />
                        <span className="text-white/90 text-sm">{artwork.user?.username}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <HeartIcon className="w-4 h-4 text-white/90" />
                          <span className="text-white/90 text-sm">{artwork.likes_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircleIcon className="w-4 h-4 text-white/90" />
                          <span className="text-white/90 text-sm">{artwork.comments_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </Masonry>

      {loading && (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
