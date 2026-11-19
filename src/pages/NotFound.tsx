import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Home, Info, LayoutGrid, Phone } from 'lucide-react';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/services', label: 'Services', icon: LayoutGrid },
  { to: '/about', label: 'About', icon: Info },
  { to: '/hotlines', label: 'Hotlines', icon: Phone },
];

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO title={t('notFound.title', 'Page not found')} />
      <Section className="py-20 text-center">
        <p className="text-6xl font-bold text-primary-600 mb-4">404</p>
        <Heading level={2}>{t('notFound.title', 'Page not found')}</Heading>
        <Text className="mx-auto text-gray-600 mb-8">
          {t(
            'notFound.description',
            'The page you are looking for does not exist or may have been moved.'
          )}
        </Text>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary-500 hover:text-primary-700"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
