import TopBanner from '@/components/sections/top-banner';
import NavigationHeader from '@/components/sections/navigation-header';
import HeroSection from '@/components/sections/hero-section';
import ServicePlanCards from '@/components/sections/service-plan-cards';
import BusinessSolutionsBanner from '@/components/sections/business-solutions-banner';
import StarlinkMiniFeature from '@/components/sections/starlink-mini-feature';
import InstallationGuide from '@/components/sections/installation-guide';
import FlexiblePlansFeature from '@/components/sections/flexible-plans-feature';
import SpaceXEngineeringFeature from '@/components/sections/spacex-engineering-feature';
import TrialCtaSection from '@/components/sections/trial-cta-section';
import FooterSection from '@/components/sections/footer';

export default function Page() {
  return (
    <div className="bg-black min-h-screen">
      <TopBanner />
      <NavigationHeader />
      
      <main className="w-full">
        <HeroSection />
        
        <div className="relative">
          <ServicePlanCards />
        </div>

        <BusinessSolutionsBanner />
        
        <StarlinkMiniFeature />
        
        <InstallationGuide />
        
        <FlexiblePlansFeature />
        
        <SpaceXEngineeringFeature />
        
        <TrialCtaSection />
      </main>

      <FooterSection />
    </div>
  );
}