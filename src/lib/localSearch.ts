/**
 * Client-side search over everything bundled with the site: service and
 * government pages, news, transparency records, hotlines. Used when
 * Meilisearch is not configured, and for instant suggestions in the hero.
 */
import { getAllPageEntries } from '../data/yamlLoader';
import { transparencySections } from '../data/navigation';
import { newsPosts } from './newsLoader';
import { charterOffices, measures } from './transparencyLoader';

export interface LocalSearchResult {
  title: string;
  description?: string;
  href: string;
  section: string;
}

const entries: LocalSearchResult[] = [
  ...getAllPageEntries(),
  ...newsPosts.map(post => ({
    title: post.title,
    description: post.summary,
    href: `/news/${post.slug}`,
    section: 'News',
  })),
  ...transparencySections.map(s => ({
    title: s.label,
    description: s.description,
    href: `/transparency/${s.slug}`,
    section: 'Transparency',
  })),
  ...charterOffices.flatMap(office =>
    office.services.map(service => ({
      title: service.name,
      description: `${office.office} · ${service.classification} · Fee: ${service.fee}`,
      href: `/transparency/citizens-charter`,
      section: "Citizen's Charter",
    }))
  ),
  ...measures.map(m => ({
    title: m.title,
    description: `${m.number} · ${m.type}`,
    href: `/transparency/ordinances?q=${encodeURIComponent(m.number)}`,
    section: 'Ordinances & Resolutions',
  })),
  {
    title: 'Emergency Hotlines',
    description:
      'Police, fire, ambulance, MDRRMO, and municipal office numbers.',
    href: '/hotlines',
    section: 'Hotlines',
  },
];

// Strip accents so "nino" matches "Niño".
const DIACRITICS = /[\u0300-\u036f]/g;
const normalize = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(DIACRITICS, '');

const indexed = entries.map(entry => ({
  entry,
  title: normalize(entry.title),
  text: normalize(`${entry.title} ${entry.description ?? ''} ${entry.section}`),
}));

export function localSearch(query: string, limit = 20): LocalSearchResult[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return indexed
    .filter(({ text }) => terms.every(term => text.includes(term)))
    .map(({ entry, title }) => ({
      entry,
      score: terms.reduce(
        (sum, term) => sum + (title.includes(term) ? 2 : 1),
        title.startsWith(terms[0]) ? 1 : 0
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}
