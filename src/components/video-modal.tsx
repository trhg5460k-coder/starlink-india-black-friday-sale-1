'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Close on ESC key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Check if the URL is a direct video file (webm, mp4, etc.) or an embed URL
  const isDirectVideo = videoUrl.match(/\.(webm|mp4|ogg)$/i);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 bg-black rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-bold">{title || 'Starlink Demo'}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          {isDirectVideo ? (
            <video
              className="absolute inset-0 w-full h-full"
              controls
              autoPlay
              playsInline
            >
              <source src={videoUrl} type={`video/${videoUrl.split('.').pop()}`} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={videoUrl}
              title={title || 'Starlink Video'}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5">
          <p className="text-sm text-muted-foreground">
            Learn more about Starlink's revolutionary satellite internet technology
          </p>
        </div>
      </div>
    </div>
  );
}