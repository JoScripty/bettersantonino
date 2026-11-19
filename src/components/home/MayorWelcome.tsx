import { Link } from 'react-router';
import { ArrowRight, UserRound } from 'lucide-react';
import Section from '../ui/Section';
import executive from '../../../content/government/departments/executive.json';
import { site } from '../../config/site';

/**
 * Mayor's welcome message. Names come from
 * content/government/departments/executive.json.
 * TODO: add the official photo at public/images/mayor.jpg and set
 * MAYOR_PHOTO in executive.json, and replace the message with the Mayor's own.
 */
export default function MayorWelcome() {
  const photo = (executive as { MAYOR_PHOTO?: string }).MAYOR_PHOTO;
  return (
    <Section>
      <div className="grid items-center gap-8 rounded-2xl bg-primary-50 p-6 md:grid-cols-[auto_1fr] md:p-10">
        <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-primary-100 ring-4 ring-white md:h-48 md:w-48">
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
            Message from the Mayor
          </p>
          <blockquote className="mb-4 text-lg text-gray-800 md:text-xl">
            “Welcome to the official website of {site.name}. This is your portal
            to our services, our plans, and how we use public funds. We commit
            to a government that is open, efficient, and close to every
            barangay.”
          </blockquote>
          <p className="font-semibold text-gray-900">
            {executive.HONORIFIC_TITLE} {executive.MAYOR}
          </p>
          <p className="mb-4 text-sm text-gray-600">Municipal Mayor</p>
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
