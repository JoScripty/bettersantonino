import type { ReactNode } from 'react';
import { parseAsString, useQueryStates } from 'nuqs';
import { Download, Search } from 'lucide-react';

export interface Column<T> {
  label: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export interface Filter<T> {
  key: string;
  label: string;
  value: (row: T) => string;
}

interface RecordTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  /** Text used for the search box (joined searchable fields). */
  searchText: (row: T) => string;
  filters?: Filter<T>[];
  rowKey: (row: T) => string;
  file?: (row: T) => string | undefined;
  /**
   * Card heading on small screens. The first column is treated as the title
   * column and is not repeated inside the card.
   */
  title: (row: T) => ReactNode;
  emptyText?: string;
}

const textParser = parseAsString.withDefault('');

export function DownloadLink({ href }: { href?: string }) {
  if (!href)
    return <span className="text-sm text-gray-400">Not yet posted</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-primary-200 px-2.5 py-1 text-sm font-medium text-primary-700 hover:bg-primary-50"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      PDF
    </a>
  );
}

/**
 * Searchable, filterable list of records. Filter values live in the URL so
 * a filtered view can be shared. Renders a table on desktop and cards on
 * phones.
 */
export default function RecordTable<T>({
  rows,
  columns,
  searchText,
  filters = [],
  rowKey,
  file,
  title,
  emptyText = 'No records match your search.',
}: RecordTableProps<T>) {
  const [state, setState] = useQueryStates(
    Object.fromEntries(
      ['q', ...filters.map(f => f.key)].map(key => [key, textParser])
    ) as Record<string, typeof textParser>
  );

  const query = state.q.trim().toLowerCase();
  const visible = rows.filter(
    row =>
      (!query || searchText(row).toLowerCase().includes(query)) &&
      filters.every(f => !state[f.key] || f.value(row) === state[f.key])
  );

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search</span>
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={state.q}
            onChange={e => setState({ q: e.target.value || null })}
            placeholder="Search…"
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </label>
        {filters.map(f => {
          const options = [...new Set(rows.map(f.value))].sort().reverse();
          return (
            <label key={f.key} className="md:w-48">
              <span className="sr-only">{f.label}</span>
              <select
                value={state[f.key]}
                onChange={e => setState({ [f.key]: e.target.value || null })}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All {f.label.toLowerCase()}</option>
                {options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>

      <p className="mb-3 text-sm text-gray-600" aria-live="polite">
        Showing {visible.length} of {rows.length}
      </p>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-600">
          {emptyText}
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-lg border border-gray-200 md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  {columns.map(col => (
                    <th key={col.label} scope="col" className="px-4 py-3">
                      {col.label}
                    </th>
                  ))}
                  {file && (
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Download</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {visible.map(row => (
                  <tr key={rowKey(row)} className="hover:bg-gray-50">
                    {columns.map(col => (
                      <td
                        key={col.label}
                        className={col.className ?? 'px-4 py-3 text-gray-700'}
                      >
                        {col.render(row)}
                      </td>
                    ))}
                    {file && (
                      <td className="px-4 py-3 text-right">
                        <DownloadLink href={file(row)} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 md:hidden">
            {visible.map(row => (
              <li
                key={rowKey(row)}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="mb-2 font-semibold text-gray-900">
                  {title(row)}
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                  {/* The first column is the record title, already shown above */}
                  {columns.slice(1).map(col => (
                    <div key={col.label} className="contents">
                      <dt className="text-gray-500">{col.label}</dt>
                      <dd className="text-gray-800">{col.render(row)}</dd>
                    </div>
                  ))}
                </dl>
                {file && (
                  <div className="mt-3">
                    <DownloadLink href={file(row)} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
