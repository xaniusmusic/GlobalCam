import type { Cam } from './data';

type Seed = Pick<Cam, 'title' | 'location' | 'lat' | 'lon' | 'category' | 'description'> & Partial<Cam>;
type SkySeed = Seed & { skyId: number; path: string };

const LFI = 'https://livefromiceland.is/webcam/';
const SKY = 'https://www.skylinewebcams.com/en/webcam/iceland/';
const base = { country: 'Iceland', region: 'Iceland' as const, tz: 'Atlantic/Reykjavik' };

/** Live from Iceland (livefromiceland.is) cameras, streamed through the ipcamlive embeddable player.
 *  Only cameras that were live AND allowed to be embedded on other sites were included. */
const liveFromIceland: Cam[] = ([
  { id: 'lfi-hlidarfjall', ipcam: '678e299f8ecf8', title: 'Akureyri — Hlíðarfjall', location: 'Akureyri', lat: 65.66, lon: -18.2, category: 'Nature',
    description: 'Iceland’s premier ski mountain above Akureyri, the capital of the north, with views over Eyjafjörður fjord.', pageUrl: LFI + 'akureyri-hlidarfjall/' },
  { id: 'lfi-stykkisholmur', ipcam: '6734b7c22f6ce', title: 'Stykkishólmur Harbour', location: 'Snæfellsnes Peninsula', lat: 65.075, lon: -22.73, category: 'Cities',
    description: 'A charming fishing town on the Snæfellsnes Peninsula, the gateway to the islands of Breiðafjörður.', pageUrl: LFI + 'stykkisholmur/' },
  { id: 'lfi-thingvallavatn', ipcam: '6335a77ddb216', title: 'Þingvallavatn Lake', location: 'Þingvellir', lat: 64.18, lon: -21.13, category: 'Nature',
    description: 'Iceland’s largest natural lake, sitting in the rift valley between the North American and Eurasian plates.', pageUrl: LFI + 'thingvallavatn/' },
  { id: 'lfi-skjaldbreidur', ipcam: '64dcee6a149a5', title: 'Skjaldbreiður Shield Volcano', location: 'Þingvellir', lat: 64.41, lon: -20.75, category: 'Volcanoes',
    description: 'The textbook example of a shield volcano. Its broad, gentle profile gave this volcano type its name.', pageUrl: LFI + 'skjaldbreidur/' },
  { id: 'lfi-ravens-nest', ipcam: 'krummi', title: 'Raven’s Nest', location: 'Selfoss', lat: 63.93, lon: -21.0, category: 'Wildlife',
    description: 'A live look into a common raven’s nest in Selfoss. Ravens (“krummi”) are part of Icelandic folklore.', pageUrl: LFI + 'ravens-nest/' },
  { id: 'lfi-heimaklettur', ipcam: 'heimaklettur', title: 'Vestmannaeyjar — Heimaklettur', location: 'Westman Islands', lat: 63.447, lon: -20.265, category: 'Nature',
    description: 'The towering cliff of Heimaklettur guarding the harbour of Heimaey in the Westman Islands.', pageUrl: LFI + 'vestmannaeyjar-heimaklettur/' },
  { id: 'lfi-dalurinn', ipcam: 'dalurinn', title: 'Vestmannaeyjar — Herjólfsdalur', location: 'Westman Islands', lat: 63.437, lon: -20.29, category: 'Nature',
    description: 'The grassy valley on Heimaey, home of the famous Þjóðhátíð festival every August.', pageUrl: LFI + 'vestmannaeyjar-dalurinn/' },
  { id: 'lfi-skipalyftan', ipcam: 'vestmannaeyjar', title: 'Vestmannaeyjar — Harbour', location: 'Westman Islands', lat: 63.442, lon: -20.27, category: 'Cities',
    description: 'Fishing boats and the Herjólfur ferry in Heimaey harbour.', pageUrl: LFI + 'vestmannaeyjar-skipalyftan/' },
  { id: 'lfi-aegisgata', ipcam: 'hofn', title: 'Vestmannaeyjar — Ægisgata', location: 'Westman Islands', lat: 63.443, lon: -20.268, category: 'Cities',
    description: 'Street and waterfront view in the town of Heimaey.', pageUrl: LFI + 'vestmannaeyjar-aegisgata/' },
  { id: 'lfi-framhaldsskoli', ipcam: 'eyjar', title: 'Vestmannaeyjar — Town View', location: 'Westman Islands', lat: 63.438, lon: -20.275, category: 'Cities',
    description: 'Overlooking Heimaey town with the Eldfell volcano, which erupted in 1973, nearby.', pageUrl: LFI + 'vestmannaeyjar-framhaldsskoli/' },
  { id: 'landhotel-aurora-1', ipcam: '6501dd6068492', title: 'Landhotel — Northern Lights Cam 1', location: 'Hella, South Iceland', lat: 63.95, lon: -20.28, category: 'Space',
    description: 'Live northern lights camera from Landhotel in the open countryside of South Iceland, far from city light pollution.', pageUrl: 'https://landhotel.is/northernlights-live/', source: 'Landhotel' },
  { id: 'landhotel-aurora-2', ipcam: '6565ed34e367a', title: 'Landhotel — Northern Lights Cam 2', location: 'Hella, South Iceland', lat: 63.951, lon: -20.282, category: 'Space',
    description: 'A second aurora camera at Landhotel, looking toward Hekla across the South Iceland lowlands.', pageUrl: 'https://landhotel.is/northernlights-live/', source: 'Landhotel' },
  { id: 'lfi-golf', ipcam: 'golf', title: 'Vestmannaeyjar — Golf Course', location: 'Westman Islands', lat: 63.434, lon: -20.29, category: 'Nature',
    description: 'One of the world’s most scenic golf courses, set inside an old volcanic crater.', pageUrl: LFI + 'vestmannaeyjar-golfskalinn/' },
] as (Seed & { id: string; ipcam: string })[]).map((c) => ({ ...base, ...c, yt: '', kind: 'ipcam' as const, source: 'Live from Iceland' }));

