"use client";

import * as React from "react";
import Image from "next/image";
import {
  ChevronDown,
  Check,
  MapPin,
  Mountain,
  Rss,
  Wifi,
  Thermometer,
  Package,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const StateSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-sm h-14 bg-black/30 border-input-border text-white placeholder:text-input-placeholder text-base backdrop-blur-sm">
        <SelectValue placeholder="Select your state to see availability" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border text-popover-foreground">
        {indianStates.map((state) => (
          <SelectItem key={state} value={state.toLowerCase().replace(/ /g, "-")}>
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const FaqAccordion = () => {
  const faqItems = [
    {
      question: "What speeds can I expect?",
      answer: "Starlink for residential use is designed to deliver speeds of up to 150 Mbps with low latency of 20-40ms. Speeds may vary based on your location and network congestion. Our pre-booking plan offers a base speed of 25 Mbps.",
    },
    {
      question: "Does weather affect the service?",
      answer: "Starlink is designed to work in a wide range of weather conditions, including rain, snow, and wind. However, very heavy rain or snow may cause temporary signal obstruction, leading to a brief interruption of service.",
    },
    {
      question: "How is Starlink installed?",
      answer: "Starlink comes with a simple DIY kit. Setup involves two steps: plugging it in and pointing it at the sky with a clear view. For select areas, we offer free professional installation to ensure optimal placement and performance.",
    },
    {
      question: "Can I use Starlink for gaming and video calls?",
      answer: "Yes. Starlink's low latency makes it ideal for competitive online gaming, video conferencing, streaming, and other high-demand applications that are impossible with traditional satellite internet.",
    },
    {
      question: "What is the pre-booking discount?",
      answer: "By pre-booking, you lock in a 25% discount on your monthly service fee for the first year. This is a limited-time offer for early adopters in India.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-border-subtle">
          <AccordionTrigger className="text-left text-lg hover:no-underline font-semibold text-primary-text">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-lg text-tertiary-text">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};


const OrderForm = () => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="first-name" className="text-secondary-text">First Name</Label>
        <Input id="first-name" placeholder="Enter your first name" className="h-12 bg-input border-input-border placeholder:text-input-placeholder" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last-name" className="text-secondary-text">Last Name</Label>
        <Input id="last-name" placeholder="Enter your last name" className="h-12 bg-input border-input-border placeholder:text-input-placeholder" />
      </div>
       <div className="space-y-2">
        <Label htmlFor="phone" className="text-secondary-text">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="Enter your phone number" className="h-12 bg-input border-input-border placeholder:text-input-placeholder" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-secondary-text">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email address" className="h-12 bg-input border-input-border placeholder:text-input-placeholder" />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="service-address" className="text-secondary-text">Service Address</Label>
        <Input id="service-address" placeholder="Enter your full service address" className="h-12 bg-input border-input-border placeholder:text-input-placeholder" />
      </div>
      <div className="md:col-span-2">
        <Button size="lg" className="w-full h-14 text-base uppercase font-bold bg-primary-cta text-primary-cta-text hover:opacity-90 transition-opacity">
          Place Order
        </Button>
      </div>
    </form>
  )
}

const ResidentialPage = () => {
  return (
    <div className="bg-primary-background text-primary-text font-body">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_hero_m-1.jpg"
          alt="Starlink satellite internet dish on a modern house"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-overlay-dark z-10"></div>
        <div className="relative z-20 container px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-tight max-w-4xl">
            Reliable High-Speed Internet For India
          </h1>
          <p className="mt-6 text-lg md:text-xl text-tertiary-text max-w-2xl">
            Connect your home to the world's most advanced satellite internet constellation. Pre-book now for exclusive launch offers.
          </p>
          <div className="mt-12 w-full max-w-sm">
            <StateSelector />
          </div>
        </div>
      </section>

      {/* Plan Details Section */}
      <section className="py-20 md:py-32 bg-secondary-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center uppercase">Exclusive Launch Offer</h2>
          <p className="mt-4 text-center text-lg text-tertiary-text max-w-3xl mx-auto">Limited-time pricing for early adopters in India. Secure your spot today.</p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border-subtle rounded-lg p-8 backdrop-blur-md">
              <h3 className="font-display text-2xl font-bold uppercase">Device Kit</h3>
              <p className="text-base text-tertiary-text mt-2">One-time hardware cost</p>
              <div className="mt-6">
                <p className="text-4xl font-bold text-primary-text">
                  <del className="text-2xl font-normal text-muted-foreground mr-2">₹30,000</del>
                  ₹15,000
                </p>
                <p className="mt-2 text-green-400 font-semibold text-lg">50% OFF - Black Friday Sale</p>
              </div>
            </div>
            <div className="bg-card border border-border-subtle rounded-lg p-8 backdrop-blur-md">
              <h3 className="font-display text-2xl font-bold uppercase">Monthly Plan</h3>
               <p className="text-base text-tertiary-text mt-2">25 Mbps Standard Plan</p>
              <div className="mt-6">
                 <p className="text-4xl font-bold text-primary-text">
                  ₹2,250<span className="text-lg font-normal text-tertiary-text">/month</span>
                </p>
                <p className="mt-2 text-green-400 font-semibold text-lg">
                  <del className="text-base font-normal text-muted-foreground mr-2">₹3,000/month</del>
                  25% Pre-booking Discount
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Specifications & Features Section */}
      <section className="py-20 md:py-32 bg-primary-background">
        <div className="container px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                 <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-left">Engineered For India</h2>
                <p className="mt-6 text-lg text-secondary-text">Starlink is designed to withstand the diverse climates of India, from Himalayan winters to monsoon seasons, ensuring you stay connected when it matters most.</p>
                <ul className="mt-8 space-y-4">
                    <li className="flex items-start">
                        <Check className="h-6 w-6 text-green-400 mt-1 mr-4 flex-shrink-0" />
                        <span className="text-lg text-secondary-text">Simple self-installation or opt for professional setup.</span>
                    </li>
                    <li className="flex items-start">
                        <Check className="h-6 w-6 text-green-400 mt-1 mr-4 flex-shrink-0" />
                        <span className="text-lg text-secondary-text">Weather-resistant design with an IP54 rating.</span>
                    </li>
                    <li className="flex items-start">
                        <Check className="h-6 w-6 text-green-400 mt-1 mr-4 flex-shrink-0" />
                        <span className="text-lg text-secondary-text">Includes Starlink dish, WiFi router, power supply, and mounts.</span>
                    </li>
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center">
                <div className="bg-secondary-background p-6 rounded-lg border border-border-subtle">
                    <Mountain className="h-10 w-10 mx-auto text-tertiary-text" />
                    <h4 className="mt-4 font-bold text-lg text-primary-text">Antenna</h4>
                    <p className="text-sm text-tertiary-text">Electronic Phased Array</p>
                </div>
                 <div className="bg-secondary-background p-6 rounded-lg border border-border-subtle">
                    <Wifi className="h-10 w-10 mx-auto text-tertiary-text" />
                    <h4 className="mt-4 font-bold text-lg text-primary-text">Wi-Fi Router</h4>
                    <p className="text-sm text-tertiary-text">Wi-Fi 5 Technology</p>
                </div>
                 <div className="bg-secondary-background p-6 rounded-lg border border-border-subtle">
                    <Thermometer className="h-10 w-10 mx-auto text-tertiary-text" />
                    <h4 className="mt-4 font-bold text-lg text-primary-text">Operating Temp</h4>
                    <p className="text-sm text-tertiary-text">-30°C to 50°C</p>
                </div>
                 <div className="bg-secondary-background p-6 rounded-lg border border-border-subtle">
                    <Package className="h-10 w-10 mx-auto text-tertiary-text" />
                    <h4 className="mt-4 font-bold text-lg text-primary-text">Package Weight</h4>
                    <p className="text-sm text-tertiary-text">12.1 kg</p>
                </div>
            </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-secondary-background">
        <div className="container px-4 sm:px-6 lg:px-8">
           <h2 className="font-display text-4xl md:text-5xl font-bold text-center uppercase">Connecting The Unconnected</h2>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-card border border-border-subtle rounded-lg p-8 backdrop-blur-md">
                    <p className="text-lg text-secondary-text leading-relaxed">"For our village in rural Maharashtra, getting stable internet was a dream. Starlink has changed everything. Our children can finally attend online classes without disruption."</p>
                    <p className="mt-6 font-bold text-primary-text">Priya S., Village Sarpanch</p>
                    <p className="text-sm text-tertiary-text">Ratnagiri, Maharashtra</p>
                </div>
                <div className="bg-card border border-border-subtle rounded-lg p-8 backdrop-blur-md">
                    <p className="text-lg text-secondary-text leading-relaxed">"As a developer working remotely from the hills of Himachal, I was completely dependent on unreliable mobile data. Starlink gave me city-level speeds and reliability. It's a game-changer."</p>
                    <p className="mt-6 font-bold text-primary-text">Arjun K., Software Engineer</p>
                     <p className="text-sm text-tertiary-text">Manali, Himachal Pradesh</p>
                </div>
                <div className="bg-card border border-border-subtle rounded-lg p-8 backdrop-blur-md md:col-span-2 lg:col-span-1">
                    <p className="text-lg text-secondary-text leading-relaxed">"We run a homestay in the remote parts of Kerala. Offering high-speed Wi-Fi was impossible until now. Our bookings have increased, and guests are happier than ever."</p>
                    <p className="mt-6 font-bold text-primary-text">Deepa &amp; Rajan M., Homestay Owners</p>
                     <p className="text-sm text-tertiary-text">Wayanad, Kerala</p>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-primary-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center uppercase">Frequently Asked Questions</h2>
          <div className="mt-16">
            <FaqAccordion />
          </div>
        </div>
      </section>
      
      {/* Order Form Section */}
       <section id="order-now" className="py-20 md:py-32 bg-secondary-background">
            <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-center uppercase">Pre-Book Your Starlink Today</h2>
                <p className="mt-4 text-center text-lg text-tertiary-text">Fill out the form below to reserve your Starlink Kit. Limited slots available for the launch offer.</p>
                <div className="mt-16 bg-card border border-border-subtle rounded-lg p-8 md:p-12 backdrop-blur-md">
                    <OrderForm />
                </div>
            </div>
        </section>

    </div>
  );
};

export default ResidentialPage;