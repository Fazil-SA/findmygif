'use client';

import { Gif } from '@/types/gif';
import GifCard from './GifCard';
import LoadingState from './LoadingState';

interface GifGridProps {
  gifs: Gif[];
  isLoading: boolean;
  onGifClick: (gif: Gif) => void;
}

export default function GifGrid({ gifs, isLoading, onGifClick }: GifGridProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (gifs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No GIFs found
        </h2>
        <p className="text-gray-500">
          Try searching with different keywords
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gifs.map((gif) => (
        <GifCard
          key={gif.id}
          gif={gif}
          onClick={() => onGifClick(gif)}
        />
      ))}
    </div>
  );
}
