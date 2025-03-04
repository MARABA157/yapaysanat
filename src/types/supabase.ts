import type { Database as DatabaseGenerated } from './supabase-types';

export type Database = DatabaseGenerated;

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Base types from database
export type ArtworkBase = Tables<'artworks'>;
export type CollectionBase = Tables<'collections'>;
export type ProfileBase = Tables<'profiles'>;
export type CommentBase = Tables<'comments'>;
export type LikeBase = Tables<'likes'>;
export type FollowBase = Tables<'follows'>;
export type TagBase = Tables<'tags'>;
export type CollectionArtworkBase = Tables<'collection_artworks'>;

// Extended types with additional fields
export interface Artwork extends ArtworkBase {
  artist?: ProfileBase;
  comments?: CommentBase[];
  likes?: LikeBase[];
}

export interface Collection extends CollectionBase {
  owner?: ProfileBase;
  artworks?: Artwork[];
  stats?: {
    artwork_count: number;
    view_count: number;
    like_count: number;
  };
}

export interface Comment extends CommentBase {
  user?: ProfileBase;
  replies?: Comment[];
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Database operation types
export type ArtworkInsert = Database['public']['Tables']['artworks']['Insert'];
export type ArtworkUpdate = Database['public']['Tables']['artworks']['Update'];
export type ArtworkStats = {
  views_count: number;
  likes_count: number;
  comments_count: number;
};

export type CollectionInsert = Database['public']['Tables']['collections']['Insert'];
export type CollectionUpdate = Database['public']['Tables']['collections']['Update'];

export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentUpdate = Database['public']['Tables']['comments']['Update'];

export type LikeInsert = Database['public']['Tables']['likes']['Insert'];
export type LikeUpdate = Database['public']['Tables']['likes']['Update'];

export type FollowInsert = Database['public']['Tables']['follows']['Insert'];
export type FollowUpdate = Database['public']['Tables']['follows']['Update'];

export type TagInsert = Database['public']['Tables']['tags']['Insert'];
export type TagUpdate = Database['public']['Tables']['tags']['Update'];

export type CollectionArtworkInsert = Database['public']['Tables']['collection_artworks']['Insert'];
export type CollectionArtworkUpdate = Database['public']['Tables']['collection_artworks']['Update'];
