import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';
import RecordTable, {
  DownloadLink,
} from '../components/transparency/RecordTable';
import { transparencySections } from '../data/navigation';
import {
  bids,
  charterFile,
  charterOffices,
  disclosureDocuments,
  formatDate,
  formatPeso,
  measures,
  type Bid,
} from '../lib/transparencyLoader';
import { cn } from '../lib/utils';
import NotFound from './NotFound';

type SectionSlug = (typeof transparencySections)[number]['slug'];

type IconType = React.ComponentType<{ className?: string }>;

/** Lucide icon for each section, resolved once at module load. */
const sectionIcons = Object.fromEntries(
  transparencySections.map(s => [
    s.slug,
    LucideIcons[s.icon as keyof typeof LucideIcons] as IconType,
  ])
) as Record<SectionSlug, IconType>;

const bidStatusStyle: Record<Bid['status'], string> = {
  Open: 'bg-success-50 text-success-700',
  Closed: 'bg-gray-100 text-gray-700',
  Awarded: 'bg-primary-50 text-primary-700',
};

function StatusPill({
  className,
  children,
}: {
  className: string;
  children: string;
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold',
        className
      )}
    >
      {children}
    </span>
  );
}

function FullDisclosure() {
  return (
    <>
      <Text className="mb-6 max-w-3xl text-gray-700">
        Under the DILG Full Disclosure Policy, the municipality posts its
        budget, finances, and procurement reports in conspicuous places and
        online. The same documents are on the{' '}
        <a
          href="https://fdpp.dilg.gov.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-700 underline"
        >
          DILG Full Disclosure Policy Portal
        </a>
        .
      </Text>
      <RecordTable
        rows={disclosureDocuments}
        rowKey={d => `${d.title}-${d.year}-${d.period}`}
        searchText={d => `${d.title} ${d.category}`}
        title={d => d.title}
        file={d => d.file}
        filters={[
          { key: 'year', label: 'Years', value: d => String(d.year) },
          { key: 'category', label: 'Categories', value: d => d.category },
        ]}
        columns={[
          {
            label: 'Document',
            render: d => d.title,
            className: 'px-4 py-3 font-medium text-gray-900',
          },
          { label: 'Category', render: d => d.category },
          { label: 'Year', render: d => d.year },
          { label: 'Period', render: d => d.period },
        ]}
      />
    </>
  );
}

function Bids() {
  return (
    <>
      <Text className="mb-6 max-w-3xl text-gray-700">
        Invitations to bid, requests for quotation, and notices of award.
        Procurement follows RA 12009 (New Government Procurement Act), and every
        opportunity is also posted on{' '}
        <a
          href="https://www.philgeps.gov.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-700 underline"
        >
          PhilGEPS
        </a>
        .
      </Text>
      <RecordTable
        rows={bids}
        rowKey={b => b.reference}
        searchText={b => `${b.reference} ${b.title} ${b.awardee ?? ''}`}
        title={b => b.title}
        file={b => b.file}
        filters={[
          { key: 'status', label: 'Statuses', value: b => b.status },
          { key: 'type', label: 'Types', value: b => b.type },
        ]}
        columns={[
          {
            label: 'Project',
            render: b => (
              <>
                <span className="block font-medium text-gray-900">
                  {b.title}
                </span>
                <span className="text-xs text-gray-500">
                  {b.reference} · {b.type}
                  {b.awardee && ` · Awarded to ${b.awardee}`}
                </span>
              </>
            ),
            className: 'px-4 py-3',
          },
          { label: 'Budget (ABC)', render: b => formatPeso(b.abc) },
          { label: 'Posted', render: b => formatDate(b.posted) },
          { label: 'Deadline', render: b => formatDate(b.deadline) },
          {
            label: 'Status',
            render: b => (
              <StatusPill className={bidStatusStyle[b.status]}>
                {b.status}
              </StatusPill>
            ),
          },
        ]}
      />
    </>
  );
}

function Ordinances() {
  return (
    <>
      <Text className="mb-6 max-w-3xl text-gray-700">
        Ordinances and resolutions of the Sangguniang Bayan of Santo Niño.
        Certified copies are available at the Office of the Sangguniang Bayan
        Secretary.
      </Text>
      <RecordTable
        rows={measures}
        rowKey={m => m.number}
        searchText={m => `${m.number} ${m.title} ${m.author ?? ''}`}
        title={m => m.title}
        file={m => m.file}
        filters={[
          { key: 'type', label: 'Types', value: m => m.type },
          { key: 'year', label: 'Years', value: m => m.date.slice(0, 4) },
        ]}
        columns={[
          {
            label: 'Title',
            render: m => (
              <>
                <span className="block font-medium text-gray-900">
                  {m.title}
                </span>
                <span className="text-xs text-gray-500">
                  {m.number}
                  {m.author && ` · ${m.author}`}
                </span>
              </>
            ),
            className: 'px-4 py-3',
          },
          { label: 'Type', render: m => m.type },
          { label: 'Date', render: m => formatDate(m.date) },
          {
            label: 'Status',
            render: m => (
              <StatusPill
                className={
                  m.status === 'Approved'
                    ? 'bg-success-50 text-success-700'
                    : 'bg-warning-50 text-warning-800'
                }
              >
                {m.status}
              </StatusPill>
            ),
          },
        ]}
      />
    </>
  );
}

