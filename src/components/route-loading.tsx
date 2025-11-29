'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function RouteLoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show loading when route starts changing
    const handleStart = () => setIsLoading(true);
    
    // Hide loading when route change completes
    const handleComplete = () => setIsLoading(false);

    // Set a timeout to hide loading screen if it takes too long
    let timeout: NodeJS.Timeout;
    
    if (isLoading) {
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Force hide after 3 seconds
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [pathname, searchParams, isLoading]);

  // Show loading on mount briefly
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
          <div className="absolute inset-0 h-12 w-12 border-2 border-white/20 rounded-full"></div>
        </div>
        <p className="text-white text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
