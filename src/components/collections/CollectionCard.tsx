import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link to={`/collections/${collection.id}`}>
      <Card className="overflow-hidden group">
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <img
              src={collection.cover_image || '/images/placeholder.jpg'}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold">{collection.name}</h3>
          {collection.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {collection.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {collection.artworks?.length || 0} eser
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
