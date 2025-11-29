'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Compass, Check, ArrowRight, Sparkles, Users } from 'lucide-react';

// Same counter logic as prebooking-counter.tsx for consistency
const MIN_COUNT = 110000;
const INCREMENT_INTERVAL_HOURS = 2;
const INCREMENT_AMOUNT_MIN = 47;
const INCREMENT_AMOUNT_MAX = 156;
const MAX_COUNT = 120000;

const getSeededRandom = (seed: number, min: number, max: number): number => {
  const x = Math.sin(seed) * 10000;
  const random = x - Math.floor(x);
  return Math.floor(random * (max - min + 1)) + min;
};

const calculateCurrentCount = (): number => {
  const referenceDate = new Date('2024-11-25T00:00:00Z').getTime();
  const now = Date.now();
  const hoursElapsed = Math.floor((now - referenceDate) / (1000 * 60 * 60));
  const increments = Math.floor(hoursElapsed / INCREMENT_INTERVAL_HOURS);
  const daysSinceReference = Math.floor((now - referenceDate) / (1000 * 60 * 60 * 24));
  const baseCount = getSeededRandom(daysSinceReference + 12345, MIN_COUNT, MIN_COUNT + 5000);
  
  let totalCount = baseCount;
  for (let i = 0; i < increments; i++) {
    const incrementAmount = getSeededRandom(i + 67890, INCREMENT_AMOUNT_MIN, INCREMENT_AMOUNT_MAX);
    totalCount += incrementAmount;
  }
  
  return Math.min(totalCount, MAX_COUNT);
};

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

const ServicePlanCard = ({
  title,
  subtitle,
  description,
  originalPrice,
  discountedPrice,
  discount,
  icon: Icon,
  features,
  popular,
  href,
  planBookings,
}: {
  title: string;
  subtitle: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  icon: React.ElementType;
  features: string[];
  popular?: boolean;
  href: string;
  planBookings: string;
}) => (
  <div className={`relative flex h-full flex-col rounded-2xl border ${popular ? 'border-yellow-500/50' : 'border-[rgba(255,255,255,0.1)]'} bg-[rgba(10,10,10,0.95)] p-6 md:p-8 backdrop-blur-lg overflow-hidden`}>
    {popular && (
      <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold uppercase px-4 py-1.5 rounded-bl-xl">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Most Popular
        </span>
      </div>
    )}
    
    <div className="flex items-start gap-4 mb-4">
      <div className={`p-3 rounded-xl ${popular ? 'bg-yellow-500/20' : 'bg-white/10'}`}>
        <Icon className={`h-6 w-6 ${popular ? 'text-yellow-400' : 'text-white'}`} />
      </div>
      <div>
        <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-primary-text">
          {title}
        </h3>
        <p className="text-sm text-secondary-text">{subtitle}</p>
      </div>
    </div>

    <p className="text-sm md:text-base text-secondary-text mb-6">{description}</p>

    {/* Price Display */}
    <div className="bg-black/30 rounded-xl p-4 mb-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Device Cost</p>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="line-through text-muted-foreground text-base md:text-lg">{originalPrice}</span>
        <span className="text-2xl md:text-3xl font-bold text-green-400">{discountedPrice}</span>
      </div>
      <div className="mt-2 inline-flex items-center gap-1 bg-red-600/20 text-red-400 text-xs font-bold px-2 py-1 rounded">
        <Sparkles className="h-3 w-3" />
        {discount} - Black Friday
      </div>
    </div>

    {/* Features List */}
    <div className="flex-grow space-y-3 mb-6 md:mb-8">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3 text-xs md:text-sm text-secondary-text">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="h-3 w-3 text-green-400" />
          </div>
          <span>{feature}</span>
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-3">
      <Link
        href={href}
        className={`group flex items-center justify-center gap-2 rounded-lg py-3 md:py-4 px-6 text-center text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] ${
          popular 
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <span>Pre-Book Now</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
      <Link
        href={href}
        className="rounded-lg border border-secondary-cta-border py-2.5 md:py-3 px-6 text-center text-sm font-bold uppercase tracking-wider text-secondary-cta-text transition-all duration-200 hover:scale-[1.02] hover:bg-white/10"
      >
        LEARN MORE
      </Link>
    </div>

    {/* Social Proof */}
    <div className="mt-4 md:mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{planBookings} pre-booked this plan</span>
    </div>
  </div>
);

const ServicePlanCards = () => {
  const [totalCount, setTotalCount] = useState(MIN_COUNT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTotalCount(calculateCurrentCount());
    
    const interval = setInterval(() => {
      setTotalCount(calculateCurrentCount());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate plan-specific bookings (roughly 65% residential, 35% roam)
  const residentialBookings = mounted ? formatIndianNumber(Math.floor(totalCount * 0.65)) : '71,500';
  const roamBookings = mounted ? formatIndianNumber(Math.floor(totalCount * 0.35)) : '38,500';

  return (
    <div className="container relative z-10 mx-auto py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <ServicePlanCard
            title="RESIDENTIAL"
            subtitle="Connect at home"
            description="High-speed satellite internet for your home. Speeds of 50-220 Mbps with low latency, perfect for streaming, gaming, and remote work."
            originalPrice="₹30,000"
            discountedPrice="₹15,000"
            discount="50% OFF"
            icon={Home}
            popular={true}
            href="/personal"
            planBookings={residentialBookings}
            features={[
              "Speeds: 50-220 Mbps download",
              "Upload: 10-40 Mbps",
              "Low latency: 20-60ms",
              "Unlimited data with no caps",
              "Plans start at ₹2,250/mo (25% off)",
              "Free professional installation",
              "30-day money-back guarantee",
              "24/7 customer support",
            ]}
          />
          <ServicePlanCard
            title="ROAM"
            subtitle="Connect while traveling across India"
            description="Portable Starlink Mini kit with built-in WiFi. Take high-speed internet anywhere across India - perfect for travel and adventure."
            originalPrice="₹40,000"
            discountedPrice="₹20,000"
            discount="50% OFF"
            icon={Compass}
            href="/personal?type=roam"
            planBookings={roamBookings}
            features={[
              "Speeds: 50-150 Mbps download",
              "Compact & portable design",
              "Built-in WiFi router",
              "Works nationwide",
              "Plans start at ₹37.50/mo (25% off)",
              "Easy plug & play setup",
              "Pause service anytime",
              "Perfect for RVs & remote work",
            ]}
          />
        </div>

        {/* Limited Time Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 text-sm font-medium px-4 py-2 rounded-full border border-red-500/30">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Limited slots available • Black Friday pricing ends soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePlanCards;