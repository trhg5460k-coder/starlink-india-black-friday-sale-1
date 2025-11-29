import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const BusinessSolutionsBanner = () => {
  return (
    <section id="business-solutions" className="bg-black py-8 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-white lg:text-4xl">
          STARLINK FOR BUSINESSES AND POWER USERS
        </h2>
        <div className="mt-4 text-lg text-[#b3b3b3]">
          Reliable high-speed internet designed to keep businesses connected in India. Coming Soon.&nbsp;
          <Link
            href="/business"
            className="inline-flex items-center font-bold text-white underline-offset-4 transition-colors hover:underline"
          >
            Learn More
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutionsBanner;