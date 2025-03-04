import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Sayfa bulunamadı</p>
      <Button asChild>
        <Link to="/">Ana Sayfaya Dön</Link>
      </Button>
    </div>
  );
}
