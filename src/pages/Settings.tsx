import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

export function Settings() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

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
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
              <Button variant="destructive">Hesabı Sil</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