function CitizensCharter() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Text className="mb-0 max-w-3xl text-gray-700">
          Every frontline service with its requirements, steps, fees, and
          processing time, as required by the Ease of Doing Business Act (RA
          11032). Simple transactions: 3 working days. Complex: 7. Highly
          technical: 20.
        </Text>
        {charterFile && <DownloadLink href={charterFile} />}
      </div>
      <div className="space-y-8">
        {charterOffices.map(office => (
          <div key={office.office}>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              {office.office}
            </h3>
            <div className="space-y-2">
              {office.services.map(service => (
                <details
                  key={service.name}
                  className="group rounded-lg border border-gray-200 bg-white open:shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block font-medium text-gray-900">
                        {service.name}
                      </span>
                      <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                        <span>{service.classification}</span>
                        <span>Fee: {service.fee}</span>
                        <span>Time: {service.time}</span>
                      </span>
                    </span>
                    <ChevronDown
                      className="mt-1 h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="grid gap-6 border-t border-gray-100 p-4 text-sm md:grid-cols-2">
                    <div>
                      {service.who && (
                        <p className="mb-3 text-gray-700">
                          <span className="font-semibold">Who may avail:</span>{' '}
                          {service.who}
                        </p>
                      )}
                      <p className="mb-1 font-semibold text-gray-900">
                        Requirements
                      </p>
                      <ul className="list-disc space-y-1 pl-5 text-gray-700">
                        {service.requirements.map(r => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-1 font-semibold text-gray-900">Steps</p>
                      <ol className="list-decimal space-y-1 pl-5 text-gray-700">
                        {service.steps.map(s => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const sectionViews: Record<SectionSlug, React.ReactElement> = {
  'full-disclosure': <FullDisclosure />,
  bids: <Bids />,
  ordinances: <Ordinances />,
  'citizens-charter': <CitizensCharter />,
};

const sectionCounts: Record<SectionSlug, string> = {
  'full-disclosure': `${disclosureDocuments.length} documents`,
  bids: `${bids.filter(b => b.status === 'Open').length} open bids`,
  ordinances: `${measures.length} measures`,
  'citizens-charter': `${charterOffices.reduce((n, o) => n + o.services.length, 0)} services`,
};

function Overview() {
  const { t } = useTranslation('common');
  const openBids = bids.filter(b => b.status === 'Open').slice(0, 3);
  const latestDocs = disclosureDocuments.slice(0, 4);

  return (
    <>
      <SEO
        title={t('transparency.title')}
        description={t('transparency.description')}
        keywords="Santo Niño full disclosure, budget, bids, procurement, ordinances, citizen's charter"
      />
      <Section className="mb-0">
        <Breadcrumbs className="mb-8" />
        <Heading>{t('transparency.title')}</Heading>
        <Text className="mb-8 text-gray-600">
          {t('transparency.description')}
        </Text>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {transparencySections.map(section => {
            const Icon = sectionIcons[section.slug];
            return (
              <Link
                key={section.slug}
                to={`/transparency/${section.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  {Icon && <Icon className="h-6 w-6" />}
                </span>
                <span className="mb-1 font-semibold text-gray-900 group-hover:text-primary-700">
                  {section.label}
                </span>
                <span className="mb-4 flex-1 text-sm text-gray-600">
                  {section.description}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {sectionCounts[section.slug]}
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="mb-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Latest disclosures
            </h2>
            <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
              {latestDocs.map(doc => (
                <li
                  key={`${doc.title}-${doc.year}-${doc.period}`}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <span>
                    <span className="block font-medium text-gray-900">
                      {doc.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {doc.period} {doc.year} · {doc.category}
                    </span>
                  </span>
                  <DownloadLink href={doc.file} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Open for bidding
            </h2>
            {openBids.length === 0 ? (
              <p className="rounded-xl border border-dashed border-gray-300 p-6 text-gray-600">
                No open bids at the moment.
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
                {openBids.map(bid => (
                  <li key={bid.reference} className="p-4">
                    <span className="block font-medium text-gray-900">
                      {bid.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {bid.reference} · ABC {formatPeso(bid.abc)} · Deadline{' '}
                      {formatDate(bid.deadline)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/transparency/bids"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline"
            >
              All bids and awards
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-gray-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Can't find a document?
          </h2>
          <p className="text-sm text-gray-700">
            You can request public records under the Freedom of Information
            program. See{' '}
            <Link
              to="/government/public-participation/feedback-and-complaints"
              className="font-medium text-primary-700 underline"
            >
              Feedback and Complaints
            </Link>{' '}
            or file a request on{' '}
            <a
              href="https://www.foi.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-primary-700 underline"
            >
              foi.gov.ph
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}

export default function Transparency() {
  const { section } = useParams();

  if (!section) return <Overview />;

  const meta = transparencySections.find(s => s.slug === section);
  if (!meta) return <NotFound />;

  const Icon = sectionIcons[meta.slug];

  return (
    <>
      <SEO title={meta.label} description={meta.description} />
      <Section className="mb-12">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Transparency', href: '/transparency' },
            { label: meta.label },
          ]}
        />
        <div className="mb-6 flex items-center gap-3">
          {Icon && <Icon className="h-8 w-8 text-primary-600" />}
          <Heading className="mb-0">{meta.label}</Heading>
        </div>

        <nav
          className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1"
          aria-label="Transparency sections"
        >
          {transparencySections.map(s => (
            <Link
              key={s.slug}
              to={`/transparency/${s.slug}`}
              aria-current={s.slug === meta.slug ? 'page' : undefined}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium',
                s.slug === meta.slug
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-700'
              )}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        {sectionViews[meta.slug]}
      </Section>
    </>
  );
}
