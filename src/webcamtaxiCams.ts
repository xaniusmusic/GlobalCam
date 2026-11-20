import type { Cam } from './data';

/**
 * WebcamTaxi (webcamtaxi.com) live cams. The website blocks automated access, so these come from
 * WebcamTaxi's official YouTube channel (@WebcamTaxi) plus the partner channels it features.
 * All streams were verified as live and embeddable.
 */
type Seed = Pick<Cam, 'id' | 'yt' | 'title' | 'location' | 'lat' | 'lon' | 'category' | 'description' | 'source'> & Partial<Cam>;

const madeira = { country: 'Portugal', region: 'Europe' as const, tz: 'Atlantic/Madeira' };
const WT = 'https://www.webcamtaxi.com/en/';

export const webcamtaxiCams: Cam[] = ([
  // ---- WebcamTaxi's own channel ----
  { id: 'wt-madalena', yt: 'fKTj-u1o-v0', source: 'WebcamTaxi', title: 'Madalena do Mar — Banana Plantations', location: 'Madeira Island', lat: 32.703, lon: -17.13, category: 'Beaches',
    description: 'A sunny village on Madeira’s southwest coast, surrounded by terraced banana plantations along the Atlantic.' },
  { id: 'wt-cr7', yt: 'VNJRiXYZhfs', source: 'WebcamTaxi', title: 'CR7 Museum PTZ Cam', location: 'Funchal, Madeira', lat: 32.646, lon: -16.912, category: 'Cities',
    description: 'A pan-tilt-zoom camera over the Funchal waterfront by the museum dedicated to Madeira-born Cristiano Ronaldo.' },
  { id: 'wt-madeira-multi', yt: 'GoCh3Rw2fH4', source: 'WebcamTaxi', title: 'Madeira Island Multi-cam (13 cams)', location: 'Madeira Island', lat: 32.75, lon: -16.95, category: 'Nature',
    description: 'WebcamTaxi’s rotating stream of 13 Madeira webcams, with local weather.' },
  { id: 'wt-cruz-caldeira', yt: '1E344lR458g', source: 'WebcamTaxi', title: 'Cruz da Caldeira', location: 'Câmara de Lobos, Madeira', lat: 32.665, lon: -16.98, category: 'Nature',
    description: 'A hillside view above Câmara de Lobos, the fishing village Winston Churchill loved to paint.' },
  { id: 'wt-paul-do-mar', yt: 'A36ysN816Yg', source: 'WebcamTaxi', title: 'Paul do Mar', location: 'Fajã da Ovelha, Madeira', lat: 32.757, lon: -17.228, category: 'Beaches',
    description: 'A dramatic coastal village beneath sheer cliffs, famous for its big-wave surfing.' },
  { id: 'wt-funchal-sao-roque', yt: '_idE_q5kgtA', source: 'WebcamTaxi', title: 'Funchal City from São Roque', location: 'Funchal, Madeira', lat: 32.67, lon: -16.92, category: 'Cities',
    description: 'A panorama over Madeira’s capital, its amphitheatre of hills and the harbour.' },

  // ---- Partner channels featured on WebcamTaxi ----
  { id: 'wt-funchal-marina-1', yt: 'DpaiPhbM4t4', source: 'Madeira-Web', title: 'Funchal Marina — Cam 1', location: 'Funchal, Madeira', lat: 32.6455, lon: -16.9105, category: 'Cities',
    description: 'Yachts, catamarans and whale-watching boats in Funchal Marina.' },
  { id: 'wt-funchal-marina-2', yt: 'BYd19W4uy0Y', source: 'Madeira-Web', title: 'Funchal Marina — Cam 2', location: 'Funchal, Madeira', lat: 32.6458, lon: -16.909, category: 'Cities',
    description: 'A second view of the marina and Funchal’s seafront promenade.' },
  { id: 'wt-ritz', yt: '_BPIJnWO60s', source: 'Madeira-Web', title: 'Avenida Arriaga — Ritz Madeira', location: 'Funchal, Madeira', lat: 32.6485, lon: -16.9085, category: 'Cities',
    description: 'Funchal’s elegant main avenue, seen from the historic Ritz café.' },
  { id: 'wt-porto-moniz-360', yt: 'owvg72MlX5I', source: 'Madeira-Web', title: 'Porto Moniz 360° Panorama', location: 'Porto Moniz, Madeira', lat: 32.867, lon: -17.17, category: 'Nature',
    description: 'A 360° view of Madeira’s rugged northwest tip.' },
  { id: 'wt-porto-moniz-pools', yt: 'QcMxxAIo8CI', source: 'Madeira-Web Beaches', title: 'Porto Moniz Lava Pools', location: 'Porto Moniz, Madeira', lat: 32.868, lon: -17.168, category: 'Beaches',
    description: 'Natural swimming pools formed in black volcanic rock and filled by Atlantic waves.' },
  { id: 'wt-porto-moniz-harbour', yt: 'ZfSOHBWul3o', source: 'Madeira-Web Places', title: 'Porto Moniz Harbour', location: 'Porto Moniz, Madeira', lat: 32.866, lon: -17.163, category: 'Nature',
    description: 'The sheltered harbour of Porto Moniz on Madeira’s north coast.' },
  { id: 'wt-doca-cavacas', yt: 'QsExsE3GScU', source: 'Madeira-Web Beaches', title: 'Doca do Cavacas Pools', location: 'Funchal, Madeira', lat: 32.637, lon: -16.94, category: 'Beaches',
    description: 'Seaside lava-rock pools on Funchal’s western coast.' },
  { id: 'wt-lido', yt: 'K8Fl1Bm365M', source: 'Madeira-Web Beaches', title: 'Lido Pool Complex', location: 'Funchal, Madeira', lat: 32.635, lon: -16.935, category: 'Beaches',
    description: 'Funchal’s classic oceanfront lido with its pools and sea access.' },
  { id: 'wt-canical', yt: '5q991w6Ha3k', source: 'Madeira-Web Beaches', title: 'Caniçal', location: 'Caniçal, Madeira', lat: 32.738, lon: -16.737, category: 'Beaches',
    description: 'A former whaling village near Madeira’s eastern Ponta de São Lourenço.' },
  { id: 'wt-reis-magos', yt: 'PujA-AJpbek', source: 'Madeira-Web', title: 'Praia dos Reis Magos', location: 'Caniço, Madeira', lat: 32.643, lon: -16.83, category: 'Beaches',
    description: 'A pebble beach and promenade in Caniço, popular with divers.' },
  { id: 'wt-calheta', yt: '4dbXjCzI5FU', source: 'Madeira-Web', title: 'Calheta Beach', location: 'Calheta, Madeira', lat: 32.72, lon: -17.18, category: 'Beaches',
    description: 'One of Madeira’s few golden-sand beaches, seen from the MUDAS art museum.' },
  { id: 'wt-pontinha', yt: 'QZeuP3PjPDw', source: 'Portal Netmadeira', title: 'Funchal Pontinha', location: 'Funchal, Madeira', lat: 32.642, lon: -16.912, category: 'Cities',
    description: 'Funchal’s port breakwater, where cruise ships dock.' },
  { id: 'wt-curacao', yt: '28U-t3fA9ks', source: 'SHOWME Caribbean', title: 'Handelskade — Willemstad', location: 'Willemstad', lat: 12.105, lon: -68.934, category: 'Landmarks',
    country: 'Curaçao', region: 'Caribbean', tz: 'America/Curacao',
    description: 'The UNESCO-listed, candy-coloured colonial waterfront of Willemstad, Curaçao.' },
  { id: 'wt-las-vegas-airport', yt: 'V7_orOtu-oo', source: 'Flightradar24', title: 'Las Vegas Airport (26R & 26L)', location: 'Las Vegas, NV', lat: 36.08, lon: -115.152, category: 'Cities',
    country: 'United States', region: 'North America', tz: 'America/Los_Angeles',
    description: 'Planespotting at Harry Reid International with live flight data from Flightradar24.' },
  { id: 'wt-key-west', yt: 'lcVm-Izrpa0', source: 'Seek Florida Keys', title: "Duval Street — Irish Kevin's", location: 'Key West, FL', lat: 24.559, lon: -81.805, category: 'Cities',
    country: 'United States', region: 'North America', tz: 'America/New_York',
    description: 'The party heart of Key West on famous Duval Street.' },
  { id: 'wt-montauk', yt: 'RQvL67g8ry4', source: 'Hamptons Traffic Cams', title: 'Montauk Downtown Circle (4K)', location: 'Montauk, NY', lat: 41.035, lon: -71.954, category: 'Cities',
    country: 'United States', region: 'North America', tz: 'America/New_York',
    description: 'The beach town at the eastern tip of Long Island, in 4K.' },
] as Seed[]).map((c) => ({ ...madeira, ...c, pageUrl: WT }));
