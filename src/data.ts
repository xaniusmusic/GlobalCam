export type Category = 'Cities' | 'Beaches' | 'Landmarks' | 'Nature' | 'Wildlife' | 'Volcanoes' | 'Underwater' | 'Space' | 'Trains';

export interface Cam {
  id: string;
  /** YouTube live stream ID ('' for non-YouTube cams) */
  yt: string;
  /** Stream technology: YouTube embed (default), ipcamlive player (Live from Iceland) or SkylineWebcams official embed */
  kind?: 'youtube' | 'ipcam' | 'skyline' | 'iframe';
  /** official embed page URL (kind 'iframe') */
  embed?: string;
  /** static live snapshot thumbnail (for iframe embeds) */
  thumb?: string;
  /** 0 = confirmed live, 1/2 = listed live by the source site */
  verified?: number;
  /** ipcamlive camera alias */
  ipcam?: string;
  /** SkylineWebcams embed id + page url */
  skyId?: number;
  skyUrl?: string;
  /** coordinates are only a country-level approximation */
  approx?: boolean;
  /** page on the provider's website */
  pageUrl?: string;
  /** directory / aggregator site the stream was found on */
  via?: string;
  title: string;
  location: string;
  country: string;
  category: Category;
  tz: string;
  lat: number;
  lon: number;
  description: string;
  /** Channel / provider of the live stream (defaults to EarthCam) */
  source?: string;
  region?: Region;
}

export type Region =
  | 'North America' | 'Caribbean' | 'Iceland' | 'Europe' | 'Africa' | 'South America'
  | 'Middle East' | 'Asia' | 'Australia' | 'New Zealand' | 'Pacific' | 'Arctic' | 'Space';

