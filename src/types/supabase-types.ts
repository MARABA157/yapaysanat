export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      artworks: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string | null;
          image_url: string;
          user_id: string;
          style: string | null;
          status: 'pending' | 'approved' | 'rejected';
          views_count: number;
          likes_count: number;
          comments_count: number;
          category: string | null;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description?: string | null;
          image_url: string;
          user_id: string;
          style?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          category?: string | null;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string | null;
          image_url?: string;
          user_id?: string;
          style?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          category?: string | null;
          tags?: string[] | null;
        };
      };
      artwork_stats: {
        Row: {
          artwork_id: string;
          views_count: number;
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          artwork_id: string;
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          artwork_id?: string;
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      collection_artworks: {
        Row: {
          collection_id: string;
          artwork_id: string;
          created_at: string;
        };
        Insert: {
          collection_id: string;
          artwork_id: string;
          created_at?: string;
        };
        Update: {
          collection_id?: string;
          artwork_id?: string;
          created_at?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string | null;
          user_id: string;
          is_public: boolean;
          cover_image: string | null;
          artwork_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description?: string | null;
          user_id: string;
          is_public?: boolean;
          cover_image?: string | null;
          artwork_count?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string | null;
          user_id?: string;
          is_public?: boolean;
          cover_image?: string | null;
          artwork_count?: number;
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          content: string;
          user_id: string;
          artwork_id: string;
          parent_id: string | null;
          likes_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          content: string;
          user_id: string;
          artwork_id: string;
          parent_id?: string | null;
          likes_count?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          content?: string;
          user_id?: string;
          artwork_id?: string;
          parent_id?: string | null;
          likes_count?: number;
        };
      };
      follows: {
        Row: {
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: {
          follower_id?: string;
          following_id?: string;
          created_at?: string;
        };
      };
      likes: {
        Row: {
          user_id: string;
          artwork_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          artwork_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          artwork_id?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          avatar_url: string | null;
          website: string | null;
          bio: string | null;
          role: 'user' | 'admin';
          email: string;
          preferences: Json | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          full_name: string;
          avatar_url?: string | null;
          website?: string | null;
          bio?: string | null;
          role?: 'user' | 'admin';
          email: string;
          preferences?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          avatar_url?: string | null;
          website?: string | null;
          bio?: string | null;
          role?: 'user' | 'admin';
          email?: string;
          preferences?: Json | null;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          category: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          category?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          category?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
