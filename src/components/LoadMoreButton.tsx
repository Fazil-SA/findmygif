'use client';

import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  currentCount: number;
  totalCount: number;
}

export default function LoadMoreButton({
  onLoadMore,
  isLoading,
  hasMore,
  currentCount,
  totalCount,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-8 animate-fadeInUp">
        <p className="text-gray-500 dark:text-gray-400">
          You&apos;ve reached the end! 🎉 ({currentCount} GIFs loaded)
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8 animate-fadeInUp">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center px-4">
        Showing {currentCount} of {totalCount.toLocaleString()} GIFs
      </p>
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200 active:scale-95 flex items-center gap-2 text-sm sm:text-base"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            Loading...
          </>
        ) : (
          'Load More GIFs'
        )}
      </button>
    </div>
  );
}
