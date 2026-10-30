import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero animation: five loose workflow cards that a lime line connects and arranges into one
 * clear process, once, in about 4.5 seconds. It is CSS animation over static markup (styles in
 * styles.css under "Hero workflow"): the markup is the finished composition, so the server
 * render, the last frame and the reduced-motion view are the same stable workflow.
 */

const STEPS = [
  { title: "Positioning", note: "A clear offer for a defined audience" },
  { title: "Professional profile", note: "" },
  { title: "Targeting", note: "Relevant clients and opportunities" },
  { title: "Proposal or outreach", note: "Upwork proposals · LinkedIn outreach" },
  { title: "Follow-up and review", note: "Consistent follow-up, regular review" },
];

// Seconds: the line starts, reaches each card in turn, then the profile card switches channel
const LINE_START = 0.5;
const LINE_DURATION = 3.2;
const SWITCH_AT = 4;
const reachedAt = (i: number) => LINE_START + (LINE_DURATION * i) / (STEPS.length - 1);

const OBSIDIAN = "#0A0A0A";
const LIME = "#D4FF00";
const PAPER = "#F5F5EF";
const GRAPHITE = "#242820";
const ASH = "#A1A1AA";

interface Layout {
  width: number;
  height: number;
  lineX: number;
  cardX: number;
  cardW: number;
  cardH: number;
  gap: number;
  top: number;
  radius: number;
  numberX: number;
  textX: number;
  titleSize: number;
  socket: number;
  node: number;
  /** Where each card sits before the line arranges it: x and y offset, rotation in degrees. */
  loose: [number, number, number][];
  looseOpacity: number;
  /** Desktop shows a note on each card and a two-option channel switch. */
  detailed: boolean;
}

const FULL: Layout = {
  width: 528,
  height: 548,
  lineX: 28,
  cardX: 64,
  cardW: 452,
  cardH: 84,
  gap: 24,
  top: 16,
  radius: 16,
  numberX: 22,
  textX: 58,
  titleSize: 18,
  socket: 8,
  node: 4.5,
  loose: [
    [-22, 12, -3],
    [30, -10, 2.5],
    [-34, 8, -2],
    [24, 14, 3],
    [-16, -12, -2.5],
  ],
  looseOpacity: 0.45,
  detailed: true,
};

// Mobile: smaller cards, titles only, and a gentler start with no rotation
const COMPACT: Layout = {
  width: 360,
  height: 344,
  lineX: 15,
  cardX: 36,
  cardW: 320,
  cardH: 56,
  gap: 12,
  top: 8,
  radius: 12,
  numberX: 14,
  textX: 44,
  titleSize: 14.5,
  socket: 6,
  node: 3.5,
  loose: [
    [-8, 4, 0],
    [10, -4, 0],
    [-10, 4, 0],
    [8, 4, 0],
    [-6, -4, 0],
  ],
  looseOpacity: 0.4,
  detailed: false,
};

const cssVars = (vars: Record<string, string>) => vars as CSSProperties;
const at = (seconds: number) => cssVars({ "--d": `${seconds}s` });

export function HeroWorkflow() {
  return (
    <figure className="wf w-full md:max-w-[36rem] lg:max-w-none">
      <div className="rounded-[2rem] border border-line-dark bg-graphite/25 p-4 sm:p-6 lg:p-7">
        <Diagram layout={COMPACT} className="md:hidden" />
        <Diagram layout={FULL} className="hidden md:block" />
      </div>
      <figcaption className="mt-4 flex items-center gap-2.5 text-xs tracking-wide text-ash">
        <span className="h-px w-6 bg-lime" aria-hidden />
        Illustrative client-acquisition workflow
      </figcaption>
      <ol className="sr-only">
        <li>Positioning</li>
        <li>Professional profile: an Upwork profile or a LinkedIn personal brand</li>
        <li>Targeting</li>
        <li>Proposal or outreach</li>
        <li>Follow-up and review</li>
      </ol>
    </figure>
  );
}

