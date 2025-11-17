import HeroSection from './About/HeroSection';
import BrandStorySection from './About/BrandStorySection';
import CoreValuesSection from './About/CoreValuesSection';
import StatisticsSection from './About/StatisticsSection';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <CoreValuesSection />
      <StatisticsSection />
      <ScrollToTopButton />
    </>
  );
}
