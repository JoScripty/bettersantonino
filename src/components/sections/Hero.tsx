import { useId, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { site } from '../../config/site';
import { localSearch } from '../../lib/localSearch';

const popular = [
  {
    label: 'Business permit',
    to: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    label: 'Senior / PWD ID',
    to: '/services/social-welfare/apply-for-senior-citizen-solo-parent-or-pwd-assistance',
  },
  {
    label: 'Scholarship',
    to: '/services/education/apply-for-local-scholarships',
  },
  {
    label: 'Building permit',
    to: '/services/housing-land-use/request-zoning-land-use-or-building-permits',
  },
  { label: "Citizen's Charter", to: '/transparency/citizens-charter' },
];

export default function Hero() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const listId = useId();

  const suggestions = useMemo(() => localSearch(query, 5), [query]);
  const showSuggestions = focused && query.trim() && suggestions.length > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
    <div className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
      <div className="container relative mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="min-w-0 animate-fade-in">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">
              {t('hero.welcome')}
            </p>
            <h1 className="mb-4 break-words text-4xl font-bold leading-tight md:text-5xl">
              {site.name}
            </h1>
            <p className="max-w-xl text-white/90">{t('hero.subtitle')}</p>
          </div>

          <div className="min-w-0 rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">
              {t('hero.cardTitle', 'Find a service')}
            </h2>
            <form role="search" onSubmit={submit} className="relative">
              <label htmlFor="hero-search" className="sr-only">
                Search the website
              </label>
              <div className="flex rounded-lg bg-white p-1.5">
                <Search
                  className="ml-3 h-5 w-5 shrink-0 self-center text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="hero-search"
                  type="search"
                  autoComplete="off"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  placeholder={t('hero.searchPlaceholder')}
                  aria-controls={listId}
                  aria-expanded={Boolean(showSuggestions)}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary-600 px-5 py-2 font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  {t('hero.searchButton')}
                </button>
              </div>
              {showSuggestions && (
                <ul
                  id={listId}
                  className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg bg-white text-left shadow-xl ring-1 ring-black/5"
                >
                  {suggestions.map(s => (
                    <li key={s.href + s.title}>
                      <Link
                        to={s.href}
                        className="block px-4 py-3 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none"
                      >
                        <span className="block text-sm font-medium text-gray-900">
                          {s.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {s.section}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-white/80">{t('hero.popular')}</span>
              {popular.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-md bg-white/10 px-3 py-1 ring-1 ring-white/20 transition hover:bg-white/20"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
