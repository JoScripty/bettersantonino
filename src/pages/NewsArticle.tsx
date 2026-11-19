import { Link, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import SEO from '../components/SEO';
import NewsCard, { CategoryBadge } from '../components/news/NewsCard';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';
import { formatNewsDate, getNewsPost, newsPosts } from '../lib/newsLoader';
import NotFound from './NotFound';

const markdownComponents = createMarkdownComponents(
  getTypographyTheme('default')
);

export default function NewsArticle() {
  const { slug = '' } = useParams();
  const post = getNewsPost(slug);

  if (!post) return <NotFound />;

  const related = newsPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={post.title}
        description={post.summary}
        type="article"
        image={post.cover}
      />
      <Section className="mb-4">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: post.title },
          ]}
        />
        <article className="mx-auto max-w-3xl">
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <CategoryBadge category={post.category} />
              <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
            </div>
            <Heading className="leading-tight">{post.title}</Heading>
            {post.summary && (
              <p className="text-lg text-gray-600">{post.summary}</p>
            )}
          </header>
          {post.cover && (
            <img
              src={post.cover}
              alt=""
              className="mb-8 w-full rounded-xl object-cover"
            />
          )}
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          <Link
            to="/news"
            className="mt-10 inline-flex items-center gap-2 font-medium text-primary-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all news
          </Link>
        </article>
      </Section>

      {related.length > 0 && (
        <Section className="bg-gray-50 mb-0">
          <Heading level={3}>More updates</Heading>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(p => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
