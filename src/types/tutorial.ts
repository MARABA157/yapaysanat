import type { ProfileBase } from './supabase';

export interface Tutorial {
  id: string;
  created_at: string;
  updated_at: string | null;
  title: string;
  description: string;
  video_url: string;
  image_url: string | null;
  category: 'beginner' | 'intermediate' | 'advanced';
  user_id: string;
  views_count: number;
  likes_count: number;
  author?: ProfileBase;
}

export type TutorialWithAuthor = Tutorial & {
  author: ProfileBase;
};

export type TutorialCategory = Tutorial['category'];

export type TutorialStats = {
  views_count: number;
  likes_count: number;
  completion_rate?: number;
};

export type TutorialFilters = {
  category?: TutorialCategory;
  level?: string;
  duration?: string;
  tags?: string[];
};
