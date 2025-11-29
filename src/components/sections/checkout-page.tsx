"use client";

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

// A placeholder for the cn utility function, which is common in shadcn/ui projects.
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- DUMMY DATA ---
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const plans = [
  { id: 'standard', name: 'Standard', price: 99, originalPrice: 120, speed: 'Up to 100 Mbps' },
  { id: 'priority', name: 'Priority', price: 149, originalPrice: 180, speed: 'Up to 250 Mbps' },
  { id: 'premium', name: 'Premium', price: 299, originalPrice: 350, speed: 'Up to 400+ Mbps' },
];

const DEVICE_COST = 499;
const DEVICE_COST_DISCOUNTED = 0; // "No upfront Residential hardware cost"

// --- STYLED COMPONENT PLACEHOLDERS (matching Starlink/shadcn dark theme) ---

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "flex h-12 w-full rounded-md border border-input-border bg-input px-3 py-2 text-base text-primary-text placeholder:text-input-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  />
);

const Checkbox = ({ id, checked, onChange, children }: { id: string, checked: boolean, onChange: (checked: boolean) => void, children: React.ReactNode }) => (
    <div className="flex items-center space-x-3">
        <button
            id={id}
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                "peer h-5 w-5 shrink-0 rounded-sm border border-primary flex items-center justify-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-primary text-primary-foreground" : "bg-transparent"
            )}
        >
            {checked && <Check className="h-4 w-4" />}
        </button>
        <label htmlFor={id} className="text-sm font-medium leading-none text-secondary-text peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {children}
        </label>
    </div>
);

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-12">
    {Array.from({ length: totalSteps }).map((_, index) => {
      const stepNumber = index + 1;
      const isCompleted = stepNumber < currentStep;
      const isActive = stepNumber === currentStep;
      return (
        <div key={stepNumber} className="flex items-center space-x-2 md:space-x-4">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold",
              isActive ? "border-primary bg-primary text-primary-foreground" : isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-border text-tertiary-text",
              "transition-colors duration-300"
            )}
          >
            {isCompleted ? <Check size={18} /> : stepNumber}
          </div>
          {stepNumber < totalSteps && (
              <div className={cn("hidden md:block h-0.5 w-16", isCompleted ? 'bg-primary' : 'bg-border')}></div>
          )}
        </div>
      );
    })}
  </div>
);

