"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ');

export default function NavigationHeader() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const navItems = [
    { label: "RESIDENTIAL", href: "/personal" },
    { label: "ROAM", href: "/personal?type=roam" }
  ];

  const drawerMainLinks = [
    { label: "RESIDENTIAL", href: "/personal" },
    { label: "ROAM", href: "/personal?type=roam" },
    { label: "CHECKOUT", href: "/checkout" },
  ];

  const drawerSupportLinks = [
    { label: "Help Center", href: "#" },
    { label: "Availability", href: "/personal" },
    { label: "Service Plans", href: "/personal" },
    { label: "For Business", href: "/business" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 font-['D-DIN']">
        <div className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-md"></div>
        <nav className="relative z-10 flex h-[72px] md:h-[80px] items-center justify-between px-5 md:px-10 lg:px-20">
          
          <div className="flex items-center gap-10">
            <Link href="/" aria-label="Home">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/Starlink_Name_White-7.png"
                alt="Starlink"
                width={210}
                height={26}
                priority
                className="w-auto h-[18px] md:h-[26px]"
              />
            </Link>
            <div className="hidden lg:flex items-center justify-center gap-8">
              {navItems.map(item => (
                  <Link key={item.label} href={item.href} className="text-white font-semibold text-sm uppercase tracking-wider hover:underline">{item.label}</Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/personal" className="text-white font-semibold text-sm uppercase tracking-wider hover:underline">Personal</Link>
              <div className="h-4 w-px bg-white/50"></div>
              <Link href="/business" className="text-white font-semibold text-sm uppercase tracking-wider hover:underline">Business</Link>
            </div>
            
            <Link 
              href="/personal" 
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg hover:scale-105 transition-transform"
            >
              <span>Pre-Book Now</span>
            </Link>
            
            <button 
                className="lg:hidden" 
                onClick={() => setDrawerOpen(true)}
                aria-label="Open Menu"
            >
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/svgs/Menu_Hamburger-3.svg"
                alt="Open Menu"
                width={24}
                height={16}
              />
            </button>
          </div>

        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-40 transition-opacity duration-300",
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setDrawerOpen(false)}
      ></div>

      {/* Side Drawer */}
      <aside className={cn(
          "fixed top-0 right-0 h-full h-dvh w-[310px] bg-black z-50 transform transition-transform duration-300 ease-in-out font-['D-DIN']",
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-6 pb-2">
              <button onClick={() => setDrawerOpen(false)} aria-label="Close Menu">
                  <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/svgs/Menu_X-1.svg"
                      alt="Close Menu"
                      width={18}
                      height={18}
                  />
              </button>
          </div>
          <nav className="flex flex-col items-end text-right px-10 pt-6 overflow-y-auto">
              <div className="flex items-center gap-4 border-b border-white/20 pb-4 w-full justify-end">
                  <Link href="/personal" className="font-semibold uppercase text-white hover:underline" onClick={() => setDrawerOpen(false)}>Personal</Link>
                  <div className="h-4 w-px bg-white/50"></div>
                  <Link href="/business" className="font-semibold uppercase text-white hover:underline" onClick={() => setDrawerOpen(false)}>Business</Link>
              </div>

              <div className="w-full mt-4">
                <Link 
                  href="/personal" 
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-sm uppercase tracking-wider px-4 py-3 rounded-lg hover:scale-105 transition-transform w-full"
                >
                  <span>Pre-Book Now - 50% OFF</span>
                </Link>
              </div>

              <div className="w-full mt-4 space-y-2">
                  {drawerMainLinks.map(item => (
                       <Link key={item.label} href={item.href} onClick={() => setDrawerOpen(false)} className="block py-1 text-right font-semibold uppercase text-white transition-colors hover:underline">
                          {item.label}
                      </Link>
                  ))}
              </div>

              <div className="w-full mt-4">
                  <button className="flex items-center gap-2 py-1 text-right font-semibold uppercase text-white transition-colors hover:underline ml-auto">
                      <span>IN</span>
                      <Image
                          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/svgs/Language_Globe-2.svg"
                          alt="Choose Language"
                          width={20}
                          height={20}
                      />
                  </button>
              </div>

              <div className="w-full border-t border-white/20 mt-4 pt-4 space-y-2">
                  {drawerSupportLinks.map(item => (
                      <Link key={item.label} href={item.href} onClick={() => setDrawerOpen(false)} className="block py-1 text-right font-semibold uppercase text-white/70 transition-colors hover:text-white hover:underline text-sm">
                          {item.label}
                      </Link>
                  ))}
              </div>
          </nav>
        </div>
      </aside>
    </>
  );
}