import { useState } from 'react';

const nav = [
  { label: 'Home', href: '#top' },
  { label: 'Network Cams', href: '#network' },
  { label: 'Aurora', href: '#aurora' },
  { label: 'Iceland', href: '#iceland' },
  { label: 'WebcamTaxi', href: '#webcamtaxi' },
  { label: 'Networks', href: '#networks' },
  { label: 'SkylineWebcams', href: '#skyline' },
    { label: 'Multi-View', href: '#multiview' },
  { label: 'Top Cams', href: '#top-cams' },
  { label: 'World Map', href: '#map' },
    { label: 'Business', href: '#business' },
];

export function Header({ search, setSearch }: { search: string; setSearch: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);

  return (
    <>
      <div className="bg-slate-950 text-[11px] text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span>The world's leading network of live streaming webcams</span>
          <div className="hidden gap-4 sm:flex">
            <a href="#business" className="hover:text-white">Construction Cameras</a>
            <a href="#footer" className="hover:text-white">Contact</a>
            <a href="#footer" className="hover:text-white">Help</a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1a2e]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-700 shadow-lg shadow-sky-900/50">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#0f1a2e]" />
            </span>
            <span className="text-xl font-black tracking-tight text-white">
              Globe<span className="text-sky-400">Cam</span>
            </span>
          </a>

          <nav className="ml-2 hidden items-center gap-0.5 xl:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="rounded px-2.5 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' });
                }}
                placeholder="Search cams…"
                className="w-48 rounded-full border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none xl:w-64"
              />
              <span className="absolute left-3 top-1.5 text-sm text-slate-500">⌕</span>
            </div>
            <button
              onClick={() => setSignIn(true)}
              className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-sky-400"
            >
              Sign In
            </button>
            <button
              className="rounded p-2 text-white xl:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-white/10 px-4 pb-4 xl:hidden">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cams…"
              className="my-3 w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white md:hidden"
            />
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {signIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSignIn(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              setSignIn(false);
            }}
            className="w-full max-w-sm rounded-xl bg-slate-900 p-6 shadow-2xl ring-1 ring-white/10"
          >
            <h3 className="mb-1 text-xl font-bold text-white">Welcome back</h3>
            <p className="mb-5 text-sm text-slate-400">Sign in to save favorites, snapshots and comments.</p>
            <input required type="email" placeholder="Email" className="mb-3 w-full rounded bg-slate-800 px-3 py-2 text-sm text-white" />
            <input required type="password" placeholder="Password" className="mb-4 w-full rounded bg-slate-800 px-3 py-2 text-sm text-white" />
            <button className="w-full rounded bg-sky-500 py-2 font-semibold text-white hover:bg-sky-400">Sign In</button>
            <p className="mt-4 text-center text-xs text-slate-500">
              New to GlobeCam? <span className="cursor-pointer text-sky-400">Create an account</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const cols = [
    { h: 'Explore', l: ['Network Cams', 'Top Cams', 'World Map', 'Hall of Fame', 'Timelapses'] },
    { h: 'Business', l: ['Construction Cameras', 'Time-Lapse Services', 'Tourism Partners', 'Advertise'] },
    { h: 'Company', l: ['About Us', 'Careers', 'Press', 'Contact'] },
    { h: 'Support', l: ['Help Center', 'Privacy Policy', 'Terms of Use', 'Accessibility'] },
  ];
  return (
    <footer id="footer" className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="text-2xl font-black text-white">
            Globe<span className="text-sky-400">Cam</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-400">
            Bringing the world to your screen with live HD webcams from iconic cities, beaches, landmarks and wild places.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex max-w-xs">
            <input placeholder="Your email" className="flex-1 rounded-l bg-slate-800 px-3 py-2 text-sm text-white" />
            <button className="rounded-r bg-sky-500 px-3 text-sm font-semibold text-white">Subscribe</button>
          </form>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{c.h}</h4>
            <ul className="space-y-2">
              {c.l.map((i) => (
                <li key={i}>
                  <a href="#top" className="text-sm text-slate-400 hover:text-sky-400">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} GlobeCam Network. Demo clone inspired by EarthCam. Live streams © their respective owners: EarthCam, Live from Iceland (IPCamLive), SkylineWebcams (official embeds), WebcamTaxi, Landhotel, tw.live, WorldCams.tv, WorldCam.eu, Aurora Webcams, WorldCam.tv, WorldViewStream, LiveBeaches, CamGuide, WhatsUpCams and the YouTube channels that broadcast each stream. Maps © OpenStreetMap, Esri, OpenTopoMap. Weather by Open-Meteo.
      </div>
    </footer>
  );
}
