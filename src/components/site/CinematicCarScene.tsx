import { useEffect, useMemo, useRef, useState } from "react";
import {
  CREST_X,
  DURATION,
  HORIZON_Y,
  LANE,
  VP,
  distancePoint,
  frameAt,
  roadY,
  staticFrame,
  type Frame,
} from "./sceneTimeline";

/* ---------- static geometry (world units, viewBox 1000x900) ---------- */

function sampleRoad(offset: number, from = -160, to = CREST_X, step = 10) {
  const pts: string[] = [];
  for (let x = from; x <= to; x += step) pts.push(`${x.toFixed(1)},${(roadY(x) + offset).toFixed(1)}`);
  return pts;
}
function sampleDistance(offset: number, step = 0.04) {
  const pts: string[] = [];
  for (let d = 0; d <= 1.0001; d += step) {
    const p = distancePoint(d);
    const s = 1 - 0.86 * d ** 0.7;
    pts.push(`${p.x.toFixed(1)},${(p.y + LANE + offset * s).toFixed(1)}`);
  }
  return pts;
}

const nearEdge = [...sampleRoad(0), ...sampleDistance(0)];
const farEdge = [...sampleRoad(-74), ...sampleDistance(-74)];
const ROAD_SURFACE = `M${nearEdge.join(" L")} L${[...farEdge].reverse().join(" L")} Z`;
const HILL_FACE = `M-200,1000 L${sampleRoad(0).join(" L")} L${CREST_X},1000 Z`;
const NEAR_EDGE_PATH = `M${sampleRoad(0).join(" L")}`;
const FAR_EDGE_PATH = `M${sampleRoad(-74).join(" L")} L${sampleDistance(-74).join(" L")}`;
const LANE_PATH = `M${sampleRoad(-LANE - 4).join(" L")} L${sampleDistance(-LANE - 4).join(" L")}`;

// Convergence point on the road ahead of the car
const KX = 520;
const K = { x: KX, y: roadY(KX) - LANE - 6 };
const UPWORK_PATH = `M-60,760 C120,720 260,640 ${K.x},${K.y}`;
const LINKEDIN_PATH = `M1080,250 C900,330 700,520 ${K.x},${K.y}`;
const MERGED_PATH = `M${K.x},${K.y} L${sampleRoad(-LANE - 6, KX + 10).join(" L")} L${sampleDistance(-LANE - 6).join(" L")}`;

/* ---------- car ---------- */

function Wheel({ cx, rot }: { cx: number; rot: number }) {
  return (
    <g transform={`rotate(${rot % 360} ${cx} -38)`}>
      <circle cx={cx} cy={-38} r={38} fill="var(--obsidian)" />
      <circle cx={cx} cy={-38} r={36} fill="none" stroke="var(--graphite)" strokeWidth={3} />
      <circle cx={cx} cy={-38} r={25} fill="url(#rim)" />
      {[0, 72, 144, 216, 288].map((a) => (
        <rect key={a} x={cx - 2.5} y={-62} width={5} height={24} rx={2} fill="var(--ash)" opacity={0.9} transform={`rotate(${a} ${cx} -38)`} />
      ))}
      <circle cx={cx} cy={-38} r={6} fill="var(--lime)" opacity={0.85} />
    </g>
  );
}

