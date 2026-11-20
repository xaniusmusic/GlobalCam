import { useMemo, useState } from 'react';
import { skylineImg, type Cam } from '../data';
import { skyCountries, skyEntries, skyRegions, skyToCam } from '../skyline';

const PAGE = 24;

export default function SkylineDirectory({
  onWatch, onMulti,
}: { onWatch: (c: Cam) => void; onMulti: (c: Cam) => void }) {
  const [q, setQ] = useState('');
  const [country, setCountry] = useState('Iceland');
  const [region, setRegion] = useState('All');
  const [limit, setLimit] = useState(PAGE);
  const [added, setAdded] = useState<number | null>(null);

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return skyEntries.filter(
      (e) =>
        (country === 'All countries' || e.country === country) &&
        (region === 'All' || e.region === region) &&
        (!s || `${e.title} ${e.place} ${e.country}`.toLowerCase().includes(s)),
    );
  }, [q, country, region]);

  const reset = () => setLimit(PAGE);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); reset(); if (e.target.value) setCountry('All countries'); }}
            placeholder={`Search ${skyEntries.length.toLocaleString()} SkylineWebcams… (e.g. Rome, volcano, beach)`}
            className="w-full rounded-full border border-white/10 bg-slate-800 py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
          />
          <span className="absolute left-3.5 top-2 text-slate-500">⌕</span>
        </div>
        <select
          value={region}
          onChange={(e) => { setRegion(e.target.value); setCountry('All countries'); reset(); }}
          className="rounded bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none"
        >
          <option value="All">All regions</option>
          {skyRegions.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select
          value={country}
          onChange={(e) => { setCountry(e.target.value); reset(); }}
          className="max-w-56 rounded bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none"
        >
          <option>All countries</option>
          {skyCountries
            .filter(([c]) => region === 'All' || skyEntries.some((e) => e.country === c && e.region === region))
            .map(([c, n]) => <option key={c} value={c}>{c} ({n})</option>)}
        </select>
      </div>

      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
        {['Iceland', 'Italy', 'Spain', 'Greece', 'United States', 'Japan', 'Norway', 'Brazil', 'South Africa', 'Peru', 'Australia', 'New Zealand', 'Israel', 'United Arab Emirates', 'Maldives', 'Zanzibar (Tanzania)', 'Namibia', 'Chile', 'Argentina'].map((c) => (
          <button
            key={c}
            onClick={() => { setCountry(c); setRegion('All'); setQ(''); reset(); }}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${country === c ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mb-3 text-xs text-slate-500">
        {list.length.toLocaleString()} live cams · images are SkylineWebcams’ official live embeds. Click “Watch” to view in the main player or open the full live video on skylinewebcams.com.
      </p>

      {list.length === 0 ? (
        <div className="rounded-lg bg-slate-900 p-10 text-center text-slate-400">No SkylineWebcams found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {list.slice(0, limit).map((e) => (
            <div key={e.e} className="group overflow-hidden rounded-lg bg-slate-900 ring-1 ring-white/10 transition hover:ring-sky-500/60">
              <button onClick={() => onWatch(skyToCam(e))} className="relative block aspect-video w-full overflow-hidden bg-slate-800">
                <img src={skylineImg(e.e)} alt={e.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
                </span>
                <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{e.country}</span>
              </button>
              <div className="p-2.5">
                <p className="truncate text-sm font-semibold text-white" title={e.title}>{e.title}</p>
                <p className="truncate text-[11px] text-slate-400">{e.place}</p>
                <div className="mt-2 flex gap-1.5">
                  <button onClick={() => onWatch(skyToCam(e))} className="flex-1 rounded bg-sky-500 py-1 text-[11px] font-semibold text-white hover:bg-sky-400">▶ Watch</button>
                  <button
                    onClick={() => { onMulti(skyToCam(e)); setAdded(e.e); setTimeout(() => setAdded(null), 1500); }}
                    title="Add to Multi-View"
                    className="rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-700"
                  >
                    {added === e.e ? '✓ Added' : '⊞ Multi'}
                  </button>
                  <a href={e.url} target="_blank" rel="noopener" title="Open live video on SkylineWebcams" className="rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-700">↗</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {list.length > limit && (
        <div className="mt-6 text-center">
          <button onClick={() => setLimit((l) => l + PAGE)} className="rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-700">
            Show more ({(list.length - limit).toLocaleString()} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
