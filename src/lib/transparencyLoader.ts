/**
 * Loads the transparency data files in content/transparency/.
 * Edit those YAML files to publish documents; no code changes are needed.
 */
import * as yaml from 'js-yaml';
import fullDisclosureYaml from '../../content/transparency/full-disclosure.yaml?raw';
import bidsYaml from '../../content/transparency/bids.yaml?raw';
import ordinancesYaml from '../../content/transparency/ordinances.yaml?raw';
import charterYaml from '../../content/transparency/citizens-charter.yaml?raw';

export interface DisclosureDocument {
  title: string;
  category: string;
  year: number;
  period: string;
  file?: string;
}

export interface Bid {
  reference: string;
  title: string;
  type: string;
  abc: number;
  status: 'Open' | 'Closed' | 'Awarded';
  posted: string;
  deadline: string;
  awardee?: string;
  file?: string;
}

export interface Measure {
  number: string;
  type: 'Ordinance' | 'Resolution';
  title: string;
  date: string;
  author?: string;
  status: string;
  file?: string;
}

export interface CharterService {
  name: string;
  classification: string;
  who?: string;
  requirements: string[];
  steps: string[];
  fee: string;
  time: string;
}

export interface CharterOffice {
  office: string;
  services: CharterService[];
}

/** js-yaml turns unquoted dates into Date objects; normalize to YYYY-MM-DD. */
const toDate = (value: unknown) =>
  value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value ?? '');

const load = <T>(raw: string): T => (yaml.load(raw) ?? {}) as T;

export const disclosureDocuments: DisclosureDocument[] = (
  load<{ documents?: DisclosureDocument[] }>(fullDisclosureYaml).documents ?? []
).sort((a, b) => b.year - a.year || b.period.localeCompare(a.period));

export const bids: Bid[] = (load<{ bids?: Bid[] }>(bidsYaml).bids ?? [])
  .map(bid => ({
    ...bid,
    posted: toDate(bid.posted),
    deadline: toDate(bid.deadline),
  }))
  .sort((a, b) => b.posted.localeCompare(a.posted));

export const measures: Measure[] = (
  load<{ measures?: Measure[] }>(ordinancesYaml).measures ?? []
)
  .map(measure => ({ ...measure, date: toDate(measure.date) }))
  .sort((a, b) => b.date.localeCompare(a.date));

const charter = load<{ charterFile?: string; offices?: CharterOffice[] }>(
  charterYaml
);
export const charterOffices: CharterOffice[] = charter.offices ?? [];
export const charterFile = charter.charterFile;

export const formatPeso = (amount: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (iso: string) => {
  const date = new Date(`${iso}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? iso
    : new Intl.DateTimeFormat('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
};
