'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, onClear, isLoading }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  // Debounce the input value with 3 second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  // Trigger search when debounced value changes
  useEffect(() => {
    if (debouncedValue.trim()) {
      onSearch(debouncedValue.trim());
    }
  }, [debouncedValue, onSearch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  }, [inputValue, onSearch]);

  const handleClear = useCallback(() => {
    setInputValue('');
    setDebouncedValue('');
    onClear();
  }, [onClear]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 rounded-2xl p-2 shadow-glass">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for GIFs..."
              className="w-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 rounded-xl px-12 py-4 text-lg transition-all duration-300 shadow-lg focus:shadow-xl dark:text-white dark:placeholder-gray-400"
              disabled={isLoading}
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-glow disabled:bg-gray-300 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200 active:scale-95"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </form>
  );
}
