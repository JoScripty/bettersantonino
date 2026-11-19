import { Link } from 'react-router';
import { ArrowRight, UserRound } from 'lucide-react';
import Section from '../ui/Section';
import executive from '../../../content/government/departments/executive.json';
import { site } from '../../config/site';

/**
 * "Meet your Mayor" card. Names come from
 * content/government/departments/executive.json.
 *
 * This site is not the official LGU website, so it does not show a message
 * written in the Mayor's voice. Only add a quote here if it is a real,
 * published statement, and cite its source.
 * TODO: add a photo you have the right to use (set MAYOR_PHOTO in
 * executive.json).
 */
export default function MayorWelcome() {
  const photo = (executive as { MAYOR_PHOTO?: string }).MAYOR_PHOTO;
  return (
    <Section>
      <div className="grid items-center gap-8 rounded-2xl bg-primary-50 p-6 md:grid-cols-[auto_1fr] md:p-10">
        <div className="mx-auto h-36 w-36 overflow-hidden rounded-full bg-primary-100 ring-4 ring-white md:h-44 md:w-44">
          {photo ? (
            <img
              src={photo}
              alt={`Mayor ${executive.MAYOR}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound
              className="h-full w-full p-8 text-primary-300"
              aria-hidden="true"
            />
          )}
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
            Know your local officials
          </p>
          <h2 className="mb-1 text-2xl font-bold text-gray-900">
            {executive.HONORIFIC_TITLE} {executive.MAYOR}
          </h2>
          <p className="mb-4 text-gray-600">Municipal Mayor, {site.lguName}</p>
          <p className="mb-4 max-w-2xl text-gray-700">
            Find out who leads the municipality, who sits in the Sangguniang
            Bayan, and which office to approach for each concern.
          </p>
          <Link
            to="/government/departments/executive"
            className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
          >
            Meet your officials
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