/** SkylineWebcams Iceland: official embed = live snapshot linking to the live video page. */
const skylineIceland: Cam[] = ([
  { skyId: 28, path: 'austurland/hofn/jokulsarlon', title: 'Jökulsárlón Glacier Lagoon', location: 'Höfn', lat: 64.048, lon: -16.18, category: 'Nature',
    description: 'Icebergs calved from Breiðamerkurjökull drift across Iceland’s famous glacier lagoon.' },
  { skyId: 1330, path: 'western-region/grundarfjorour/kirkjufell-mountain', title: 'Kirkjufell Mountain', location: 'Grundarfjörður', lat: 64.94, lon: -23.31, category: 'Landmarks',
    description: 'Iceland’s most photographed mountain, a favourite spot for northern lights photography.' },
  { skyId: 588, path: 'greater-reykjavik/reykjavik/hallgrimskirkja-church', title: 'Hallgrímskirkja Church', location: 'Reykjavík', lat: 64.1417, lon: -21.9266, category: 'Landmarks',
    description: 'The iconic concrete church whose design echoes Iceland’s basalt columns.' },
  { skyId: 2863, path: 'greater-reykjavik/reykjavik/perlan', title: 'Panorama of Reykjavík', location: 'Reykjavík', lat: 64.129, lon: -21.918, category: 'Cities',
    description: 'A sweeping panorama of the capital from Perlan.' },
  { skyId: 6007, path: 'greater-reykjavik/reykjavik/borg', title: 'Borg', location: 'Borg', lat: 64.06, lon: -20.83, category: 'Nature',
    description: 'A rural view across the South Iceland countryside.' },
  { skyId: 1881, path: 'sueurland/grindavik/geldingadalir-icelandic-volcano', title: 'Geldingadalir Volcano', location: 'Grindavík', lat: 63.889, lon: -22.27, category: 'Volcanoes',
    description: 'Site of the 2021 Fagradalsfjall eruption, the first on the Reykjanes Peninsula in 800 years.' },
  { skyId: 4792, path: 'sueurland/grindavik/orbjorn', title: 'Craters of Þorbjörn', location: 'Grindavík', lat: 63.866, lon: -22.43, category: 'Volcanoes',
    description: 'A view toward the Sundhnúkur crater row from Mount Þorbjörn.' },
  { skyId: 3224, path: 'sueurland/grindavik/langholl', title: 'Volcanic Eruption Watch', location: 'Grindavík', lat: 63.88, lon: -22.38, category: 'Volcanoes',
    description: 'A camera watching the recurring eruptions north of Grindavík.' },
  { skyId: 4461, path: 'southern-peninsula/grindavik/panorama', title: 'Grindavík Panorama', location: 'Grindavík', lat: 63.843, lon: -22.434, category: 'Cities',
    description: 'The fishing town of Grindavík, protected by huge lava barriers.' },
  { skyId: 4182, path: 'southern-peninsula/grindavik/north-reykjanes', title: 'North Reykjanes', location: 'Reykjanes Peninsula', lat: 63.9, lon: -22.45, category: 'Volcanoes',
    description: 'Looking north over the lava fields of the Reykjanes Peninsula.' },
  { skyId: 4181, path: 'southern-peninsula/grindavik/south-reykjanes', title: 'South Reykjanes', location: 'Reykjanes Peninsula', lat: 63.83, lon: -22.5, category: 'Nature',
    description: 'The rugged southern coast of the Reykjanes Peninsula.' },
  { skyId: 5741, path: 'northeastern-region/fjallabygge/port', title: 'Port of Fjallabyggð', location: 'Siglufjörður', lat: 66.15, lon: -18.91, category: 'Cities',
    description: 'The northernmost town harbour in Iceland, once the herring capital of the world.' },
] as SkySeed[]).map(({ path, ...c }) => ({
  ...base, ...c, id: `sky-${c.skyId}`, yt: '', kind: 'skyline' as const, source: 'SkylineWebcams', skyUrl: `${SKY}${path}.html`,
}));

