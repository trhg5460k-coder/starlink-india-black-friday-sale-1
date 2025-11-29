'use client';

import Image from 'next/image';
import { ChevronRight, Play } from 'lucide-react';

const InstallationGuide = () => {
    return (
        <section className="bg-black text-white py-16 md:py-24">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
                    
                    <div className="text-left">
                        <h2 className="font-display text-[45px] font-bold uppercase leading-tight tracking-[-0.01em]">
                            GET ONLINE IN MINUTES
                        </h2>
                        
                        <p className="mt-6 text-lg text-white/70">
                            Set up Starlink with just two steps. Instructions work in either order:
                        </p>
                        
                        <div className="mt-10 space-y-8">
                            <div className="flex items-center">
                                <div className="w-1 bg-white/20 mr-6 self-stretch"></div>
                                <p className="font-display text-[36px] font-bold uppercase leading-none tracking-wide">1 PLUG IT IN</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-1 bg-white/20 mr-6 self-stretch"></div>
                                <p className="font-display text-[36px] font-bold uppercase leading-none tracking-wide">2 POINT AT SKY</p>
                            </div>
                        </div>

                        <p className="mt-10 text-base text-white/90">
                           Starlink requires an unobstructed view of the sky. Download the Starlink app to determine your best install location.
                        </p>

                        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                            <a href="https://play.google.com/store/apps/details?id=com.starlink.mobile" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold uppercase tracking-wider text-white hover:underline">
                                Download for android
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </a>
                            <a href="https://apps.apple.com/app/starlink/id1537177988" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold uppercase tracking-wider text-white hover:underline">
                                Download for iOS
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </a>
                        </div>
                    </div>
                    
                    <div className="mt-12 lg:mt-0">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full">
                            <Image
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_install_m-4.jpg"
                                alt="Starlink dish installation on a residential roof with a clear sky."
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <button
                                    aria-label="Play Video"
                                    className="group relative w-32 h-32 flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 bg-black/20 rounded-full backdrop-blur-sm group-hover:scale-105 transition-transform duration-300 ease-in-out"></div>
                                    <Play 
                                        className="relative w-16 h-16 text-white fill-white transition-transform duration-300 ease-in-out group-hover:scale-110" 
                                        // The original site uses a heavy box-shadow on the SVG path for a glow effect. 
                                        // a drop-shadow filter is the closest CSS equivalent for this non-standard implementation.
                                        style={{ filter: 'drop-shadow(0 0 32px rgba(0, 0, 0, 0.7))' }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstallationGuide;