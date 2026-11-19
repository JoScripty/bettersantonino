import { useTranslation } from 'react-i18next';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';
import NewsCard from '../components/news/NewsCard';
import {
  NEWS_CATEGORIES,
  NEWS_CATEGORY_LABELS,
  newsPosts,
} from '../lib/newsLoader';
import { cn } from '../lib/utils';

const PAGE_SIZE = 9;
const FILTERS = ['all', ...NEWS_CATEGORIES] as const;

export default function News() {
  const { t } = useTranslation('common');
  const [category, setCategory] = useQueryState(
    'category',
    parseAsStringLiteral(FILTERS).withDefault('all')
  );
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const filtered =
    category === 'all'
      ? newsPosts
      : newsPosts.filter(post => post.category === category);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <>
      <SEO
        title={t('news.title')}
        description={t('news.description')}
        keywords="Santo Niño news, announcements, advisories, events"
      />
      <Section className="mb-12">
        <Breadcrumbs className="mb-8" />
        <Heading>{t('news.title')}</Heading>
        <Text className="text-gray-600 mb-6">{t('news.description')}</Text>

        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {FILTERS.map(filter => (
            <button
              key={filter}
              type="button"
              aria-pressed={category === filter}
              onClick={() => {
                setCategory(filter === 'all' ? null : filter);
                setPage(null);
              }}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                category === filter
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-700'
              )}
            >
              {filter === 'all' ? t('news.all') : NEWS_CATEGORY_LABELS[filter]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <Text className="text-gray-600">{t('news.empty')}</Text>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map(post => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Pagination"
          >
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                type="button"
                aria-current={n === currentPage ? 'page' : undefined}
                onClick={() => {
                  setPage(n === 1 ? null : n);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn(
                  'h-10 w-10 rounded-full text-sm font-medium',
                  n === currentPage
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {n}
              </button>
            ))}
          </nav>
        )}
      </Section>
    </>
  );
}
