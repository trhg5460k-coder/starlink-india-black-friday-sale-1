'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Building2, Rocket, Globe, Shield, Zap, Users, Clock, Mail, 
  Bell, Check, ArrowRight, Server, Headphones, BarChart3, Lock
} from 'lucide-react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';

const features = [
  {
    icon: Zap,
    title: 'High-Speed Connectivity',
    description: 'Up to 500Mbps download speeds for demanding business applications.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Advanced encryption and dedicated security protocols for business data.',
  },
  {
    icon: Server,
    title: 'Dedicated Bandwidth',
    description: 'Guaranteed bandwidth allocation for consistent performance.',
  },
  {
    icon: Headphones,
    title: '24/7 Priority Support',
    description: 'Dedicated account manager and round-the-clock technical support.',
  },
  {
    icon: Globe,
    title: 'Multi-Site Solutions',
    description: 'Connect multiple locations across India with unified management.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time monitoring and usage analytics for your network.',
  },
];

const useCases = [
  {
    title: 'Remote Offices',
    description: 'Connect branch offices in rural or underserved areas with reliable high-speed internet.',
    icon: Building2,
  },
  {
    title: 'Maritime & Aviation',
    description: 'Keep ships and aircraft connected with global satellite coverage.',
    icon: Globe,
  },
  {
    title: 'Energy & Mining',
    description: 'Enable connectivity at remote extraction and energy production sites.',
    icon: Zap,
  },
  {
    title: 'Events & Media',
    description: 'Temporary high-bandwidth connectivity for events and live broadcasts.',
    icon: Users,
  },
];

export default function BusinessPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_feature3_m-6.jpg"
            alt="SpaceX Rocket Launch"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 text-sm font-semibold px-5 py-2.5 rounded-full border border-blue-500/30 mb-8">
              <Clock className="h-4 w-4" />
              Coming Soon to India
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6">
              Starlink for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Business
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Enterprise-grade satellite internet designed to keep businesses connected anywhere in India. 
              Reliable, secure, and scalable connectivity solutions.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">500+</p>
                <p className="text-sm text-muted-foreground">Mbps Speed</p>
              </div>
              <div className="h-12 w-px bg-white/20 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime SLA</p>
              </div>
              <div className="h-12 w-px bg-white/20 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
              <div className="h-12 w-px bg-white/20 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">Pan-India</p>
                <p className="text-sm text-muted-foreground">Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Me Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 rounded-2xl border border-blue-500/30 p-8 backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Get Notified When We Launch</h2>
              <p className="text-muted-foreground">
                Be the first to know when Starlink Business becomes available in India.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-green-400 font-semibold">Thank you! We'll notify you when we launch.</p>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                    className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-8 py-4 rounded-xl hover:scale-[1.02] transition-transform"
                >
                  <span>Notify Me</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display uppercase mb-4">
            Enterprise Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything your business needs for reliable, high-performance connectivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:bg-white/[0.07]"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>

              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-20 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display uppercase mb-4">
            Built for Every Industry
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Starlink Business serves diverse industries with unique connectivity challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {useCases.map((useCase, i) => (
            <div
              key={i}
              className="flex gap-5 bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center">
                <useCase.icon className="h-7 w-7 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container mx-auto px-4 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display uppercase mb-4">
            Enterprise Pricing
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Flexible plans designed for businesses of all sizes. Custom solutions available for enterprise needs.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', desc: 'Small businesses', placeholder: 'Starting from ₹10,000/mo' },
              { name: 'Professional', desc: 'Growing teams', placeholder: 'Starting from ₹25,000/mo' },
              { name: 'Enterprise', desc: 'Large organizations', placeholder: 'Custom pricing' },
            ].map((plan, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                  <div className="bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-3 rounded-lg">
                    {plan.placeholder}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Available soon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-900/30 to-cyan-900/20 rounded-3xl border border-blue-500/30 p-12">
          <Rocket className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold font-display uppercase mb-4">
            Ready to Transform Your Business Connectivity?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the waitlist to be among the first businesses in India to experience Starlink's enterprise solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:scale-[1.02] transition-transform"
            >
              <Bell className="h-5 w-5" />
              <span>Join Waitlist</span>
            </button>
            <a
              href="mailto:business@starlink.in"
              className="flex items-center justify-center gap-2 border border-white/30 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Sales</span>
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