function Diagram({ layout: L, className }: { layout: Layout; className?: string }) {
  const dots = `${useId()}-dots`;
  const cardTop = (i: number) => L.top + i * (L.cardH + L.gap);
  const centerY = (i: number) => cardTop(i) + L.cardH / 2;

  return (
    <svg
      viewBox={`0 0 ${L.width} ${L.height}`}
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={dots} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={PAPER} fillOpacity="0.07" />
        </pattern>
      </defs>
      <rect width={L.width} height={L.height} fill={`url(#${dots})`} />

      <path
        d={`M${L.lineX} ${centerY(0)}V${centerY(STEPS.length - 1)}`}
        pathLength={1}
        fill="none"
        stroke={LIME}
        strokeWidth={2}
        className="wf-draw"
        style={cssVars({ "--d": `${LINE_START}s`, "--t": `${LINE_DURATION}s` })}
      />
      {STEPS.map((step, i) => (
        <g key={step.title}>
          <circle
            cx={L.lineX}
            cy={centerY(i)}
            r={L.socket}
            fill={OBSIDIAN}
            stroke={PAPER}
            strokeOpacity={0.28}
            strokeWidth={1.5}
          />
          <circle
            cx={L.lineX}
            cy={centerY(i)}
            r={L.node}
            fill={LIME}
            className="wf-node"
            style={at(reachedAt(i))}
          />
          <path
            d={`M${L.lineX + L.socket} ${centerY(i)}H${L.cardX}`}
            pathLength={1}
            fill="none"
            stroke={LIME}
            strokeWidth={2}
            className="wf-draw"
            style={cssVars({ "--d": `${reachedAt(i)}s`, "--t": "0.3s", "--ease": "ease-out" })}
          />
        </g>
      ))}

      {STEPS.map((step, i) => {
        const [dx, dy, rot] = L.loose[i]!;
        const mid = L.cardH / 2;
        const numberSize = L.titleSize * 0.7;
        const twoLines = L.detailed;
        return (
          <g key={step.title} transform={`translate(${L.cardX} ${cardTop(i)})`}>
            <g
              className="wf-card"
              style={cssVars({
                "--d": `${Math.max(0, reachedAt(i) - 0.15)}s`,
                "--dx": `${dx}px`,
                "--dy": `${dy}px`,
                "--rot": `${rot}deg`,
                "--o": String(L.looseOpacity),
              })}
            >
              <rect
                width={L.cardW}
                height={L.cardH}
                rx={L.radius}
                fill={GRAPHITE}
                stroke={PAPER}
                strokeOpacity={0.1}
              />
              <text
                x={L.numberX}
                y={mid + numberSize * 0.35}
                fontSize={numberSize}
                fontWeight={600}
                fill={ASH}
                className="font-display"
              >
                {`0${i + 1}`}
              </text>
              <text
                x={L.textX}
                y={twoLines ? mid - 6 : mid + L.titleSize * 0.35}
                fontSize={L.titleSize}
                fontWeight={600}
                fill={PAPER}
                className="font-display"
              >
                {step.title}
              </text>
              {twoLines && step.note && (
                <text x={L.textX} y={mid + 16} fontSize={13.5} fill={ASH}>
                  {step.note}
                </text>
              )}
              {i === 1 && (L.detailed ? <ChannelSwitch L={L} /> : <ChannelBadge L={L} />)}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/** Desktop profile card: a two-option switch that moves from Upwork to LinkedIn. */
function ChannelSwitch({ L }: { L: Layout }) {
  const w = 152;
  const h = 32;
  const x = L.cardW - 24 - w;
  const y = (L.cardH - h) / 2;
  const half = (w - 6) / 2;
  const labelY = y + h / 2 + 4.2;
  return (
    <g>
      <text
        x={L.textX}
        y={L.cardH / 2 + 16}
        fontSize={13.5}
        fill={ASH}
        className="wf-out"
        style={at(SWITCH_AT)}
      >
        Upwork profile
      </text>
      <text
        x={L.textX}
        y={L.cardH / 2 + 16}
        fontSize={13.5}
        fill={ASH}
        className="wf-in"
        style={at(SWITCH_AT + 0.1)}
      >
        LinkedIn personal brand
      </text>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h / 2}
        fill={OBSIDIAN}
        stroke={PAPER}
        strokeOpacity={0.12}
      />
      <rect
        x={x + 3 + half}
        y={y + 3}
        width={half}
        height={h - 6}
        rx={(h - 6) / 2}
        fill={LIME}
        className="wf-slide"
        style={cssVars({ "--d": `${SWITCH_AT}s`, "--from": `${-half}px` })}
      />
      <text
        x={x + 3 + half / 2}
        y={labelY}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={ASH}
        className="wf-dim"
        style={at(SWITCH_AT)}
      >
        Upwork
      </text>
      <text
        x={x + 3 + half * 1.5}
        y={labelY}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={OBSIDIAN}
        className="wf-lit"
        style={at(SWITCH_AT)}
      >
        LinkedIn
      </text>
    </g>
  );
}

/** Mobile profile card: one small label that changes from Upwork to LinkedIn. */
function ChannelBadge({ L }: { L: Layout }) {
  const w = 68;
  const h = 24;
  const x = L.cardW - 12 - w;
  const y = (L.cardH - h) / 2;
  const labelY = y + h / 2 + 3.9;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={LIME} />
      <text
        x={x + w / 2}
        y={labelY}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill={OBSIDIAN}
        className="wf-out"
        style={at(SWITCH_AT)}
      >
        Upwork
      </text>
      <text
        x={x + w / 2}
        y={labelY}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill={OBSIDIAN}
        className="wf-in"
        style={at(SWITCH_AT + 0.1)}
      >
        LinkedIn
      </text>
    </g>
  );
}
