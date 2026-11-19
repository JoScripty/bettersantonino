/**
 * Central site configuration.
 *
 * Values come from VITE_* environment variables (see env.example) and fall
 * back to the defaults below, so the site renders correctly even without an
 * .env file. Replace every value marked TODO with official LGU information.
 */
const env = import.meta.env;

export const site = {
  name: env.VITE_GOVERNMENT_NAME || 'Municipality of Santo Niño',
  shortName: env.VITE_GOVERNMENT_SHORT_NAME || 'Santo Niño',
  province: env.VITE_PROVINCE || 'Cagayan',
  region: env.VITE_REGION || 'Region II – Cagayan Valley',
  tagline:
    env.VITE_SITE_TAGLINE ||
    'Serbisyong tapat, bukas, at para sa lahat ng Santo Niñeño.',
  // TODO: confirm official municipal hall address and ZIP code
  address: env.VITE_ADDRESS || 'Municipal Hall, Poblacion, Santo Niño, Cagayan',
  // TODO: replace with the official trunkline and e-mail
  phone: env.VITE_CONTACT_PHONE || '(078) 000-0000',
  email: env.VITE_CONTACT_EMAIL || 'info@santonino-cagayan.gov.ph',
  officeHours: env.VITE_OFFICE_HOURS || 'Monday to Friday, 8:00 AM – 5:00 PM',
  websiteUrl: env.VITE_WEBSITE_URL || '',
  social: {
    facebook: env.VITE_FACEBOOK_URL || '',
    youtube: env.VITE_YOUTUBE_URL || '',
    instagram: env.VITE_INSTAGRAM_URL || '',
    twitter: env.VITE_TWITTER_URL || '',
  },
} as const;

export const fullName = `${site.name}, ${site.province}`;
