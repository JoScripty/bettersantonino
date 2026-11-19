import type { LanguageType } from '../types';

export interface LanguageInfo {
  code: LanguageType;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Record<LanguageType, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  fil: { code: 'fil', name: 'Tagalog', nativeName: 'Filipino/Tagalog' },
  ceb: { code: 'ceb', name: 'Cebuano', nativeName: 'Bisaya/Sinugboanon' },
  ilo: { code: 'ilo', name: 'Ilocano', nativeName: 'Ilokano' },
  hil: { code: 'hil', name: 'Hiligaynon', nativeName: 'Ilonggo' },
  war: { code: 'war', name: 'Waray', nativeName: 'Waray-Waray' },
  pam: { code: 'pam', name: 'Kapampangan', nativeName: 'Kapampangan' },
  bcl: { code: 'bcl', name: 'Bikol', nativeName: 'Bikol Central' },
  pag: { code: 'pag', name: 'Pangasinan', nativeName: 'Pangasinan' },
  mag: { code: 'mag', name: 'Maguindanao', nativeName: 'Maguindanaon' },
  tsg: { code: 'tsg', name: 'Tausug', nativeName: 'Bahasa Sūg' },
  mdh: { code: 'mdh', name: 'Maranao', nativeName: 'Meranaw' },
};

export const DEFAULT_LANGUAGE: LanguageType = 'en';

/**
 * Languages that actually have a translation file in public/locales/.
 * Add a code here after creating public/locales/{code}/common.json.
 * The language picker is hidden while only one language is available.
 */
export const AVAILABLE_LANGUAGES: LanguageType[] = ['en'];
