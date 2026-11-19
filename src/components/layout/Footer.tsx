import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Landmark,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { footerNavigation } from '../../data/navigation';
import { site } from '../../config/site';

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: <Facebook className="h-5 w-5" />,
  Twitter: <Twitter className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  YouTube: <Youtube className="h-5 w-5" />,
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-600">
                <Landmark className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <div className="font-bold">{site.name}</div>
                <div className="text-xs text-gray-400">
                  Community portal for {site.shortName}, {site.province}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-300">{site.disclaimer}</p>
            {site.email && (
              <p className="mb-4 flex gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                <a href={`mailto:${site.email}`} className="break-all">
                  {site.email}
                </a>
              </p>
            )}
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {site.lguName} (Municipal Hall)
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                {site.lguAddress}
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                <a href={`tel:${site.lguPhone.replace(/[^\d+]/g, '')}`}>
                  {site.lguPhone}
                </a>
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                {site.officeHours}
              </li>
            </ul>
            {footerNavigation.socialLinks.length > 0 && (
              <div className="flex gap-4 mt-4">
                {footerNavigation.socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialIcons[link.label]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h2 className="text-base font-semibold mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    {isExternal(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-sm text-gray-400">
          <p>
            © {year} {site.name}.{' '}
            {t(
              'footer.rights',
              'All content is in the public domain unless otherwise stated.'
            )}
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
