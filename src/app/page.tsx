'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import GifGrid from '@/components/GifGrid';
import GifModal from '@/components/GifModal';
import { Gif } from '@/types/gif';
import { searchGifs } from '@/lib/api';

export default function Home() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchQuery(query);
    setHasSearched(true);

    try {
      const response = await searchGifs(query, 24);
      setGifs(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GIFs');
      setGifs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGifClick = useCallback((gif: Gif) => {
    setSelectedGif(gif);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedGif(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GIF Explorer
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Search and discover amazing GIFs
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            <p className="font-semibold">Error: {error}</p>
            <p className="text-sm mt-1">
              {error.includes('API key') && (
                <>
                  Please add your Giphy API key to <code className="bg-red-100 px-1 rounded">.env.local</code>
                </>
              )}
            </p>
          </div>
        )}

        {hasSearched && !isLoading && !error && (
          <div className="mb-4 text-gray-600">
            <p>
              Found <span className="font-semibold text-gray-900">{gifs.length}</span> results
              {searchQuery && (
                <> for <span className="font-semibold text-gray-900">&quot;{searchQuery}&quot;</span></>
              )}
            </p>
          </div>
        )}

        {!hasSearched && !isLoading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Start Searching for GIFs
            </h2>
            <p className="text-gray-500">
              Enter a keyword above to find amazing GIFs
            </p>
          </div>
        ) : (
          <GifGrid
            gifs={gifs}
            isLoading={isLoading}
            onGifClick={handleGifClick}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>
            Powered by{' '}
            <a
              href="https://giphy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              Giphy
            </a>
          </p>
        </div>
      </footer>

      <GifModal gif={selectedGif} onClose={handleCloseModal} />
    </div>
  );
}
