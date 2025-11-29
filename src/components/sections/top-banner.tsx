'use client';

import React, { useState, useEffect } from 'react';
import { X, Zap, Clock } from 'lucide-react';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-2.5 px-4 md:px-6 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%222%22 cy=%222%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      <div className="relative flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-300 animate-pulse" />
          <span className="font-bold text-xs md:text-sm uppercase tracking-wide">
            🇮🇳 BLACK FRIDAY SALE
          </span>
        </div>
        
        <div className="hidden md:block h-3.5 w-px bg-white/30"></div>
        
        <span className="font-bold text-base md:text-lg text-yellow-300 animate-pulse">
          50% OFF
        </span>
        
        <div className="hidden md:block h-3.5 w-px bg-white/30"></div>
        
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Ends in:</span>
          <div className="flex items-center gap-0.5 font-mono font-bold text-xs">
            <span className="bg-black/30 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
        
        <div className="hidden lg:block h-3.5 w-px bg-white/30"></div>
        
        <span className="text-xs opacity-90 hidden sm:inline">
          Pre-booking Open Now for India 🚀
        </span>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default TopBanner;