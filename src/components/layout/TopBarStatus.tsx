import React, { useEffect, useState } from 'react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Clock,
  Sun,
  type LucideIcon,
} from 'lucide-react';

// Approximate center of Santo Niño, Cagayan, for the weather lookup.
const LATITUDE = 17.88;
const LONGITUDE = 121.57;
const TIME_ZONE = 'Asia/Manila';
const WEATHER_REFRESH_MS = 30 * 60 * 1000;

const dateTimeFormat = new Intl.DateTimeFormat('en-PH', {
  timeZone: TIME_ZONE,
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

interface Weather {
  temperature: number;
  code: number;
}

// WMO weather codes, as returned by Open-Meteo.
function describeWeather(code: number): { label: string; Icon: LucideIcon } {
  if (code === 0) return { label: 'Clear', Icon: Sun };
  if (code <= 2) return { label: 'Partly cloudy', Icon: CloudSun };
  if (code === 3) return { label: 'Cloudy', Icon: Cloud };
  if (code <= 48) return { label: 'Fog', Icon: CloudFog };
  if (code <= 57) return { label: 'Drizzle', Icon: CloudDrizzle };
  if (code <= 67 || (code >= 80 && code <= 82))
    return { label: 'Rain', Icon: CloudRain };
  if (code <= 77 || code === 85 || code === 86)
    return { label: 'Snow', Icon: CloudSnow };
  return { label: 'Thunderstorm', Icon: CloudLightning };
}

const TopBarStatus: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15 * 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}` +
            `&longitude=${LONGITUDE}&current=temperature_2m,weather_code` +
            `&timezone=${encodeURIComponent(TIME_ZONE)}`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data = await res.json();
        const current = data?.current;
        if (typeof current?.temperature_2m === 'number') {
          setWeather({
            temperature: current.temperature_2m,
            code: current.weather_code ?? 0,
          });
        }
      } catch {
        // Weather is a nice-to-have; hide it if the request fails.
      }
    };
    load();
    const id = window.setInterval(load, WEATHER_REFRESH_MS);
    return () => {
      controller.abort();
      window.clearInterval(id);
    };
  }, []);

  const conditions = weather ? describeWeather(weather.code) : null;

  return (
    <div className="hidden sm:flex items-center gap-3">
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" aria-hidden="true" />
        <time dateTime={now.toISOString()}>{dateTimeFormat.format(now)}</time>
      </span>
      {weather && conditions && (
        <span
          className="inline-flex items-center gap-1"
          title={`Current weather in Santo Niño: ${conditions.label}`}
        >
          <conditions.Icon className="h-3 w-3" aria-hidden="true" />
          {Math.round(weather.temperature)}°C · {conditions.label}
        </span>
      )}
    </div>
  );
};

export default TopBarStatus;
