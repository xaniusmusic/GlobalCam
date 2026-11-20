import { useMemo, useState } from 'react';
import { cams, type Cam } from '../data';
import { CamCard } from './Sections';

const NETWORKS = [
  { key: 'tw.live', label: 'tw.live', url: 'https://tw.live/en/' },
  { key: 'WorldCams.tv', label: 'WorldCams.tv', url: 'https://worldcams.tv/' },
  { key: 'WorldCam.eu', label: 'WorldCam.eu', url: 'https://worldcam.eu/' },
  { key: 'Aurora Webcams', label: 'Aurora Webcams', url: 'https://www.aurorawebcams.com/' },
  { key: 'WorldCam.tv', label: 'WorldCam.tv', url: 'https://worldcam.tv/' },
  { key: 'WorldViewStream', label: 'WorldViewStream', url: 'https://worldviewstream.com/' },
  { key: 'LiveBeaches', label: 'LiveBeaches', url: 'https://www.livebeaches.com/' },
  { key: 'CamGuide', label: 'CamGuide', url: 'https://camguide.net/' },
  { key: 'WhatsUpCams', label: 'WhatsUpCams', url: 'https://www.whatsupcams.com/en/' },
] as const;

const PAGE = 16;

export default function NetworkTabs({
  onSelect, onMulti, activeId,
}: { onSelect: (c: Cam) => void; onMulti: (c: Cam) => void; activeId: string }) {
  const [tab, setTab] = useState<string>('WorldCam.tv');
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('All');
  const [limit, setLimit] = useState(PAGE);

  const inTab = useMemo(() => cams.filter((c) => c.via?.split(' + ').includes(tab)), [tab]);
  const regionsHere = useMemo(() => Array.from(new Set(inTab.map((c) => c.region!))).sort(), [inTab]);
  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return inTab.filter(
      (c) =>
        (region === 'All' || c.region === region) &&
        (!s || `${c.title} ${c.location} ${c.country} ${c.source} ${c.category}`.toLowerCase().includes(s)),
    );
  }, [inTab, q, region]);

  const net = NETWORKS.find((n) => n.key === tab)!;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {NETWORKS.map((n) => {
          const count = cams.filter((c) => c.via?.split(' + ').includes(n.key)).length;
          return (
            <button
              key={n.key}
              onClick={() => { setTab(n.key); setRegion('All'); setLimit(PAGE); }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                tab === n.key ? 'bg-sky-500 text-white shadow-lg shadow-sky-900/40' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {n.label} <span className="ml-1 rounded bg-black/25 px-1.5 text-xs">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }}
          placeholder={`Search ${inTab.length} live cams on ${net.label}…`}
          className="min-w-56 flex-1 rounded-full border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
        />
        <select
          value={region}
          onChange={(e) => { setRegion(e.target.value); setLimit(PAGE); }}
          className="rounded bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none"
        >
          <option value="All">All regions</option>
          {regionsHere.map((r) => <option key={r}>{r}</option>)}
        </select>
        <a href={net.url} target="_blank" rel="noopener" className="text-xs text-slate-400 hover:text-sky-400">Visit {net.label} ↗</a>
      </div>

      {list.length === 0 ? (
        <div className="rounded-lg bg-slate-900 p-10 text-center text-slate-400">No cameras match.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.slice(0, limit).map((c) => (
            <div key={c.id}>
              <CamCard cam={c} onSelect={onSelect} active={c.id === activeId} />
              <button onClick={() => onMulti(c)} className="mt-1 w-full rounded bg-slate-800/70 py-1 text-[11px] text-slate-300 hover:bg-slate-700">
                ⊞ Add to Multi-View
              </button>
            </div>
          ))}
        </div>
      )}
      {list.length > limit && (
        <div className="mt-6 text-center">
          <button onClick={() => setLimit((l) => l + PAGE)} className="rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-700">
            Show more ({list.length - limit} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
