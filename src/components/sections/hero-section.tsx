'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Shield, Zap, Star, ArrowRight, Check, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { InlinePrebookingCount } from '@/components/prebooking-counter';
import VideoModal from '@/components/video-modal';

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center text-white overflow-hidden font-body">
        {/* Background Image with responsive sources */}
        <div className="absolute inset-0 z-10">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_hero_m-1.jpg"
            alt="Starlink satellite dish on a roof under a starry night sky"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            quality={90}
            priority
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
        </div>

        {/* Centered Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 md:px-5 max-w-5xl pt-20 md:pt-40 pb-12 md:pb-20">
          <h1
            className="font-display font-bold uppercase text-[2.2rem] leading-[1.05] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] [text-shadow:0_2px_10px_rgba(0,0,0,0.7)] tracking-tight mb-4 md:mb-8"
          >
            HIGH-SPEED SATELLITE INTERNET
            <span className="block text-yellow-400 mt-2">NOW IN INDIA 🇮🇳</span>
          </h1>

          {/* Compact Sale Badge */}
          <div className="mt-3 md:mt-8 inline-flex items-center gap-3 md:gap-6 bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-xl px-4 md:px-6 py-3 md:py-4">
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-red-400 font-semibold">Black Friday</p>
              <p className="text-lg md:text-2xl font-bold">
                <span className="line-through text-white/40 text-sm md:text-lg">₹30,000</span>
                <span className="text-green-400 ml-2">₹15,000</span>
              </p>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="bg-red-600 text-white font-bold text-lg md:text-2xl px-3 py-1.5 rounded-lg">
              50% OFF
            </div>
          </div>

          {/* Plan Preview - Updated to match plans page */}
          <div className="mt-3 md:mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              <span>50-150 Mbps: <span className="line-through text-white/50">₹3,000</span> <span className="text-green-400 font-bold">₹2,250/mo</span></span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <Check className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
              <span>Free Installation</span>
            </div>
          </div>

          {/* PROMINENT CENTERED CTA - Pre-Book Button First */}
          <div className="mt-5 md:mt-10 w-full max-w-xs md:max-w-none">
            <Link
              href="/personal"
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold uppercase tracking-wider text-base md:text-lg px-10 md:px-12 py-4 md:py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] flex items-center justify-center gap-3 w-full md:w-auto md:inline-flex shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-pulse-slow"
            >
              <span className="text-lg md:text-xl">Pre-Book Now</span>
              <ArrowRight className="h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </Link>
          </div>

          {/* Watch Demo - Secondary */}
          <div className="mt-3 md:mt-4 flex items-center justify-center">
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
            >
              <PlayCircle className="h-7 w-7 md:h-9 md:w-9 group-hover:scale-110 transition-transform" />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wide">Watch Demo</span>
            </button>
          </div>

          {/* Powered by SpaceX & Guarantee */}
          <div className="mt-3 md:mt-4 flex flex-col items-center gap-2 text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              <span>Powered by SpaceX • 30-Day Money Back Guarantee</span>
            </div>
          </div>

          {/* COMPACT PREBOOKING COUNTER - Moved up for mobile visibility */}
          <div className="mt-4 md:mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50 animate-pulse"></div>
              <div className="relative w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-muted-foreground">Pre-bookings:</span>
            <span className="text-lg font-bold text-white">
              <InlinePrebookingCount />
            </span>
          </div>

          {/* Social Proof - Simplified for mobile */}
          <div className="mt-4 md:mt-12 flex flex-col items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-xs md:text-sm font-medium">4.8/5 from 2M+ users</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs md:text-sm text-white/70">
              <span><strong className="text-white">98%</strong> satisfaction rate</span>
              <div className="hidden sm:block h-4 w-px bg-white/30"></div>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Calendar className="h-3.5 w-3.5" />
                <strong>Shipping starts Jan 2026</strong>
              </span>
            </div>
          </div>

          {/* Trust Icons - NOW VISIBLE on mobile */}
          <div className="flex mt-6 md:mt-8 items-center justify-center gap-4 md:gap-8 opacity-80 md:opacity-60">
            <div className="text-center">
              <p className="text-base md:text-2xl font-bold">99.9%</p>
              <p className="text-[9px] md:text-xs uppercase tracking-wider">Uptime</p>
            </div>
            <div className="h-6 md:h-8 w-px bg-white/30"></div>
            <div className="text-center">
              <p className="text-base md:text-2xl font-bold">20ms</p>
              <p className="text-[9px] md:text-xs uppercase tracking-wider">Latency</p>
            </div>
            <div className="h-6 md:h-8 w-px bg-white/30"></div>
            <div className="text-center">
              <p className="text-base md:text-2xl font-bold">6000+</p>
              <p className="text-[9px] md:text-xs uppercase tracking-wider">Satellites</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - This is the bouncing icon */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 md:w-1.5 md:h-3 bg-white/80 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Video Modal - Updated to use webm video */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://starlink.com/public-files/videos/base/Starlink_V4_Hero_Video.webm"
        title="Starlink Demo - High-Speed Satellite Internet"
      />
    </>
  );
};

export default HeroSection;