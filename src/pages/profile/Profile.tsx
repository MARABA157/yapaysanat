import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Edit, LogOut, Settings, User, Heart, Image, Music, Video } from 'lucide-react';

export default function Profile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteArt, setFavoriteArt] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      
      try {
        // Kullanıcı bilgilerini al
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(user);
          setUsername(user.user_metadata?.username || 'Sanat Sever');
          setFavoriteArt(user.user_metadata?.favorite_art || 'Modern Sanat');
        }
      } catch (error) {
        console.error('Profil bilgileri alınamadı:', error);
        toast({
          title: 'Hata',
          description: 'Profil bilgileriniz yüklenirken bir sorun oluştu.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Çıkış Yapıldı',
        description: 'Başarıyla çıkış yaptınız. Tekrar görüşmek üzere!',
      });
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
      toast({
        title: 'Hata',
        description: 'Çıkış yapılırken bir sorun oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Profil Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${username}`} alt={username} />
                  <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{username}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Favori Sanat: {favoriteArt}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full" size="sm" onClick={handleSettingsClick}>
                  <Settings className="h-4 w-4 mr-2" />
                  Ayarlar
                </Button>
                <Button variant="outline" className="w-full" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış Yap
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Ana İçerik */}
          <div className="space-y-6">
            <Tabs defaultValue="gallery">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="gallery">
                  <Image className="h-4 w-4 mr-2" />
                  Galeri
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart className="h-4 w-4 mr-2" />
                  Favoriler
                </TabsTrigger>
                <TabsTrigger value="music">
                  <Music className="h-4 w-4 mr-2" />
                  Müzik
                </TabsTrigger>
                <TabsTrigger value="videos">
                  <Video className="h-4 w-4 mr-2" />
                  Videolar
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="gallery" className="space-y-4">
                <h2 className="text-2xl font-bold">Sanat Galeriniz</h2>
                <p className="text-muted-foreground">Henüz bir sanat eseri oluşturmadınız. Hemen yeni bir eser oluşturmaya başlayın!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Galeri içeriği burada olacak */}
                  <Card className="overflow-hidden">
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <Button variant="ghost">
                        <Image className="h-8 w-8" />
                        <span className="ml-2">Yeni Eser Oluştur</span>
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="space-y-4">
                <h2 className="text-2xl font-bold">Favorileriniz</h2>
                <p className="text-muted-foreground">Henüz favori bir eseriniz yok. Galeriden beğendiğiniz eserleri favorilere ekleyin.</p>
              </TabsContent>
              
              <TabsContent value="music" className="space-y-4">
                <h2 className="text-2xl font-bold">Müzik Koleksiyonunuz</h2>
                <p className="text-muted-foreground">Henüz bir müzik eseri oluşturmadınız. AI ile müzik oluşturmayı deneyin!</p>
                <Button>
                  <Music className="h-4 w-4 mr-2" />
                  AI ile Müzik Oluştur
                </Button>
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-4">
                <h2 className="text-2xl font-bold">Video Koleksiyonunuz</h2>
                <p className="text-muted-foreground">Henüz bir video oluşturmadınız. AI ile video oluşturmayı deneyin!</p>
                <Button>
                  <Video className="h-4 w-4 mr-2" />
                  AI ile Video Oluştur
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
