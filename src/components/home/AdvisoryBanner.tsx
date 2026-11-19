import { Link } from 'react-router';
import { AlertTriangle, ArrowRight, Megaphone } from 'lucide-react';
import { pinnedPost } from '../../lib/newsLoader';
import { cn } from '../../lib/utils';

/** Shows the newest pinned post (set `pinned: true` in its frontmatter). */
export default function AdvisoryBanner() {
  if (!pinnedPost) return null;
  const isAdvisory = pinnedPost.category === 'advisory';
  const Icon = isAdvisory ? AlertTriangle : Megaphone;

  return (
    <div
      role="region"
      aria-label="Advisory"
      className={cn(
        'border-b',
        isAdvisory
          ? 'bg-warning-50 border-warning-200 text-warning-900'
          : 'bg-primary-50 border-primary-100 text-primary-900'
      )}
    >
      <div className="container mx-auto flex items-start gap-3 px-4 py-3 sm:items-center">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" aria-hidden="true" />
        <p className="flex-1 text-sm">
          <span className="font-semibold">{pinnedPost.title}.</span>{' '}
          <span className="hidden md:inline">{pinnedPost.summary}</span>
        </p>
        <Link
          to={`/news/${pinnedPost.slug}`}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold underline-offset-2 hover:underline"
        >
          Details
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
