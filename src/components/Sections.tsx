import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Cam, curatedCams as allCams, regions, staticThumb, camByYt } from '../data';
import { CamEmbed, CamThumb } from './CamMedia';
import { getCam } from '../skyline';
import { useClock, fmtTime } from '../utils/hooks';

export function CamCard({ cam, onSelect, active }: { cam: Cam; onSelect: (c: Cam) => void; active?: boolean }) {
  const now = useClock(30000);
  return (
    <button
      onClick={() => onSelect(cam)}
      className={`group overflow-hidden rounded-lg bg-slate-900 text-left ring-1 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-900/30 ${
        active ? 'ring-2 ring-sky-500' : 'ring-white/10'
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-800">
        <CamThumb cam={cam} className="h-full w-full transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
        </span>
        <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{cam.category}</span>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/90">
          <span>📍 {cam.country}</span>
          <span>🕒 {fmtTime(now, cam.tz)}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/90 text-xl text-white">▶</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="truncate font-semibold text-white group-hover:text-sky-400">{cam.title}</h3>
        <p className="truncate text-xs text-slate-400">{cam.location} · <span className="text-slate-500">{cam.source}</span></p>
      </div>
    </button>
  );
}

/** Real interactive map (Leaflet + CARTO dark tiles) with a marker per live cam. */
export function LiveMap({ cams, onSelect, activeId }: { cams: Cam[]; onSelect: (c: Cam) => void; activeId: string }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;

  useEffect(() => {
    if (!el.current || map.current) return;
    map.current = L.map(el.current, { scrollWheelZoom: false, worldCopyJump: true, preferCanvas: true }).setView([25, -20], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const lg = layer.current;
    if (!lg) return;
    lg.clearLayers();
    cams.forEach((c) => {
      const active = c.id === activeId;
      const curated = !c.via;
      const tip = `<div style="width:160px">${staticThumb(c) ? `<img src="${staticThumb(c)}" style="width:100%;border-radius:4px;margin-bottom:4px"/>` : ''}<b>${c.title}</b><br/><span style="opacity:.7">${c.location} · ${c.via ?? c.source}</span></div>`;
      const m = active
        ? L.marker([c.lat, c.lon], {
            icon: L.divIcon({ className: '', iconSize: [16, 16], iconAnchor: [8, 8], html: '<span class="cam-pin cam-pin-active"></span>' }),
            zIndexOffset: 1000,
          })
        : L.circleMarker([c.lat, c.lon], {
            radius: curated ? 5 : 3, color: '#fff', weight: curated ? 1.5 : 0.6,
            fillColor: curated ? '#ef4444' : '#f59e0b', fillOpacity: 0.9,
          });
      m.addTo(lg).bindTooltip(tip, { direction: 'top', offset: [0, -6] });
      m.on('click', () => selectRef.current(c));
    });
  }, [cams, activeId]);

  return (
    <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
      <div ref={el} className="h-[420px] w-full bg-[#0a1a33] sm:h-[480px]" />
      <div className="pointer-events-none absolute bottom-3 left-3 z-[400] rounded bg-black/60 px-3 py-1.5 text-xs text-slate-300 backdrop-blur">
        <span className="mr-3"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />Live camera</span>
        <span className="mr-3"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />Network cam</span>
        <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-sky-400" />Now watching</span>
      </div>
    </div>
  );
}

const PRESETS: { name: string; ids: string[] }[] = [
  { name: '🌍 World Tour', ids: ['is-fagradalsfjall', 'it-rialto', 'au-sydney-harbour', 'za-djuma'] },
  { name: '🇮🇸 Iceland', ids: ['lfi-heimaklettur', 'is-fagradalsfjall', 'sky-1330', 'lfi-thingvallavatn'] },
  { name: '🌋 Iceland Volcanoes', ids: ['is-hagafell', 'is-grindavik-mosaic', 'sky-4792', 'lfi-skjaldbreidur'] },
  { name: '🌌 Aurora', ids: ['is-holar-1', 'is-aurora-sky', 'is-aurora', 'sky-1330'] },
  { name: '🏝 Westman Islands', ids: ['lfi-heimaklettur', 'lfi-skipalyftan', 'lfi-dalurinn', 'lfi-framhaldsskoli'] },
  { name: '🇵🇹 Madeira (WebcamTaxi)', ids: ['wt-cr7', 'wt-paul-do-mar', 'wt-porto-moniz-pools', 'wt-funchal-sao-roque'] },
  { name: '🌌 Northern Lights', ids: ['iZrSCnhu5Kk', 'ccTVAhJU5lg', 'exshoGpNXZk', 'O52zDyxg5QI'].map((y) => camByYt(y)?.id).filter(Boolean) as string[] },
  { name: '🌠 Aurora Mix', ids: ['5A7JI6saAp4', 'wN5qtfbWd0Y', 'JZ38uyr-J6o', '4V29BHYRYtY'].map((y) => camByYt(y)?.id).filter(Boolean) as string[] },
  { name: '🌌 Aurora Webcams', ids: ['landhotel-aurora-1', ...allCams.filter((c) => c.via?.includes('Aurora Webcams')).slice(0, 3).map((c) => c.id)] },
  { name: '🇪🇺 Europe', ids: ['fr-eiffel', 'nl-dam', 'uk-london-bridge', 'ch-swiss-alps'] },
  { name: '🦁 Africa', ids: ['za-djuma', 'ke-ol-donyo', 'na-safarihoek', 'za-table-mountain'] },
  { name: '🌎 South America', ids: ['br-copacabana-6', 'ar-buenos-aires', 'cl-alma', 'pe-miraflores'] },
  { name: '🕌 Middle East', ids: ['il-western-wall', 'il-temple-park', 'om-muscat', 'il-bats'] },
  { name: '🦘 Oceania', ids: ['au-sydney-harbour', 'au-melbourne', 'nz-auckland', 'nz-albatross'] },
];

/** Option B: watch up to four real live streams at once. */
export const DEFAULT_SLOTS = ['lfi-heimaklettur', 'is-fagradalsfjall', 'sky-1330', 'lfi-thingvallavatn'];

export function MultiView({
  onExpand, slots, setSlots,
}: { onExpand: (c: Cam) => void; slots: string[]; setSlots: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [layout, setLayout] = useState<2 | 4>(4);
  const [audio, setAudio] = useState<number | null>(null);
  const shown = slots.slice(0, layout);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-400">Layout:</span>
        {[2, 4].map((n) => (
          <button
            key={n}
            onClick={() => setLayout(n as 2 | 4)}
            className={`rounded px-3 py-1 text-sm font-medium ${layout === n ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {n === 2 ? '▭▭ 2 cams' : '⊞ 4 cams'}
          </button>
        ))}
        <span className="ml-2 text-sm text-slate-400">Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => { setSlots(p.ids); setLayout(4); setAudio(null); }}
            className="rounded bg-slate-800 px-3 py-1 text-xs text-slate-200 hover:bg-slate-700"
          >
            {p.name}
          </button>
        ))}
        <span className="ml-auto hidden text-xs text-slate-500 lg:inline">Tip: click 🔈 on a screen to hear its audio</span>
      </div>
      <div className={`grid gap-2 ${layout === 4 ? 'sm:grid-cols-2' : 'md:grid-cols-2'}`}>
        {shown.map((id, i) => {
          const cam = getCam(id) ?? allCams[0];
          const inList = allCams.some((c) => c.id === cam.id);
          return (
            <div key={i} className="overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
              <div className="relative aspect-video">
                <CamEmbed key={cam.id + (audio === i ? '-a' : '')} cam={cam} mute={audio !== i} controls={false} compact />
                <span className="pointer-events-none absolute left-2 top-2 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">● LIVE</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 px-2 py-1.5">
                <select
                  value={cam.id}
                  onChange={(e) => setSlots((s) => s.map((x, j) => (j === i ? e.target.value : x)))}
                  className="min-w-0 flex-1 truncate rounded bg-slate-800 px-2 py-1 text-xs text-white focus:outline-none"
                >
                  {!inList && <option value={cam.id}>{cam.title} — {cam.country} (SkylineWebcams)</option>}
                  {regions.filter((k) => k !== 'All regions').map((k) => (
                    <optgroup key={k} label={k}>
                      {allCams.filter((c) => c.region === k).map((c) => (
                        <option key={c.id} value={c.id}>{c.title} — {c.location}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {(cam.kind ?? 'youtube') === 'youtube' && <button
                  onClick={() => setAudio(audio === i ? null : i)}
                  title={audio === i ? 'Mute' : 'Listen'}
                  className={`rounded px-2 py-1 text-xs ${audio === i ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {audio === i ? '🔊' : '🔈'}
                </button>}
                <button
                  onClick={() => onExpand(cam)}
                  title="Open in main player"
                  className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700"
                >
                  ⤢
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SectionTitle({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
          <span className="h-6 w-1 rounded bg-sky-500" />
          {title}
        </h2>
        {sub && <p className="mt-1 text-sm text-slate-400">{sub}</p>}
      </div>
      {right}
    </div>
  );
}
