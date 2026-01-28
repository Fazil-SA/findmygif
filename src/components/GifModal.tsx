'use client';

import { Gif } from '@/types/gif';
import { useEffect, useState } from 'react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface GifModalProps {
  gif: Gif | null;
  onClose: () => void;
}

export default function GifModal({ gif, onClose }: GifModalProps) {
  const [copied, setCopied] = useState(false);

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

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(gif.images.original.url);
    setCopied(true);
    toast.success('GIF URL copied to clipboard!', {
      icon: <Check className="w-4 h-4" />
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="relative max-w-4xl w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-neutral-800 animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-neutral-800/90 hover:bg-red-500 hover:text-white hover:rotate-90 rounded-full p-2 transition-all duration-300 shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative bg-gray-100 dark:bg-neutral-800">
            <img
              src={gif.images.downsized_large?.url || gif.images.original.url}
              alt={gif.title || 'GIF'}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {gif.title || 'Untitled GIF'}
            </h2>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg transition-all duration-200 text-sm font-semibold flex items-center gap-2 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                View on Giphy
              </a>
              <button
                onClick={handleCopyUrl}
                className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-700 transition-all duration-200 text-sm font-semibold flex items-center gap-2 active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy URL'}
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
    </>
  );
}
