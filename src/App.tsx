import { useMemo, useState } from 'react';
import { cams, curatedCams, categories, sources, regions, providerOf, auroraCams, type Cam } from './data';
import Player from './components/Player';
import { Header, Footer } from './components/Layout';
import { CamCard, MultiView, SectionTitle, DEFAULT_SLOTS } from './components/Sections';
import { CamThumb } from './components/CamMedia';
import SkylineDirectory from './components/SkylineDirectory';
import NetworkTabs from './components/NetworkTabs';
import { LiveCamMap, CamLocationMap } from './components/MapViews';
import { skyEntries } from './skyline';
import { useClock, fmtTime } from './utils/hooks';

const topPicks = ['lfi-heimaklettur', 'times-square-north', 'au-sydney-harbour', 'it-rialto', 'za-djuma', 'br-copacabana-6', 'nz-auckland', 'il-western-wall', 'fr-eiffel'];
const snapshotIds = ['lfi-skipalyftan', 'sky-28', 'is-aurora', 'no-geiranger', 'nz-albatross', 'za-table-mountain', 'cl-alma', 'fi-santa', 'nl-zaanse', 'ke-ol-donyo'];

export default function App() {
  const [active, setActive] = useState<Cam>(() => cams.find((c) => c.id === 'is-fagradalsfjall') ?? cams[0]);
  const [slots, setSlots] = useState<string[]>(DEFAULT_SLOTS);
  const [nextSlot, setNextSlot] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [auroraCountry, setAuroraCountry] = useState('All');
  const toMulti = (c: Cam) => {
    setSlots((s) => s.map((x, j) => (j === nextSlot ? c.id : x)));
    setToast(`⊞ “${c.title}” added to Multi-View screen ${nextSlot + 1}`);
    setNextSlot((n) => (n + 1) % 4);
    setTimeout(() => setToast(null), 2500);
  };
  const [cat, setCat] = useState<(typeof categories)[number]>('All');
  const [search, setSearch] = useState('');
  const [source, setSource] = useState('All sources');
  const [region, setRegion] = useState<(typeof regions)[number]>('All regions');
  const [limit, setLimit] = useState(16);
  const [snapKey, setSnapKey] = useState(Date.now());
  const now = useClock(30000);
  const [comments, setComments] = useState<Record<string, { u: string; t: string }[]>>({
    'times-square-north': [
      { u: 'traveler88', t: 'Watching from Tokyo, so cool to see NYC live!' },
      { u: 'jenny_k', t: 'I can see my old office building 😄' },
    ],
  });
  const [draft, setDraft] = useState('');

  const select = (c: Cam) => {
    setActive(c);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return cams.filter(
      (c) =>
        (cat === 'All' || c.category === cat) &&
        (source === 'All sources' || providerOf(c) === source) &&
        (region === 'All regions' || c.region === region) &&
        (!q || [c.title, c.location, c.country, c.category, c.source ?? '', c.via ?? '', c.region ?? ''].some((s) => s.toLowerCase().includes(q))),
    );
  }, [cat, search, source, region]);

  const featured = ['is-fagradalsfjall', 'au-sydney-harbour', 'it-rialto', 'ke-ol-donyo', 'br-copacabana-6', 'nz-penguins', 'il-western-wall', 'shibuya']
    .filter((id) => id !== active.id)
    .slice(0, 7)
    .map((id) => cams.find((c) => c.id === id)!);
  const top = topPicks.map((id) => cams.find((c) => c.id === id)!);
  const countries = new Set(cams.map((c) => c.country)).size;
  const camComments = comments[active.id] || [];

  return (
    <div id="top" className="min-h-screen bg-[#0b1220] text-slate-200">
      <Header search={search} setSearch={setSearch} />

      {/* ticker */}
      <div className="overflow-hidden border-b border-white/5 bg-sky-600/10 py-1.5">
        <div className="flex w-max gap-10 whitespace-nowrap text-xs text-sky-200" style={{ animation: 'marquee 200s linear infinite' }}>
          {[...curatedCams, ...curatedCams].map((c, i) => (
            <button key={i} onClick={() => select(c)} className="hover:text-white">
              <span className="text-red-400">●</span> LIVE: {c.title} — {fmtTime(now, c.tz)}
            </button>
          ))}
        </div>
      </div>

      {/* Option A: main live player */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <Player cam={active} />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <CamLocationMap cam={active} />
              <div className="rounded-lg bg-slate-900 p-4 ring-1 ring-white/10">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">About this camera</h3>
                <p className="text-sm leading-relaxed text-slate-300">{active.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded bg-slate-800 px-2 py-1">📍 {active.country}</span>
                  <span className="rounded bg-slate-800 px-2 py-1">🏷 {active.category}</span>
                  <span className="rounded bg-slate-800 px-2 py-1">🎥 Live via {active.source}</span>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-slate-900 p-4 ring-1 ring-white/10 md:col-span-2">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">
                  Comments <span className="text-slate-500">({camComments.length})</span>
                </h3>
                <div className="mb-3 max-h-28 flex-1 space-y-2 overflow-y-auto text-sm">
                  {camComments.length === 0 && <p className="text-slate-500">Be the first to comment on this cam!</p>}
                  {camComments.map((c, i) => (
                    <p key={i}>
                      <span className="font-semibold text-sky-300">{c.u}:</span> <span className="text-slate-300">{c.t}</span>
                    </p>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!draft.trim()) return;
                    setComments((p) => ({ ...p, [active.id]: [...(p[active.id] || []), { u: 'you', t: draft.trim() }] }));
                    setDraft('');
                  }}
                  className="flex"
                >
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Say something…"
                    className="flex-1 rounded-l bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <button className="rounded-r bg-sky-500 px-4 text-sm font-semibold text-white hover:bg-sky-400">Send</button>
                </form>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg bg-slate-900 ring-1 ring-white/10">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <h3 className="font-bold text-white">Featured Cams</h3>
                <a href="#network" className="text-xs text-sky-400 hover:underline">View all</a>
              </div>
              <ul className="divide-y divide-white/5">
                {featured.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => select(c)} className="flex w-full gap-3 p-3 text-left hover:bg-white/5">
                      <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded bg-slate-800">
                        <CamThumb cam={c} className="h-full w-full" />
                        <span className="absolute left-1 top-1 rounded bg-red-600 px-1 text-[8px] font-bold text-white">LIVE</span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{c.title}</p>
                        <p className="truncate text-xs text-slate-400">{c.location}</p>
                        <p className="text-[11px] text-slate-500">🕒 {fmtTime(now, c.tz)}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-sky-600 to-blue-800 p-5 text-white shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-100">Network</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div><p className="text-2xl font-black">{cams.length}</p><p className="text-xs text-sky-100">Live streams</p></div>
                <div><p className="text-2xl font-black">{countries}</p><p className="text-xs text-sky-100">Countries</p></div>
                <div><p className="text-2xl font-black">HD</p><p className="text-xs text-sky-100">Up to 4K</p></div>
                <div><p className="text-2xl font-black">24/7</p><p className="text-xs text-sky-100">Streaming</p></div>
              </div>
              <a href="#multiview" className="mt-4 block rounded bg-white/15 py-2 text-center text-sm font-semibold hover:bg-white/25">
                ⊞ Open Multi-View
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Network cams */}
      <section id="network" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-10">
        <SectionTitle
          title="Network Cams"
          sub={`${filtered.length} real live streams from Iceland, Europe, Africa, South America, the Middle East, Australia, New Zealand and beyond. Click any cam to watch.`}
          right={
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCat(c); setLimit(16); }}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    cat === c ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          }
        />
        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => { setRegion(r); setLimit(16); }}
              className={`whitespace-nowrap rounded border px-3 py-1 text-xs font-medium transition ${
                region === r ? 'border-amber-400 bg-amber-400 text-black' : 'border-white/10 text-slate-300 hover:border-white/30'
              }`}
            >
              {r === 'All regions' ? '🌍 All regions' : r}
              {r !== 'All regions' && <span className="ml-1 opacity-60">{cams.filter((c) => c.region === r).length}</span>}
            </button>
          ))}
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-400">Source:</span>
          <select
            value={source}
            onChange={(e) => { setSource(e.target.value); setLimit(16); }}
            className="rounded bg-slate-800 px-3 py-1.5 text-sm text-white focus:outline-none"
          >
            {['All sources', ...sources].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="ml-auto text-xs text-slate-500">{filtered.length} cams</span>
        </div>
        {search && (
          <p className="mb-4 text-sm text-slate-400">
            Showing results for “<span className="text-white">{search}</span>” ·{' '}
            <button onClick={() => setSearch('')} className="text-sky-400 hover:underline">clear</button>
          </p>
        )}
        {filtered.length === 0 ? (
          <div className="rounded-lg bg-slate-900 p-10 text-center text-slate-400">No cameras found. Try another search.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.slice(0, limit).map((c) => (
              <CamCard key={c.id} cam={c} onSelect={select} active={c.id === active.id} />
            ))}
          </div>
        )}
        {filtered.length > limit && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setLimit((l) => l + 16)}
              className="rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Show more cams ({filtered.length - limit} remaining)
            </button>
          </div>
        )}
      </section>

      {/* Northern Lights */}
      <section id="aurora" className="scroll-mt-20 border-y border-emerald-500/10 bg-gradient-to-b from-[#06231f] via-[#0b1a2e] to-[#0b1220] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="🌌 Northern Lights Live"
            sub={`${auroraCams.length} live aurora & night-sky cameras from ${new Set(auroraCams.map((c) => c.country)).size} countries. Best viewed after dark on clear nights, roughly September to April in the north.`}
            right={
              <button
                onClick={() => { setSlots(['iZrSCnhu5Kk', 'ccTVAhJU5lg', 'exshoGpNXZk', 'O52zDyxg5QI'].map((y) => cams.find((c) => c.yt === y)?.id).filter(Boolean) as string[]); document.getElementById('multiview')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="rounded bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
              >
                ⊞ Watch 4 aurora cams in Multi-View
              </button>
            }
          />
          <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
            {['All', ...Array.from(new Set(auroraCams.map((c) => c.country))).sort()].map((c) => (
              <button
                key={c}
                onClick={() => setAuroraCountry(c)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${auroraCountry === c ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {c === 'All' ? '🌍 All countries' : c}
                {c !== 'All' && <span className="ml-1 opacity-60">{auroraCams.filter((x) => x.country === c).length}</span>}
              </button>
            ))}
          </div>
          <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {auroraCams
              .filter((c) => auroraCountry === 'All' || c.country === auroraCountry)
              .map((c) => (
                <div key={c.id} className="w-60 shrink-0 snap-start">
                  <CamCard cam={c} onSelect={select} active={c.id === active.id} />
                  <button onClick={() => toMulti(c)} className="mt-1 w-full rounded bg-slate-800/70 py-1 text-[11px] text-slate-300 hover:bg-slate-700">⊞ Add to Multi-View</button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Iceland spotlight */}
      <section id="iceland" className="scroll-mt-20 border-y border-white/5 bg-gradient-to-b from-[#0d1b33] to-[#0b1220] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="🇮🇸 Iceland Live"
            sub={`${cams.filter((c) => c.region === 'Iceland').length} real live cameras: volcanoes, glaciers, northern lights and towns`}
            right={
              <button
                onClick={() => { setSlots(['lfi-heimaklettur', 'is-fagradalsfjall', 'sky-1330', 'lfi-thingvallavatn']); document.getElementById('multiview')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="rounded bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400"
              >
                ⊞ Watch Iceland in Multi-View
              </button>
            }
          />
          {(
            [
              ['Live from Iceland', 'livefromiceland.is + landhotel.is · IPCamLive live video', 'https://livefromiceland.is/'],
              ['SkylineWebcams', 'skylinewebcams.com · official live embeds', 'https://www.skylinewebcams.com/en/webcam/iceland.html'],
              ['YouTube', 'Iceland live streams on YouTube', 'https://www.youtube.com/playlist?list=PLHETx79qoof0-YRALE3TAeIlqJuE7QAdc'],
            ] as const
          ).map(([group, label, href]) => {
            const list = cams.filter(
              (c) => c.region === 'Iceland' && (group === 'YouTube' ? (c.kind ?? 'youtube') === 'youtube' : group === 'Live from Iceland' ? c.kind === 'ipcam' : c.source === group),
            );
            return (
              <div key={group} className="mb-8 last:mb-0">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-300">
                    {group} <span className="ml-1 normal-case tracking-normal text-slate-500">· {label} · {list.length} cams</span>
                  </h3>
                  <a href={href} target="_blank" rel="noopener" className="text-xs text-slate-400 hover:text-sky-400">Visit source ↗</a>
                </div>
                <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
                  {list.map((c) => (
                    <div key={c.id} className="w-60 shrink-0 snap-start">
                      <CamCard cam={c} onSelect={select} active={c.id === active.id} />
                      <button onClick={() => toMulti(c)} className="mt-1 w-full rounded bg-slate-800/70 py-1 text-[11px] text-slate-300 hover:bg-slate-700">⊞ Add to Multi-View</button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explore by region */}
      <section id="regions" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-10">
        <SectionTitle title="Explore by Region" sub="Live cameras from Iceland to New Zealand" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ['Iceland', 'is-perlan'], ['Europe', 'it-grand-canal'], ['Africa', 'za-djuma'], ['South America', 'br-copacabana-3'],
              ['Middle East', 'il-western-wall'], ['Australia', 'au-sydney-ships'], ['New Zealand', 'nz-auckland'], ['North America', 'times-square-north'],
            ] as const
          ).map(([r, id]) => {
            const cam = cams.find((c) => c.id === id)!;
            return (
              <button
                key={r}
                onClick={() => { setRegion(r); setCat('All'); setLimit(16); document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-800 text-left ring-1 ring-white/10"
              >
                <CamThumb cam={cam} className="h-full w-full transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="font-bold text-white">{r}</p>
                  <p className="text-xs text-slate-300">{cams.filter((c) => c.region === r).length} live cams →</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Option B: multi-view */}
      <section id="multiview" className="scroll-mt-20 bg-slate-950/60 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title="Multi-View" sub="Watch several real live streams side by side. Pick any cam from the network for each screen." />
          <MultiView onExpand={select} slots={slots} setSlots={setSlots} />
        </div>
      </section>

      {/* WebcamTaxi */}
      <section id="webcamtaxi" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12">
        <SectionTitle
          title="🚕 WebcamTaxi Live"
          sub={`${cams.filter((c) => c.pageUrl === 'https://www.webcamtaxi.com/en/' || c.source === 'WebcamTaxi').length} live streams from WebcamTaxi and its partner channels: Madeira, Porto, Curaçao, Las Vegas and more`}
          right={
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setSlots(['wt-cr7', 'wt-paul-do-mar', 'wt-porto-moniz-pools', 'wt-funchal-sao-roque']); document.getElementById('multiview')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="rounded bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300"
              >
                ⊞ Watch Madeira in Multi-View
              </button>
              <a href="https://www.webcamtaxi.com/en/" target="_blank" rel="noopener" className="text-xs text-slate-400 hover:text-sky-400">webcamtaxi.com ↗</a>
            </div>
          }
        />
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
          {cams
            .filter((c) => c.pageUrl === 'https://www.webcamtaxi.com/en/' || c.source === 'WebcamTaxi')
            .map((c) => (
              <div key={c.id} className="w-60 shrink-0 snap-start">
                <CamCard cam={c} onSelect={select} active={c.id === active.id} />
                <button onClick={() => toMulti(c)} className="mt-1 w-full rounded bg-slate-800/70 py-1 text-[11px] text-slate-300 hover:bg-slate-700">⊞ Add to Multi-View</button>
              </div>
            ))}
        </div>
      </section>

      {/* Aggregator networks */}
      <section id="networks" className="scroll-mt-20 bg-slate-950/60 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="Live Camera Networks"
            sub={`${cams.filter((c) => c.via).length.toLocaleString()} real live streams collected from tw.live, WorldCams.tv, WorldCam.eu, Aurora Webcams, WorldCam.tv, WorldViewStream, LiveBeaches, CamGuide and WhatsUpCams`}
          />
          <NetworkTabs onSelect={select} onMulti={toMulti} activeId={active.id} />
        </div>
      </section>

      {/* SkylineWebcams directory */}
      <section id="skyline" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12">
        <SectionTitle
          title="SkylineWebcams Worldwide"
          sub={`Every active camera on skylinewebcams.com: ${skyEntries.length.toLocaleString()} live cams in ${new Set(skyEntries.map((e) => e.country)).size} countries`}
          right={<a href="https://www.skylinewebcams.com/" target="_blank" rel="noopener" className="text-xs text-slate-400 hover:text-sky-400">skylinewebcams.com ↗</a>}
        />
        <SkylineDirectory onWatch={select} onMulti={toMulti} />
      </section>

      {/* Top cams */}
      <section id="top-cams" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12">
        <SectionTitle title="Top Cams" sub="Our most popular live views" />
        <div className="grid gap-4 md:grid-cols-4">
          {top.map((c, i) => (
            <button
              key={c.id}
              onClick={() => select(c)}
              className={`group relative min-h-40 overflow-hidden rounded-lg bg-slate-800 text-left ring-1 ring-white/10 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <CamThumb cam={c} hi={i === 0} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-black text-white shadow">{i + 1}</span>
              <div className="absolute bottom-3 left-3 right-3">
                <p className={`font-bold text-white ${i === 0 ? 'text-2xl' : 'text-sm'}`}>{c.title}</p>
                <p className="text-xs text-slate-300">{c.location}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Map */}
      <section id="map" className="scroll-mt-20 bg-slate-950/60 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title="Live Cam Map" sub="Free interactive map · switch Dark / Streets / Satellite / Terrain · click a marker to preview and watch live" />
          <LiveCamMap cams={cams.filter((c) => !c.approx)} onSelect={select} activeId={active.id} />
        </div>
      </section>

      {/* Live snapshots */}
      <section id="hof" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12">
        <SectionTitle
          title="Live Snapshots"
          sub="The latest frames captured from around the network"
          right={
            <button onClick={() => setSnapKey(Date.now())} className="rounded bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700">
              ↻ Refresh frames
            </button>
          }
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {snapshotIds.map((id) => {
            const cam = cams.find((c) => c.id === id)!;
            return (
              <button key={id} onClick={() => select(cam)} className="group relative aspect-video overflow-hidden rounded-lg bg-slate-800 text-left">
                <CamThumb cam={cam} refreshKey={snapKey} className="h-full w-full transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80 transition group-hover:opacity-100" />
                <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white">{fmtTime(now, cam.tz)}</span>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-semibold text-white">{cam.title}</p>
                  <p className="text-xs text-slate-300">{cam.location}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Business */}
      <section id="business" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-14">
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-[#12274a] ring-1 ring-white/10 lg:grid-cols-2">
          <div className="p-8 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">For Business</p>
            <h2 className="mt-2 text-3xl font-black text-white">Construction Cameras & Time-Lapse</h2>
            <p className="mt-4 text-slate-300">
              Monitor job sites remotely with gigapixel imaging, 4K live streaming and time-lapse movies. Trusted by builders,
              architects and developers worldwide.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-slate-300">
              {['4K live streaming', 'Gigapixel panoramas', 'Time-lapse movies', 'Secure cloud archive', 'Drone integration', '24/7 support'].map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="text-sky-400">✓</span> {f}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#footer" className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-black hover:bg-amber-300">Request a Quote</a>
              <a href="#footer" className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Learn More</a>
            </div>
          </div>
          <div className="relative h-full min-h-64">
            <video
              src="https://videos.pexels.com/video-files/34665162/14693594_3840_2160_24fps.mp4"
              autoPlay muted loop playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12274a] to-transparent" />
            <span className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 font-mono text-xs text-white">TIME-LAPSE · 24H</span>
          </div>
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm text-white shadow-2xl ring-1 ring-sky-500/50">
          {toast}{' '}
          <a href="#multiview" className="ml-2 font-semibold text-sky-400">View →</a>
        </div>
      )}

      <Footer />
    </div>
  );
}
