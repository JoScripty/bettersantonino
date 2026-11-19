import { Link } from 'react-router';
import {
  AlertTriangle,
  CalendarDays,
  Megaphone,
  Newspaper,
  type LucideIcon,
} from 'lucide-react';
import {
  NEWS_CATEGORY_LABELS,
  formatNewsDate,
  type NewsCategory,
  type NewsPost,
} from '../../lib/newsLoader';
import { cn } from '../../lib/utils';

const categoryStyles: Record<
  NewsCategory,
  { icon: LucideIcon; badge: string; band: string }
> = {
  news: {
    icon: Newspaper,
    badge: 'bg-primary-50 text-primary-700',
    band: 'from-primary-500 to-primary-700',
  },
  announcement: {
    icon: Megaphone,
    badge: 'bg-accent-50 text-accent-800',
    band: 'from-accent-400 to-accent-600',
  },
  advisory: {
    icon: AlertTriangle,
    badge: 'bg-error-50 text-error-700',
    band: 'from-error-500 to-error-700',
  },
  event: {
    icon: CalendarDays,
    badge: 'bg-success-50 text-success-700',
    band: 'from-success-500 to-success-700',
  },
};

export function CategoryBadge({ category }: { category: NewsCategory }) {
  const { icon: Icon, badge } = categoryStyles[category];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        badge
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {NEWS_CATEGORY_LABELS[category]}
    </span>
  );
}

export default function NewsCard({ post }: { post: NewsPost }) {
  const { icon: Icon, band } = categoryStyles[post.category];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/news/${post.slug}`} className="flex h-full flex-col">
        {post.cover ? (
          <img
            src={post.cover}
            alt=""
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <div
            className={cn(
              'flex aspect-[16/7] items-center justify-center bg-gradient-to-br text-white/90',
              band
            )}
            aria-hidden="true"
          >
            <Icon className="h-10 w-10" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <CategoryBadge category={post.category} />
            <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
          </div>
          <h3 className="mb-2 text-lg font-semibold leading-snug text-gray-900 group-hover:text-primary-700">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-gray-600">{post.summary}</p>
        </div>
      </Link>
    </article>
  );
}
