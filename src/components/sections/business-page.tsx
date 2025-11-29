"use client";

import React from 'react';
import Image from 'next/image';
import { Globe, ShieldCheck, UserCog, TrendingUp, Building2, Wifi, Clock, HeadphonesIcon } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="text-center md:text-left bg-[#0a0a0a]/80 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "text-blue-400", size: 28 })}
    </div>
    <h3 className="font-['D-DIN'] text-lg font-bold uppercase tracking-wide">{title}</h3>
    <p className="font-['Inter'] text-white/70 mt-2 text-sm leading-relaxed">{description}</p>
  </div>
);

const CaseStudyCard = ({ quote, author, image }: { quote: string; author: string; image: string }) => (
  <div className="bg-[#0a0a0a] border border-white/20 rounded-lg overflow-hidden h-full flex flex-col">
    <div className="relative h-48 w-full">
      <Image
        src={image}
        alt="Case study"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
    <div className="p-6 flex-grow flex flex-col justify-between">
      <p className="font-['Inter'] text-sm text-white/90">"{quote}"</p>
      <p className="font-['Inter'] text-xs text-white/70 mt-4 font-semibold">{author}</p>
    </div>
  </div>
);

const PlaceholderPricingTable = () => (
    <div className="mt-12 opacity-40 blur-[2px] select-none pointer-events-none">
      <div className="max-w-4xl mx-auto border border-white/20 rounded-lg bg-[#0a0a0a]/50 overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 font-['D-DIN'] text-xs md:text-sm uppercase text-white/70 border-b border-white/20 bg-white/5">
          <div className="font-bold">FEATURES</div>
          <div className="text-center font-bold">STANDARD</div>
          <div className="text-center font-bold">PRIORITY</div>
          <div className="text-center font-bold">PREMIUM</div>
        </div>
        {[
          { feature: 'Network Priority', values: ['Standard', 'High', 'Highest'] },
          { feature: 'Typical Speeds', values: ['40-220 Mbps', '150-500 Mbps', 'Up to 1Gbps'] },
          { feature: 'Data', values: ['Unlimited', '1TB Priority', '3TB Priority'] },
          { feature: 'Support', values: ['Standard', 'Priority', 'Dedicated'] },
          { feature: 'Hardware', values: ['Included', 'High-Performance', 'High-Performance'] },
        ].map((row, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 p-4 font-['Inter'] text-xs md:text-sm border-t border-white/10">
            <div className="font-semibold text-white/90">{row.feature}</div>
            <div className="text-center text-white/70">{row.values[0]}</div>
            <div className="text-center text-white/70">{row.values[1]}</div>
            <div className="text-center text-white/70">{row.values[2]}</div>
          </div>
        ))}
      </div>
    </div>
);

const UseCaseSection = () => (
  <section className="py-16 md:py-24 overflow-hidden">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-['D-DIN'] text-2xl md:text-4xl font-bold uppercase tracking-wide">
          Enterprise Use Cases
        </h2>
        <p className="mt-4 text-base text-white/70 max-w-2xl mx-auto">
          Powering businesses across industries with reliable satellite connectivity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_feature2_m-5.jpg"
            alt="Remote work connectivity"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="h-5 w-5 text-blue-400" />
              <span className="text-xs uppercase tracking-wider text-blue-400">Remote Operations</span>
            </div>
            <h3 className="font-['D-DIN'] text-xl font-bold">Agriculture & Farming</h3>
            <p className="text-sm text-white/70 mt-1">Connect rural farms across India</p>
          </div>
        </div>
        
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_feature1_m-2.jpg"
            alt="Industrial connectivity"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-blue-400" />
              <span className="text-xs uppercase tracking-wider text-blue-400">Industrial</span>
            </div>
            <h3 className="font-['D-DIN'] text-xl font-bold">Mining & Energy</h3>
            <p className="text-sm text-white/70 mt-1">Power remote industrial sites</p>
          </div>
        </div>
        
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group md:col-span-2 lg:col-span-1">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_install_m-4.jpg"
            alt="Healthcare connectivity"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <HeadphonesIcon className="h-5 w-5 text-blue-400" />
              <span className="text-xs uppercase tracking-wider text-blue-400">Healthcare</span>
            </div>
            <h3 className="font-['D-DIN'] text-xl font-bold">Telemedicine</h3>
            <p className="text-sm text-white/70 mt-1">Enable rural healthcare access</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default function BusinessPage() {
  return (
    <main className="bg-black text-white font-['Inter']">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] w-full flex items-center justify-center">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_feature3_m-6.jpg"
          alt="Enterprise satellite communication background"
          fill
          style={{ objectFit: 'cover' }}
          quality={85}
          className="z-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-20">
          <div className="inline-flex items-center gap-2 mb-6 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Coming Soon to India</span>
          </div>
          <h1 className="font-['D-DIN'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide max-w-4xl">
            Starlink for Businesses
          </h1>
          <p className="font-['Inter'] text-base md:text-lg text-white/80 mt-4 max-w-2xl">
            Enterprise-grade satellite internet designed for mission-critical operations across India
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-['D-DIN'] text-2xl md:text-4xl font-bold uppercase tracking-wide">
              Enterprise Features
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-2xl mx-auto">
              Built for businesses that demand reliability and performance
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Globe />}
              title="Enterprise Connectivity"
              description="High-throughput, low-latency broadband designed for mission-critical operations."
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="Priority Support"
              description="24/7 dedicated support with private network operations center access."
            />
            <FeatureCard
              icon={<UserCog />}
              title="Account Management"
              description="Dedicated account manager for network planning and optimizations."
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="Scalable Solutions"
              description="Flexible plans that grow with your business needs."
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section with Images */}
      <UseCaseSection />

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-[#050505]">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-sm text-white/70">Pricing Available Soon</span>
          </div>
          <h2 className="font-['D-DIN'] text-2xl md:text-4xl font-bold uppercase tracking-wide">
            Enterprise Pricing
          </h2>
          <p className="mt-4 text-base text-white/70 max-w-2xl mx-auto">
            Plans tailored for business needs. Full pricing and feature comparison coming soon.
          </p>
          <PlaceholderPricingTable />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-['D-DIN'] text-2xl md:text-4xl font-bold uppercase tracking-wide">
              Built for Business
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-3xl mx-auto">
              From rural agriculture to global enterprises, Starlink empowers businesses to operate more efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CaseStudyCard
              image="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_feature2_m-5.jpg"
              quote="Enterprise connectivity solutions for logistics and supply chain management across remote regions."
              author="— COMING SOON: LOGISTICS SECTOR"
            />
            <CaseStudyCard
              image="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_feature1_m-2.jpg"
              quote="Reliable connectivity for energy and industrial operations in challenging environments."
              author="— COMING SOON: ENERGY SECTOR"
            />
            <CaseStudyCard
              image="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_install_m-4.jpg"
              quote="High-speed internet enabling telemedicine and remote healthcare services."
              author="— COMING SOON: HEALTHCARE"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-t from-[#0a0a0a] to-black">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-['D-DIN'] text-2xl md:text-4xl font-bold uppercase tracking-wide">
            Get Notified
          </h2>
          <p className="mt-4 text-base text-white/70">
            Be the first to get updates on the launch of Starlink for Business in India.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="your.email@company.com"
              disabled
              className="bg-black border border-white/30 rounded-lg w-full px-4 py-3 text-white placeholder:text-white/50 cursor-not-allowed text-center sm:text-left flex-grow focus:outline-none"
            />
            <button
              disabled
              className="bg-blue-600/50 text-white font-['D-DIN'] font-bold text-sm uppercase px-8 py-3 rounded-lg tracking-wider cursor-not-allowed whitespace-nowrap"
            >
              Coming Soon
            </button>
          </div>
          <p className="mt-4 text-xs text-white/50">
            We'll notify you when enterprise services launch in India
          </p>
        </div>
      </section>
    </main>
  );
}