/** Iceland YouTube live streams from the provided playlist. */
const icelandYouTube: Cam[] = ([
  { id: 'is-tokair-borg', yt: 'PcqbfVAKygo', source: 'TokAir Iceland', title: 'TokAir — Borg', location: 'Borg', lat: 64.07, lon: -20.85, category: 'Nature',
    description: 'A live sky and landscape camera from TokAir Iceland.' },
  { id: 'is-holar-1', yt: 'CZpXxi9Vlxo', source: 'TokAir Iceland', title: 'Hólar — Northern Lights / Midnight Sun', location: 'Hólar, Hjaltadalur', lat: 65.733, lon: -19.11, category: 'Nature',
    description: 'Aurora borealis in winter, midnight sun in summer, from the historic bishop’s seat at Hólar in North Iceland.' },
  { id: 'is-holar-2', yt: 'taeIAd5BgAI', source: 'TokAir Iceland', title: 'Hólar — Cam #2', location: 'Hólar, Hjaltadalur', lat: 65.735, lon: -19.1, category: 'Nature',
    description: 'A second Hólar view for spotting northern lights over Skagafjörður.' },
  { id: 'is-aurora-sky', yt: 'SGbnXt5lgm8', source: 'Geimfarinn', title: '4K Aurora Sky Camera', location: 'Iceland', lat: 64.3, lon: -21.0, category: 'Space',
    description: 'A real-time 4K all-sky camera for aurora borealis hunting.' },
  { id: 'is-grindavik-mosaic', yt: 'kXD4A9uFHcg', source: 'RÚV', title: 'Grindavík Mosaic', location: 'Grindavík', lat: 63.845, lon: -22.43, category: 'Volcanoes',
    description: 'Iceland’s national broadcaster RÚV shows several Grindavík cameras at once to monitor the eruption zone.' },
  { id: 'is-volcano-b', yt: 'E_4y8jgvSRA', source: 'AFAR TV', title: 'Iceland Volcano Cam B (4K)', location: 'Reykjanes Peninsula', lat: 63.88, lon: -22.3, category: 'Volcanoes',
    description: 'A 4K ultra-HD camera trained on the Reykjanes eruption sites.' },
  { id: 'is-vr180-c', yt: 'C_xt5Z9ZHxg', source: 'AFAR TV', title: 'Volcanic Landscape VR180° (Cam C)', location: 'Reykjanes Peninsula', lat: 63.87, lon: -22.33, category: 'Volcanoes',
    description: 'An immersive VR180 stream. Drag to look around the active volcanic landscape.' },
  { id: 'is-vr180-e', yt: '7DCu5ijvHSE', source: 'AFAR TV', title: 'Volcanic Landscape VR180° (Cam E)', location: 'Reykjanes Peninsula', lat: 63.875, lon: -22.36, category: 'Volcanoes',
    description: 'Another immersive VR180 view of Iceland’s volcanic terrain.' },
  { id: 'is-now', yt: 'n28qm4yrGhk', source: 'Earth Now', title: 'Iceland Now (Multi-cam)', location: 'Across Iceland', lat: 64.6, lon: -18.5, category: 'Nature',
    description: 'Iceland’s live cameras in rotation, from glaciers to towns.' },
] as (Seed & { id: string; yt: string })[]).map((c) => ({ ...base, ...c }));

export const icelandCams: Cam[] = [...liveFromIceland, ...skylineIceland, ...icelandYouTube];
