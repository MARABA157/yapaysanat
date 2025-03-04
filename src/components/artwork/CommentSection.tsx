import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CommentWithUser } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/useToast';

interface CommentSectionProps {
  artworkId: string;
  comments?: CommentWithUser[];
  onAddComment?: (content: string) => Promise<void>;
}

export function CommentSection({ artworkId, comments: propComments, onAddComment }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithUser[]>(propComments || []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!user) {
      showToast('Yorum yapmak için giriş yapmalısınız', 'error');
      return;
    }
    
    setLoading(true);
    try {
      if (onAddComment) {
        await onAddComment(newComment);
      } else {
        // Mock yorum ekleme - gerçek uygulamada API çağrısı yapılacak
        const mockComment: CommentWithUser = {
          id: `comment-${Date.now()}`,
          content: newComment,
          user_id: user.id,
          artwork_id: artworkId,
          created_at: new Date().toISOString(),
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
            role: user.role,
            preferences: user.preferences,
            created_at: user.created_at
          }
        };
        
        setComments(prev => [mockComment, ...prev]);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simüle edilmiş gecikme
      }
      
      setNewComment('');
      showToast('Yorumunuz eklendi', 'success');
    } catch (error) {
      console.error('Yorum eklenirken hata oluştu:', error);
      showToast('Yorum eklenirken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="comments">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorumunuzu yazın..."
          className="min-h-[100px] resize-none"
          disabled={loading || !user}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={loading || !user || !newComment.trim()}
          >
            {loading ? 'Gönderiliyor...' : 'Yorum Ekle'}
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 border-b border-border pb-4">
              <Avatar>
                <AvatarImage src={comment.user.avatar_url} alt={comment.user.full_name} />
                <AvatarFallback>{comment.user.full_name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.full_name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: tr })}
                  </span>
                </div>
                <p className="mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
