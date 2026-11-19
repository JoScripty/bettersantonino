import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HotlineCard from '../hotlines/HotlineCard';
import { emergencyHotlines } from '../../data/hotlines';

export default function HotlinesStrip() {
  const { t } = useTranslation('common');
  if (emergencyHotlines.length === 0) return null;
  return (
    <section
      id="hotlines"
      className="bg-gradient-to-r from-primary-800 to-primary-700 py-12 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              {t('hotlines.title')}
            </h2>
            <p className="text-white/80">{t('hotlines.description')}</p>
          </div>
          <Link
            to="/hotlines"
            className="inline-flex shrink-0 items-center gap-1 font-medium hover:underline"
          >
            {t('hotlines.viewAll')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyHotlines.map(hotline => (
            <HotlineCard key={hotline.name} hotline={hotline} tone="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
