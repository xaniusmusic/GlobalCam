import { forwardRef, useEffect, useState } from 'react';
import { type Cam, camKind, embedUrl, ipcamPlayerUrl, skylineImg, staticThumb } from '../data';

/* ---------- ipcamlive live snapshot (Live from Iceland) ---------- */
const ipcamCache = new Map<string, Promise<string | null>>();

function ipcamSnapshot(alias: string): Promise<string | null> {
  if (!ipcamCache.has(alias)) {
    ipcamCache.set(
      alias,
      fetch(`https://g0.ipcamlive.com/player/getcamerastreamstate.php?alias=${alias}`)
        .then((r) => r.json())
        .then((j) => {
          const d = j?.details;
          if (!d?.streamid || !d?.address) return null;
          const host = String(d.address).replace(/^http:/, 'https:');
          return `${host}streams/${d.streamid}/snapshot.jpg`;
        })
        .catch(() => null),
    );
  }
  return ipcamCache.get(alias)!;
}

export function useCamThumb(cam: Cam, hi = false, refreshKey = 0) {
  const fixed = staticThumb(cam, hi);
  const [src, setSrc] = useState<string | null>(fixed);
  useEffect(() => {
    if (camKind(cam) === 'ipcam' && cam.ipcam) {
      let alive = true;
      ipcamSnapshot(cam.ipcam).then((u) => alive && setSrc(u ? `${u}?t=${refreshKey}` : null));
      return () => {
        alive = false;
      };
    }
    const f = staticThumb(cam, hi);
    setSrc(f && refreshKey ? `${f}${f.includes('?') ? '&' : '?'}t=${refreshKey}` : f);
  }, [cam.id, hi, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return src;
}

/** Thumbnail image for any kind of cam. */
export function CamThumb({
  cam, hi = false, refreshKey = 0, className = '', fallbackLow = false,
}: { cam: Cam; hi?: boolean; refreshKey?: number; className?: string; fallbackLow?: boolean }) {
  const src = useCamThumb(cam, hi, refreshKey);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) {
    if (fallbackLow && hi && !failed) return null;
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}>
        <span className="text-center text-[10px] uppercase tracking-widest text-slate-500">
          📡 Live<br />{cam.source}
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={cam.title}
      loading="lazy"
      onError={(e) => {
        const low = staticThumb(cam, false);
        if (hi && low && (e.target as HTMLImageElement).src !== low) (e.target as HTMLImageElement).src = low;
        else setFailed(true);
      }}
      className={`object-cover ${className}`}
    />
  );
}

/* ---------- Embedded live view ---------- */
interface EmbedProps {
  cam: Cam;
  mute?: boolean;
  controls?: boolean;
  onLoad?: () => void;
  compact?: boolean;
}

/** Renders the right live player for the cam: YouTube iframe, ipcamlive iframe, or SkylineWebcams official embed. */
export const CamEmbed = forwardRef<HTMLIFrameElement, EmbedProps>(function CamEmbed(
  { cam, mute = true, controls = true, onLoad, compact = false },
  ref,
) {
  const k = camKind(cam);
  if (k === 'skyline') return <SkylineEmbed cam={cam} onLoad={onLoad} compact={compact} />;
  const src = k === 'ipcam' ? ipcamPlayerUrl(cam.ipcam!) : k === 'iframe' ? cam.embed! : embedUrl(cam.yt, { mute, controls });
  return (
    <iframe
      ref={ref}
      src={src}
      title={`Live: ${cam.title}`}
      className="absolute inset-0 h-full w-full"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      loading={compact ? 'lazy' : undefined}
      onLoad={onLoad}
    />
  );
});

/** SkylineWebcams' official embed: a live image that links to the live video on skylinewebcams.com.
 *  We refresh the image every 60s so it stays current. */
function SkylineEmbed({ cam, onLoad, compact }: { cam: Cam; onLoad?: () => void; compact?: boolean }) {
  const [tick, setTick] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setTick(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <a href={cam.skyUrl} target="_blank" rel="noopener" className="group absolute inset-0 block" title={`Watch ${cam.title} live on SkylineWebcams`}>
      <img
        src={`${skylineImg(cam.skyId!)}?t=${tick}`}
        alt={cam.title}
        onLoad={onLoad}
        onError={onLoad}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
      <div className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent ${compact ? 'p-2' : 'p-4'}`}>
        <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] text-slate-200">
          Live image · refreshes automatically
        </span>
        <span className={`flex items-center gap-1 rounded-full bg-sky-500 font-semibold text-white shadow-lg transition group-hover:bg-sky-400 ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-4 py-2 text-sm'}`}>
          ▶ {compact ? 'Watch video' : 'Watch live video on SkylineWebcams'}
        </span>
      </div>
    </a>
  );
}
