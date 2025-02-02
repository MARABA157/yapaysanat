import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Masonry from 'react-masonry-css';

const GalleryContainer = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.primary.white};
`;

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const GalleryTitle = styled(motion.h2)`
  color: ${theme.colors.accent.darkGray};
  margin-bottom: ${theme.spacing.lg};
`;

const GalleryDescription = styled(motion.p)`
  color: ${theme.colors.accent.darkGray};
  max-width: 600px;
  margin: 0 auto;
`;

const MasonryGrid = styled(Masonry)`
  display: flex;
  width: 100%;
  gap: ${theme.spacing.md};
  padding: 0 ${theme.spacing.xl};

  & > div {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const ArtworkCard = styled(motion.div)`
  position: relative;
  border-radius: ${theme.layout.radius.lg};
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .artwork-info {
      opacity: 1;
    }
  }
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform ${theme.transitions.medium};

  ${ArtworkCard}:hover & {
    transform: scale(1.05);
  }
`;

const ArtworkInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.spacing.lg};
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0)
  );
  color: ${theme.colors.primary.white};
  opacity: 0;
  transition: opacity ${theme.transitions.medium};
  class-name: "artwork-info";
`;

const ArtworkTitle = styled.h3`
  font-size: ${theme.typography.body.sizes.regular};
  font-weight: ${theme.typography.body.weights.bold};
  margin-bottom: ${theme.spacing.xs};
`;

const ArtworkArtist = styled.p`
  font-size: ${theme.typography.body.sizes.small};
  opacity: 0.8;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  padding: 0 ${theme.spacing.xl};
`;

const FilterButton = styled(motion.button)<{ isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.layout.radius.full};
  background: ${props => props.isActive ? theme.colors.primary.gold : theme.colors.accent.softGray};
  color: ${props => props.isActive ? theme.colors.primary.white : theme.colors.accent.darkGray};
  font-weight: ${theme.typography.body.weights.medium};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${props => props.isActive ? theme.colors.primary.gold : theme.colors.accent.pastelBlue};
    transform: ${theme.effects.hover.scale};
  }
`;

const LoadMoreButton = styled(motion.button)`
  display: block;
  margin: ${theme.spacing.xl} auto 0;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary.gold};
  color: ${theme.colors.primary.white};
  border-radius: ${theme.layout.radius.full};
  font-weight: ${theme.typography.body.weights.bold};
`;

interface Artwork {
  id: string;
  title: string;
  artist: string;
  image: string;
  category: string;
}

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const artworks = [
  {
    id: 1,
    title: "Yağlı Boya Portre",
    artist: "Ahmet Yılmaz",
    image: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg",
    category: "Portre"
  },
  {
    id: 2,
    title: "Modern Soyut",
    artist: "Zeynep Kaya",
    image: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg",
    category: "Soyut"
  },
  {
    id: 3,
    title: "Şehir Manzarası",
    artist: "Mehmet Demir",
    image: "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg",
    category: "Manzara"
  },
  {
    id: 4,
    title: "Natürmort",
    artist: "Ayşe Can",
    image: "https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg",
    category: "Natürmort"
  },
  {
    id: 5,
    title: "Deniz Manzarası",
    artist: "Can Yıldız",
    image: "https://images.pexels.com/photos/1931379/pexels-photo-1931379.jpeg",
    category: "Manzara"
  }
];

export const Gallery: React.FC = () => {
  const [visibleArtworks, setVisibleArtworks] = useState<Artwork[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const filters = [
    { id: 'all', label: 'Tümü' },
    { id: 'painting', label: 'Resim' },
    { id: 'digital', label: 'Dijital' },
    { id: 'sculpture', label: 'Heykel' },
    { id: 'photography', label: 'Fotoğraf' },
  ];

  useEffect(() => {
    const filtered = artworks.filter(
      artwork => activeFilter === 'all' || artwork.category === activeFilter
    );
    setVisibleArtworks(filtered.slice(0, page * itemsPerPage));
  }, [activeFilter, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <GalleryContainer>
      <GalleryHeader>
        <GalleryTitle
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Keşfet
        </GalleryTitle>
        <GalleryDescription
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          En yeni ve etkileyici sanat eserlerini keşfedin. AI destekli galeri deneyimi ile sanata yeni bir bakış açısı kazanın.
        </GalleryDescription>
      </GalleryHeader>

      <FilterContainer>
        {filters.map(filter => (
          <FilterButton
            key={filter.id}
            isActive={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </FilterButton>
        ))}
      </FilterContainer>

      <MasonryGrid
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        <AnimatePresence>
          {visibleArtworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArtworkImage src={artwork.image} alt={artwork.title} loading="lazy" />
              <ArtworkInfo>
                <ArtworkTitle>{artwork.title}</ArtworkTitle>
                <ArtworkArtist>{artwork.artist}</ArtworkArtist>
              </ArtworkInfo>
            </ArtworkCard>
          ))}
        </AnimatePresence>
      </MasonryGrid>

      {visibleArtworks.length < artworks.length && (
        <LoadMoreButton
          onClick={loadMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Daha Fazla Yükle
        </LoadMoreButton>
      )}
    </GalleryContainer>
  );
};
