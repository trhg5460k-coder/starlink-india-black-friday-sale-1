import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SpaceXEngineeringFeature = () => {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_feature3_m-6.jpg"
          alt="SpaceX rocket launching, illustrating the engineering behind Starlink"
          fill
          className="object-cover object-center"
          quality={85}
        />
        {/* Gradient for mobile (centered text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden" />
        
        {/* Gradient for desktop (left-aligned text) */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black/70 to-70% to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container">
        <div className="flex items-center min-h-[70vh] lg:min-h-[85vh] py-16 sm:py-20 md:py-24">
          <div className="max-w-[600px] text-center lg:text-left mx-auto lg:mx-0 px-5 sm:px-0">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-primary-text">
              ENGINEERED BY SPACEX
            </h2>
            <p className="mt-6 text-base md:text-lg text-secondary-text leading-relaxed">
              As the world's leading provider of launch services – and the only provider with an orbital class reusable rocket – SpaceX has deep experience with both spacecraft and on-orbit operations.
            </p>
            <div className="mt-8">
              <Link
                href="/technology"
                className="inline-block w-full sm:w-auto text-center border border-white/80 rounded-lg py-3 px-8 text-sm font-bold uppercase tracking-wider text-secondary-cta-text transition-colors duration-300 hover:bg-primary-cta hover:text-primary-cta-text"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceXEngineeringFeature;