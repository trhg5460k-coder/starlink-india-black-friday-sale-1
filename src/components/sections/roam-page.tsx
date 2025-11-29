"use client";

import React from 'react';
import Image from 'next/image';
import { Rv, Briefcase, Wifi, Map } from 'lucide-react';

const PrimaryButton = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <button
    className={`bg-primary text-primary-foreground font-bold uppercase text-sm py-3.5 px-8 rounded-[4px] transition-transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
);

const RoamPage = () => {
    return (
        <div className="bg-background text-primary-text font-body">
            {/* Hero Section */}
            <section
                className="relative h-screen flex items-center justify-center text-center bg-black"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" />
                <div className="relative z-10 px-4">
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-tight">
                        Internet That Travels With You
                    </h1>
                    <p className="mt-4 text-lg text-secondary-text max-w-3xl mx-auto">
                        High-speed internet, anywhere in India. Perfect for travelers, remote workers, and adventurers on the go.
                    </p>
                    <div className="mt-8">
                        <PrimaryButton>
                            Order Now
                        </PrimaryButton>
                    </div>
                </div>
            </section>
            
            {/* Pricing Section */}
            <section className="py-20 md:py-32 bg-secondary-background">
                <div className="container mx-auto px-5">
                    <h2 className="text-center font-display text-3xl md:text-5xl uppercase mb-12">Limited Time Offer</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-card border border-border-subtle rounded-lg p-8 text-center backdrop-blur-sm">
                            <h3 className="font-display text-2xl uppercase mb-4">Device Cost</h3>
                            <p className="text-4xl font-bold flex items-center justify-center gap-4">
                                <s className="text-muted-foreground text-2xl">₹40,000</s>
                                <span>₹20,000</span>
                            </p>
                            <p className="mt-2 text-green-400 font-semibold">50% OFF - Black Friday Sale</p>
                        </div>
                        <div className="bg-card border border-border-subtle rounded-lg p-8 text-center backdrop-blur-sm">
                            <h3 className="font-display text-2xl uppercase mb-4">Service Plans</h3>
                             <p className="text-4xl font-bold">Starting at ₹2,250/month</p>
                             <p className="mt-2 text-tertiary-text">with 25% pre-booking discount</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Features/Use Cases Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-5">
                    <h2 className="text-center font-display text-4xl md:text-5xl uppercase mb-16">Connect from Anywhere</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Rv className="w-12 h-12 text-primary"/>}
                            title="RV & Van Life"
                            description="Stay connected on the road with reliable internet for navigation, streaming, and remote work."
                        />
                         <FeatureCard 
                            icon={<Briefcase className="w-12 h-12 text-primary"/>}
                            title="Remote Work & Digital Nomads"
                            description="Work from anywhere, from mountaintops to beaches, with a stable connection for video calls and collaboration."
                        />
                         <FeatureCard 
                            icon={<Wifi className="w-12 h-12 text-primary"/>}
                            title="Emergency Connectivity"
                            description="A dependable backup internet source during outages or in disaster recovery situations."
                        />
                    </div>
                </div>
            </section>
            
            {/* Starlink Mini Product Section */}
            <section className="bg-black">
              <div className="container mx-auto px-0 max-w-[1520px]">
                <div className="grid md:grid-cols-2 items-center">
                  <div className="p-8 md:p-12 lg:p-20 text-center md:text-left order-2 md:order-1">
                      <h2 className="font-display text-4xl md:text-5xl uppercase">Starlink Mini</h2>
                      <p className="mt-6 text-secondary-text max-w-md mx-auto md:mx-0">
                          Starlink Mini is a compact, portable kit that can easily fit in a backpack, designed to provide high-speed, low-latency internet on the go.
                          It includes a built-in WiFi router and max download speeds over 100 Mbps.
                      </p>
                  </div>
                  <div className="relative h-full min-h-[50vh] md:min-h-[80vh] order-1 md:order-2">
                     <Image
                          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_feature_mini_m-3.jpg"
                          alt="Starlink Mini device"
                          layout="fill"
                          objectFit="cover"
                      />
                  </div>
                </div>
              </div>
            </section>

             {/* Setup Guide */}
             <section className="py-20 md:py-32">
                 <div className="container mx-auto px-5 grid md:grid-cols-2 gap-16 items-center">
                    <div className="text-center md:text-left">
                         <h2 className="font-display text-4xl md:text-5xl uppercase">Get Online in Minutes</h2>
                         <p className="mt-6 text-secondary-text max-w-md">
                            Set up Starlink with just two steps. Download the Starlink app to find the best install location with a clear view of the sky.
                         </p>
                    </div>
                    <div>
                        <div className="flex items-start mb-8">
                            <div className="font-display text-7xl text-tertiary-text mr-6">1</div>
                            <h3 className="font-display text-4xl uppercase mt-2">Plug it in</h3>
                        </div>
                         <div className="flex items-start">
                            <div className="font-display text-7xl text-tertiary-text mr-6">2</div>
                            <h3 className="font-display text-4xl uppercase mt-2">Point at Sky</h3>
                        </div>
                    </div>
                 </div>
             </section>

             {/* Coverage Map Section */}
            <section className="py-20 md:py-32 bg-secondary-background">
                <div className="container mx-auto px-5 text-center">
                     <h2 className="font-display text-4xl md:text-5xl uppercase mb-8">Expansive Coverage Across India</h2>
                     <p className="text-secondary-text mb-12 max-w-3xl mx-auto">Starlink Roam offers service across the entire country, with new regions being added continuously. Check our map for service availability.</p>
                     <div className="bg-card border border-border-subtle rounded-lg p-8 aspect-[16/7] flex items-center justify-center">
                         <div className="text-center text-muted-foreground">
                            <Map className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4"/>
                            <p className="font-semibold text-primary-text text-lg">Interactive Coverage Map - India</p>
                            <p className="text-sm">(Placeholder for interactive map component)</p>
                         </div>
                     </div>
                </div>
            </section>
            
            {/* Tech Specs and Comparison */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-5">
                    <h2 className="text-center font-display text-4xl md:text-5xl uppercase mb-16">Built for the Road</h2>
                     <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
                        <div>
                             <h3 className="font-display text-3xl uppercase mb-6">Starlink Mini Specs</h3>
                             <ul className="space-y-4 text-secondary-text">
                                 <SpecItem label="Antenna" value="Electronic Phased Array" />
                                 <SpecItem label="Dimensions" value="298.5 x 259 x 38.5 mm" />
                                 <SpecItem label="Weight" value="1.1 kg (with kickstand)" />
                                 <SpecItem label="Field of View" value="110°" />
                                 <SpecItem label="Power Consumption" value="20-40W" />
                                 <SpecItem label="Wi-Fi" value="Wi-Fi 5 (802.11ac)" />
                             </ul>
                        </div>
                         <div>
                            <h3 className="font-display text-3xl uppercase mb-6">Roam vs. Residential</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-border-subtle">
                                        <th className="py-3 pr-4 font-bold uppercase text-sm tracking-wider">Feature</th>
                                        <th className="py-3 px-4 font-bold uppercase text-center text-sm tracking-wider">Roam</th>
                                        <th className="py-3 pl-4 font-bold uppercase text-center text-sm tracking-wider">Residential</th>
                                    </tr>
                                </thead>
                                <tbody className="text-secondary-text">
                                     <ComparisonRow feature="Use Case" roam="On the move" residential="Fixed at one location" />
                                     <ComparisonRow feature="Service" roam="Global/Regional" residential="Address-specific" />
                                     <ComparisonRow feature="In-Motion Use" roam="Yes (with HP Dish)" residential="No" />
                                     <ComparisonRow feature="Pause Service" roam="Yes" residential="No" />
                                     <ComparisonRow feature="Network Priority" roam="Best Effort" residential="Standard" />
                                </tbody>
                              </table>
                            </div>
                        </div>
                     </div>
                </div>
            </section>
            
             {/* Order Form Section */}
            <section className="py-24 md:py-32 bg-black">
                 <div className="container mx-auto px-5 relative z-10 text-center">
                    <h2 className="font-display text-4xl md:text-6xl uppercase">Ready to Roam?</h2>
                    <p className="mt-4 text-lg text-secondary-text mb-8">Enter your address to check availability and order your Starlink.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                         <input type="text" placeholder="SHIPPING ADDRESS" className="flex-grow bg-input border border-input-border text-primary-text placeholder:text-input-placeholder rounded-[4px] px-4 py-3.5 w-full uppercase text-sm tracking-wider" />
                         <PrimaryButton className="w-full sm:w-auto">Get Started</PrimaryButton>
                    </form>
                 </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-card border border-border-subtle rounded-lg p-8 text-center backdrop-blur-sm transition-all hover:border-white/40 hover:-translate-y-1">
        <div className="flex justify-center mb-6">{icon}</div>
        <h5 className="font-display text-xl uppercase mb-3">{title}</h5>
        <p className="text-tertiary-text">{description}</p>
    </div>
);

const SpecItem = ({ label, value }: { label: string; value: string }) => (
    <li className="flex justify-between border-b border-border-subtle pb-3">
        <span className="font-semibold text-secondary-text">{label}</span>
        <span className="text-tertiary-text">{value}</span>
    </li>
);

const ComparisonRow = ({ feature, roam, residential }: { feature: string; roam: string; residential: string }) => (
     <tr className="border-b border-border-subtle last:border-b-0">
        <td className="py-4 pr-4 font-semibold">{feature}</td>
        <td className="py-4 px-4 text-center">{roam}</td>
        <td className="py-4 pl-4 text-center">{residential}</td>
    </tr>
);

export default RoamPage;