import { useEffect, useState } from 'react';

export function useClock(interval = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(t);
  }, [interval]);
  return now;
}

export function fmtTime(d: Date, tz: string, seconds = false) {
  try {
    return d.toLocaleTimeString('en-US', {
      timeZone: tz,
      hour: 'numeric',
      minute: '2-digit',
      ...(seconds ? { second: '2-digit' } : {}),
    });
  } catch {
    return d.toLocaleTimeString();
  }
}

const WMO: Record<number, [string, string]> = {
  0: ['Clear', '☀️'], 1: ['Mostly Clear', '🌤'], 2: ['Partly Cloudy', '⛅'], 3: ['Overcast', '☁️'],
  45: ['Fog', '🌫'], 48: ['Fog', '🌫'], 51: ['Drizzle', '🌦'], 53: ['Drizzle', '🌦'], 55: ['Drizzle', '🌦'],
  61: ['Rain', '🌧'], 63: ['Rain', '🌧'], 65: ['Heavy Rain', '🌧'], 66: ['Freezing Rain', '🌧'], 67: ['Freezing Rain', '🌧'],
  71: ['Snow', '🌨'], 73: ['Snow', '🌨'], 75: ['Heavy Snow', '❄️'], 77: ['Snow', '🌨'],
  80: ['Showers', '🌦'], 81: ['Showers', '🌦'], 82: ['Heavy Showers', '⛈'], 85: ['Snow Showers', '🌨'], 86: ['Snow Showers', '🌨'],
  95: ['Thunderstorm', '⛈'], 96: ['Thunderstorm', '⛈'], 99: ['Thunderstorm', '⛈'],
};

export interface Weather { temp: number; label: string; icon: string; wind: number }

const wxCache = new Map<string, Weather>();

export function useWeather(lat: number, lon: number) {
  const key = `${lat},${lon}`;
  const [wx, setWx] = useState<Weather | null>(wxCache.get(key) ?? null);
  useEffect(() => {
    let alive = true;
    if (wxCache.has(key)) { setWx(wxCache.get(key)!); return; }
    setWx(null);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`,
    )
      .then((r) => r.json())
      .then((d) => {
        const c = d.current;
        const [label, icon] = WMO[c.weather_code] ?? ['—', '🌡'];
        const w = { temp: Math.round(c.temperature_2m), label, icon, wind: Math.round(c.wind_speed_10m) };
        wxCache.set(key, w);
        if (alive) setWx(w);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [key, lat, lon]);
  return wx;
}

export function fmtNum(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}
