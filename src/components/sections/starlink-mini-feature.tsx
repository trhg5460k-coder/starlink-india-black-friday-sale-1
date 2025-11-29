import React from 'react';
import Link from 'next/link';

const StarlinkMiniFeature = () => {
  return (
    <section className="relative w-full min-h-[640px] md:min-h-[700px] flex items-center justify-center md:justify-end bg-black text-white">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_feature_mini_m-3.jpg')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>

      <div className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="flex justify-center md:justify-end">
          <div className="w-full md:w-[60%] lg:w-7/12 xl:w-1/2 bg-black/60 backdrop-blur-md rounded-lg p-8 lg:p-12 text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl lg:text-[45px] font-bold uppercase text-primary-text mb-6">
              Starlink Mini
            </h2>
            <p className="font-body text-base text-secondary-text mb-8 leading-relaxed">
              Starlink Mini is a compact, portable kit that can easily fit in a backpack, designed to provide high-speed, low-latency internet on the go. It includes a built-in WiFi router, lower power consumption, DC power input, and max download speeds over 100 Mbps.
            </p>
            <div className="flex flex-col items-center md:items-start">
              <Link href="/roam" legacyBehavior>
                <a className="inline-block font-display text-sm font-bold uppercase tracking-wider text-secondary-cta-text border-[1px] border-secondary-cta-border rounded-lg py-3 px-8 transition-colors duration-300 hover:bg-primary-cta hover:text-primary-cta-text">
                  Learn More
                </a>
              </Link>
              <p className="text-sm text-tertiary-text mt-4">
                Available in India Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StarlinkMiniFeature;