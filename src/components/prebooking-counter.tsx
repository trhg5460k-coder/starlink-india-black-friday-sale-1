'use client';

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

// Updated constants for the counter
const INITIAL_COUNT = 113928;
const TARGET_COUNT = 200000;
const INCREMENT_INTERVAL_MS = 5000; // Increment every 5 seconds for more dynamic feel
const INCREMENT_AMOUNT_MIN = 1;
const INCREMENT_AMOUNT_MAX = 3;

// Helper to get a random number
const getRandomIncrement = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Format number with commas (Indian style: 1,13,928)
const formatIndianNumber = (num: number): string => {
  const str = num.toString();
  let result = '';
  let count = 0;
  
  for (let i = str.length - 1; i >= 0; i--) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      result = ',' + result;
    }
    result = str[i] + result;
    count++;
  }
  
  return result;
};

interface PrebookingCounterProps {
  variant?: 'default' | 'compact' | 'large';
  showProgress?: boolean;
  showTarget?: boolean;
  className?: string;
}

export const PrebookingCounter: React.FC<PrebookingCounterProps> = ({
  variant = 'default',
  showProgress = false,
  showTarget = true,
  className = '',
}) => {
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Increment count randomly every few seconds
    const interval = setInterval(() => {
      setCount(prev => {
        const increment = getRandomIncrement(INCREMENT_AMOUNT_MIN, INCREMENT_AMOUNT_MAX);
        const newCount = prev + increment;
        return Math.min(newCount, TARGET_COUNT); // Don't exceed target
      });
    }, INCREMENT_INTERVAL_MS);
    
    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const progressPercentage = (count / TARGET_COUNT) * 100;

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm">
          <strong className="text-white">{formatIndianNumber(count)}</strong>
          <span className="text-white/70"> Indians pre-booked</span>
        </span>
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className={`bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Users className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-green-400 font-semibold">Pre-Bookings</p>
            <p className="text-sm text-white/70">Goal: {formatIndianNumber(TARGET_COUNT)}</p>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl md:text-5xl font-bold text-white">{formatIndianNumber(count)}</span>
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Growing</span>
          </div>
        </div>
        
        {showProgress && (
          <div className="space-y-2">
            <div className="h-3 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/60">
              <span>0</span>
              <span>{Math.round(progressPercentage)}% to goal</span>
              <span>{formatIndianNumber(TARGET_COUNT)}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant - shows count/target format
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <Users className="h-5 w-5 text-green-400" />
        </div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-white">
            {formatIndianNumber(count)}
            <span className="text-muted-foreground text-lg">/{formatIndianNumber(TARGET_COUNT)}</span>
          </p>
          <p className="text-xs text-white/70">Pre-bookings</p>
        </div>
        <div className="flex items-center gap-1 text-green-400">
          <TrendingUp className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

// Inline counter for use in text
export const InlinePrebookingCount: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const interval = setInterval(() => {
      setCount(prev => {
        const increment = getRandomIncrement(INCREMENT_AMOUNT_MIN, INCREMENT_AMOUNT_MAX);
        const newCount = prev + increment;
        return Math.min(newCount, TARGET_COUNT);
      });
    }, INCREMENT_INTERVAL_MS);
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <span className={className}>{formatIndianNumber(INITIAL_COUNT)}</span>;
  }

  return <span className={className}>{formatIndianNumber(count)}/{formatIndianNumber(TARGET_COUNT)}</span>;
};

export default PrebookingCounter;