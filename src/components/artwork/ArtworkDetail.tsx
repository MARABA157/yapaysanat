import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Artwork, User } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import HeartIcon from '@/components/icons/HeartIcon';
import MessageCircleIcon from '@/components/icons/MessageCircleIcon';
import { CommentSection } from './CommentSection';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/context/AuthContext';

interface ArtworkDetailProps {
  artwork?: Artwork;
  creator?: User;
  loading?: boolean;
}

export function ArtworkDetail({ artwork: propArtwork, creator: propCreator, loading: propLoading }: ArtworkDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(propArtwork || null);
  const [creator, setCreator] = useState<User | null>(propCreator || null);
  const [loading, setLoading] = useState(propLoading || !propArtwork);
  const [liked, setLiked] = useState(false);
  const { showToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (propArtwork) {
      setArtwork(propArtwork);
      setLoading(false);
    } else if (id) {
      // Burada gerçek bir API çağrısı yapılabilir
      // Şimdilik mock veri kullanıyoruz
      setTimeout(() => {
        const mockArtwork: Artwork = {
          id,
          title: 'Sanat Eseri Başlığı',
          description: 'Bu sanat eseri hakkında detaylı açıklama metni...',
          image_url: 'https://source.unsplash.com/random/800x600/?art',
          user_id: '1',
          artist: 'Sanatçı Adı',
          style: 'Modern',
          category: 'Dijital',
          tags: ['modern', 'dijital', 'yapay zeka'],
          status: 'approved',
          views_count: 120,
          likes_count: 45,
          comments_count: 12,
          created_at: new Date().toISOString()
        };
        
        const mockCreator: User = {
          id: '1',
          email: 'sanatci@example.com',
          username: 'sanatci',
          full_name: 'Sanatçı Adı Soyadı',
          avatar_url: 'https://source.unsplash.com/random/100x100/?portrait',
          bio: 'Sanatçı hakkında kısa biyografi',
          role: 'user',
          preferences: {},
          created_at: new Date().toISOString()
        };
        
        setArtwork(mockArtwork);
        setCreator(mockCreator);
        setLoading(false);
      }, 1000);
    }
  }, [id, propArtwork, propCreator]);

  const handleLike = () => {
    if (!user) {
      showToast('Beğenmek için giriş yapmalısınız', 'error');
      return;
    }
    
    setLiked(!liked);
    if (artwork) {
      setArtwork({
        ...artwork,
        likes_count: liked ? artwork.likes_count - 1 : artwork.likes_count + 1
      });
    }
    
    // Burada gerçek bir API çağrısı yapılabilir
    showToast(liked ? 'Beğeni kaldırıldı' : 'Eser beğenildi', 'success');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="w-full aspect-[4/3] rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-40 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artwork || !creator) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold">Eser bulunamadı</h2>
        <p className="mt-2 text-muted-foreground">İstediğiniz sanat eseri mevcut değil veya kaldırılmış olabilir.</p>
        <Button asChild className="mt-4">
          <Link to="/explore">Eserlere Gözat</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={artwork.image_url} 
              alt={artwork.title} 
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://source.unsplash.com/random/800x600/?art';
              }}
            />
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Yorumlar</h3>
            <CommentSection artworkId={artwork.id} />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            <div className="flex items-center mt-2">
              <img 
                src={creator.avatar_url} 
                alt={creator.username} 
                className="w-10 h-10 rounded-full mr-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-avatar.png';
                }}
              />
              <div>
                <Link to={`/profile/${creator.username}`} className="font-medium hover:underline">
                  {creator.full_name}
                </Link>
                <p className="text-sm text-muted-foreground">@{creator.username}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Açıklama</h3>
            <p className="mt-2 text-muted-foreground whitespace-pre-line">{artwork.description}</p>
          </div>
          
          {artwork.tags && artwork.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Etiketler</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {artwork.tags.map((tag) => (
                  <Link 
                    key={tag} 
                    to={`/explore?tag=${tag}`}
                    className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-4">
            <Button 
              variant={liked ? "default" : "outline"} 
              size="sm" 
              onClick={handleLike}
              className="flex items-center gap-2"
            >
              <HeartIcon filled={liked} className="w-5 h-5" />
              <span>{artwork.likes_count + (liked ? 1 : 0)}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                const commentSection = document.querySelector('#comments');
                if (commentSection) {
                  commentSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <MessageCircleIcon className="w-5 h-5" />
              <span>{artwork.comments_count}</span>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold">Detaylar</h3>
            <dl className="mt-2 space-y-2">
              {artwork.style && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Stil:</dt>
                  <dd>{artwork.style}</dd>
                </div>
              )}
              {artwork.category && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Kategori:</dt>
                  <dd>{artwork.category}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Görüntülenme:</dt>
                <dd>{artwork.views_count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Oluşturulma Tarihi:</dt>
                <dd>{new Date(artwork.created_at).toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
