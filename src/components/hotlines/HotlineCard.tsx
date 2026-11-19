import { Phone } from 'lucide-react';
import { isPlaceholder, telHref, type Hotline } from '../../data/hotlines';
import { cn } from '../../lib/utils';

export default function HotlineCard({
  hotline,
  tone = 'light',
}: {
  hotline: Hotline;
  tone?: 'light' | 'dark';
}) {
  const Icon = hotline.icon;
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'flex h-full items-start gap-3 rounded-xl p-4',
        dark
          ? 'bg-white/10 text-white ring-1 ring-white/15'
          : 'border border-gray-200 bg-white'
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          dark ? 'bg-white/15' : 'bg-error-50 text-error-600'
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p
          className={cn('font-semibold', dark ? 'text-white' : 'text-gray-900')}
        >
          {hotline.name}
        </p>
        {hotline.description && (
          <p
            className={cn('text-sm', dark ? 'text-white/80' : 'text-gray-600')}
          >
            {hotline.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {hotline.numbers.map(number =>
            isPlaceholder(number) ? (
              <span
                key={number}
                className={cn(
                  'text-sm italic',
                  dark ? 'text-white/70' : 'text-gray-500'
                )}
              >
                Number to follow
              </span>
            ) : (
              <a
                key={number}
                href={telHref(number)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold',
                  dark
                    ? 'bg-white text-primary-800 hover:bg-primary-50'
                    : 'bg-error-600 text-white hover:bg-error-700'
                )}
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {number}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
