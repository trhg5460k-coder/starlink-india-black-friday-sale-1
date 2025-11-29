import Image from "next/image";
import Link from "next/link";

const FlexiblePlansFeature = () => {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container">
        <div className="relative mx-auto max-w-[1200px] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-[300px] lg:h-auto lg:min-h-[500px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/04e3e764-5f71-479e-a5f4-972daca4268e-starlink-com/assets/images/home_b_feature2_m-5.jpg"
                alt="A person using a laptop outdoors with a Starlink dish in the background, signifying connectivity anywhere."
                fill
                style={{ objectFit: 'cover' }}
                className="z-0"
              />
            </div>
            
            {/* Text Side */}
            <div className="bg-black/90 backdrop-blur-md p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="font-display text-[28px] md:text-[36px] lg:text-[44px] text-white uppercase font-bold leading-[1.1] mb-6">
                Flexible Service Plans
              </h2>
              <p className="font-body text-base text-[#b3b3b3] leading-relaxed">
                Starlink offers flexible service plans everywhere in India.
                <br />
                <br />
                Plans: 25 Mbps at ₹3,000/month (Black Friday: ₹2,250/month -
                25% off).
                <br />
                <br />
                Check availability by entering your address{" "}
                <Link
                  href="/residential"
                  className="text-white underline hover:opacity-80 transition-opacity"
                >
                  here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexiblePlansFeature;