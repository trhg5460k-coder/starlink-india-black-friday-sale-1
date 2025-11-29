"use client";

import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

// Keyframes for the checkmark animation. This is a workaround for not having
// access to a global CSS file or tailwind.config.js for custom animations.
// This is a standard <style> tag, not styled-jsx.
const AnimationStyles = () => (
  <style>
    {`
      @keyframes order-confirmation-stroke {
        100% {
          stroke-dashoffset: 0;
        }
      }
      @media print {
        body * {
          visibility: hidden;
        }
        #printable-section, #printable-section * {
          visibility: visible;
        }
        #printable-section {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none;
        }
      }
    `}
  </style>
);

const AnimatedCheckmark = () => (
  <div className="relative w-24 h-24 mx-auto mb-6">
    <svg className="w-full h-full" viewBox="0 0 52 52">
      <circle
        className="stroke-current text-border"
        cx="26"
        cy="26"
        r="25"
        fill="none"
        strokeWidth="3"
      />
      <circle
        className="stroke-current text-primary-text"
        cx="26"
        cy="26"
        r="25"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          strokeDasharray: 166,
          strokeDashoffset: 166,
          animation: "order-confirmation-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards",
        }}
      />
      <path
        className="stroke-current text-primary-text"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        style={{
          strokeDasharray: 48,
          strokeDashoffset: 48,
          animation: "order-confirmation-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards",
        }}
      />
    </svg>
  </div>
);


const OrderConfirmationPage = () => {
    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    return (
        <>
            <AnimationStyles />
            <div className="dark bg-primary-background font-body text-primary-text min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <main id="printable-section" className="w-full max-w-3xl mx-auto py-12">
                    <div className="bg-card border border-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-8 md:p-12 text-center">
                        <AnimatedCheckmark />

                        <h1 className="font-display text-3xl md:text-4xl font-bold uppercase text-primary-text mb-2">
                            Pre-booking Confirmed!
                        </h1>
                        <p className="text-tertiary-text max-w-md mx-auto mb-8">
                            Thank you for your order. Your high-speed internet journey is about to begin.
                        </p>

                        <div className="bg-secondary-background border border-border rounded-md p-4 mb-8 text-left">
                            <p className="font-body text-sm text-tertiary-text">Order Number</p>
                            <p className="font-display text-lg font-bold text-primary-text tracking-wider">
                                SL-12345678
                            </p>
                        </div>

                        <div className="border-y border-border divide-y divide-border my-8 text-left text-sm">
                            <div className="py-4 flex justify-between items-center">
                                <span className="text-secondary-text">Starlink Kit (Residential)</span>
                                <span className="font-semibold text-primary-text">$599.00</span>
                            </div>
                            <div className="py-4 flex justify-between items-center">
                                <span className="text-secondary-text">Limited Time Discount</span>
                                <span className="font-semibold text-green-400">-$599.00</span>
                            </div>
                            <div className="py-4 flex justify-between items-center">
                                <span className="text-secondary-text">Residential Plan (Monthly)</span>
                                <span className="font-semibold text-primary-text">$120.00</span>
                            </div>
                            <div className="py-4 flex justify-between items-center">
                                <span className="text-secondary-text">Shipping &amp; Handling</span>
                                <span className="font-semibold text-primary-text">$0.00</span>
                            </div>
                            <div className="py-5 flex justify-between items-center text-base">
                                <strong className="text-primary-text font-bold">Total Paid Today</strong>
                                <strong className="font-display text-primary-text font-bold">$120.00</strong>
                            </div>
                        </div>
                        
                        <div className="text-left mb-8">
                            <p className="text-secondary-text text-sm">
                                Estimated device shipment: <span className="text-primary-text font-semibold">within 2 weeks</span>
                            </p>
                        </div>

                        <div className="bg-secondary-background border border-border rounded-lg p-6 text-left mb-8">
                            <h2 className="font-display text-xl font-bold uppercase text-primary-text mb-4">What Happens Next?</h2>
                            <ol className="space-y-4 text-secondary-text">
                                <li className="flex items-start">
                                    <span className="font-display font-bold text-primary-text mr-3 pt-0.5">1.</span>
                                    <span>You will receive a confirmation email shortly with your order details and account setup instructions.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-display font-bold text-primary-text mr-3 pt-0.5">2.</span>
                                    <span>Our installation partner will contact you within 5 business days to schedule your free professional setup.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-display font-bold text-primary-text mr-3 pt-0.5">3.</span>
                                    <span>Your Starlink kit will ship. You'll get a tracking number via email once it leaves our facility.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-display font-bold text-primary-text mr-3 pt-0.5">4.</span>
                                    <span>Your professional installation will be completed on the scheduled date. Get ready for high-speed internet from space!</span>
                                </li>
                            </ol>
                        </div>

                        <div className="border border-border rounded-lg p-6 text-left mb-8">
                            <h3 className="font-display text-lg font-bold uppercase text-primary-text mb-2">Need Help?</h3>
                            <p className="text-secondary-text">
                                If you have any questions about your order, visit our{' '}
                                <a href="/support" className="text-accent-link underline hover:text-white transition-colors">Support Center</a> or reply to your confirmation email.
                            </p>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-12 no-print">
                            <Link
                                href="/"
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 border border-secondary-cta-border text-secondary-cta-text font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-white/10 transition-colors duration-300"
                            >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                                Return to Home
                            </Link>
                             <button
                                onClick={handlePrint}
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-primary-cta text-primary-cta-text font-bold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity duration-300"
                            >
                                <Printer className="w-4 h-4 mr-2" />
                                Print Receipt
                            </button>
                        </div>
                    </div>
                </main>
            </div>
         </>
    );
};

export default OrderConfirmationPage;