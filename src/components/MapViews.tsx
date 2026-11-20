import { useEffect, useRef, useState } from 'react';
import L from '../leafletGlobal';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { type Cam, staticThumb } from '../data';

/* ------------------------------------------------------------------ */
/* Free, key-less tile layers                                          */
/* ------------------------------------------------------------------ */
type BaseKey = 'dark' | 'streets' | 'satellite' | 'terrain';

const BASES: Record<BaseKey, { label: string; url: string; attribution: string; maxZoom: number; subdomains?: string; dark?: boolean }> = {
  dark: {
    label: 'Dark',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    subdomains: 'abc',
    dark: true, // OSM tiles recolored dark with a CSS filter — no API key needed
  },
  streets: {
    label: 'Streets',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    subdomains: 'abc',
  },
  satellite: {
    label: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 19,
  },
  terrain: {
    label: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors, SRTM &copy; OpenTopoMap (CC-BY-SA)',
    maxZoom: 17,
    subdomains: 'abc',
  },
};

const tile = (k: BaseKey) => {
  const b = BASES[k];
  return L.tileLayer(b.url, { attribution: b.attribution, maxZoom: b.maxZoom, ...(b.subdomains ? { subdomains: b.subdomains } : {}) });
};

/** Cluster plugin is imported statically right after the global `L` is set (see ../leafletGlobal). */
const loadCluster = () => Promise.resolve();

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/* ------------------------------------------------------------------ */
/* Live Cam Map (world map with every cam)                             */
/* ------------------------------------------------------------------ */
export function LiveCamMap({ cams, onSelect, activeId }: { cams: Cam[]; onSelect: (c: Cam) => void; activeId: string }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const base = useRef<L.TileLayer | null>(null);
  const group = useRef<L.MarkerClusterGroup | null>(null);
  const active = useRef<L.Marker | null>(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;
  const [layer, setLayer] = useState<BaseKey>('dark');
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(0);

  // init
  useEffect(() => {
    if (!el.current || map.current) return;
    map.current = L.map(el.current, { scrollWheelZoom: false, worldCopyJump: true, minZoom: 2, preferCanvas: true }).setView([30, 5], 2);
    base.current = tile('dark').addTo(map.current);
    L.DomUtil.addClass(map.current.getPane('tilePane')!, 'dark-tiles');
    // enable wheel zoom only after the user clicks the map
    map.current.on('click', () => map.current?.scrollWheelZoom.enable());
    map.current.on('mouseout', () => map.current?.scrollWheelZoom.disable());
    loadCluster().then(() => setReady(true));
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // base layer switch
  useEffect(() => {
    if (!map.current) return;
    base.current?.remove();
    base.current = tile(layer).addTo(map.current);
    const pane = map.current.getPane('tilePane')!;
    if (BASES[layer].dark) L.DomUtil.addClass(pane, 'dark-tiles');
    else L.DomUtil.removeClass(pane, 'dark-tiles');
  }, [layer]);

  // markers (clustered)
  useEffect(() => {
    if (!ready || !map.current) return;
    group.current?.remove();
    const g = L.markerClusterGroup({
      chunkedLoading: true,
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (cluster) => {
        const n = cluster.getChildCount();
        const size = n < 10 ? 30 : n < 100 ? 36 : n < 1000 ? 44 : 52;
        return L.divIcon({
          html: `<div class="cam-cluster" style="width:${size}px;height:${size}px">${n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n}</div>`,
          className: '',
          iconSize: [size, size],
        });
      },
    });
    const markers = cams.map((c) => {
      const curated = !c.via;
      const m = L.circleMarker([c.lat, c.lon], {
        radius: curated ? 6 : 4.5,
        color: '#ffffff',
        weight: curated ? 1.5 : 0.8,
        fillColor: curated ? '#ef4444' : '#f59e0b',
        fillOpacity: 0.95,
      }) as unknown as L.Marker; // circle markers are supported by markercluster at runtime
      (m as unknown as L.CircleMarker).bindTooltip(esc(c.title), { direction: 'top', offset: [0, -6] });
      (m as unknown as L.CircleMarker).bindPopup(() => popupNode(c, () => selectRef.current(c)), { minWidth: 230, maxWidth: 240 });
      return m;
    });
    g.addLayers(markers);
    g.addTo(map.current);
    group.current = g;
    setCount(cams.length);
  }, [ready, cams]);

  // highlight active cam
  useEffect(() => {
    if (!map.current) return;
    active.current?.remove();
    const c = cams.find((x) => x.id === activeId);
    if (!c) return;
    active.current = L.marker([c.lat, c.lon], {
      icon: L.divIcon({ className: '', iconSize: [18, 18], iconAnchor: [9, 9], html: '<span class="cam-pin cam-pin-active"></span>' }),
      zIndexOffset: 2000,
      title: `Now watching: ${c.title}`,
    }).addTo(map.current);
  }, [activeId, cams]);

  const centerActive = () => {
    const c = cams.find((x) => x.id === activeId);
    if (c && map.current) map.current.flyTo([c.lat, c.lon], Math.max(map.current.getZoom(), 9), { duration: 1.2 });
  };
  const locateMe = () => {
    navigator.geolocation?.getCurrentPosition(
      (p) => map.current?.flyTo([p.coords.latitude, p.coords.longitude], 8, { duration: 1.2 }),
      () => {},
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
      <div ref={el} className="h-[440px] w-full bg-[#0a1a33] sm:h-[540px]" />

      {/* layer switcher */}
      <div className="absolute right-3 top-3 z-[500] flex overflow-hidden rounded-lg bg-slate-900/90 text-xs shadow-lg ring-1 ring-white/10 backdrop-blur">
        {(Object.keys(BASES) as BaseKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setLayer(k)}
            className={`px-3 py-1.5 font-medium transition ${layer === k ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/10'}`}
          >
            {BASES[k].label}
          </button>
        ))}
      </div>

      {/* actions */}
      <div className="absolute left-3 top-20 z-[500] flex flex-col gap-1.5">
        <button onClick={centerActive} title="Center on the cam you're watching" className="rounded-lg bg-slate-900/90 px-2.5 py-1.5 text-xs text-white shadow ring-1 ring-white/10 hover:bg-slate-800">
          🎯 Now watching
        </button>
        <button onClick={locateMe} title="Show cams near me" className="rounded-lg bg-slate-900/90 px-2.5 py-1.5 text-xs text-white shadow ring-1 ring-white/10 hover:bg-slate-800">
          📍 Near me
        </button>
      </div>

      {!ready && (
        <div className="pointer-events-none absolute inset-0 z-[400] flex items-center justify-center text-xs uppercase tracking-widest text-slate-400">
          Loading cameras…
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded bg-black/60 px-3 py-1.5 text-xs text-slate-300 backdrop-blur">
        <span className="mr-3">{count.toLocaleString()} cams</span>
        <span className="mr-3"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />Featured</span>
        <span className="mr-3"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />Network</span>
        <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-sky-400" />Now watching</span>
      </div>
    </div>
  );
}

function popupNode(c: Cam, onWatch: () => void) {
  const thumb = staticThumb(c);
  const node = document.createElement('div');
  node.style.cssText = 'width:220px;font-family:system-ui,sans-serif';
  node.innerHTML = `${thumb ? `<img src="${esc(thumb)}" style="width:100%;height:124px;object-fit:cover;border-radius:6px;margin-bottom:6px;background:#1e293b"/>` : ''}
    <div style="font-weight:700;font-size:13px;line-height:1.25;color:#f1f5f9">${esc(c.title)}</div>
    <div style="font-size:11px;color:#94a3b8;margin:2px 0 8px">${esc(c.location)}, ${esc(c.country)} · ${esc(c.via ?? c.source ?? '')}</div>`;
  const btn = document.createElement('button');
  btn.textContent = '▶ Watch live';
  btn.style.cssText = 'width:100%;background:#0ea5e9;color:#fff;border:0;border-radius:6px;padding:6px 0;font-weight:600;cursor:pointer';
  btn.onclick = onWatch;
  node.appendChild(btn);
  return node;
}

/* ------------------------------------------------------------------ */
/* Option A: small location map for the cam being watched              */
/* ------------------------------------------------------------------ */
export function CamLocationMap({ cam }: { cam: Cam }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const base = useRef<L.TileLayer | null>(null);
  const pin = useRef<L.Marker | null>(null);
  const [layer, setLayer] = useState<Exclude<BaseKey, 'dark'>>('streets');

  useEffect(() => {
    if (!el.current || map.current) return;
    map.current = L.map(el.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView([cam.lat, cam.lon], 12);
    base.current = tile('streets').addTo(map.current);
    map.current.on('click', () => map.current?.scrollWheelZoom.enable());
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!map.current) return;
    base.current?.remove();
    base.current = tile(layer).addTo(map.current);
  }, [layer]);

  useEffect(() => {
    if (!map.current) return;
    const zoom = cam.country === 'Space' ? 2 : cam.approx ? 5 : 14;
    map.current.setView([cam.lat, cam.lon], Math.min(zoom, BASES[layer].maxZoom), { animate: true });
    pin.current?.remove();
    pin.current = L.marker([cam.lat, cam.lon], {
      icon: L.divIcon({ className: '', iconSize: [18, 18], iconAnchor: [9, 9], html: '<span class="cam-pin cam-pin-active"></span>' }),
      title: cam.title,
    }).addTo(map.current);
    // container may have resized (layout changes) – make sure tiles fill it
    setTimeout(() => map.current?.invalidateSize(), 50);
  }, [cam.id, cam.lat, cam.lon, cam.approx, cam.country, cam.title, layer]);

  const osm = `https://www.openstreetmap.org/?mlat=${cam.lat}&mlon=${cam.lon}#map=${cam.approx ? 6 : 15}/${cam.lat}/${cam.lon}`;

  return (
    <div className="overflow-hidden rounded-lg bg-slate-900 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400">📍 Camera location</h3>
        <div className="flex overflow-hidden rounded bg-slate-800 text-[11px]">
          {(['streets', 'satellite', 'terrain'] as const).map((k) => (
            <button key={k} onClick={() => setLayer(k)} className={`px-2 py-1 ${layer === k ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/10'}`}>
              {BASES[k].label}
            </button>
          ))}
        </div>
      </div>
      <div ref={el} className="h-56 w-full bg-slate-800" />
      <p className="flex items-center justify-between gap-2 px-4 py-2 text-[11px] text-slate-500">
        <span className="truncate">
          {cam.location}, {cam.country}
          {cam.approx ? ' · approximate location' : ` · ${cam.lat.toFixed(3)}, ${cam.lon.toFixed(3)}`}
        </span>
        <a href={osm} target="_blank" rel="noopener" className="shrink-0 text-slate-400 hover:text-sky-400">Open map ↗</a>
      </p>
    </div>
  );
}
