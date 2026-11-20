import { useEffect, useRef, useState } from 'react';
import { type Cam, camKind, sourceLabel, sourceUrl, staticThumb } from '../data';
import { CamEmbed, useCamThumb } from './CamMedia';
import { useClock, fmtTime, useWeather } from '../utils/hooks';

/** Send a command to a YouTube iframe (requires enablejsapi=1). */
export function ytCommand(iframe: HTMLIFrameElement | null, func: string, args: unknown[] = []) {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
}

export default function Player({ cam }: { cam: Cam }) {
  const now = useClock();
  const wx = useWeather(cam.lat, cam.lon);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const kind = camKind(cam);
  const isYT = kind === 'youtube';
  const frame = useCamThumb(cam, true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setPlaying(true);
    setMuted(true);
  }, [cam.id]);

  const notify = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2200);
  };

  const togglePlay = () => {
    ytCommand(iframeRef.current, playing ? 'pauseVideo' : 'playVideo');
    setPlaying(!playing);
  };
  const toggleMute = () => {
    ytCommand(iframeRef.current, muted ? 'unMute' : 'mute');
    if (muted) ytCommand(iframeRef.current, 'setVolume', [80]);
    setMuted(!muted);
  };
  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };
  const snapshot = () => {
    const url = frame ?? staticThumb(cam, true);
    if (!url) return notify('Snapshot not available for this camera');
    window.open(url, '_blank', 'noopener');
    notify('📸 Opened the latest frame from this camera');
  };

  return (
    <div className="overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/10">
      <div ref={wrapRef} className="relative aspect-video w-full overflow-hidden bg-black">
        <CamEmbed key={cam.id} ref={iframeRef} cam={cam} onLoad={() => setLoading(false)} />

        {/* badge (non-interactive so YouTube controls stay usable) */}
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white shadow">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Live
          </span>
        </div>

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black">
            {frame && <img src={frame} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 blur-sm" />}
            <div className="relative h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
            <span className="relative text-xs uppercase tracking-widest text-white/80">Connecting to live stream…</span>
          </div>
        )}

        {toast && (
          <div className="pointer-events-none absolute left-1/2 top-14 -translate-x-1/2 rounded bg-black/80 px-4 py-2 text-sm text-white shadow">
            {toast}
          </div>
        )}
      </div>

      {/* control bar */}
      <div className="flex items-center gap-1 border-b border-white/5 bg-slate-950 px-2 py-1.5 text-white sm:gap-2 sm:px-3">
        {isYT && <CtrlBtn label={playing ? 'Pause' : 'Play'} onClick={togglePlay}>{playing ? '❚❚' : '▶'}</CtrlBtn>}
        {isYT && <CtrlBtn label={muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>{muted ? '🔇' : '🔊'}</CtrlBtn>}
        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
          {kind === 'youtube' ? 'YouTube Live' : kind === 'ipcam' ? 'IPCamLive' : kind === 'iframe' ? `${cam.via} embed` : 'SkylineWebcams'}
        </span>
        <span className="ml-1 hidden font-mono text-xs text-slate-400 sm:inline">
          {cam.location} · {fmtTime(now, cam.tz, true)}
        </span>
        <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold uppercase text-red-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> Live
        </span>
        <CtrlBtn label="Snapshot" onClick={snapshot}>📷</CtrlBtn>
        <CtrlBtn label={`Watch on ${sourceLabel(cam)}`} onClick={() => window.open(sourceUrl(cam), '_blank', 'noopener')}>↗</CtrlBtn>
        <CtrlBtn label="Fullscreen" onClick={fullscreen}>⛶</CtrlBtn>
      </div>

      {/* info bar */}
      <div className="flex flex-col gap-3 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{cam.title}</h2>
          <p className="text-sm text-slate-400">
            {cam.location}, {cam.country} · <span className="text-slate-500">Live stream © {cam.source ?? 'EarthCam'}{cam.via && cam.via !== cam.source ? ` · via ${cam.via}` : ''}</span>
            {cam.verified ? <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-300">listed live by {cam.via}</span> : null}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Stat icon="🕒" value={fmtTime(now, cam.tz)} label="Local time" />
          <Stat
            icon={wx?.icon ?? '🌡'}
            value={wx ? `${wx.temp}°F` : '…'}
            label={wx ? `${wx.label} · ${wx.wind} mph${cam.approx ? ' (country)' : ''}` : 'Weather'}
          />
          <button
            onClick={() => setLiked((l) => ({ ...l, [cam.id]: !l[cam.id] }))}
            className={`rounded px-3 py-2 text-sm font-semibold transition ${
              liked[cam.id] ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {liked[cam.id] ? '★ Favorited' : '☆ Favorite'}
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(sourceUrl(cam));
              notify('🔗 Stream link copied');
            }}
            className="rounded bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

function CtrlBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} title={label} aria-label={label} className="flex h-8 w-8 items-center justify-center rounded text-sm hover:bg-white/15">
      {children}
    </button>
  );
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded bg-slate-800 px-3 py-1.5">
      <span>{icon}</span>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-white">{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-slate-400">{label}</div>
      </div>
    </div>
  );
}
