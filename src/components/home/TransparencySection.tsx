import { Link } from 'react-router';
import { ArrowRight, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { transparencySections } from '../../data/navigation';
import {
  bids,
  disclosureDocuments,
  measures,
} from '../../lib/transparencyLoader';

const latestBudget = disclosureDocuments.find(d => d.category === 'Budget');

const stats = [
  {
    value: disclosureDocuments.length,
    label: 'Full Disclosure documents',
    to: '/transparency/full-disclosure',
  },
  {
    value: bids.filter(b => b.status === 'Open').length,
    label: 'Open bids',
    to: '/transparency/bids',
  },
  {
    value: measures.filter(m => m.type === 'Ordinance').length,
    label: 'Ordinances',
    to: '/transparency/ordinances',
  },
];

export default function TransparencySection() {
  const { t } = useTranslation('common');
  return (
    <Section id="transparency">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <Heading level={2}>{t('transparency.title')}</Heading>
          <Text className="mb-6 text-gray-600">
            {t('transparency.description')}
          </Text>
          <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {transparencySections.map(s => (
              <li key={s.slug}>
                <Link
                  to={`/transparency/${s.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 hover:border-primary-300 hover:text-primary-700"
                >
                  {s.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/transparency"
            className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
          >
            {t('transparency.viewAll')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="rounded-2xl bg-gray-900 p-6 text-white md:p-8">
          <div className="mb-6 grid grid-cols-3 gap-4">
            {stats.map(stat => (
              <Link key={stat.label} to={stat.to} className="group">
                <span className="block text-3xl font-bold text-accent-300 group-hover:underline md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-300 md:text-sm">
                  {stat.label}
                </span>
              </Link>
            ))}
          </div>
          {latestBudget && (
            <div className="flex items-center justify-between gap-4 rounded-xl bg-white/10 p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-300">
                  Latest budget
                </p>
                <p className="font-semibold">
                  {latestBudget.title} {latestBudget.year}
                </p>
              </div>
              {latestBudget.file && (
                <a
                  href={latestBudget.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  PDF
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
