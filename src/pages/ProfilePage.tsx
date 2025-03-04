import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { UserArtworks } from '@/components/profile/UserArtworks';

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (username) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();
            
          if (error) throw error;
          setProfile(data);
        }
      } catch (err) {
        setError('Profil yüklenirken bir hata oluştu.');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-muted-foreground">
        Hata: {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-8 text-center text-muted-foreground">
        Profil bulunamadı.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src={profile.avatar_url || 'https://via.placeholder.com/150'} 
                  alt={profile.username} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold">{profile.full_name}</h1>
              <p className="text-muted-foreground">@{profile.username}</p>
              <p className="mt-4 text-center text-muted-foreground">
                {profile.bio || 'Bu kullanıcı henüz bir biyografi eklememiş.'}
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button>Takip Et</Button>
            </div>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="artworks">
            <TabsList className="w-full">
              <TabsTrigger value="artworks" className="flex-1">Eserler</TabsTrigger>
              <TabsTrigger value="collections" className="flex-1">Koleksiyonlar</TabsTrigger>
              <TabsTrigger value="likes" className="flex-1">Beğeniler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="artworks" className="mt-4">
              <UserArtworks userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="collections" className="mt-4">
              <Card className="p-6">
                <p className="text-muted-foreground">Koleksiyonlar yakında eklenecek</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="likes" className="mt-4">
              <Card className="p-6">
                <p className="text-muted-foreground">Beğeniler yakında eklenecek</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