function Car({ f }: { f: Frame }) {
  const { car } = f;
  const blur = Math.min(10, f.speed / 90);
  const trailLen = Math.max(f.speed * 0.32, f.trail * 140);
  return (
    <g transform={`translate(${car.x} ${car.y + car.bob}) rotate(${car.angle}) scale(${0.78 * car.scale}) translate(-200 0)`}>
      {/* contact shadow */}
      <ellipse cx={200} cy={2} rx={215} ry={14} fill="var(--obsidian)" opacity={0.75} />
      {/* light trails stretching backward */}
      {trailLen > 4 && (
        <g opacity={Math.min(1, 0.35 + f.trail)}>
          {[-30, -52, -78].map((y, i) => (
            <rect key={y} x={10 - trailLen * (1 - i * 0.18)} y={y} width={trailLen * (1 - i * 0.18)} height={i === 0 ? 4 : 2} fill="url(#trail)" />
          ))}
        </g>
      )}
      {/* headlight cone */}
      <path d="M392,-54 L760,-130 L760,40 Z" fill="url(#beamCone)" opacity={0.35 + 0.65 * f.roadLit} />
      <g filter={blur > 0.6 ? "url(#mblur)" : undefined}>
        {/* body */}
        <path
          d="M8,-30 C4,-52 8,-66 24,-72 L78,-82 C118,-88 148,-122 196,-130 C238,-136 276,-129 304,-108 C322,-96 344,-88 374,-82 C394,-78 402,-62 400,-44 L398,-30 C398,-20 392,-16 384,-16 L360,-16 A46,46 0 0 0 280,-16 L120,-16 A46,46 0 0 0 40,-16 L20,-16 C12,-16 8,-21 8,-30 Z"
          fill="url(#body)"
        />
        {/* lower sill shadow */}
        <path d="M120,-16 L280,-16 L276,-28 L124,-28 Z" fill="var(--obsidian)" opacity={0.7} />
        {/* glasshouse */}
        <path d="M150,-108 C176,-124 228,-127 264,-113 L290,-96 C250,-92 192,-92 136,-95 Z" fill="url(#glass)" />
        <path d="M212,-123 L216,-93" stroke="var(--obsidian)" strokeWidth={5} />
        {/* shoulder highlight */}
        <path d="M30,-68 C110,-80 250,-84 392,-66" fill="none" stroke="var(--snow)" strokeOpacity={0.35} strokeWidth={2.5} />
        <path d="M60,-50 C160,-56 280,-56 384,-48" fill="none" stroke="var(--snow)" strokeOpacity={0.1} strokeWidth={1.5} />
        {/* side intake */}
        <path d="M108,-62 L140,-60 L132,-44 L104,-46 Z" fill="var(--obsidian)" opacity={0.8} />
        {/* rear wing + tail light */}
        <path d="M14,-74 L58,-80 L56,-86 L10,-80 Z" fill="var(--graphite)" />
        <rect x={8} y={-64} width={14} height={8} rx={2} fill="var(--destructive)" opacity={0.95} />
        <rect x={0} y={-66} width={22} height={12} rx={4} fill="var(--destructive)" opacity={0.25 + 0.3 * f.struggle} />
        {/* headlight */}
        <path d="M380,-66 L398,-60 L396,-52 L376,-56 Z" fill="var(--lime)" />
        {/* lime accent line activated by brand */}
        <path d="M40,-38 L372,-40" stroke="var(--lime)" strokeWidth={2.5} opacity={0.15 + 0.85 * f.roadLit} />
      </g>
      <Wheel cx={80} rot={car.wheel} />
      <Wheel cx={320} rot={car.wheel} />
    </g>
  );
}

/* ---------- scene ---------- */

