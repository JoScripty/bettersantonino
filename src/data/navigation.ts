import type { NavigationItem } from '../types';
import { serviceCategories, governmentCategories } from './yamlLoader';
import { site } from '../config/site';

/** Translation key for a navigation label, e.g. "Latest News" → "latestnews" */
export const navKey = (label: string) =>
  `navbar.${label.toLowerCase().replace(/\s+/g, '')}`;

export const transparencySections = [
  {
    slug: 'full-disclosure',
    label: 'Full Disclosure Policy',
    description:
      'Budgets, financial statements and other reports posted under the DILG Full Disclosure Policy.',
    icon: 'FileSpreadsheet',
  },
  {
    slug: 'bids',
    label: 'Bids & Procurement',
    description:
      'Invitations to bid, notices of award, and the annual procurement plan.',
    icon: 'Gavel',
  },
  {
    slug: 'ordinances',
    label: 'Ordinances & Resolutions',
    description: 'Legislation enacted by the Sangguniang Bayan of Santo Niño.',
    icon: 'ScrollText',
  },
  {
    slug: 'citizens-charter',
    label: "Citizen's Charter",
    description:
      'Requirements, steps, fees and processing time for every frontline service.',
    icon: 'ClipboardList',
  },
] as const;

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: serviceCategories.categories.map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government',
    children: governmentCategories.categories.map(category => ({
      label: category.category,
      href: `/government/${category.slug}`,
    })),
  },
  {
    label: 'Transparency',
    href: '/transparency',
    children: transparencySections.map(section => ({
      label: section.label,
      href: `/transparency/${section.slug}`,
    })),
  },
];

const socialLinks = [
  { label: 'Facebook', href: site.social.facebook },
  { label: 'YouTube', href: site.social.youtube },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'Twitter', href: site.social.twitter },
].filter(link => link.href);

export const footerNavigation = {
  mainSections: [
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        ...serviceCategories.categories.slice(0, 5).map(category => ({
          label: category.category,
          href: `/services/${category.slug}`,
        })),
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Executive', href: '/government/departments/executive' },
        { label: 'Sangguniang Bayan', href: '/government/departments' },
        { label: 'About', href: '/about' },
        { label: 'Transparency', href: '/transparency' },
        { label: 'Emergency Hotlines', href: '/hotlines' },
      ],
    },
    {
      title: 'National Government',
      links: [
        { label: 'GOV.PH', href: 'https://www.gov.ph' },
        {
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph',
        },
        { label: 'Freedom of Information', href: 'https://www.foi.gov.ph' },
        { label: 'Open Data Philippines', href: 'https://data.gov.ph' },
        {
          label: 'Contact Center ng Bayan',
          href: 'https://contactcenterngbayan.gov.ph',
        },
      ],
    },
  ],
  socialLinks,
};
