// User types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  full_name?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

// Artist types
export interface Artist extends User {
  artworks?: Artwork[];
}

// Artwork types
export interface Artwork {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  user_id: string;
  artist_id: string;
  artist?: Artist;
  created_at?: string;
  updated_at?: string;
  category?: string;
  tags?: string[];
}

// Collection types
export interface Collection {
  id: string;
  name: string;
  description?: string;
  cover_image?: string;
  user_id: string;
  artworks?: Artwork[];
  is_private?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
}
