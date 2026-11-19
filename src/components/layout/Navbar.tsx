import React, { useState } from 'react';
import { X, Menu, ChevronDown, Search, Landmark, Phone } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { mainNavigation, navKey } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { AVAILABLE_LANGUAGES, LANGUAGES } from '../../i18n/languages';
import { isMeilisearchEnabled } from '../../lib/meilisearch';
import { site } from '../../config/site';
import { cn } from '../../lib/utils';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const { pathname } = useLocation();
  // The mobile menu is tied to the path it was opened on, so it closes
  // automatically when the route changes.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const isOpen = openOnPath === pathname;
  const setIsOpen = (open: boolean) => setOpenOnPath(open ? pathname : null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const label = (text: string) => t(navKey(text), text);

  const languageSelect = AVAILABLE_LANGUAGES.length > 1 && (
    <select
      aria-label="Language"
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value as LanguageType)}
      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-600"
    >
      {AVAILABLE_LANGUAGES.map(code => (
        <option key={code} value={code}>
          {LANGUAGES[code].nativeName}
        </option>
      ))}
    </select>
  );

  return (
    <nav className="bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-700 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center h-9 text-xs">
          <span className="truncate">
            {t('topbar.republic', 'Republic of the Philippines')}
          </span>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://www.gov.ph"
              className="hidden sm:inline hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              GOV.PH
            </a>
            <Link
              to="/hotlines"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              {t('topbar.emergency', 'Emergency: 911')}
            </Link>
            <div className="hidden md:block">{languageSelect}</div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
              {/* TODO: replace with the official municipal seal (public/seal.png) */}
              <Landmark className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-gray-900 font-bold leading-tight truncate">
                {site.name}
              </span>
              <span className="block text-xs text-gray-600 truncate">
                Province of {site.province}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-md font-medium transition-colors',
                  isActive
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                )
              }
            >
              {label('Home')}
            </NavLink>
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 rounded-md font-medium transition-colors',
                      isActive
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600'
                    )
                  }
                >
                  {label(item.label)}
                  {item.children && (
                    <ChevronDown
                      className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  )}
                </NavLink>
                {item.children && (
                  <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50">
                    <div
                      className="py-2 rounded-lg shadow-lg bg-white ring-1 ring-black/5"
                      role="menu"
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isMeilisearchEnabled && (
              <Link
                to="/search"
                aria-label="Search"
                className="ml-2 p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-primary-600"
              >
                <Search className="h-5 w-5" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span className="sr-only">
              {isOpen ? 'Close main menu' : 'Open main menu'}
            </span>
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden max-h-[calc(100vh-7rem)] overflow-y-auto',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          <Link
            to="/"
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            {label('Home')}
          </Link>
          {mainNavigation.map(item =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  aria-expanded={activeMenu === item.label}
                  className="w-full flex justify-between items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {label(item.label)}
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 transition-transform',
                      activeMenu === item.label && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>
                {activeMenu === item.label && (
                  <div className="pl-6 py-2 space-y-1 bg-gray-50">
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-sm font-semibold text-primary-700"
                    >
                      All {item.label}
                    </Link>
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                {label(item.label)}
              </Link>
            )
          )}
          {isMeilisearchEnabled && (
            <Link
              to="/search"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              {label('Search')}
            </Link>
          )}
          {languageSelect && (
            <div className="px-4 py-3 border-t border-gray-200">
              {languageSelect}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
