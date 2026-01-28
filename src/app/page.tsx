'use client';

import { useState, useCallback, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import GifGrid from '@/components/GifGrid';
import GifModal from '@/components/GifModal';
import DarkModeToggle from '@/components/DarkModeToggle';
import { Gif } from '@/types/gif';
import { searchGifs, getTrendingGifs } from '@/lib/api';
import { Toaster } from 'sonner';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Pagination state
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);

  // Computed
  const hasMoreResults = offset + gifs.length < totalCount;

  // Load trending GIFs on initial page load
  useEffect(() => {
    const loadTrendingGifs = async () => {
      try {
        setIsLoading(true);
        const response = await getTrendingGifs(24, 0);
        setGifs(response.data);
        setTotalCount(response.pagination.total_count);
        setOffset(0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending GIFs');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingGifs();
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchQuery(query);
    setHasSearched(true);
    setOffset(0);

    try {
      const response = await searchGifs(query, 24, 0);
      setGifs(response.data);
      setTotalCount(response.pagination.total_count);
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

  const handleClear = useCallback(async () => {
    setSearchQuery('');
    setHasSearched(false);
    setError(null);
    setIsLoading(true);
    setOffset(0);

    try {
      const response = await getTrendingGifs(24, 0);
      setGifs(response.data);
      setTotalCount(response.pagination.total_count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending GIFs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isPaginationLoading || !hasMoreResults) return;

    setIsPaginationLoading(true);
    setError(null);

    try {
      const nextOffset = offset + 24;

      const response = hasSearched && searchQuery
        ? await searchGifs(searchQuery, 24, nextOffset)
        : await getTrendingGifs(24, nextOffset);

      // Append new GIFs to existing array, filtering out duplicates
      setGifs(prevGifs => {
        const existingIds = new Set(prevGifs.map(g => g.id));
        const newGifs = response.data.filter(gif => !existingIds.has(gif.id));
        return [...prevGifs, ...newGifs];
      });
      setOffset(nextOffset);
      setTotalCount(response.pagination.total_count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more GIFs');
    } finally {
      setIsPaginationLoading(false);
    }
  }, [isPaginationLoading, hasMoreResults, offset, hasSearched, searchQuery]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 transition-colors duration-200 flex flex-col">
        <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10 animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-center relative">
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent">
                  GIF Explorer
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Search and discover amazing GIFs
                </p>
              </div>
              <div className="absolute right-0">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
          <div className="mb-8 animate-scaleIn" style={{ animationDelay: '100ms' }}>
            <SearchBar onSearch={handleSearch} onClear={handleClear} isLoading={isLoading} />
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl backdrop-blur-sm flex items-start gap-3 animate-fadeInUp">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-700 dark:text-red-300">Error: {error}</p>
                {error.includes('API key') && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    Please add your Giphy API key to .env.local
                  </p>
                )}
              </div>
            </div>
          )}

          {!isLoading && !error && gifs.length > 0 && (
            <div className="mb-4 text-gray-600 dark:text-gray-400 animate-fadeInUp">
              <p className="flex items-center gap-2">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-semibold text-sm">
                  {gifs.length}
                </span>
                <span>
                  {hasSearched && searchQuery ? (
                    <>results for <span className="font-semibold text-gray-900 dark:text-gray-100">&quot;{searchQuery}&quot;</span></>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Trending GIFs</span>
                  )}
                </span>
              </p>
            </div>
          )}

          <GifGrid
            gifs={gifs}
            isLoading={isLoading}
            onGifClick={handleGifClick}
            onLoadMore={handleLoadMore}
            isPaginationLoading={isPaginationLoading}
            hasMoreResults={hasMoreResults}
            totalCount={totalCount}
          />
        </main>

        <footer className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-gray-200 dark:border-neutral-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>
              Powered by{' '}
              <a
                href="https://giphy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline font-semibold transition-colors"
              >
                Giphy
              </a>
            </p>
          </div>
        </footer>

        <GifModal gif={selectedGif} onClose={handleCloseModal} />
      </div>
    </>
  );
}
