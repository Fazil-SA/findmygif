'use client';

import { Gif } from '@/types/gif';
import { useEffect } from 'react';

interface GifModalProps {
  gif: Gif | null;
  onClose: () => void;
}

export default function GifModal({ gif, onClose }: GifModalProps) {
  useEffect(() => {
    if (gif) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [gif, onClose]);

  if (!gif) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative bg-gray-100">
          <img
            src={gif.images.downsized_large?.url || gif.images.original.url}
            alt={gif.title || 'GIF'}
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
          />
        </div>

        <div className="p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {gif.title || 'Untitled GIF'}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            {gif.user?.display_name && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">By:</span>
                <span>{gif.user.display_name}</span>
              </div>
            )}

            {gif.rating && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Rating:</span>
                <span className="uppercase">{gif.rating}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <a
              href={gif.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
            >
              View on Giphy
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(gif.images.original.url);
                alert('GIF URL copied to clipboard!');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-semibold"
            >
              Copy URL
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