function Scene({ f, mobile }: { f: Frame; mobile: boolean }) {
  const { fx, fy, z } = f.cam;
  const camT = `translate(500 450) scale(${z}) translate(${-fx} ${-fy})`;
  const par = (k: number) => `translate(${(500 - fx) * k} ${(470 - fy) * k * 0.5})`;
  const logoY = 260 + (1 - f.logo) * 150;
  const X2 = 490;
  const glow = 0.25 + 0.75 * f.roadLit + f.ambient * 0;

  return (
    <svg
      viewBox="0 0 1000 900"
      preserveAspectRatio={mobile ? "xMidYMid slice" : "xMidYMax slice"}
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="A dark sports car struggles up a steep road until the up2linkd logo lights the scene; Upwork and LinkedIn streams merge into one path and the car accelerates toward the horizon."
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--obsidian)" }} />
          <stop offset="0.75" style={{ stopColor: "var(--graphite-2)" }} />
          <stop offset="1" style={{ stopColor: "var(--graphite)" }} />
        </linearGradient>
        <radialGradient id="horizonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--lime)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--lime)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--graphite)" }} />
          <stop offset="0.25" style={{ stopColor: "var(--graphite-2)" }} />
          <stop offset="1" style={{ stopColor: "var(--obsidian)" }} />
        </linearGradient>
        <linearGradient id="asphalt" x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0" style={{ stopColor: "var(--graphite-2)" }} />
          <stop offset="1" style={{ stopColor: "var(--graphite)" }} />
        </linearGradient>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--ash)" }} />
          <stop offset="0.28" style={{ stopColor: "var(--graphite)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--graphite-2)" }} />
          <stop offset="1" style={{ stopColor: "var(--obsidian)" }} />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--ash)", stopOpacity: 0.55 }} />
          <stop offset="0.5" style={{ stopColor: "var(--obsidian)" }} />
          <stop offset="1" style={{ stopColor: "var(--graphite)" }} />
        </linearGradient>
        <radialGradient id="rim" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--ash)" }} />
          <stop offset="1" style={{ stopColor: "var(--graphite-2)" }} />
        </radialGradient>
        <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--lime)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--lime)", stopOpacity: 0.9 }} />
        </linearGradient>
        <linearGradient id="beamCone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--lime)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--lime)", stopOpacity: 0 }} />
        </linearGradient>
        <filter id="mblur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={`${Math.min(10, f.speed / 90)} 0`} />
        </filter>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id="aboveHorizon">
          <rect x="-400" y="-400" width="1800" height={HORIZON_Y + 400} />
        </clipPath>
      </defs>

      <rect width="1000" height="900" fill="url(#sky)" />

      <g transform={camT}>
        {/* horizon glow intensifies with brand */}
        <ellipse cx={VP.x} cy={HORIZON_Y} rx={520} ry={120} fill="url(#horizonGlow)" opacity={0.12 + 0.7 * f.roadLit + 0.1 * Math.sin(f.t * 1.2) * f.ambient} />

        {/* far mountains (parallax) */}
        <g transform={par(0.5)}>
          <path d={`M-400,${HORIZON_Y} L-150,300 L60,350 L250,280 L430,345 L640,300 L860,350 L1060,290 L1400,${HORIZON_Y} Z`} fill="var(--graphite-2)" opacity={0.9} />
        </g>

        {/* logo rises from the horizon */}
        <g clipPath="url(#aboveHorizon)" opacity={f.logo}>
          <g transform={`translate(0 ${logoY})`} fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={96} letterSpacing={-5}>
            <text x={X2 - 30} y={0} textAnchor="end" fill="var(--snow)">up</text>
            <text x={X2} y={0} textAnchor="middle" fill="var(--lime)" transform={`skewX(-12) translate(${-0.21 * -34} 0)`}>2</text>
            <text x={X2 + 30} y={0} textAnchor="start" fill="var(--snow)">linkd</text>
          </g>
        </g>

        {/* pulse from the "2" */}
        {f.pulse > 0 && f.pulse < 1 && (
          <g opacity={1 - f.pulse}>
            <circle cx={X2} cy={226} r={30 + f.pulse * 420} fill="none" stroke="var(--lime)" strokeWidth={3} />
            <circle cx={X2} cy={226} r={10 + f.pulse * 260} fill="none" stroke="var(--lime)" strokeWidth={1.5} opacity={0.6} />
          </g>
        )}
        {/* energy beam from logo to road */}
        <path d={`M${X2},250 C${X2 + 10},380 ${K.x - 20},${K.y - 140} ${K.x},${K.y}`} fill="none" stroke="var(--lime)" strokeWidth={3} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - f.beam} opacity={f.beam * (1 - f.merged * 0.8)} />

        {/* near hills (parallax) */}
        <g transform={par(0.2)}>
          <path d={`M-400,520 C-100,430 100,480 260,470 L260,1000 L-400,1000 Z`} fill="var(--graphite-2)" opacity={0.7} />
        </g>

        {/* road + hill */}
        <path d={HILL_FACE} fill="url(#hill)" />
        <path d={ROAD_SURFACE} fill="url(#asphalt)" />
        <path d={NEAR_EDGE_PATH} fill="none" stroke="var(--lime)" strokeWidth={3} opacity={0.15 + 0.85 * glow} />
        <path d={FAR_EDGE_PATH} fill="none" stroke="var(--lime)" strokeWidth={1.5} opacity={0.08 + 0.5 * f.roadLit} />
        <path d={LANE_PATH} fill="none" stroke="var(--snow)" strokeWidth={3} strokeDasharray="26 22" opacity={0.35 + 0.2 * f.roadLit} />
        {/* road lit by the brand */}
        <path d={NEAR_EDGE_PATH} fill="none" stroke="var(--lime)" strokeWidth={14} filter="url(#soft)" opacity={0.6 * f.roadLit} />

        {/* channel streams */}
        <Stream d={UPWORK_PATH} progress={f.upwork} label="UPWORK" id="s-up" />
        <Stream d={LINKEDIN_PATH} progress={f.linkedin} label="LINKEDIN" id="s-li" />
        {f.merged > 0 && (
          <>
            <path d={MERGED_PATH} fill="none" stroke="var(--lime)" strokeWidth={18} filter="url(#soft)" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - f.merged} opacity={0.55} />
            <path d={MERGED_PATH} fill="none" stroke="var(--lime)" strokeWidth={4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - f.merged} />
            <path d={MERGED_PATH} fill="none" stroke="var(--obsidian)" strokeWidth={2} strokeDasharray="6 30" strokeDashoffset={-f.t * 120} opacity={f.merged * 0.7} />
          </>
        )}
        {f.merged > 0.2 && (
          <circle cx={K.x} cy={K.y} r={9 + 3 * Math.sin(f.t * 4)} fill="var(--lime)" opacity={f.merged} />
        )}

        <Car f={f} />
      </g>

      {/* vignette */}
      <rect width="1000" height="900" fill="url(#sky)" opacity={0} />
    </svg>
  );
}

