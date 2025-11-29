import React from 'react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';
import { FileText, Shield, Scale, CheckCircle, AlertTriangle, Book } from 'lucide-react';

export default function RegulationsPage() {
  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-400 text-sm font-medium px-4 py-2 rounded-full border border-purple-500/30 mb-6">
              <Scale className="h-4 w-4" />
              Regulations & Compliance
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Regulatory Compliance in India
            </h1>
            <p className="text-muted-foreground">
              Last Updated: January 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                Regulatory Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Starlink India operates in full compliance with Indian telecommunications regulations, licensing requirements, and data protection laws. This page outlines the key regulatory frameworks governing our satellite internet services in India.
              </p>
            </div>

            {/* Licensing and Approvals */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-400" />
                Licensing and Approvals
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Department of Telecommunications (DoT)</h3>
                  <p className="mb-3">
                    Starlink has applied for and is in the process of obtaining necessary licenses from the DoT under the following categories:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Global Mobile Personal Communication by Satellite Services (GMPCS) License</li>
                    <li>Very Small Aperture Terminal (VSAT) Service Provider License</li>
                    <li>Satellite Gateway License for ground stations</li>
                    <li>Spectrum allocation for Ka-band frequencies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Indian Space Research Organisation (ISRO)</h3>
                  <p>
                    Coordination with ISRO's Indian National Space Promotion and Authorization Center (IN-SPACe) for satellite coordination and frequency management.
                  </p>
                </div>
              </div>
            </div>

            {/* Regulatory Frameworks */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Book className="h-6 w-6 text-yellow-400" />
                Applicable Regulatory Frameworks
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Indian Telegraph Act, 1885</h3>
                  <p>
                    Governs the establishment, operation, and licensing of telegraph (including telecommunications) services in India. Starlink operates under the provisions of this Act.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Information Technology Act, 2000</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Data protection and privacy requirements</li>
                    <li>Cybersecurity obligations</li>
                    <li>Digital signatures and authentication</li>
                    <li>Intermediary liability provisions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">3. TRAI (Telecom Regulatory Authority of India) Regulations</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Quality of Service (QoS) standards</li>
                    <li>Consumer protection regulations</li>
                    <li>Tariff and pricing guidelines</li>
                    <li>Do Not Disturb (DND) compliance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">4. National Cyber Security Policy</h3>
                  <p>
                    Compliance with national cybersecurity objectives including protection of critical information infrastructure.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Localization */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Data Localization and Privacy</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Starlink India complies with Indian data localization requirements:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-white">Payment Data:</strong> All payment and financial data is stored within India as per RBI guidelines
                  </li>
                  <li>
                    <strong className="text-white">User Data:</strong> Customer information and usage data stored in compliance with IT Act requirements
                  </li>
                  <li>
                    <strong className="text-white">Government Access:</strong> Lawful interception capabilities as mandated by Indian law
                  </li>
                  <li>
                    <strong className="text-white">Data Transfers:</strong> International data transfers only under approved frameworks
                  </li>
                </ul>
              </div>
            </div>

            {/* Security Compliance */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                Security and Lawful Interception
              </h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Starlink implements security measures and lawful interception capabilities as required by Indian authorities:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Lawful Interception and Monitoring (LIM) systems as per DoT guidelines</li>
                  <li>Integration with Centralized Monitoring System (CMS)</li>
                  <li>Compliance with License Terms and Conditions for security provisions</li>
                  <li>Regular security audits as mandated by CERT-In</li>
                  <li>Incident reporting within prescribed timelines (6 hours for critical incidents)</li>
                </ul>
              </div>
            </div>

            {/* Spectrum Management */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Spectrum Management</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Starlink operates in Ka-band frequencies allocated by DoT:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>User terminal downlink: 18.8 - 19.3 GHz and 19.7 - 20.2 GHz</li>
                  <li>User terminal uplink: 28.6 - 29.1 GHz and 29.5 - 30.0 GHz</li>
                  <li>Gateway downlink: 17.8 - 18.6 GHz and 18.8 - 19.3 GHz</li>
                  <li>Gateway uplink: 27.5 - 29.1 GHz and 29.5 - 30.0 GHz</li>
                </ul>
                <p className="mt-4">
                  All spectrum usage is coordinated with Wireless Planning and Coordination (WPC) Wing of DoT.
                </p>
              </div>
            </div>

            {/* Consumer Protection */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Consumer Protection
              </h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Starlink adheres to TRAI consumer protection regulations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transparent pricing and billing practices</li>
                  <li>Clear service terms and conditions</li>
                  <li>Timely resolution of customer complaints (maximum 4 weeks)</li>
                  <li>Quality of Service (QoS) monitoring and reporting</li>
                  <li>Refund policies in accordance with TRAI guidelines</li>
                  <li>Protection against unfair trade practices</li>
                </ul>
              </div>
            </div>

            {/* Environmental Compliance */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Environmental Compliance</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Ground station infrastructure complies with:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Environmental clearances from Ministry of Environment, Forest and Climate Change</li>
                  <li>Electromagnetic field (EMF) emission standards</li>
                  <li>Building and construction regulations</li>
                  <li>E-waste management rules for equipment disposal</li>
                </ul>
              </div>
            </div>

            {/* Taxation and Financial Compliance */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Taxation and Financial Compliance</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Starlink India complies with all applicable Indian tax laws:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Goods and Services Tax (GST) on all services</li>
                  <li>Universal Service Obligation Fund (USOF) contribution (8% of Adjusted Gross Revenue)</li>
                  <li>License fee payment to DoT</li>
                  <li>Corporate income tax and withholding tax obligations</li>
                  <li>Foreign exchange regulations (FEMA compliance)</li>
                </ul>
              </div>
            </div>

            {/* Regulatory Updates */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Regulatory Status and Updates
              </h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  <strong className="text-white">Current Status:</strong> Starlink India is in the licensing process with DoT. Pre-booking is open subject to regulatory approvals.
                </p>
                <p>
                  <strong className="text-white">Expected Service Launch:</strong> January 2026, contingent upon receipt of all necessary licenses and approvals.
                </p>
                <p className="mt-4">
                  We are committed to operating transparently and in full compliance with Indian regulations. Updates on our regulatory status will be posted on this page and communicated to pre-booking customers.
                </p>
              </div>
            </div>

            {/* Contact Regulatory */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Regulatory Inquiries</h2>
              <div className="text-muted-foreground space-y-2">
                <p>For questions regarding regulatory compliance:</p>
                <p className="font-semibold text-white">Starlink India - Regulatory Affairs</p>
                <p>Email: <a href="mailto:regulatory@starlink.in" className="text-blue-400 hover:underline">regulatory@starlink.in</a></p>
                <p>Address: [Registered Office Address]</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Important Notice
              </h3>
              <p className="text-sm text-muted-foreground">
                This page provides general information about regulatory compliance and does not constitute legal advice. Regulatory requirements may change, and Starlink India will adapt its operations accordingly. Service availability is subject to obtaining and maintaining all necessary regulatory approvals from Indian authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
