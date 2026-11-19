import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useQueryState } from 'nuqs';
import { Search as SearchIcon } from 'lucide-react';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import SEO from '../components/SEO';
import {
  isMeilisearchEnabled,
  searchClient,
  SEARCH_INDEX,
} from '../lib/meilisearch';
import type { SearchHit } from '../lib/meilisearch';
import { localSearch, type LocalSearchResult } from '../lib/localSearch';

interface RemoteState {
  query: string;
  results: LocalSearchResult[];
  error: string | null;
}

/** Meilisearch results for `query`, debounced. Null while loading. */
function useRemoteSearch(query: string) {
  const [state, setState] = useState<RemoteState | null>(null);

  useEffect(() => {
    if (!isMeilisearchEnabled || !query.trim()) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await searchClient!
          .index(SEARCH_INDEX)
          .search<SearchHit>(query, { limit: 20 });
        if (!cancelled)
          setState({
            query,
            error: null,
            results: res.hits.map(hit => ({
              title: hit.title,
              description: hit.description,
              href: hit.url,
              section: hit.category,
            })),
          });
      } catch {
        if (!cancelled)
          setState({
            query,
            results: [],
            error: 'Search is unavailable. Please try again later.',
          });
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return state?.query === query ? state : null;
}

export default function Search() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const trimmed = query.trim();
  const remote = useRemoteSearch(trimmed);
  const local = useMemo(() => localSearch(trimmed), [trimmed]);

  const results = isMeilisearchEnabled ? (remote?.results ?? []) : local;
  const error = isMeilisearchEnabled ? remote?.error : null;
  const isLoading = isMeilisearchEnabled && Boolean(trimmed) && !remote;

  return (
    <>
      <SEO title="Search" />
      <Section className="mb-12">
        <div className="mx-auto max-w-3xl">
          <Heading level={2}>Search</Heading>
          <div className="relative mb-8">
            <SearchIcon
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value || null)}
              placeholder="Search services, offices, news, documents…"
              aria-label="Search the website"
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
          </div>

          {error && <p className="py-12 text-center text-error-600">{error}</p>}

          {isLoading && (
            <p className="py-12 text-center text-sm text-gray-500">
              Searching…
            </p>
          )}

          {!error && !isLoading && trimmed && results.length === 0 && (
            <p className="py-12 text-center text-gray-600">
              No results for{' '}
              <span className="font-medium">&ldquo;{trimmed}&rdquo;</span>. Try
              fewer or different words.
            </p>
          )}

          {!error && !isLoading && results.length > 0 && (
            <>
              <p className="mb-4 text-sm text-gray-600" aria-live="polite">
                {results.length} result{results.length !== 1 ? 's' : ''} for
                &ldquo;{trimmed}&rdquo;
              </p>
              <ul className="space-y-3">
                {results.map(hit => (
                  <li key={hit.href + hit.title}>
                    <Link
                      to={hit.href}
                      className="group block rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
                    >
                      <span className="mb-2 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                        {hit.section}
                      </span>
                      <span className="block font-semibold text-gray-900 group-hover:text-primary-700">
                        {hit.title}
                      </span>
                      {hit.description && (
                        <span className="mt-1 line-clamp-2 block text-sm text-gray-600">
                          {hit.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {!trimmed && (
            <p className="py-12 text-center text-sm text-gray-500">
              Type to search across services, government offices, news, and
              transparency documents.
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
