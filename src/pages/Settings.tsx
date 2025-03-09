import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import { Loader2 } from 'lucide-react';

function Settings() {
  const { user: authUser } = useAuthContext();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        // Supabase'den kullanıcı bilgilerini al
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(user);
        } else {
          // Kullanıcı yoksa login sayfasına yönlendir
          navigate('/auth/login');
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
        navigate('/auth/login');
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Ayarlar</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Görünüm</CardTitle>
            <CardDescription>Uygulama görünümünü özelleştirin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Koyu Tema</Label>
                <p className="text-sm text-muted-foreground">
                  Koyu temayı aktif edin
                </p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hesap</CardTitle>
            <CardDescription>Hesap ayarlarınızı yönetin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>E-posta</Label>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <Label>Kullanıcı Adı</Label>
                <p className="text-sm text-muted-foreground">{user.user_metadata?.username || 'Kullanıcı Adı Yok'}</p>
              </div>
              <Button variant="destructive">Hesabı Sil</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
