'use client';

import { Gif } from '@/types/gif';
import { useState } from 'react';

interface GifCardProps {
  gif: Gif;
  onClick: () => void;
}

export default function GifCard({ gif, onClick }: GifCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group bg-gray-200 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:-translate-y-2 hover:shadow-glow transition-all duration-300"
    >
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title || 'GIF'}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/40">
          <h3 className="text-white font-semibold text-sm line-clamp-2">
            {gif.title || 'Untitled'}
          </h3>
          {gif.user?.display_name && (
            <p className="text-white/80 text-xs mt-1">
              by {gif.user.display_name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
