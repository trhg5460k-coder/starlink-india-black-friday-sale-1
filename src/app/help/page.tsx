import React from 'react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';
import { HelpCircle, Search, Book, MessageCircle, Phone, Mail, Video, Wrench, Wifi, Package } from 'lucide-react';
import Link from 'next/link';

export default function HelpCenterPage() {
  const helpCategories = [
    {
      icon: Package,
      title: 'Getting Started',
      description: 'Pre-booking, ordering, and account setup',
      articles: [
        'How to pre-book Starlink in India',
        'Understanding pricing and plans',
        'Payment methods accepted in India',
        'Expected delivery timeline',
      ]
    },
    {
      icon: Wrench,
      title: 'Installation & Setup',
      description: 'Hardware installation and configuration',
      articles: [
        'Professional installation service',
        'Self-installation guide',
        'Finding the best installation location',
        'Starlink app setup and configuration',
      ]
    },
    {
      icon: Wifi,
      title: 'Service & Performance',
      description: 'Internet speeds, coverage, and troubleshooting',
      articles: [
        'Expected speeds and performance in India',
        'Coverage availability by state',
        'Weather impact on service',
        'Network congestion and peak hours',
      ]
    },
    {
      icon: Book,
      title: 'Account Management',
      description: 'Billing, plans, and account settings',
      articles: [
        'Managing your subscription',
        'Updating payment information',
        'Changing service plans',
        'Understanding your bill and GST',
      ]
    },
  ];

  const faqs = [
    {
      q: 'When will Starlink service start in India?',
      a: 'Starlink service is expected to begin in January 2026, subject to regulatory approvals from the Department of Telecommunications (DoT). Pre-booking is currently open with special promotional pricing.'
    },
    {
      q: 'What is included in the device kit?',
      a: 'The Starlink kit includes: satellite dish (antenna), WiFi router, power supply, cables, and mounting hardware. For Residential service, you get the standard kit. For Roam service, you receive the compact Starlink Mini kit.'
    },
    {
      q: 'Do I need a clear view of the sky?',
      a: 'Yes, Starlink requires an unobstructed view of the sky for optimal performance. Use the Starlink app to check for obstructions at your installation location before ordering.'
    },
    {
      q: 'Can I use Starlink in any state in India?',
      a: 'Starlink coverage is available across all Indian states. Select your state during pre-booking to confirm availability in your specific location.'
    },
    {
      q: 'What is the 30-day money-back guarantee?',
      a: 'If you are not satisfied with Starlink service, you can return the equipment within 30 days of delivery for a full refund. Equipment must be returned in original condition.'
    },
    {
      q: 'How do I cancel my pre-booking?',
      a: 'You can cancel your pre-booking anytime before shipment for a full refund. Contact support at support@starlink.in or use your account portal.'
    },
    {
      q: 'Is professional installation included?',
      a: 'Yes, free professional installation is included with the Black Friday pre-booking offer. Our technicians will install and configure your Starlink system.'
    },
    {
      q: 'What internet speeds can I expect?',
      a: 'Speeds vary by plan: Basic (25 Mbps), Standard (50 Mbps), Premium (100 Mbps+). Actual speeds may vary based on location, network congestion, and weather conditions.'
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-600/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full border border-green-500/30 mb-6">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              How Can We Help?
            </h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about Starlink service in India
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/contact"
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
              </Link>

              <a
                href="tel:+911800123456"
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-[1.02]"
              >
                <Phone className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Call Support</h3>
                <p className="text-sm text-muted-foreground">1800-123-456 (Toll-Free)</p>
              </a>

              <a
                href="mailto:support@starlink.in"
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-[1.02]"
              >
                <Mail className="h-8 w-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@starlink.in</p>
              </a>
            </div>
          </div>

          {/* Help Categories */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display uppercase text-center mb-10">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {helpCategories.map((category, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <category.icon className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-16">
                    {category.articles.map((article, i) => (
                      <li key={i}>
                        <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display uppercase text-center mb-10">
              Video Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Unboxing & Setup', duration: '5:30' },
                { title: 'Installation Guide', duration: '8:45' },
                { title: 'Troubleshooting Tips', duration: '6:20' },
              ].map((video, idx) => (
                <div key={idx} className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all">
                  <div className="relative aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-display uppercase text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold hover:bg-white/5">
                    <span className="flex-1">{faq.q}</span>
                    <HelpCircle className="h-5 w-5 text-green-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-5 text-muted-foreground border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3">Still Need Help?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is available 24/7 to assist you with any questions
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
