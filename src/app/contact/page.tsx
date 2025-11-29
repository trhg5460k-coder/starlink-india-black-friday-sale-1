import React from 'react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full border border-blue-500/30 mb-6">
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions about Starlink in India? We're here to help!
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select a topic</option>
                      <option value="prebooking">Pre-booking Questions</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="installation">Installation Support</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all"
                  >
                    <Send className="h-5 w-5" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Cards */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone Support</h3>
                        <a href="tel:+911800123456" className="text-muted-foreground hover:text-white transition-colors">
                          1800-123-456 (Toll-Free)
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">24/7 Support Available</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Support</h3>
                        <a href="mailto:support@starlink.in" className="text-muted-foreground hover:text-white transition-colors">
                          support@starlink.in
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Office Address</h3>
                        <p className="text-muted-foreground">
                          Starlink India Operations<br />
                          [Office Address Line 1]<br />
                          [City, State - PIN Code]<br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="h-6 w-6 text-yellow-400" />
                    Business Hours
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Phone Support:</span>
                      <span className="text-white font-semibold">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Support:</span>
                      <span className="text-white font-semibold">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Live Chat:</span>
                      <span className="text-white font-semibold">9 AM - 9 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Office Hours:</span>
                      <span className="text-white font-semibold">Mon-Fri, 9 AM - 6 PM</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Support */}
                <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-3">Emergency Support</h3>
                  <p className="text-muted-foreground mb-4">
                    For urgent technical issues affecting your service, please call our 24/7 emergency hotline:
                  </p>
                  <a
                    href="tel:+911800123456"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Emergency: 1800-123-456
                  </a>
                </div>

                {/* Social Media */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Stay updated with the latest news and updates from Starlink India
                  </p>
                  <div className="flex gap-4">
                    {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                        title={social}
                      >
                        <span className="text-xs font-bold">{social[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
