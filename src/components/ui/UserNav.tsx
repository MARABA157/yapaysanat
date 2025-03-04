import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Heart, BookMarked, PenSquare } from 'lucide-react';

export function UserNav() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/auth/login">
          <Button variant="ghost" size="sm">
            Giriş Yap
          </Button>
        </Link>
        <Link to="/auth/register">
          <Button size="sm">Kayıt Ol</Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar_url} alt={user.full_name} />
            <AvatarFallback>{user.full_name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={`/profile/${user.username}`} className="flex w-full cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profilim</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard/artworks/create" className="flex w-full cursor-pointer">
            <PenSquare className="mr-2 h-4 w-4" />
            <span>Eser Yükle</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard/likes" className="flex w-full cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>Beğendiklerim</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard/collections" className="flex w-full cursor-pointer">
            <BookMarked className="mr-2 h-4 w-4" />
            <span>Koleksiyonlarım</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex w-full cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Ayarlar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
