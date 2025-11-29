import React from 'react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';
import { FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 text-sm font-medium px-4 py-2 rounded-full border border-orange-500/30 mb-6">
              <FileText className="h-4 w-4" />
              Terms of Service
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last Updated: January 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Starlink India ("Company," "we," "us," or "our") concerning your access to and use of Starlink satellite internet services in India. By pre-booking, purchasing, or using our services, you agree to be bound by these Terms and all applicable laws and regulations of India.
              </p>
            </div>

            {/* Service Description */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Service Description</h2>
              <div className="text-muted-foreground space-y-3">
                <p>Starlink India provides satellite-based broadband internet services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Residential and Roam service plans across India</li>
                  <li>Pre-booking available with 50% discount on hardware (Black Friday promotion)</li>
                  <li>Equipment includes satellite dish, router, cables, and mounting hardware</li>
                  <li>Service subject to regulatory approvals and licensing from DoT</li>
                  <li>Expected shipping: January 2026</li>
                  <li>Coverage dependent on satellite network availability</li>
                </ul>
              </div>
            </div>

            {/* Pre-Booking Terms */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Pre-Booking Terms
              </h2>
              <div className="text-muted-foreground space-y-3">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Pre-booking requires payment of device cost (₹15,000 with 50% Black Friday discount)</li>
                  <li>Monthly service plans activate after equipment installation</li>
                  <li>Pre-booking is refundable before shipment</li>
                  <li>30-day money-back guarantee after delivery</li>
                  <li>Estimated delivery: January 2026 (subject to regulatory approval)</li>
                  <li>We reserve the right to cancel pre-bookings if service cannot be provided</li>
                  <li>Prices subject to applicable GST and taxes</li>
                </ul>
              </div>
            </div>

            {/* Service Plans and Pricing */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Service Plans and Pricing</h2>
              <div className="text-muted-foreground space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Current Promotional Pricing:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Device Cost: ₹15,000 (50% off regular price of ₹30,000)</li>
                    <li>Basic Plan (25 Mbps): ₹2,250/month (25% off ₹3,000/month)</li>
                    <li>Standard Plan (50 Mbps): ₹3,750/month (25% off ₹5,000/month)</li>
                    <li>Premium Plan (100 Mbps): ₹6,000/month (25% off ₹8,000/month)</li>
                    <li>Roam Service: Starting at ₹37.50/month (25% off ₹50/month)</li>
                  </ul>
                </div>
                <p>
                  Promotional pricing available during Black Friday pre-booking period. Regular pricing applies after promotion ends. All prices exclude GST.
                </p>
              </div>
            </div>

            {/* Installation and Equipment */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Installation and Equipment</h2>
              <div className="text-muted-foreground space-y-3">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Free professional installation included with pre-booking</li>
                  <li>Self-installation option available with detailed instructions</li>
                  <li>Equipment remains property of Starlink India until full payment</li>
                  <li>You are responsible for equipment maintenance and protection</li>
                  <li>Equipment must be returned in good condition if service is cancelled</li>
                  <li>Damaged or lost equipment will be charged at replacement cost</li>
                  <li>Clear view of sky required for optimal service</li>
                </ul>
              </div>
            </div>

            {/* Service Availability and Performance */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Service Availability and Performance</h2>
              <div className="text-muted-foreground space-y-3">
                <p>Service quality depends on various factors:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Satellite coverage and network capacity</li>
                  <li>Weather conditions and atmospheric interference</li>
                  <li>Installation location and obstructions</li>
                  <li>Network congestion during peak hours</li>
                  <li>Regulatory restrictions and local regulations</li>
                </ul>
                <p className="mt-4">
                  We target 99.9% uptime but do not guarantee uninterrupted service. Speed and latency may vary.
                </p>
              </div>
            </div>

            {/* Acceptable Use Policy */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-400" />
                Acceptable Use Policy
              </h2>
              <div className="text-muted-foreground space-y-3">
                <p>You agree NOT to use Starlink services for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Illegal activities or violation of Indian laws</li>
                  <li>Transmitting malware, viruses, or harmful code</li>
                  <li>Unauthorized access to networks or systems</li>
                  <li>Spamming or unsolicited commercial communications</li>
                  <li>Infringing intellectual property rights</li>
                  <li>Reselling or redistributing service without authorization</li>
                  <li>Interfering with satellite network operations</li>
                  <li>Activities prohibited under IT Act, 2000</li>
                </ul>
                <p className="mt-4 font-semibold text-white">
                  Violation may result in immediate service suspension or termination.
                </p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
              <div className="text-muted-foreground space-y-3">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All payments processed in Indian Rupees (INR)</li>
                  <li>Device payment required at pre-booking</li>
                  <li>Monthly service fees billed in advance</li>
                  <li>Accepted payment methods: Credit/Debit cards, UPI, Net Banking</li>
                  <li>GST and applicable taxes added to all charges</li>
                  <li>Late payments may result in service suspension</li>
                  <li>Refunds processed within 14 business days</li>
                </ul>
              </div>
            </div>

            {/* Cancellation and Refunds */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Cancellation and Refunds
              </h2>
              <div className="text-muted-foreground space-y-3">
                <p><strong className="text-white">30-Day Money-Back Guarantee:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full refund if cancelled within 30 days of delivery</li>
                  <li>Equipment must be returned in original condition</li>
                  <li>Shipping costs for returns may apply</li>
                  <li>Monthly service fees prorated for partial months</li>
                </ul>
                <p className="mt-4"><strong className="text-white">Pre-Booking Cancellation:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full refund if cancelled before shipment</li>
                  <li>Cancellation requests via email or customer portal</li>
                  <li>Refunds processed within 14 business days</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  To the maximum extent permitted by Indian law, Starlink India shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Service interruptions or degraded performance</li>
                  <li>Loss of data or business opportunities</li>
                  <li>Indirect, consequential, or punitive damages</li>
                  <li>Damages exceeding amounts paid for services</li>
                  <li>Issues caused by third-party equipment or software</li>
                  <li>Force majeure events beyond our control</li>
                </ul>
              </div>
            </div>

            {/* Regulatory Compliance */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Regulatory Compliance</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Starlink services in India are subject to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Licensing and approvals from Department of Telecommunications (DoT)</li>
                  <li>Compliance with Indian Telegraph Act, 1885</li>
                  <li>Information Technology Act, 2000</li>
                  <li>Telecom Regulatory Authority of India (TRAI) regulations</li>
                  <li>Data localization and security requirements</li>
                  <li>Lawful interception obligations</li>
                </ul>
                <p className="mt-4">
                  Service availability is conditional on obtaining and maintaining necessary regulatory approvals.
                </p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Any disputes shall be resolved through:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Good faith negotiation between parties</li>
                  <li>Mediation if negotiation fails</li>
                  <li>Arbitration under Indian Arbitration and Conciliation Act, 1996</li>
                  <li>Courts of [Jurisdiction] shall have exclusive jurisdiction</li>
                </ol>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <div className="text-muted-foreground">
                <p>
                  We reserve the right to modify these Terms at any time. Material changes will be notified via email or website notice. Continued use of services after changes constitutes acceptance of modified Terms.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="text-muted-foreground space-y-2">
                <p>For questions about these Terms:</p>
                <p className="font-semibold text-white">Starlink India</p>
                <p>Email: <a href="mailto:legal@starlink.in" className="text-orange-400 hover:underline">legal@starlink.in</a></p>
                <p>Phone: 1800-123-456 (Toll-Free)</p>
                <p>Support: <a href="mailto:support@starlink.in" className="text-orange-400 hover:underline">support@starlink.in</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
