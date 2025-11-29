'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function GeoLocationGuard() {
  const [isChecking, setIsChecking] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('/api/check-location');
        const data = await response.json();
        
        if (!data.allowed) {
          // Redirect to official Starlink website
          window.location.href = 'https://www.starlink.com';
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Location check failed:', error);
        // Fail open - allow access if check fails
        setIsChecking(false);
      }
    };

    checkLocation();
  }, [pathname]);

  // Show loading screen while checking
  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-sm">Checking availability...</p>
        </div>
      </div>
    );
  }

  return null;
}