/** Real live streams from EarthCam's official YouTube channel (youtube.com/@earthcam). */
const earthcamCams: Cam[] = [
  {
    id: 'times-square-north',
    yt: 'ZxCeWQ3Lcig',
    title: 'Times Square North 4K',
    location: 'New York City, NY',
    country: 'United States',
    category: 'Cities',
    tz: 'America/New_York',
    lat: 40.759,
    lon: -73.985,
    description: 'The crossroads of the world in 4K. Watch the dazzling billboards, crowds and energy of Times Square live, around the clock.',
  },
  {
    id: 'times-square-crossroads',
    yt: 'KHy_n-EMWY8',
    title: 'Times Square Crossroads',
    location: 'New York City, NY',
    country: 'United States',
    category: 'Cities',
    tz: 'America/New_York',
    lat: 40.757,
    lon: -73.986,
    description: 'A street-level look at the busy intersection of Broadway and 7th Avenue in the heart of Manhattan.',
  },
  {
    id: 'statue-of-liberty',
    yt: 'o5Ie_LpZ9uk',
    title: 'Statue of Liberty',
    location: 'New York Harbor, NY',
    country: 'United States',
    category: 'Landmarks',
    tz: 'America/New_York',
    lat: 40.689,
    lon: -74.044,
    description: 'Lady Liberty stands watch over New York Harbor. A symbol of freedom welcoming visitors since 1886.',
  },
  {
    id: 'brooklyn-bridge',
    yt: 'tErYxn2UM5Y',
    title: 'Brooklyn Bridge',
    location: 'New York City, NY',
    country: 'United States',
    category: 'Landmarks',
    tz: 'America/New_York',
    lat: 40.706,
    lon: -73.997,
    description: 'The iconic suspension bridge connecting Manhattan and Brooklyn across the East River.',
  },
  {
    id: 'world-trade-center',
    yt: '5C9oM7C2Q9k',
    title: 'World Trade Center',
    location: 'New York City, NY',
    country: 'United States',
    category: 'Landmarks',
    tz: 'America/New_York',
    lat: 40.713,
    lon: -74.013,
    description: 'One World Trade Center, the tallest building in the Western Hemisphere, towers over Lower Manhattan.',
  },
  {
    id: '911-memorial',
    yt: 'ZYQlLQHz2Mg',
    title: '9/11 Memorial & Museum',
    location: 'New York City, NY',
    country: 'United States',
    category: 'Landmarks',
    tz: 'America/New_York',
    lat: 40.7115,
    lon: -74.0134,
    description: 'The National September 11 Memorial honoring the lives lost, with its twin reflecting pools.',
  },
  {
    id: 'lincoln-harbor',
    yt: 'sixP_dAJ8D4',
    title: 'Lincoln Harbor',
    location: 'Weehawken, NJ',
    country: 'United States',
    category: 'Cities',
    tz: 'America/New_York',
    lat: 40.76,
    lon: -74.023,
    description: 'A sweeping view of the Manhattan skyline across the Hudson River.',
  },
  {
    id: 'washington-monument',
    yt: 'mG2gAWY_Guw',
    title: 'Washington Monument',
    location: 'Washington, D.C.',
    country: 'United States',
    category: 'Landmarks',
    tz: 'America/New_York',
    lat: 38.889,
    lon: -77.035,
    description: 'The 555-foot marble obelisk on the National Mall honoring George Washington.',
  },
  {
    id: 'liberty-bell',
    yt: 'F1EQEDL4ddU',
    title: 'Liberty Bell & Independence Hall',
    location: 'Philadelphia, PA',
    country: 'United States',
    category: 'Landmarks',
    tz: 'America/New_York',
    lat: 39.949,
    lon: -75.15,
    description: 'The birthplace of American democracy, where the Declaration of Independence was signed.',
  },
  {
    id: 'philadelphia',
    yt: 'P3sGke9M59o',
    title: 'Philadelphia Skyline',
    location: 'Philadelphia, PA',
    country: 'United States',
    category: 'Cities',
    tz: 'America/New_York',
    lat: 39.952,
    lon: -75.165,
    description: 'Live views over the City of Brotherly Love.',
  },
  {
    id: 'abbey-road',
    yt: 'zMCea32gpmg',
    title: 'Abbey Road Crossing',
    location: 'London, England',
    country: 'United Kingdom',
    category: 'Landmarks',
    tz: 'Europe/London',
    lat: 51.532,
    lon: -0.178,
    description: 'The world-famous zebra crossing in St John’s Wood. Watch fans recreate the classic album-cover walk.',
  },
  {
    id: 'new-orleans-street',
    yt: 'xqdukYhcGEU',
    title: 'New Orleans Street View',
    location: 'New Orleans, LA',
    country: 'United States',
    category: 'Cities',
    tz: 'America/Chicago',
    lat: 29.958,
    lon: -90.065,
    description: 'Jazz, nightlife and colorful crowds on the streets of the French Quarter.',
  },
  {
    id: 'new-orleans-balcony',
    yt: 'QxFFjXu_zqs',
    title: 'New Orleans Balcony View',
    location: 'New Orleans, LA',
    country: 'United States',
    category: 'Cities',
    tz: 'America/Chicago',
    lat: 29.957,
    lon: -90.066,
    description: 'A classic French Quarter balcony overlooking the action below.',
  },
  {
    id: 'midway',
    yt: 'EiUyBIcG4fQ',
    title: 'Midway Airport',
    location: 'Chicago, IL',
    country: 'United States',
    category: 'Cities',
    tz: 'America/Chicago',
    lat: 41.786,
    lon: -87.752,
    description: 'Plane spotting at Chicago Midway International. Watch arrivals and departures live.',
  },
  {
    id: 'cayman',
    yt: 'YeEMPcYCbgQ',
    title: 'Cayman Islands',
    location: 'Grand Cayman',
    country: 'Cayman Islands',
    category: 'Beaches',
    tz: 'America/Cayman',
    lat: 19.33,
    lon: -81.385,
    description: 'Turquoise Caribbean water and white sand. Your instant tropical getaway.',
  },
  {
    id: 'sanibel',
    yt: '4LTSTw4jnZc',
    title: 'Sanibel Island',
    location: 'Sanibel, FL',
    country: 'United States',
    category: 'Beaches',
    tz: 'America/New_York',
    lat: 26.443,
    lon: -82.111,
    description: 'Famous for its seashells and sunsets on the Gulf of Mexico.',
  },
  {
    id: 'anglins-pier',
    yt: 'tAdTOOsrZBQ',
    title: 'Anglins Pier',
    location: 'Lauderdale-By-The-Sea, FL',
    country: 'United States',
    category: 'Beaches',
    tz: 'America/New_York',
    lat: 26.19,
    lon: -80.094,
    description: 'Ocean waves, anglers and Atlantic sunrises at this classic Florida fishing pier.',
  },
  {
    id: 'seaside-heights',
    yt: 'OBgCrw-IyhE',
    title: 'Seaside Heights North View',
    location: 'Seaside Heights, NJ',
    country: 'United States',
    category: 'Beaches',
    tz: 'America/New_York',
    lat: 39.944,
    lon: -74.073,
    description: 'The Jersey Shore boardwalk and beach live.',
  },
  {
    id: 'giraffe-barn',
    yt: '8ShrAk0RPrQ',
    title: 'Giraffe Cam Barn',
    location: 'Greenville, SC',
    country: 'United States',
    category: 'Wildlife',
    tz: 'America/New_York',
    lat: 34.844,
    lon: -82.385,
    description: 'Spend time with the giraffes at the Greenville Zoo. Watch them eat, play and rest.',
  },
  {
    id: 'snowman-cam',
    yt: 'TPGY7UYzbKw',
    title: 'Snowman Cam: Animals & Wildlife',
    location: 'Gaylord, MI',
    country: 'United States',
    category: 'Wildlife',
    tz: 'America/Detroit',
    lat: 45.027,
    lon: -84.675,
    description: 'Woodland visitors big and small stop by this northern Michigan wildlife camera.',
  },
  {
    id: 'pigeon-river',
    yt: '6tq8S2pp8PQ',
    title: 'Pigeon River',
    location: 'Hartford, TN',
    country: 'United States',
    category: 'Nature',
    tz: 'America/New_York',
    lat: 35.82,
    lon: -83.15,
    description: 'Whitewater rafting on the Pigeon River in the Smoky Mountains.',
  },
  {
    id: 'spirit-lake',
    yt: 'WHve7zk9jds',
    title: 'Spirit Lake',
    location: 'Spirit Lake, IA',
    country: 'United States',
    category: 'Nature',
    tz: 'America/Chicago',
    lat: 43.422,
    lon: -95.102,
    description: 'Iowa’s largest natural lake in the Iowa Great Lakes region.',
  },
  {
    id: 'madison-indiana',
    yt: 'Ez6xC43MMTQ',
    title: 'Madison, Indiana',
    location: 'Madison, IN',
    country: 'United States',
    category: 'Nature',
    tz: 'America/Indiana/Indianapolis',
    lat: 38.736,
    lon: -85.38,
    description: 'A historic Ohio River town with river traffic and scenic hills.',
  },
];

