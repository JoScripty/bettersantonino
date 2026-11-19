import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';
import { lguFullName, site } from '../config/site';

const offerings = [
  {
    to: '/services',
    label: 'Services',
    text: 'Requirements, steps, fees, and offices for municipal services.',
  },
  {
    to: '/government',
    label: 'Government',
    text: 'Officials, departments, plans, and ways to take part.',
  },
  {
    to: '/transparency',
    label: 'Transparency',
    text: "Budgets, bids, ordinances, and the Citizen's Charter.",
  },
  {
    to: '/hotlines',
    label: 'Hotlines',
    text: 'Emergency and office numbers you can call right away.',
  },
];

const socialLinks = [
  { label: 'Facebook', href: site.social.facebook },
  { label: 'YouTube', href: site.social.youtube },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'Twitter', href: site.social.twitter },
].filter(link => link.href);

// TODO: replace the bracketed values with verified figures (PSA census,
// municipal profile) and cite the source.
const facts = [
  { label: 'Province', value: site.province },
  { label: 'Region', value: site.region },
  { label: 'Number of barangays', value: '[NUMBER OF BARANGAYS]' },
  { label: 'Population', value: '[POPULATION] ([CENSUS YEAR] census)' },
  { label: 'Land area', value: '[LAND AREA] km²' },
  { label: 'Income class', value: '[INCOME CLASS]' },
];

const contact = [
  { label: 'Address', value: site.lguAddress },
  { label: 'Phone', value: site.lguPhone },
  { label: 'Office hours', value: site.officeHours },
];

export default function About() {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO
        title={t('about.title', 'About')}
        description={t(
          'about.description',
          'About this community portal and the Municipality of Santo Niño, Cagayan.'
        )}
        keywords="about, BetterSantoNiño.org, Santo Niño, Cagayan, community portal"
      />
      <Section className="mb-12">
        <Breadcrumbs className="mb-8" />
        <Heading>{t('about.title', 'About')}</Heading>
        <Text className="mb-10 text-gray-600">
          {t(
            'about.description',
            'About this community portal and the Municipality of Santo Niño, Cagayan.'
          )}
        </Text>

        {/* About this website */}
        <section aria-labelledby="about-site" className="mb-14">
          <Heading level={2} className="text-2xl md:text-3xl lg:text-3xl">
            <span id="about-site">About {site.name}</span>
          </Heading>
          <Text className="mb-6 text-gray-700">
            {site.name} is an independent, community-run portal that gathers
            information about the services, offices, and public records of the{' '}
            {lguFullName} in one place, written in plain language and easy to
            use on a phone.
          </Text>

          <div className="mb-8 flex gap-3 rounded-xl border border-warning-200 bg-warning-50 p-4 text-warning-900">
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-sm">
              <span className="font-semibold">Not an official website.</span>{' '}
              {site.disclaimer} For official transactions, visit or call the
              Municipal Hall.
            </p>
          </div>

          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            What you will find here
          </h3>
          <ul className="mb-8 grid gap-4 sm:grid-cols-2">
            {offerings.map(item => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block h-full rounded-xl border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
                >
                  <span className="block font-semibold text-primary-700">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-600">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Contact us
          </h3>
          <Text className="text-gray-700">
            Spotted an error or outdated information? Let us know
            {site.email ? (
              <>
                {' '}
                at{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-primary-700 underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>
              </>
            ) : (
              // TODO: set VITE_CONTACT_EMAIL for the organization
              ' at [ORGANIZATION EMAIL]'
            )}
            .
          </Text>
          {socialLinks.length > 0 && (
            <p className="mt-2 flex flex-wrap gap-3 text-sm">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-700 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </p>
          )}
        </section>

        {/* About the municipality */}
        <section aria-labelledby="about-lgu">
          <Heading level={2} className="text-2xl md:text-3xl lg:text-3xl">
            <span id="about-lgu">About {site.shortName}</span>
          </Heading>
          <Text className="mb-6 text-gray-700">
            The {lguFullName} is a municipality in {site.region}.{' '}
            {/* TODO: add a short, sourced history of the municipality. */}
            [SHORT HISTORY OF THE MUNICIPALITY: founding, origin of the name,
            and notable landmarks.]
          </Text>

          <dl className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(fact => (
              <div
                key={fact.label}
                className="rounded-xl border border-gray-200 p-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-semibold text-gray-900">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Municipal Hall
          </h3>
          <dl className="grid gap-3 text-sm sm:grid-cols-[10rem_1fr]">
            {contact.map(item => (
              <div key={item.label} className="contents">
                <dt className="font-semibold text-gray-700">{item.label}</dt>
                <dd className="mb-2 text-gray-700 sm:mb-0">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Section>
    </>
  );
}
