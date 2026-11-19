import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import NewsCard from '../news/NewsCard';
import { newsPosts } from '../../lib/newsLoader';

export default function LatestNewsSection() {
  const { t } = useTranslation('common');
  const latest = newsPosts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <Section className="bg-gray-50" id="news">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Heading level={2} className="mb-2">
            {t('news.title')}
          </Heading>
          <Text className="text-gray-600 mb-0">{t('news.description')}</Text>
        </div>
        <Link
          to="/news"
          className="inline-flex shrink-0 items-center gap-1 font-medium text-primary-700 hover:underline"
        >
          {t('news.viewAll')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map(post => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