import { moreCams } from './moreCams';
import { worldCams } from './worldCams';
import { icelandCams } from './icelandCams';
import { webcamtaxiCams } from './webcamtaxiCams';
import { AGG_RAW } from './aggregatorData';
import { EXTRA_RAW } from './extraData';
import { EXTRA2_RAW } from './extra2Data';
import { WUC_RAW } from './wucData';

const regionByCountry: Record<string, Region> = {
  'United States': 'North America', Canada: 'North America', Mexico: 'North America',
  'Cayman Islands': 'Caribbean', 'United Kingdom': 'Europe', Italy: 'Europe', Portugal: 'Europe',
  Japan: 'Asia', Nepal: 'Asia', Indonesia: 'Asia', Philippines: 'Asia',
  Namibia: 'Africa', 'South Africa': 'Africa', Brazil: 'South America', Greenland: 'Arctic', Space: 'Space',
};

const withRegion = (c: Cam): Cam => ({
  ...c,
  region: c.region ?? (c.location.endsWith(', HI') ? 'Pacific' : regionByCountry[c.country] ?? 'North America'),
});

const aggregatorCams: Cam[] = AGG_RAW.map(
  ([yt, title, location, country, tz, lat, lon, region, category, channel, via, page, approx]) => ({
    id: `agg-${yt}`, yt, title, location, country, tz, lat, lon,
    region: region as Region, category: category as Category,
    source: channel || via, via, pageUrl: page, approx: !!approx,
    description: `Live stream from ${channel || 'YouTube'}, found on ${via}${location && location !== country ? ` · ${location}, ${country}` : ` · ${country}`}.`,
  }),
);

const extraCams: Cam[] = [...EXTRA_RAW, ...EXTRA2_RAW].map(
  ([k, ref, title, location, country, tz, lat, lon, region, category, channel, via, page, approx, verified]) => ({
    id: `x${k}-${k === 'w' ? page.split('/').slice(-2).join('-') : ref}`,
    yt: k === 'y' ? ref : '',
    kind: k === 'y' ? undefined : k === 'i' ? ('ipcam' as const) : ('iframe' as const),
    ipcam: k === 'i' ? ref : undefined,
    embed: k === 'w' ? ref : undefined,
    title, location, country, tz, lat, lon,
    region: region as Region, category: category as Category,
    source: channel || via, via, pageUrl: page, approx: !!approx, verified,
    description: `Live camera${channel && channel !== via ? ` by ${channel}` : ''}, listed on ${via} · ${location && location !== country ? `${location}, ` : ''}${country}.`,
  }),
);

