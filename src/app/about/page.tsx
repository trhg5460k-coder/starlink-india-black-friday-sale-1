import React from 'react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';
import { Rocket, Globe, Users, Award, Target, Zap, Shield, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-400 text-sm font-medium px-4 py-2 rounded-full border border-purple-500/30 mb-6">
              <Rocket className="h-4 w-4" />
              About Starlink India
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Connecting India to Space
            </h1>
            <p className="text-muted-foreground text-lg">
              High-speed satellite internet powered by SpaceX's advanced technology
            </p>
          </div>

          {/* Mission Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold font-display uppercase mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Starlink is on a mission to connect every corner of India with high-speed, low-latency internet from space. We're bringing reliable connectivity to areas where traditional internet infrastructure cannot reach.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By leveraging SpaceX's constellation of satellites, we're bridging the digital divide and empowering communities across India with access to information, education, healthcare, and economic opportunities.
                  </p>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_feature3_m-6.jpg"
                    alt="SpaceX Mission"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display uppercase text-center mb-10">
              Starlink by the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Globe, number: '6,000+', label: 'Satellites in Orbit', color: 'blue' },
                { icon: Users, number: '2M+', label: 'Global Users', color: 'green' },
                { icon: Zap, number: '20ms', label: 'Low Latency', color: 'yellow' },
                { icon: Target, number: '99.9%', label: 'Uptime', color: 'purple' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 bg-${stat.color}-600/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
                  </div>
                  <p className="text-3xl font-bold mb-2">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why India Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold font-display uppercase mb-8">Why Starlink in India?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-400" />
                    Bridging the Digital Divide
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    With over 600,000 villages and vast rural areas, many regions in India lack access to reliable internet. Starlink provides connectivity where traditional infrastructure is not feasible, enabling digital inclusion for all.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                    Supporting Growth
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Reliable internet is essential for India's digital economy. Starlink supports businesses, education, telemedicine, agriculture, and remote work, contributing to economic growth across the nation.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-purple-400" />
                    Disaster Resilience
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    During natural disasters when terrestrial networks fail, Starlink provides critical connectivity for emergency services, relief operations, and affected communities.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    Next-Gen Technology
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Leveraging advanced satellite technology, Starlink delivers speeds comparable to fiber internet with low latency, enabling activities like video calls, online gaming, and streaming.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SpaceX Engineering */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-xl overflow-hidden order-2 md:order-1">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_feature3_m-6.jpg"
                  alt="SpaceX Engineering"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold font-display uppercase mb-4">Engineered by SpaceX</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Starlink is designed and operated by SpaceX, the world's leading provider of launch services and the only company with an orbital-class reusable rocket. SpaceX brings decades of experience in spacecraft design and on-orbit operations to deliver reliable connectivity.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Each Starlink satellite is equipped with advanced phased array antennas, autonomous collision avoidance systems, and ion propulsion for precise orbit control. The constellation is continuously expanding to provide better coverage and capacity.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    'Advanced Satellites',
                    'Autonomous Systems',
                    'Low Earth Orbit',
                    'Global Coverage',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                      <Award className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Commitment to India */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold font-display uppercase mb-4">Our Commitment to India</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Starlink India is committed to operating in full compliance with Indian regulations, including data localization, licensing requirements, and security standards. We work closely with the Department of Telecommunications (DoT) and other regulatory bodies to ensure our service meets all legal and technical requirements.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Regulatory Compliance</h3>
                  <p className="text-sm text-muted-foreground">Full adherence to Indian laws and DoT regulations</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <Globe className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Data Sovereignty</h3>
                  <p className="text-sm text-muted-foreground">Data localization as per Indian requirements</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Local Support</h3>
                  <p className="text-sm text-muted-foreground">24/7 customer support in India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-display uppercase text-center mb-10">
              Starlink India Timeline
            </h2>
            <div className="space-y-6">
              {[
                { year: '2020', title: 'Global Launch', description: 'Starlink service begins worldwide deployment' },
                { year: '2021', title: 'India Application', description: 'Starlink applies for operating license in India' },
                { year: '2024', title: 'Pre-Booking Opens', description: 'Black Friday pre-booking campaign launches for Indian customers' },
                { year: '2026', title: 'Service Launch', description: 'Expected commercial service availability across India' },
              ].map((milestone, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-bold text-green-400">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-px h-full bg-white/20 relative">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
