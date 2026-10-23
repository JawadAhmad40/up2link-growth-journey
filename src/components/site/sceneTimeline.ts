/**
 * Pure, centralized timeline for the hero film. Every visual in the scene reads
 * from `frameAt(t)` so phases stay in sync.
 *   0–2s  struggle uphill   | 2–3s momentum stops | 3–4.5s brand intervention
 *   4.5–5.5s channels merge | 5.5–7.5s acceleration | 7.5–9s horizon payoff
 */

export const DURATION = 9;
export const CREST_X = 760;
export const HORIZON_Y = 392;
/** Where the road meets the horizon: ahead of the crest, so the road never doubles back. */
export const VP = { x: 1060, y: HORIZON_Y };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeOutCubic = (u: number) => 1 - (1 - u) ** 3;
const easeInOut = (u: number) => (u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2);

/** Near (front) edge of the road surface. Steep S-climb up to the crest. */
export function roadY(x: number) {
  const u = clamp((x + 100) / (CREST_X + 100));
  return 880 - 274 * ((1 - Math.cos(Math.PI * u)) / 2);
}
export function roadSlope(x: number) {
  const u = (x + 100) / (CREST_X + 100);
  if (u <= 0 || u >= 1) return 0;
  return (-274 * Math.PI * Math.sin(Math.PI * u)) / 2 / (CREST_X + 100);
}
export const LANE = 32;

/**
 * Beyond the crest the road bends away into the distance and meets the horizon at VP.
 * It leaves the crest level, the way the climb arrives, so there is no kink at the top.
 */
