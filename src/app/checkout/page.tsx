'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, Check, ArrowRight, ArrowLeft, Home, Compass, 
  Shield, Lock, CreditCard, Sparkles, Clock, MapPin, Phone, 
  User, Mail, Building, Package, Wifi, AlertCircle, Info
} from 'lucide-react';
import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import FooterSection from '@/components/sections/footer';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
  "Andaman and Nicobar Islands", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep"
];

const plans = [
  {
    id: 'standard',
    name: 'Standard',
    speed: '50-150 Mbps',
    downloadSpeed: '50-150 Mbps',
    uploadSpeed: '10-20 Mbps',
    latency: '25-60ms',
    originalPrice: 3000,
    discountedPrice: 2250,
    features: ['Unlimited high-speed data', 'Typical download: 50-150 Mbps', 'Typical upload: 10-20 Mbps', 'Low latency 25-60ms', 'Ideal for streaming, gaming & video calls', 'Standard support', 'No contracts or commitments'],
    popular: false,
  },
  {
    id: 'priority',
    name: 'Priority',
    speed: '100-220 Mbps',
    downloadSpeed: '100-220 Mbps',
    uploadSpeed: '20-40 Mbps',
    latency: '25-50ms',
    originalPrice: 5000,
    discountedPrice: 3750,
    features: ['Priority network access', 'Faster speeds: 100-220 Mbps', 'Enhanced upload: 20-40 Mbps', 'Lower latency 25-50ms', 'Priority data allocation', '24/7 priority support', 'Ideal for businesses & power users', 'Static IP option available'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    speed: '150-220 Mbps',
    downloadSpeed: '150-220 Mbps',
    uploadSpeed: '25-40 Mbps',
    latency: '20-40ms',
    originalPrice: 8000,
    discountedPrice: 6000,
    features: ['Maximum priority bandwidth', 'Peak speeds: 150-220 Mbps', 'Best upload: 25-40 Mbps', 'Ultra-low latency 20-40ms', 'Unthrottled data', 'Dedicated 24/7 premium support', 'Perfect for enterprises & heavy usage', 'Static IP included', 'Business use approved'],
    popular: false,
  },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<'residential' | 'roam'>('residential');
  const [selectedState, setSelectedState] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize from URL params
  useEffect(() => {
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const planId = searchParams.get('plan');

    if (type === 'roam') setServiceType('roam');
    if (state) setSelectedState(decodeURIComponent(state));
    if (planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) setSelectedPlan(plan);
    }
  }, [searchParams]);

  const devicePrice = serviceType === 'residential' 
    ? { original: 30000, discounted: 15000 } 
    : { original: 40000, discounted: 20000 };

  const totalDeviceCost = devicePrice.discounted;
  const monthlyPlanCost = selectedPlan?.discountedPrice || 0;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      // Only validate state for residential
      if (serviceType === 'residential' && !selectedState) {
        newErrors.state = 'Please select your state';
      }
    } else if (currentStep === 2) {
      if (!selectedPlan) newErrors.plan = 'Please select a plan';
    } else if (currentStep === 3) {
      if (!customerInfo.firstName) newErrors.firstName = 'First name is required';
      if (!customerInfo.lastName) newErrors.lastName = 'Last name is required';
      if (!customerInfo.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Invalid email format';
      if (!customerInfo.phone) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
      if (!customerInfo.address) newErrors.address = 'Address is required';
      if (!customerInfo.city) newErrors.city = 'City is required';
      if (!customerInfo.pincode) newErrors.pincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(customerInfo.pincode)) newErrors.pincode = 'Invalid pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayment = () => {
    if (!acceptedTerms) {
      setErrors({ terms: 'Please accept the terms and conditions' });
      return;
    }
    // Redirect to xyz.com
    window.location.href = 'https://xyz.com';
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
      {[1, 2, 3, 4].map((s) => (
        <React.Fragment key={s}>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold transition-all ${
              s < step 
                ? 'bg-green-500 border-green-500 text-black' 
                : s === step 
                ? 'bg-white border-white text-black' 
                : 'border-white/30 text-white/50'
            }`}
          >
            {s < step ? <Check className="h-5 w-5" /> : s}
          </div>
          {s < 4 && (
            <div className={`h-0.5 w-8 md:w-16 ${s < step ? 'bg-green-500' : 'bg-white/20'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const OrderSummary = ({ sticky = false }: { sticky?: boolean }) => (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${sticky ? 'lg:sticky lg:top-24' : ''}`}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Package className="h-5 w-5" />
        Order Summary
      </h3>
      
      <div className="space-y-4">
        {/* Service Type */}
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            {serviceType === 'residential' ? <Home className="h-5 w-5 text-blue-400" /> : <Compass className="h-5 w-5 text-purple-400" />}
            <div>
              <p className="font-semibold">{serviceType === 'residential' ? 'Residential' : 'Roam'} Kit</p>
              {serviceType === 'residential' && selectedState && <p className="text-xs text-muted-foreground">{selectedState}</p>}
            </div>
          </div>
        </div>

        {/* Device Cost */}
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Device Cost</span>
          <div className="text-right">
            <span className="font-bold text-green-400">₹{totalDeviceCost.toLocaleString()}</span>
            <span className="ml-2 text-sm line-through text-muted-foreground">₹{devicePrice.original.toLocaleString()}</span>
          </div>
        </div>

        {/* Discount Badge */}
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-red-600/20 text-red-400 px-2 py-1 rounded flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            50% OFF - Black Friday
          </div>
        </div>

        {/* Plan */}
        {selectedPlan && (
          <>
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-blue-400" />
                <span className="text-muted-foreground">{selectedPlan.name} Plan</span>
              </div>
              <div className="text-right">
                <span className="font-bold">₹{monthlyPlanCost.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">/mo</span>
              </div>
            </div>
            
            {/* 25% OFF Disclaimer */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-xs">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-400 font-semibold mb-1">Limited Time Offer</p>
                  <p className="text-yellow-300/90">
                    25% discount applies only to the <strong>first 3 months</strong>. After that, the plan will be charged at the regular price of ₹{selectedPlan.originalPrice.toLocaleString()}/month.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Due Today</span>
            <span className="text-2xl font-bold text-green-400">₹{totalDeviceCost.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground text-right">+ ₹{monthlyPlanCost.toLocaleString()}/mo starting after setup</p>
          <p className="text-xs text-yellow-400/80 text-right mt-1">(discounted for 3 months)</p>
        </div>

        {/* Security Badges */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-muted-foreground justify-center">
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>30-Day Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />

      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase mb-2">
              Secure Checkout
            </h1>
            <p className="text-muted-foreground">Complete your Starlink pre-booking</p>
          </div>

          <StepIndicator />

          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Service & Location */}
              {step === 1 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    Step 1: Service & Location
                  </h2>

                  {/* Service Type */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium mb-3">Select Service Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setServiceType('residential')}
                        className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                          serviceType === 'residential'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <Home className={`h-8 w-8 ${serviceType === 'residential' ? 'text-green-400' : 'text-white/70'}`} />
                        <div className="text-center">
                          <p className="font-bold">Residential</p>
                          <p className="text-sm text-muted-foreground">₹15,000</p>
                        </div>
                      </button>
                      <button
                        onClick={() => setServiceType('roam')}
                        className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                          serviceType === 'roam'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <Compass className={`h-8 w-8 ${serviceType === 'roam' ? 'text-green-400' : 'text-white/70'}`} />
                        <div className="text-center">
                          <p className="font-bold">Roam</p>
                          <p className="text-sm text-muted-foreground">₹20,000</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* State Selector - Only for Residential */}
                  {serviceType === 'residential' && (
                    <div>
                      <label className="block text-sm font-medium mb-3">Select Your State</label>
                      <div className="relative">
                        <button
                          onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                          className={`w-full flex items-center justify-between px-4 py-4 bg-black/30 border rounded-xl text-left transition-colors ${
                            errors.state ? 'border-red-500' : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <span className={selectedState ? 'text-white' : 'text-muted-foreground'}>
                            {selectedState || 'Select your state...'}
                          </span>
                          <ChevronDown className={`h-5 w-5 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isStateDropdownOpen && (
                          <div className="absolute z-50 w-full mt-2 bg-black/95 border border-white/20 rounded-xl max-h-64 overflow-y-auto backdrop-blur-xl">
                            {indianStates.map((state) => (
                              <button
                                key={state}
                                onClick={() => {
                                  setSelectedState(state);
                                  setIsStateDropdownOpen(false);
                                  setErrors({ ...errors, state: '' });
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between"
                              >
                                <span>{state}</span>
                                {selectedState === state && <Check className="h-4 w-4 text-green-400" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.state && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.state}
                        </p>
                      )}
                      {selectedState && (
                        <p className="mt-2 text-sm text-green-400 flex items-center gap-1">
                          <Check className="h-4 w-4" />
                          Starlink is available in {selectedState}
                        </p>
                      )}
                    </div>
                  )}

                  {serviceType === 'roam' && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm text-blue-300">
                      <p className="font-semibold mb-1">Roam Service - Available Nationwide</p>
                      <p className="text-blue-400/80">Travel anywhere across India with portable connectivity.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Select Plan */}
              {step === 2 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-blue-400" />
                    Step 2: Select Your Plan
                  </h2>

                  {/* Important Note about 25% discount */}
                  <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-yellow-400 font-semibold mb-2">Important: Limited Time Discount</p>
                        <p className="text-yellow-300/90">
                          The 25% plan discount is valid for the <strong>first 3 months only</strong>. Starting from month 4, you will be charged the regular plan price.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setErrors({ ...errors, plan: '' });
                        }}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                          selectedPlan?.id === plan.id
                            ? 'border-green-500 bg-green-500/10'
                            : plan.popular
                            ? 'border-yellow-500/50 bg-white/5 hover:bg-white/10'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-lg">{plan.name}</span>
                              <span className="text-sm text-blue-400">{plan.speed}</span>
                              {plan.popular && (
                                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {plan.features.map((feature, i) => (
                                <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-2xl font-bold text-green-400">
                              ₹{plan.discountedPrice.toLocaleString()}
                              <span className="text-sm font-normal text-muted-foreground">/mo</span>
                            </p>
                            <p className="text-sm line-through text-muted-foreground">
                              ₹{plan.originalPrice.toLocaleString()}/mo
                            </p>
                            <div className="text-xs text-red-400 mt-1">25% OFF (3 months)</div>
                          </div>
                        </div>
                        <div className={`mt-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan?.id === plan.id ? 'border-green-500 bg-green-500' : 'border-white/30'
                        }`}>
                          {selectedPlan?.id === plan.id && <Check className="h-3 w-3 text-black" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {errors.plan && (
                    <p className="mt-4 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.plan}
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Customer Information */}
              {step === 3 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Step 3: Your Information
                  </h2>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                          className={`w-full px-4 py-3 bg-black/30 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <input
                          type="text"
                          value={customerInfo.lastName}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                          className={`w-full px-4 py-3 bg-black/30 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.lastName ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                            className={`w-full pl-12 pr-4 py-3 bg-black/30 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                              errors.email ? 'border-red-500' : 'border-white/20'
                            }`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                            className={`w-full pl-12 pr-4 py-3 bg-black/30 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                              errors.phone ? 'border-red-500' : 'border-white/20'
                            }`}
                            placeholder="9876543210"
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Street Address *</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          className={`w-full pl-12 pr-4 py-3 bg-black/30 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.address ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="123 Main Street, Apartment 4B"
                        />
                      </div>
                      {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <input
                          type="text"
                          value={customerInfo.city}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                          className={`w-full px-4 py-3 bg-black/30 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.city ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="Mumbai"
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Pincode *</label>
                        <input
                          type="text"
                          value={customerInfo.pincode}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                          className={`w-full px-4 py-3 bg-black/30 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.pincode ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="400001"
                          maxLength={6}
                        />
                        {errors.pincode && <p className="mt-1 text-sm text-red-400">{errors.pincode}</p>}
                      </div>
                    </div>

                    {serviceType === 'residential' && selectedState && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/30 p-4 rounded-xl">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>State: <strong className="text-white">{selectedState}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review & Pay */}
              {step === 4 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                    Step 4: Review & Pay
                  </h2>

                  {/* Order Review */}
                  <div className="space-y-6">
                    {/* Service Details */}
                    <div className="bg-black/30 rounded-xl p-5">
                      <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Service Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service Type</span>
                          <span className="font-medium">{serviceType === 'residential' ? 'Residential' : 'Roam'}</span>
                        </div>
                        {serviceType === 'residential' && selectedState && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location</span>
                            <span className="font-medium">{selectedState}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan</span>
                          <span className="font-medium">{selectedPlan?.name} ({selectedPlan?.speed})</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="bg-black/30 rounded-xl p-5">
                      <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Shipping Details</h3>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">{customerInfo.firstName} {customerInfo.lastName}</p>
                        <p className="text-muted-foreground">{customerInfo.address}</p>
                        <p className="text-muted-foreground">{customerInfo.city}{serviceType === 'residential' && selectedState ? `, ${selectedState}` : ''} - {customerInfo.pincode}</p>
                        <p className="text-muted-foreground">{customerInfo.email}</p>
                        <p className="text-muted-foreground">+91 {customerInfo.phone}</p>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-500/30 rounded-xl p-5">
                      <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-green-400">Price Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Device Cost</span>
                          <div>
                            <span className="font-medium text-green-400">₹{totalDeviceCost.toLocaleString()}</span>
                            <span className="ml-2 text-sm line-through text-muted-foreground">₹{devicePrice.original.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Plan</span>
                          <div>
                            <span className="font-medium">₹{monthlyPlanCost.toLocaleString()}/mo</span>
                            <span className="ml-2 text-sm line-through text-muted-foreground">₹{selectedPlan?.originalPrice.toLocaleString()}/mo</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Installation</span>
                          <span className="font-medium text-green-400">FREE</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 mt-3">
                          <div className="flex justify-between text-lg">
                            <span className="font-bold">Due Today</span>
                            <span className="font-bold text-green-400">₹{totalDeviceCost.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground text-right mt-1">
                            Then ₹{monthlyPlanCost.toLocaleString()}/month after setup
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => setAcceptedTerms(!acceptedTerms)}
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          acceptedTerms ? 'bg-green-500 border-green-500' : 'border-white/30'
                        }`}
                      >
                        {acceptedTerms && <Check className="h-4 w-4 text-black" />}
                      </button>
                      <p className="text-sm text-muted-foreground">
                        I agree to the{' '}
                        <Link href="#" className="text-blue-400 hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="#" className="text-blue-400 hover:underline">Privacy Policy</Link>
                        . I understand that I can cancel within 30 days for a full refund.
                      </p>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.terms}
                      </p>
                    )}

                    {/* Pay Button */}
                    <button
                      onClick={handlePayment}
                      className="w-full group flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg uppercase tracking-wider py-5 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-green-500/20"
                    >
                      <Lock className="h-5 w-5" />
                      <span>Pay ₹{totalDeviceCost.toLocaleString()} Securely</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Security Notice */}
                    <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        <span>256-bit SSL Encryption</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        <span>Secure Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <Link
                    href="/personal"
                    className="flex items-center gap-2 px-6 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Plans</span>
                  </Link>
                )}

                {step < 4 && (
                  <button
                    onClick={handleNext}
                    className="group flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar - Order Summary */}
            <div className="hidden lg:block lg:col-span-1">
              <OrderSummary sticky />
            </div>
          </div>

          {/* Mobile Order Summary */}
          <div className="lg:hidden mt-8">
            <OrderSummary />
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Ships in 2-4 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Free Installation</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}