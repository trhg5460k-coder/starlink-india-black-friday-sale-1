'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, Check, ArrowRight, Home, Compass, Zap, Shield, 
  Star, Users, Clock, MapPin, Wifi, Phone, Mail, Sparkles, Calendar
} from 'lucide-react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
  "Andaman and Nicobar Islands", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep"
];

const plans = [
  {
    id: 'standard',
    name: 'Standard',
    speed: '50-150 Mbps',
    downloadSpeed: '50-150 Mbps',
    uploadSpeed: '10-20 Mbps',
    latency: '25-60ms',
    originalPrice: 3000,
    discountedPrice: 2250,
    features: [
      'Unlimited high-speed data',
      'Typical download: 50-150 Mbps',
      'Typical upload: 10-20 Mbps',
      'Low latency 25-60ms',
      'Ideal for streaming, gaming & video calls',
      'Standard support',
      'No contracts or commitments'
    ],
    popular: false,
  },
  {
    id: 'priority',
    name: 'Priority',
    speed: '100-220 Mbps',
    downloadSpeed: '100-220 Mbps',
    uploadSpeed: '20-40 Mbps',
    latency: '25-50ms',
    originalPrice: 5000,
    discountedPrice: 3750,
    features: [
      'Priority network access',
      'Faster speeds: 100-220 Mbps',
      'Enhanced upload: 20-40 Mbps',
      'Lower latency 25-50ms',
      'Priority data allocation',
      '24/7 priority support',
      'Ideal for businesses & power users',
      'Static IP option available'
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    speed: '150-220 Mbps',
    downloadSpeed: '150-220 Mbps',
    uploadSpeed: '25-40 Mbps',
    latency: '20-40ms',
    originalPrice: 8000,
    discountedPrice: 6000,
    features: [
      'Maximum priority bandwidth',
      'Peak speeds: 150-220 Mbps',
      'Best upload: 25-40 Mbps',
      'Ultra-low latency 20-40ms',
      'Unthrottled data',
      'Dedicated 24/7 premium support',
      'Perfect for enterprises & heavy usage',
      'Static IP included',
      'Business use approved'
    ],
    popular: false,
  },
];

export default function PersonalPage() {
  const [serviceType, setServiceType] = useState<'residential' | 'roam'>('residential');
  const [selectedState, setSelectedState] = useState('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [bookingCount, setBookingCount] = useState(113736);
  const [showSpecs, setShowSpecs] = useState(false);

  // Prebooking counter
  useEffect(() => {
    // Increment counter periodically
    const interval = setInterval(() => {
      setBookingCount(prev => {
        const increment = Math.floor(Math.random() * 3) + 1; // 1-3 per update
        return Math.min(prev + increment, 200000);
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Check URL params for service type
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === 'roam') {
      setServiceType('roam');
    }
  }, []);

  const devicePrice = serviceType === 'residential' 
    ? { original: 30000, discounted: 15000 } 
    : { original: 40000, discounted: 20000 };

  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      {/* Hero Section with Background Image */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_hero_m-1.jpg"
            alt="Starlink"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 text-sm font-medium px-4 py-2 rounded-full border border-red-500/30 mb-6">
              <Sparkles className="h-4 w-4" />
              Black Friday Sale - 50% OFF Device + 25% OFF Plans
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4">
              Starlink for {serviceType === 'residential' ? 'Home' : 'Travel'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {serviceType === 'residential' 
                ? 'Reliable high-speed internet for your home anywhere in India. Perfect for rural and urban areas with limited connectivity.'
                : 'Take Starlink with you anywhere across India. Perfect for RVs, camping, remote work, and adventure travel.'
              }
            </p>
          </div>

          {/* Service Type Toggle */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-white/10 rounded-xl p-1.5 backdrop-blur-sm">
              <button
                onClick={() => setServiceType('residential')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  serviceType === 'residential'
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Home className="h-5 w-5" />
                Residential
              </button>
              <button
                onClick={() => setServiceType('roam')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  serviceType === 'roam'
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Compass className="h-5 w-5" />
                Roam
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        {/* Device Price Card with Kit Images */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 p-8 overflow-visible">
            {/* Fixed 50% OFF Badge - now positioned properly */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg z-10">
              50% OFF
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {serviceType === 'residential' ? 'Starlink Kit' : 'Starlink Mini Kit'}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {serviceType === 'residential' 
                    ? 'Complete home installation kit with dish, router, and cables.'
                    : 'Compact portable kit with built-in WiFi, perfect for travel.'
                  }
                </p>

                {/* Kit Image - Updated URLs */}
                <div className="mb-4 relative h-48 rounded-lg overflow-hidden bg-black/30">
                  <Image
                    src={serviceType === 'residential' 
                      ? "https://starlink.com/_next/image?url=https%3A%2F%2Fstarlink.com%2Fpublic-files%2Fproduct_detail_standard.jpg&w=3840&q=75"
                      : "https://starlink.com/_next/image?url=https%3A%2F%2Fstarlink.com%2Fpublic-files%2Fstarlink_mini_order_product_feature.jpg&w=3840&q=75"
                    }
                    alt={serviceType === 'residential' ? 'Starlink Kit' : 'Starlink Mini Kit'}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-2"
                  />
                </div>
                
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-4xl font-bold text-green-400">₹{devicePrice.discounted.toLocaleString()}</span>
                  <span className="text-xl line-through text-muted-foreground">₹{devicePrice.original.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-yellow-400 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Black Friday pricing ends soon</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <Calendar className="h-4 w-4" />
                  <span>Shipping starts Jan 2026</span>
                </div>

                {/* View Specs Button */}
                <button
                  onClick={() => setShowSpecs(!showSpecs)}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{showSpecs ? 'Hide' : 'View'} Specs</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showSpecs ? 'rotate-180' : ''}`} />
                </button>

                {/* Specs Dropdown */}
                {showSpecs && (
                  <div className="mt-4 bg-black/40 border border-white/10 rounded-lg p-4 space-y-2 text-sm">
                    {serviceType === 'residential' ? (
                      <>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Antenna</span>
                          <span className="font-medium">Electronically Steered Phased Array</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Dimensions</span>
                          <span className="font-medium">550 x 510 x 249 mm</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Weight</span>
                          <span className="font-medium">4.2 kg (dish only)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Field of View</span>
                          <span className="font-medium">110°</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Power Consumption</span>
                          <span className="font-medium">50-75W (average)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Temperature Range</span>
                          <span className="font-medium">-30°C to 50°C</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Wi-Fi</span>
                          <span className="font-medium">Dual-band Wi-Fi 5 (802.11ac)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ethernet Ports</span>
                          <span className="font-medium">1 Gigabit (with adapter)</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Antenna</span>
                          <span className="font-medium">Electronic Phased Array</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Dimensions</span>
                          <span className="font-medium">298.5 x 259 x 38.5 mm</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Weight</span>
                          <span className="font-medium">1.1 kg (with kickstand)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Field of View</span>
                          <span className="font-medium">110°</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Power Consumption</span>
                          <span className="font-medium">20-40W</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Temperature Range</span>
                          <span className="font-medium">-10°C to 40°C</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-muted-foreground">Wi-Fi</span>
                          <span className="font-medium">Built-in Wi-Fi 5 (802.11ac)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Portability</span>
                          <span className="font-medium">Backpack-sized, built-in kickstand</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {[
                  'Free professional installation',
                  '30-day money-back guarantee',
                  'Easy self-setup option',
                  '24/7 customer support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* State Selector - Only for Residential */}
        {serviceType === 'residential' && (
          <div className="max-w-xl mx-auto mb-12">
            <label className="block text-sm font-medium mb-3 text-center">
              <MapPin className="inline h-4 w-4 mr-2" />
              Select Your State to Check Availability
            </label>
            <div className="relative">
              <button
                onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-left hover:bg-white/15 transition-colors"
              >
                <span className={selectedState ? 'text-white' : 'text-muted-foreground'}>
                  {selectedState || 'Select your state...'}
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isStateDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-black/95 border border-white/20 rounded-xl max-h-64 overflow-y-auto backdrop-blur-xl">
                  {indianStates.map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        setSelectedState(state);
                        setIsStateDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between"
                    >
                      <span>{state}</span>
                      {selectedState === state && <Check className="h-4 w-4 text-green-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedState && (
              <p className="mt-3 text-center text-green-400 text-sm flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                Starlink is available in {selectedState}!
              </p>
            )}
          </div>
        )}

        {/* Plans Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-display uppercase mb-3">Choose Your Plan</h2>
            <p className="text-muted-foreground">All plans include 25% Black Friday discount</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`relative cursor-pointer rounded-2xl border p-6 transition-all hover:scale-[1.02] ${
                  selectedPlan?.id === plan.id
                    ? 'border-green-500 bg-green-500/10'
                    : plan.popular
                    ? 'border-yellow-500/50 bg-white/5'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <Wifi className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400">{plan.speed}</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-green-400">₹{plan.discountedPrice.toLocaleString()}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <span className="text-sm line-through text-muted-foreground">₹{plan.originalPrice.toLocaleString()}/mo</span>
                  <div className="mt-2 inline-flex items-center gap-1 bg-red-600/20 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                    25% OFF
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`w-5 h-5 rounded-full border-2 mx-auto ${
                  selectedPlan?.id === plan.id
                    ? 'border-green-500 bg-green-500'
                    : 'border-white/30'
                }`}>
                  {selectedPlan?.id === plan.id && <Check className="h-full w-full text-black p-0.5" />}
                </div>
              </div>
            ))}
          </div>

          {/* Prebooking Counter - Below Plans */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-xl px-6 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                  <div className="relative w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">Pre-bookings:</span>
              </div>
              <span className="text-2xl font-bold text-white">
                {bookingCount.toLocaleString('en-IN')}<span className="text-muted-foreground text-lg">/200,000</span>
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Pre-Book?</h3>
            
            {(serviceType === 'roam' || selectedState) && selectedPlan ? (
              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4 text-left">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Device ({serviceType})</span>
                    <span>₹{devicePrice.discounted.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{selectedPlan.name} Plan (monthly)</span>
                    <span>₹{selectedPlan.discountedPrice.toLocaleString()}</span>
                  </div>
                  {serviceType === 'residential' && selectedState && (
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Location</span>
                      <span>{selectedState}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 mt-3 pt-3 flex justify-between font-bold">
                    <span>Total Due Today</span>
                    <span className="text-green-400">₹{devicePrice.discounted.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href={`/checkout?type=${serviceType}${serviceType === 'residential' && selectedState ? `&state=${encodeURIComponent(selectedState)}` : ''}&plan=${selectedPlan.id}`}
                  className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold uppercase py-4 px-8 rounded-xl hover:scale-[1.02] transition-transform"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-sm text-blue-400 flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Shipping starts Jan 2026
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {serviceType === 'residential' && !selectedState && !selectedPlan && 'Please select your state and a plan to continue.'}
                  {serviceType === 'residential' && !selectedState && selectedPlan && 'Please select your state to continue.'}
                  {serviceType === 'residential' && selectedState && !selectedPlan && 'Please select a plan to continue.'}
                  {serviceType === 'roam' && !selectedPlan && 'Please select a plan to continue.'}
                </p>
                <button
                  disabled
                  className="w-full bg-white/20 text-white/50 font-bold uppercase py-4 px-8 rounded-xl cursor-not-allowed"
                >
                  {serviceType === 'residential' ? 'Select State & Plan to Continue' : 'Select Plan to Continue'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <p className="font-semibold">30-Day</p>
              <p className="text-sm text-muted-foreground">Money Back</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <p className="font-semibold">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <p className="font-semibold">2M+</p>
              <p className="text-sm text-muted-foreground">Users Worldwide</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-orange-400" />
              </div>
              <p className="font-semibold">4.8/5</p>
              <p className="text-sm text-muted-foreground">User Rating</p>
              <p className="text-xs text-blue-400 mt-2 flex items-center justify-center gap-1">
                <Calendar className="h-3 w-3" />
                Ships Jan 2026
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold font-display uppercase text-center mb-10">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'When will I receive my Starlink kit?',
                a: 'Pre-booked orders will be shipped within 2-4 weeks of the official India launch. You will receive tracking information via email.'
              },
              {
                q: 'Is professional installation included?',
                a: 'Yes! Professional installation is included free of charge with the Black Friday deal. Our team will contact you to schedule installation.'
              },
              {
                q: 'Can I cancel my pre-booking?',
                a: 'Yes, you can cancel your pre-booking anytime before shipping and receive a full refund. We also offer a 30-day money-back guarantee after delivery.'
              },
              {
                q: 'What is the coverage in my area?',
                a: 'Starlink provides coverage across all of India through our satellite network. Select your state above to confirm availability in your area.'
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold hover:bg-white/5">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-xl mx-auto mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:+911800123456" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
              <Phone className="h-5 w-5" />
              <span>1800-123-456</span>
            </a>
            <a href="mailto:support@starlink.in" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
              <span>support@starlink.in</span>
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}