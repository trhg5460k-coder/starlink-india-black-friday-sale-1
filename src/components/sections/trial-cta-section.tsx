"use client";

import { Target, Calendar } from "lucide-react";

const TrialCtaSection = () => {
  return (
    <section className="bg-black my-16 py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h3 className="font-display text-3xl md:text-4xl font-bold uppercase leading-tight text-primary-text">
              30 DAY TRIAL
            </h3>
            <p className="mt-4 text-sm md:text-base leading-[1.5] text-tertiary-text max-w-md mx-auto lg:mx-0">
              If not satisfied, return Starlink for a full refund - Available in India.
            </p>
            
            <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-sm text-blue-400">
              <Calendar className="h-4 w-4" />
              <span>Shipping starts Jan 2026</span>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Live Pre-booking Open</span>
              </div>
              
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label
                    htmlFor="service-address"
                    className="block text-sm text-tertiary-text mb-2"
                  >
                    Service Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="service-address"
                      name="service-address"
                      className="w-full bg-transparent border-0 border-b border-input-border pb-3 text-primary-text placeholder:text-input-placeholder focus:outline-none focus:ring-0 focus:border-primary"
                      placeholder="Street, City, State"
                    />
                    <button
                      type="button"
                      aria-label="Use My Location"
                      className="absolute right-0 top-1/2 -translate-y-[calc(50%-0.375rem)] p-2 text-tertiary-text hover:text-primary-text transition-colors"
                    >
                      <Target className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3 md:py-4 px-6 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-500"
                >
                  PRE-BOOK NOW - 50% OFF
                </button>
                <p className="mt-4 text-xs text-center text-white/50">
                  🔒 Secure checkout • Free cancellation
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrialCtaSection;