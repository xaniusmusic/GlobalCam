import { SKY_COUNTRIES, SKY_RAW, SKY_SUBTZ } from './skylineData';
import { cams, type Cam, type Region } from './data';

const titleCase = (s: string) =>
  s.split('-').map((w) => (w.length > 2 || /^\d/.test(w) ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');

export interface SkyEntry {
  e: number;
  title: string;
  country: string;
  countrySlug: string;
  region: Region;
  place: string;
  url: string;
  tz: string;
  lat: number;
  lon: number;
}

/** All active SkylineWebcams cameras (crawled directory). */
export const skyEntries: SkyEntry[] = SKY_RAW.map(([e, title, ci, path, tzi]) => {
  const [slug, country, tz, lat, lon, region] = SKY_COUNTRIES[ci];
  const parts = path.split('/');
  const place = parts.length >= 2 ? titleCase(parts[parts.length - 2]) : titleCase(parts[0] ?? '');
  return {
    e, title, country, countrySlug: slug, region: region as Region, place,
    url: `https://www.skylinewebcams.com/en/webcam/${slug}/${path}.html`,
    tz: tzi >= 0 ? SKY_SUBTZ[tzi] : tz, lat, lon,
  };
});

export const skyCountries = Array.from(
  skyEntries.reduce((m, s) => m.set(s.country, (m.get(s.country) ?? 0) + 1), new Map<string, number>()),
).sort((a, b) => b[1] - a[1]);

export const skyRegions = Array.from(new Set(skyEntries.map((s) => s.region)));

const featuredIds = new Set(cams.filter((c) => c.skyId).map((c) => c.skyId));

export function skyToCam(s: SkyEntry): Cam {
  // Prefer the hand-curated version (with precise coordinates) if we have one
  const curated = featuredIds.has(s.e) ? cams.find((c) => c.skyId === s.e) : undefined;
  if (curated) return curated;
  return {
    id: `sky-${s.e}`,
    yt: '',
    kind: 'skyline',
    skyId: s.e,
    skyUrl: s.url,
    source: 'SkylineWebcams',
    title: s.title,
    location: s.place,
    country: s.country,
    region: s.region,
    category: 'Cities',
    tz: s.tz,
    lat: s.lat,
    lon: s.lon,
    approx: true,
    description: `A live view of ${s.title} in ${s.country}, from the SkylineWebcams network. Click the image to watch the full live video stream on skylinewebcams.com.`,
  };
}

const skyById = new Map(skyEntries.map((s) => [`sky-${s.e}`, s]));

/** Resolve any cam id: curated cams first, then the SkylineWebcams directory. */
export function getCam(id: string): Cam | undefined {
  return cams.find((c) => c.id === id) ?? (skyById.has(id) ? skyToCam(skyById.get(id)!) : undefined);
}