const CREST = { x: CREST_X, y: roadY(CREST_X) - LANE };
const BEND_A = { x: CREST_X + 120, y: CREST.y };
const BEND_B = { x: VP.x - 70, y: CREST.y - 120 };
export function distancePoint(d: number) {
  const a = (1 - d) ** 3, b = 3 * (1 - d) ** 2 * d, c = 3 * (1 - d) * d * d, e = d ** 3;
  return {
    x: a * CREST.x + b * BEND_A.x + c * BEND_B.x + e * VP.x,
    y: a * CREST.y + b * BEND_A.y + c * BEND_B.y + e * VP.y,
  };
}
/** Direction of travel along the distant road (not normalized). */
export function distanceTangent(d: number) {
  const a = 3 * (1 - d) ** 2, b = 6 * (1 - d) * d, c = 3 * d * d;
  return {
    x: a * (BEND_A.x - CREST.x) + b * (BEND_B.x - BEND_A.x) + c * (VP.x - BEND_B.x),
    y: a * (BEND_A.y - CREST.y) + b * (BEND_B.y - BEND_A.y) + c * (VP.y - BEND_B.y),
  };
}
/** Perspective scale of the distant road: 1 at the crest, 0 on the horizon. */
export function depthScale(d: number) {
  return (distancePoint(d).y - HORIZON_Y) / (CREST.y - HORIZON_Y);
}
const FAR_LENGTH = (() => {
  let len = 0;
  for (let i = 1; i <= 50; i++) {
    const a = distancePoint((i - 1) / 50), b = distancePoint(i / 50);
    len += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return len;
})();
/** How far into the distance the car gets by the end of the film (1 is the horizon). */
const FAR_END = 0.6;

function carX(t: number) {
  if (t < 2) return 140 + 60 * t - 8 * Math.sin(t * 5);
  if (t < 3) return lerp(140 + 120 - 8 * Math.sin(10), 278, easeOutCubic(seg(t, 2, 3)));
  if (t < 5.5) return lerp(278, 300, easeInOut(seg(t, 3, 5.5)));
  if (t < 7.5) {
    const u = seg(t, 5.5, 7.5);
    return 300 + (CREST_X - 300) * u * u;
  }
  return CREST_X;
}
function distanceD(t: number) {
  const u = seg(t, 7.5, 9);
  // eased so the car leaves the crest at the speed it climbed with (~460 units/s)
  return FAR_END * (1 - (1 - u) ** 3.2);
}

export interface Frame {
  t: number;
  car: { x: number; y: number; angle: number; scale: number; wheel: number; bob: number };
  travel: number;
  speed: number;
  cam: { fx: number; fy: number; z: number };
  logo: number; // 0..1 reveal
  pulse: number; // 0..1 pulse expansion
  beam: number; // 0..1 energy reaching road
  roadLit: number; // 0..1
  upwork: number; // stream draw 0..1
  linkedin: number;
  merged: number;
  trail: number; // 0..1 trail intensity
  struggle: number; // 0..1
  ambient: number; // 0..1 after the film
}

function carState(t: number) {
  const x = carX(t);
  if (t < 7.5) {
    return { x, y: roadY(x) - LANE, angle: (Math.atan(roadSlope(x)) * 180) / Math.PI, scale: 1, travel: x - 140 };
  }
  const d = distanceD(t);
  const p = distancePoint(d);
  const dir = distanceTangent(d);
  // Seen from behind as it recedes, so the car levels out instead of turning with the road
  const angle = ((Math.atan2(dir.y, dir.x) * 180) / Math.PI) * (1 - d) ** 2;
  return { x: p.x, y: p.y, angle, scale: Math.max(0.12, depthScale(d)), travel: CREST_X - 140 + d * FAR_LENGTH };
}

export function frameAt(t: number): Frame {
  const c = carState(t);
  const c2 = carState(Math.max(0, t - 1 / 60));
  const speed = Math.max(0, (c.travel - c2.travel) * 60);
  const struggle = t < 3 ? 1 - seg(t, 2.6, 3.2) : 0;

  let z = 1.06;
  if (t < 2) z = lerp(1.04, 1.12, t / 2);
  else if (t < 3) z = lerp(1.12, 1.2, easeInOut(seg(t, 2, 3)));
  else if (t < 4.5) z = lerp(1.2, 0.98, easeInOut(seg(t, 3, 4.5)));
  else if (t < 7.5) z = lerp(0.98, 1.0, seg(t, 5.5, 7.5));
  else z = lerp(1.0, 0.94, easeInOut(seg(t, 7.5, 9)));

  const track = t < 3 ? 0.55 : lerp(0.55, 0.15, easeInOut(seg(t, 3, 4.5)));
  const fx = lerp(500, c.x, track);
  const fy = lerp(470, c.y - 60, track);

  return {
    t,
    car: {
      ...c,
      wheel: (c.travel / 28) * (180 / Math.PI),
      bob: struggle * Math.sin(t * 23) * 1.6,
    },
    travel: c.travel,
    speed,
    cam: { fx, fy, z },
    logo: easeOutCubic(seg(t, 3, 4.1)),
    pulse: seg(t, 3.6, 5),
    beam: easeInOut(seg(t, 3.8, 4.6)),
    roadLit: easeInOut(seg(t, 4.1, 5.4)),
    upwork: easeInOut(seg(t, 4.5, 5.3)),
    linkedin: easeInOut(seg(t, 4.65, 5.45)),
    merged: easeInOut(seg(t, 5.3, 6.6)),
    trail: seg(t, 5.7, 6.6) * (1 - 0.6 * seg(t, 8.4, 9.2)),
    struggle,
    ambient: seg(t, 9, 10),
  };
}

/** Composed still for reduced-motion users: car on the road, brand lit, channels merged. */
export function staticFrame(): Frame {
  const f = frameAt(9.2);
  const x = 470;
  return {
    ...f,
    car: { x, y: roadY(x) - LANE, angle: (Math.atan(roadSlope(x)) * 180) / Math.PI, scale: 1, wheel: 0, bob: 0 },
    cam: { fx: 500, fy: 470, z: 1 },
    speed: 0,
    trail: 0.6,
  };
}
