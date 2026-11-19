/**
 * Central site configuration.
 *
 * BetterSantoNiño.org is an independent community portal. It is NOT the
 * official website of the Municipality of Santo Niño. Use `site.name` for the
 * website/organization and `site.lguName` only when referring to the
 * municipal government itself.
 *
 * Values come from VITE_* environment variables (see env.example) and fall
 * back to the defaults below, so the site renders correctly even without an
 * .env file.
 */
const env = import.meta.env;

export const site = {
  /** Name of this website / organization */
  name: env.VITE_SITE_NAME || 'BetterSantoNiño.org',
  /** Name of the local government the site is about */
  lguName: env.VITE_GOVERNMENT_NAME || 'Municipality of Santo Niño',
  shortName: env.VITE_GOVERNMENT_SHORT_NAME || 'Santo Niño',
  province: env.VITE_PROVINCE || 'Cagayan',
  region: env.VITE_REGION || 'Region II – Cagayan Valley',
  tagline:
    env.VITE_SITE_TAGLINE ||
    'A community-run guide to the services, news, and public records of Santo Niño, Cagayan.',
  disclaimer:
    'BetterSantoNiño.org is an independent community project. It is not the official website of the Municipality of Santo Niño and is not affiliated with the municipal government.',
  /** Contact details of the organization (TODO: fill in) */
  email: env.VITE_CONTACT_EMAIL || '',
  /** Municipal Hall details, shown as government contact information */
  lguAddress:
    env.VITE_ADDRESS || 'Municipal Hall, Poblacion, Santo Niño, Cagayan',
  // TODO: confirm the Municipal Hall trunkline
  lguPhone: env.VITE_CONTACT_PHONE || '(078) 000-0000',
  officeHours: env.VITE_OFFICE_HOURS || 'Monday to Friday, 8:00 AM – 5:00 PM',
  websiteUrl: env.VITE_WEBSITE_URL || '',
  social: {
    facebook: env.VITE_FACEBOOK_URL || '',
    youtube: env.VITE_YOUTUBE_URL || '',
    instagram: env.VITE_INSTAGRAM_URL || '',
    twitter: env.VITE_TWITTER_URL || '',
  },
} as const;

/** "Municipality of Santo Niño, Cagayan" */
export const lguFullName = `${site.lguName}, ${site.province}`;
