'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FooterSection = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/regulations" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Regulations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href="tel:+911800123456" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  1800-123-456
                </a>
              </li>
              <li>
                <a href="mailto:support@starlink.in" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  support@starlink.in
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Business Solutions
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/personal" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Personal
                </Link>
              </li>
              <li>
                <Link href="/personal?type=roam" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Roam
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Business
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/logo_white-16.png"
                alt="Starlink Logo"
                width={120}
                height={40}
                className="opacity-60"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Starlink India. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors"
                  title={social}
                >
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <span className="text-xs font-bold">{social[0]}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;