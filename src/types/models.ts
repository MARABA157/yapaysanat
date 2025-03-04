export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string;
  website?: string;
  bio?: string;
  role: 'user' | 'admin';
  preferences: any;
  created_at: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  user_id: string;
  artist: string;
  style?: string;
  category?: string;
  tags?: string[];
  status: 'pending' | 'approved' | 'rejected';
  views_count: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  cover_image: string;
  is_private: boolean;
  featured: boolean;
  artwork_count: number;
  created_at: string;
}

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  artwork_id: string;
  created_at: string;
  user?: User;
}

export interface CommentWithUser extends Comment {
  user: User;
}

export type Creator = User;

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio?: string;
}
