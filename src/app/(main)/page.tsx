import CTASection from '@/components/shared/CTASection';
import DashboardPreview from '@/components/shared/DashboardPreview';
import FeaturesSection from '@/components/shared/FeaturesSection';
import HeroPage from '@/components/shared/HeroPage';
import HowItWorks from '@/components/shared/HowItWorks';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <HeroPage />
      <FeaturesSection />
      <DashboardPreview />
      <HowItWorks />
      <CTASection />
    </div>
  );
};

export default HomePage;