function Stream({ d, progress, label, id }: { d: string; progress: number; label: string; id: string }) {
  if (progress <= 0) return null;
  return (
    <g>
      <path id={id} d={d} fill="none" stroke="var(--lime)" strokeWidth={16} filter="url(#soft)" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - progress} opacity={0.5} />
      <path d={d} fill="none" stroke="var(--lime)" strokeWidth={3.5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - progress} />
      <text fontFamily="Space Grotesk, sans-serif" fontSize={20} fontWeight={600} letterSpacing={5} fill="var(--lime)" opacity={Math.min(1, progress * 1.6)} dy={-14}>
        <textPath href={`#${id}`} startOffset="12%">{label}</textPath>
      </text>
    </g>
  );
}

/* ---------- controller ---------- */

export function CinematicCarScene({ mobile = false }: { mobile?: boolean }) {
  const [t, setT] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let start: number | null = null;
    let last = 0;
    const loop = (now: number) => {
      if (start === null) start = now;
      const tt = (now - start) / 1000;
      // after the film, throttle to ~20fps ambient motion
      if (tt < DURATION + 1 || now - last > 50) {
        last = now;
        setT(tt);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced, run]);

  const frame = useMemo(() => (reduced ? staticFrame() : frameAt(t)), [t, reduced]);

  return (
    <div className="absolute inset-0">
      <Scene f={frame} mobile={mobile} />
      {!reduced && t > DURATION + 0.5 && (
        <button
          type="button"
          onClick={() => {
            setT(0);
            setRun((r) => r + 1);
          }}
          className="eyebrow absolute bottom-4 right-4 z-10 rounded-sm border border-ink-line bg-obsidian/60 px-3 py-2 text-ash transition-colors hover:text-lime"
        >
          Replay film
        </button>
      )}
    </div>
  );
}
