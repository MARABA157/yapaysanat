import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Artwork } from '../../types/artwork'; // Artwork tipini import edin
import { getArtworkById } from '../../services/artworkService'; // Eser detaylarını getiren bir servis fonksiyonu

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtwork() {
      try {
        if (id) {
          const artworkData = await getArtworkById(id);
          setArtwork(artworkData);
        }
      } catch (err) {
        setError('Eser yüklenirken bir hata oluştu.');
        console.error('Error fetching artwork:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArtwork();
  }, [id]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (!artwork) return <div>Eser bulunamadı.</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
      <img 
        src={artwork.imageUrl} 
        alt={artwork.title} 
        className="w-full max-w-2xl mx-auto mb-4 rounded-lg shadow-lg"
      />
      <p className="text-xl mb-2">Sanatçı: {artwork.artist}</p>
      <p className="text-gray-700 mb-4">{artwork.description}</p>
      <p className="text-sm text-gray-500">Eser ID: {id}</p>
    </div>
  );
}