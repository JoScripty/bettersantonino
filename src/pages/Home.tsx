import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import TransparencySection from '../components/home/TransparencySection';
import MayorWelcome from '../components/home/MayorWelcome';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import HotlinesStrip from '../components/home/HotlinesStrip';
import SEO from '../components/SEO';
import { site } from '../config/site';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        description={`${site.tagline} Not an official government website.`}
        keywords="Santo Niño, Cagayan, LGU, municipal government, services, transparency"
      />
      <Hero />
      <ServicesSection />
      <TransparencySection />
      <MayorWelcome />
      <GovernmentActivitySection />
      <HotlinesStrip />
    </>
  );
};

export default Home;
