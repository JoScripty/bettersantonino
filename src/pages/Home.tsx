import Hero from '../components/sections/Hero';
import AdvisoryBanner from '../components/home/AdvisoryBanner';
import ServicesSection from '../components/home/ServicesSection';
import LatestNewsSection from '../components/home/LatestNewsSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { fullName } from '../config/site';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        description={`Official website of the ${fullName}. Find services, the latest news and advisories, transparency reports, and emergency hotlines.`}
        keywords="Santo Niño, Cagayan, LGU, municipal government, services, news, transparency"
      />
      <main id="main-content" className="flex-grow">
        <AdvisoryBanner />
        <Hero />
        <ServicesSection />
        <LatestNewsSection />
        <GovernmentActivitySection />
      </main>
    </>
  );
};

export default Home;
