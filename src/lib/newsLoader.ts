/**
 * News & updates loader.
 *
 * Each post is a markdown file in content/news/ named YYYY-MM-DD-slug.md
 * with YAML frontmatter:
 *
 * ---
 * title: 'Post title'
 * date: '2026-11-18'
 * category: announcement   # news | announcement | advisory | event
 * summary: 'One or two sentences shown on cards.'
 * cover: /images/news/photo.jpg   # optional, file in public/
 * pinned: true                    # optional, shows as a banner on the home page
 * ---
 */
import * as yaml from 'js-yaml';
import { interpolate } from './markdownLoader';

export const NEWS_CATEGORIES = [
  'news',
  'announcement',
  'advisory',
  'event',
] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  news: 'News',
  announcement: 'Announcement',
  advisory: 'Advisory',
  event: 'Event',
};

export interface NewsPost {
  slug: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  category: NewsCategory;
  summary: string;
  cover?: string;
  pinned: boolean;
  content: string;
}

interface Frontmatter {
  title?: string;
  date?: string | Date;
  category?: string;
  summary?: string;
  cover?: string;
  pinned?: boolean;
}

const files = import.meta.glob('../../content/news/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function toIsoDate(value: string | Date | undefined, fallback: string) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && value) return value.slice(0, 10);
  return fallback;
}

function parsePost(path: string, raw: string): NewsPost {
  const filename = path.split('/').pop()!.replace(/\.md$/, '');
  const fileDate = filename.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? '';
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');

  const match = raw.match(FRONTMATTER);
  const fm = ((match && yaml.load(match[1])) || {}) as Frontmatter;
  const body = interpolate(match ? match[2] : raw).trim();

  const category = NEWS_CATEGORIES.includes(fm.category as NewsCategory)
    ? (fm.category as NewsCategory)
    : 'news';

  return {
    slug,
    title: fm.title ?? body.match(/^#\s+(.+)$/m)?.[1] ?? slug,
    date: toIsoDate(fm.date, fileDate),
    category,
    summary: fm.summary ?? '',
    cover: fm.cover,
    pinned: Boolean(fm.pinned),
    content: body,
  };
}

/** All posts, newest first. */
export const newsPosts: NewsPost[] = Object.entries(files)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getNewsPost = (slug: string) =>
  newsPosts.find(post => post.slug === slug);

/** The newest pinned advisory or announcement, if any. */
export const pinnedPost = newsPosts.find(post => post.pinned);

export function formatNewsDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