// --- MAIN CHECKOUT COMPONENT ---

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: null as 'residential' | 'roam' | null,
    state: '',
    plan: null as typeof plans[0] | null,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    acceptedTerms: false,
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  
  const isFormComplete = 
    formData.serviceType &&
    formData.state &&
    formData.plan &&
    formData.customerInfo.name &&
    formData.customerInfo.email &&
    formData.customerInfo.phone &&
    formData.customerInfo.address &&
    formData.acceptedTerms;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <section>
            <h2 className="text-2xl font-bold font-display uppercase tracking-[-0.01em] mb-8">Step 1: Select Your Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div onClick={() => setFormData({ ...formData, serviceType: 'residential' })} className={cn("cursor-pointer rounded-lg border-2 p-6 transition-all", formData.serviceType === 'residential' ? 'border-primary bg-secondary' : 'border-border hover:border-muted')}>
                <h3 className="text-xl font-bold font-display uppercase">Residential</h3>
                <p className="text-tertiary-text mt-2">Connect at home. Best for stationary use.</p>
              </div>
              <div onClick={() => setFormData({ ...formData, serviceType: 'roam' })} className={cn("cursor-pointer rounded-lg border-2 p-6 transition-all", formData.serviceType === 'roam' ? 'border-primary bg-secondary' : 'border-border hover:border-muted')}>
                <h3 className="text-xl font-bold font-display uppercase">Roam</h3>
                <p className="text-tertiary-text mt-2">Connect while traveling. Portable solution.</p>
              </div>
            </div>
          </section>
        );
      case 2:
        return (
          <section>
            <h2 className="text-2xl font-bold font-display uppercase tracking-[-0.01em] mb-8">Step 2: Select Your State</h2>
            <div className="relative">
              <select value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full appearance-none h-12 rounded-md border border-input-border bg-input px-3 text-base text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="" disabled>Select a state</option>
                {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary-text pointer-events-none" />
            </div>
          </section>
        );
      case 3:
        return (
          <section>
            <h2 className="text-2xl font-bold font-display uppercase tracking-[-0.01em] mb-8">Step 3: Choose Your Plan</h2>
            <div className="space-y-4">
              {plans.map(plan => (
                <div key={plan.id} onClick={() => setFormData({ ...formData, plan })} className={cn("cursor-pointer rounded-lg border-2 p-4 transition-all flex justify-between items-center", formData.plan?.id === plan.id ? 'border-primary bg-secondary' : 'border-border hover:border-muted')}>
                  <div>
                    <h3 className="text-lg font-bold font-display uppercase">{plan.name}</h3>
                    <p className="text-tertiary-text text-sm">{plan.speed}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-sm text-muted-foreground line-through">${plan.originalPrice}/mo</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 4:
        return (
          <section>
            <h2 className="text-2xl font-bold font-display uppercase tracking-[-0.01em] mb-8">Step 4: Customer Information</h2>
            <div className="space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-text mb-2">Full Name</label>
                    <Input id="name" placeholder="John Doe" value={formData.customerInfo.name} onChange={(e) => setFormData({ ...formData, customerInfo: { ...formData.customerInfo, name: e.target.value }})} />
                 </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-text mb-2">Email Address</label>
                    <Input id="email" type="email" placeholder="you@example.com" value={formData.customerInfo.email} onChange={(e) => setFormData({ ...formData, customerInfo: { ...formData.customerInfo, email: e.target.value }})} />
                  </div>
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-text mb-2">Phone Number</label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.customerInfo.phone} onChange={(e) => setFormData({ ...formData, customerInfo: { ...formData.customerInfo, phone: e.target.value }})} />
                  </div>
                   <div>
                    <label htmlFor="address" className="block text-sm font-medium text-secondary-text mb-2">Shipping Address</label>
                    <Input id="address" placeholder="123 Space-X Road, Rocket City" value={formData.customerInfo.address} onChange={(e) => setFormData({ ...formData, customerInfo: { ...formData.customerInfo, address: e.target.value }})} />
                   </div>
            </div>
          </section>
        );
      default: return null;
    }
  };
  
    const OrderSummary = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={cn('rounded-lg border border-border bg-card/80 p-6 backdrop-blur-lg', !isMobile && 'lg:sticky lg:top-24')}>
            <h3 className="text-xl font-bold font-display uppercase mb-6">Order Summary</h3>
            <div className="space-y-4 text-secondary-text">
                <div className="flex justify-between items-baseline"><span className="text-sm">Device Cost</span><div className="text-right text-sm"><span className="text-primary-text">${DEVICE_COST_DISCOUNTED}</span><span className="ml-2 line-through text-muted-foreground">${DEVICE_COST}</span></div></div>
                <div className="flex justify-between items-baseline"><span className="text-sm">{formData.plan?.name || 'Plan'}</span><span className="text-primary-text text-sm">{formData.plan ? `$${formData.plan.price}/mo` : 'N/A'}</span></div>
                <div className="border-t border-border my-4"></div>
                <div className="flex justify-between text-base font-bold text-primary-text"><span>Total Due Today</span><span>${DEVICE_COST_DISCOUNTED}</span></div>
                <div className="flex justify-between text-base font-semibold text-primary-text"><span>Monthly Bill</span><span>{formData.plan ? `$${formData.plan.price}` : '$0'}</span></div>
            </div>
            <div className="mt-8">
                 <Checkbox id="terms" checked={formData.acceptedTerms} onChange={(checked) => setFormData({ ...formData, acceptedTerms: checked })}>I accept the Terms of Service & Privacy Policy.</Checkbox>
            </div>
             <a
                href={isFormComplete ? "https://xyz.com" : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('mt-6 flex w-full h-14 items-center justify-center rounded-md text-base font-bold uppercase transition-colors', 'bg-primary text-primary-foreground hover:bg-primary/90', !isFormComplete && 'opacity-50 cursor-not-allowed')}
                onClick={(e) => !isFormComplete && e.preventDefault()}
            >
                { isFormComplete ? 'Proceed to Payment' : 'Complete Form' }
            </a>
        </div>
    );

  return (
    <div className="dark bg-background text-foreground font-body min-h-screen py-16 sm:py-24">
      <main className="mx-auto max-w-[800px] px-4">
        <h1 className="text-4xl font-bold font-display uppercase text-center mb-4">Checkout</h1>
        <p className="text-center text-tertiary-text mb-12">Complete your Starlink order in just a few steps.</p>
        
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
                {renderStepContent()}
                <div className="mt-10 flex justify-between">
                    <button onClick={handlePrev} disabled={currentStep === 1} className="py-2 px-4 rounded-md text-sm font-semibold border border-secondary-cta-border text-secondary-cta-text hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Previous</button>
                    {currentStep < totalSteps && (<button onClick={handleNext} className="py-2 px-6 rounded-md text-sm font-bold uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Next Step</button>)}
                </div>
                 {/* Mobile Order Summary */}
                <div className="lg:hidden mt-12">
                     <OrderSummary isMobile />
                </div>
            </div>
            
            {/* Desktop Order Summary */}
            <aside className="hidden lg:block lg:col-span-1">
                <OrderSummary />
            </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;