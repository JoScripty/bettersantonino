import * as yaml from 'js-yaml';
import * as LucideIcons from 'lucide-react';
import hotlinesYaml from './hotlines.yaml?raw';

type IconType = React.ComponentType<{ className?: string }>;

export interface Hotline {
  name: string;
  description?: string;
  numbers: string[];
  icon: IconType;
  emergency: boolean;
}

export interface HotlineGroup {
  title: string;
  hotlines: Hotline[];
}

interface RawHotline extends Omit<Hotline, 'icon' | 'numbers'> {
  icon?: string;
  numbers?: (string | number)[];
}

const raw = yaml.load(hotlinesYaml) as {
  groups?: { title: string; hotlines?: RawHotline[] }[];
};

export const hotlineGroups: HotlineGroup[] = (raw.groups ?? []).map(group => ({
  title: group.title,
  hotlines: (group.hotlines ?? []).map(h => ({
    ...h,
    numbers: (h.numbers ?? []).map(String),
    emergency: Boolean(h.emergency),
    icon:
      (LucideIcons[h.icon as keyof typeof LucideIcons] as IconType) ??
      LucideIcons.Phone,
  })),
}));

export const emergencyHotlines = hotlineGroups
  .flatMap(group => group.hotlines)
  .filter(h => h.emergency);

/** Numbers still in [brackets] are placeholders and are not dialable. */
export const isPlaceholder = (number: string) => number.startsWith('[');

export const telHref = (number: string) =>
  `tel:${number.replace(/[^\d+]/g, '')}`;
