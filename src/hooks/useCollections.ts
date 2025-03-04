import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';
import type { Collection } from '@/types';

type CollectionFilters = {
  userId?: string;
  status?: 'public' | 'private';
};

export function useCollections(initialFilters: CollectionFilters = {}) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CollectionFilters>(initialFilters);
  const { toast } = useToast();

  useEffect(() => {
    fetchCollections();
  }, [filters]);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('collections')
        .select('*, artworks(*)')
        .order('created_at', { ascending: false });

      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;

      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setError('Koleksiyonlar yüklenirken bir hata oluştu');
      toast({
        title: 'Hata',
        description: 'Koleksiyonlar yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async (collection: Partial<Collection>) => {
    try {
      const { data, error } = await supabase.from('collections').insert(collection);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Koleksiyon başarıyla oluşturuldu',
      });

      await fetchCollections();
      return true;
    } catch (error) {
      console.error('Error creating collection:', error);
      toast({
        title: 'Hata',
        description: 'Koleksiyon oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateCollection = async (id: string, collection: Partial<Collection>) => {
    try {
      const { error } = await supabase
        .from('collections')
        .update(collection)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Koleksiyon başarıyla güncellendi',
      });

      await fetchCollections();
      return true;
    } catch (error) {
      console.error('Error updating collection:', error);
      toast({
        title: 'Hata',
        description: 'Koleksiyon güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      const { error } = await supabase.from('collections').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Koleksiyon başarıyla silindi',
      });

      await fetchCollections();
      return true;
    } catch (error) {
      console.error('Error deleting collection:', error);
      toast({
        title: 'Hata',
        description: 'Koleksiyon silinirken bir hata oluştu',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateFilters = (newFilters: Partial<CollectionFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    collections,
    loading,
    error,
    filters,
    updateFilters,
    createCollection,
    updateCollection,
    deleteCollection,
    refetch: fetchCollections,
  };
}