const wucCams: Cam[] = WUC_RAW.map(([id, title, location, country, tz, lat, lon, region, category, page, approx]) => ({
  id: `wuc-${id}`, yt: '', kind: 'iframe' as const,
  embed: `https://services.whatsupcams.com/wgt/${id}/`,
  thumb: `https://cdn.whatsupcams.com/snapshot/${id}.jpg`,
  title, location, country, tz, lat, lon,
  region: region as Region, category: category as Category,
  source: 'WhatsUpCams', via: 'WhatsUpCams', pageUrl: page, approx: !!approx,
  description: `Live webcam from the WhatsUpCams network · ${location && location !== country ? `${location}, ` : ''}${country}.`,
}));

export const cams: Cam[] = [
  ...earthcamCams.map((c) => ({ ...c, source: 'EarthCam' })),
  ...moreCams,
  ...icelandCams,
  ...worldCams,
  ...webcamtaxiCams,
  ...aggregatorCams,
  ...extraCams,
  ...wucCams,
].map(withRegion);

/** Hand-curated cams (not bulk-imported from directories). */
export const curatedCams = cams.filter((c) => !c.via);

export const regions: ('All regions' | Region)[] = [
  'All regions', 'Iceland', 'Europe', 'Africa', 'South America', 'Middle East', 'Australia', 'New Zealand',
  'North America', 'Caribbean', 'Pacific', 'Asia', 'Arctic', 'Space',
];

export const categories: ('All' | Category)[] = [
  'All', 'Cities', 'Beaches', 'Landmarks', 'Nature', 'Wildlife', 'Underwater', 'Volcanoes', 'Space', 'Trains',
];

/** Filterable providers: aggregator site when present, else the stream owner. */
export const providerOf = (c: Cam) => c.via ?? c.source ?? 'EarthCam';
export const sources = Array.from(new Set(cams.map(providerOf))).sort();

export const thumb = (yt: string, hi = false) =>
  `https://i.ytimg.com/vi/${yt}/${hi ? 'maxresdefault_live' : 'hqdefault_live'}.jpg`;

export const embedUrl = (yt: string, opts: { mute?: boolean; controls?: boolean } = {}) =>
  `https://www.youtube.com/embed/${yt}?autoplay=1&mute=${opts.mute === false ? 0 : 1}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&controls=${opts.controls === false ? 0 : 1}`;

export const watchUrl = (yt: string) => `https://www.youtube.com/watch?v=${yt}`;

export const camKind = (c: Cam) => c.kind ?? 'youtube';

export const ipcamPlayerUrl = (alias: string) =>
  `https://g0.ipcamlive.com/player/player.php?alias=${alias}&autoplay=1&mute=1`;

export const skylineImg = (id: number) => `https://embed.skylinewebcams.com/img/${id}.jpg`;

/** Static thumbnail URL when one is known synchronously (ipcam thumbnails are resolved at runtime). */
export const staticThumb = (c: Cam, hi = false): string | null => {
  const k = camKind(c);
  if (k === 'youtube') return thumb(c.yt, hi);
  if (k === 'skyline' && c.skyId) return skylineImg(c.skyId);
  if (k === 'iframe' && c.thumb) return c.thumb;
  return null; // ipcam resolved at runtime
};

/** Where to watch the original stream. */
export const sourceUrl = (c: Cam) =>
  camKind(c) === 'youtube' ? watchUrl(c.yt) : c.skyUrl ?? c.pageUrl ?? '#';

export const sourceLabel = (c: Cam) =>
  camKind(c) === 'youtube' ? 'YouTube' : camKind(c) === 'skyline' ? 'SkylineWebcams' : camKind(c) === 'iframe' ? c.via ?? 'source' : c.source ?? 'source';

/** Northern / Southern Lights cams across every source. */
const AURORA_RE = /aurora|northern light|nordlys|revontul|norrsken|southern light|all.?sky|sky cam/i;
export const auroraCams = cams.filter(
  (c) => AURORA_RE.test(c.title) || (c.category === 'Space' && /iceland|norway|finland|sweden|greenland|alaska|canada|lapland|faroe|scotland/i.test(`${c.country} ${c.location}`)),
);
export const camByYt = (yt: string) => cams.find((c) => c.yt === yt);
