import React from 'react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';
import { Shield, Lock, Eye, FileText, AlertCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full border border-blue-500/30 mb-6">
              <Shield className="h-4 w-4" />
              Privacy Policy
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Privacy Policy
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
                <Lock className="h-6 w-6 text-green-400" />
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Starlink India ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our satellite internet services in India. This policy is compliant with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-400" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Government-issued identification (Aadhaar, PAN, etc.) as required by Indian law</li>
                    <li>Payment information (processed securely through Indian payment gateways)</li>
                    <li>Service location and installation address</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Network performance data and bandwidth usage</li>
                    <li>Device information and technical specifications</li>
                    <li>Service quality metrics and connection logs</li>
                    <li>Customer support interactions and service requests</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye className="h-6 w-6 text-yellow-400" />
                How We Use Your Information
              </h2>
              <div className="text-muted-foreground space-y-3">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing and maintaining Starlink internet services in India</li>
                  <li>Processing payments and managing your account</li>
                  <li>Installing and configuring equipment at your location</li>
                  <li>Providing customer support and technical assistance</li>
                  <li>Improving service quality and network performance</li>
                  <li>Complying with Indian legal and regulatory requirements</li>
                  <li>Sending service updates and important notifications</li>
                  <li>Preventing fraud and ensuring network security</li>
                </ul>
              </div>
            </div>

            {/* Data Storage and Security */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Data Storage and Security</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Your data is stored securely in compliance with Indian data protection laws. We implement reasonable security practices and procedures as required under the IT Act, 2000:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of sensitive personal data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Restricted access to personal information on a need-to-know basis</li>
                  <li>Data storage in India or in jurisdictions with adequate data protection</li>
                  <li>Incident response procedures for data breaches</li>
                </ul>
              </div>
            </div>

            {/* Data Sharing and Disclosure */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Data Sharing and Disclosure</h2>
              <div className="text-muted-foreground space-y-3">
                <p>We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SpaceX and affiliated companies for service provision</li>
                  <li>Installation partners and service technicians</li>
                  <li>Payment processors and financial institutions</li>
                  <li>Government authorities as required by Indian law</li>
                  <li>Department of Telecommunications (DoT) for licensing compliance</li>
                  <li>Law enforcement agencies upon lawful request</li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Your Rights Under Indian Law</h2>
              <div className="text-muted-foreground space-y-3">
                <p>Under Indian data protection laws, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information we hold</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Withdraw consent for data processing (where applicable)</li>
                  <li>Request deletion of your data (subject to legal retention requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>File a complaint with the appropriate authority</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at <a href="mailto:privacy@starlink.in" className="text-blue-400 hover:underline">privacy@starlink.in</a>
                </p>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  We use cookies and similar technologies to improve your experience on our website and monitor service performance. You can control cookie preferences through your browser settings.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <div className="text-muted-foreground">
                <p>
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, please contact us immediately.
                </p>
              </div>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <div className="text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-blue-400" />
                Contact Us
              </h2>
              <div className="text-muted-foreground space-y-2">
                <p>For questions about this Privacy Policy or your personal data:</p>
                <p className="font-semibold text-white">Starlink India</p>
                <p>Email: <a href="mailto:privacy@starlink.in" className="text-blue-400 hover:underline">privacy@starlink.in</a></p>
                <p>Phone: 1800-123-456 (Toll-Free)</p>
                <p>Address: [Starlink India Office Address]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
