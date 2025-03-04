import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/useToast';
import type { Collection } from '@/types/models';

interface CollectionCardProps {
  collection: Collection;
  currentUserId?: string;
  onEdit?: (collection: Collection) => void;
  onDelete?: (collectionId: string) => void;
}

export function CollectionCard({
  collection,
  currentUserId,
  onEdit,
  onDelete,
}: CollectionCardProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const isOwner = currentUserId === collection.user_id;

  const handleClick = () => {
    navigate(`/collections/${collection.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(collection);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onDelete) return;

    try {
      await onDelete(collection.id);
      showToast('Koleksiyon başarıyla silindi', 'success');
    } catch (error) {
      showToast('Koleksiyon silinirken bir hata oluştu', 'error');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer bg-card rounded-lg overflow-hidden shadow-lg"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={collection.cover_image}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
        {collection.description && (
          <p className="text-sm text-gray-200 line-clamp-2">{collection.description}</p>
        )}
      </div>

      {isOwner && (
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit2 className="mr-2 h-4 w-4" />
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </motion.div>
  );
}
