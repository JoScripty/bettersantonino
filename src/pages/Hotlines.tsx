import { useTranslation } from 'react-i18next';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';
import HotlineCard from '../components/hotlines/HotlineCard';
import { hotlineGroups } from '../data/hotlines';

export default function Hotlines() {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO
        title={t('hotlines.title')}
        description="Emergency and public service hotlines of Santo Niño, Cagayan: MDRRMO, police, fire, health, and municipal offices."
        keywords="Santo Niño hotlines, MDRRMO, police, fire, ambulance, emergency"
      />
      <Section className="mb-12">
        <Breadcrumbs className="mb-8" />
        <Heading>{t('hotlines.title')}</Heading>
        <Text className="mb-8 text-gray-600">{t('hotlines.description')}</Text>

        <div className="mb-10 rounded-xl bg-error-600 p-6 text-white md:flex md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Life-threatening emergency?
            </p>
            <p className="text-2xl font-bold">Call 911 right away.</p>
          </div>
          <a
            href="tel:911"
            className="mt-4 inline-flex items-center rounded-full bg-white px-6 py-3 text-lg font-bold text-error-700 hover:bg-error-50 md:mt-0"
          >
            Call 911
          </a>
        </div>

        {hotlineGroups.map(group => (
          <div key={group.title} className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.hotlines.map(hotline => (
                <HotlineCard key={hotline.name} hotline={hotline} />
              ))}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
