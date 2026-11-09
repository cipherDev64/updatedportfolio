import { useEffect, useRef, useState, type RefObject } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { playlist } from "../../content/music";
import Widget from "./Widget";

type Track = { id: number; title: string; artist: string; art?: string; preview?: string; url?: string };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Lana Del Rey on repeat. Artwork and 30-second previews come from Apple's iTunes lookup API. */
export default function MusicWidget({ bounds, className = "" }: { bounds?: RefObject<HTMLElement | null>; className?: string }) {
  const [tracks, setTracks] = useState<Track[]>(playlist.map((t) => ({ ...t })));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);
  // Whether the visitor wants music playing; survives track changes and the end of a preview.
  const wantPlay = useRef(false);
  const track = tracks[index];

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://itunes.apple.com/lookup?id=${playlist.map((t) => t.id).join(",")}&entity=song`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data: { results: { trackId: number; artworkUrl100?: string; previewUrl?: string; trackViewUrl?: string }[] }) => {
        const byId = new Map(data.results.map((r) => [r.trackId, r]));
        setTracks(
          playlist.map((t) => {
            const r = byId.get(t.id);
            return { ...t, art: r?.artworkUrl100?.replace("100x100", "600x600"), preview: r?.previewUrl, url: r?.trackViewUrl };
          }),
        );
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    const el = audio.current;
    if (!el || !track.preview) return;
    el.src = track.preview;
    setTime(0);
    if (wantPlay.current) el.play().catch(() => (wantPlay.current = false));
  }, [index, track.preview]);

  const toggle = () => {
    const el = audio.current;
    if (!el || !track.preview) return;
    if (el.paused) {
      wantPlay.current = true;
      el.play().catch(() => (wantPlay.current = false));
    } else {
      wantPlay.current = false;
      el.pause();
    }
  };
  const step = (d: number) => setIndex((i) => (i + d + tracks.length) % tracks.length);

  return (
    <Widget label="On repeat" bounds={bounds} delay={0.3} className={`relative overflow-hidden p-0 ${className}`}>
      {track.art && <img src={track.art} alt="" aria-hidden="true" draggable={false} className="absolute inset-0 size-full scale-125 object-cover opacity-35 blur-2xl" />}
      <div className="relative flex gap-3.5 p-4">
        <div className="size-[76px] shrink-0 overflow-hidden rounded-[12px] bg-raised shadow-[0_10px_24px_-10px_rgb(0_0_0/0.8)]">
          {track.art && <img src={track.art} alt={`${track.title} artwork`} draggable={false} className="size-full object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <span aria-hidden="true" className={`size-1.5 rounded-full bg-[#28c840] ${playing ? "animate-pulse" : ""}`} /> On repeat lately
          </p>
          <p className="mt-1.5 truncate text-[17px] font-bold leading-tight tracking-[-0.02em]">{track.title}</p>
          <p className="truncate text-[13px] text-muted">{track.artist}</p>
        </div>
      </div>
      <div className="relative px-4 pb-4">
        <div className="h-1 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-white/80 transition-[width] duration-200" style={{ width: duration ? `${(time / duration) * 100}%` : "0%" }} />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[10.5px] text-muted tabular-nums">
          <span>{fmt(time)}</span>
          <span>{duration ? fmt(duration) : "--:--"}</span>
        </div>
        <div className="mt-1 flex items-center justify-center gap-5" onPointerDown={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => step(-1)} aria-label="Previous song" className="grid size-9 place-items-center rounded-full text-ink/80 hover:bg-white/10 hover:text-ink">
            <SkipBack className="size-4" fill="currentColor" />
          </button>
          <button
            type="button"
            onClick={toggle}
            disabled={!track.preview}
            aria-label={playing ? `Pause ${track.title}` : `Play a preview of ${track.title}`}
            className="grid size-11 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105 disabled:opacity-50"
          >
            {playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="ml-0.5 size-4" fill="currentColor" />}
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next song" className="grid size-9 place-items-center rounded-full text-ink/80 hover:bg-white/10 hover:text-ink">
            <SkipForward className="size-4" fill="currentColor" />
          </button>
        </div>
        {track.url && (
          <a href={track.url} target="_blank" rel="noopener noreferrer" onPointerDown={(e) => e.stopPropagation()} className="mt-2 block text-center font-mono text-[10px] uppercase tracking-[0.1em] text-muted hover:text-ink">
            Preview · Apple Music ↗
          </a>
        )}
      </div>
      <audio
        ref={audio}
        preload="none"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => step(1)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
    </Widget>
  );
}
