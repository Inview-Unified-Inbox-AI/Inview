"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";

/* "The full picture": Instagram, WhatsApp and Messenger flow into one inbox,
   an AI agent works on it, and automation carries the result out.
   Desktop is a fixed 1200×500 canvas scaled to fit; mobile is a vertical stack.
   All motion is CSS (flowing dashes + gentle pulses) and stops for reduced motion. */

const W = 1200;
const H = 500;

const SOURCES = [
  {
    name: "Instagram",
    note: "“Is the black dress in M?”",
    icon: "https://img.icons8.com/fluency/96/instagram-new.png",
    y: 60,
  },
  {
    name: "WhatsApp",
    note: "“Can I pay COD for two?”",
    icon: "https://img.icons8.com/office/40/whatsapp--v1.png",
    y: 205,
  },
  {
    name: "Messenger",
    note: "“Is the blue one in stock?”",
    icon: "https://img.icons8.com/fluency/96/facebook-messenger--v2.png",
    y: 350,
  },
] as const;

const OUTPUTS = [
  { title: "Follow-ups", note: "Every promise stays on your list", y: 60 },
  { title: "Voice reminders", note: "“Remind me at 4:30”", y: 205 },
  { title: "Orders", note: "Confirmed and logged", y: 350 },
] as const;

const INBOX_ROWS = [
  ["Aisha", "bg-pink-500", "Sales enquiry"],
  ["Nuwan", "bg-emerald-500", "Order"],
  ["Priya", "bg-sky-500", "Sales enquiry"],
] as const;

const AGENT_TASKS = [
  "Labels every chat",
  "Summarises the lead",
  "Drafts the reply",
];

/* Source → hub, hub → agent, agent → output curves (canvas coordinates). */
const CENTER_Y = 250;
const SOURCE_EDGE = 230;
const HUB_LEFT = 340;
const HUB_RIGHT = 560;
const AGENT_LEFT = 650;
const AGENT_RIGHT = 850;
const OUT_LEFT = 950;

/* A connection is a small bundle of strands: one main ribbon, two thin ones
   that drift around it, a soft glow underneath, and a few particles travelling
   along it. `wobble` bends the control points so the strands braid slightly. */
const curve = (x1: number, y1: number, x2: number, y2: number, wobble = 0) => {
  const mid = (x2 - x1) / 2;
  return `M${x1} ${y1} C ${x1 + mid} ${y1 + wobble}, ${x2 - mid} ${y2 - wobble}, ${x2} ${y2}`;
};

type Link = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
};

const LINKS: Link[] = [
  ...SOURCES.map((s, i) => ({
    x1: SOURCE_EDGE,
    y1: s.y + 45,
    x2: HUB_LEFT,
    y2: CENTER_Y,
    delay: i * 0.6,
  })),
  { x1: HUB_RIGHT, y1: CENTER_Y, x2: AGENT_LEFT, y2: CENTER_Y, delay: 0.3 },
  ...OUTPUTS.map((o, i) => ({
    x1: AGENT_RIGHT,
    y1: CENTER_Y,
    x2: OUT_LEFT,
    y2: o.y + 40,
    delay: 0.9 + i * 0.5,
  })),
];

function SourceCard({
  s,
  className,
}: {
  s: (typeof SOURCES)[number];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-neutral-200",
        className,
      )}
    >
      <Image
        src={s.icon}
        alt=""
        width={96}
        height={96}
        className="size-9 shrink-0"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold">{s.name}</p>
        <p className="truncate text-xs text-neutral-500">{s.note}</p>
      </div>
    </div>
  );
}

function Hub({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white p-4 shadow-xl ring-1 ring-primary/30",
        className,
      )}
    >
      <span className="connect-halo pointer-events-none absolute -inset-3 rounded-3xl ring-2 ring-primary/20" />
      <p className="flex items-center gap-2 text-sm font-semibold">
        <span className="grid size-6 place-items-center rounded-md bg-primary text-xs font-bold text-white">
          i
        </span>
        Unified inbox
      </p>
      <ul className="mt-3 space-y-2">
        {INBOX_ROWS.map(([name, dot, label], i) => (
          <li
            key={name}
            style={{ animationDelay: `${i * 1.2}s` }}
            className="connect-row flex items-center gap-2 rounded-lg bg-neutral-50 px-2.5 py-2 text-xs ring-1 ring-neutral-100"
          >
            <span className={cn("size-2 rounded-full", dot)} />
            <span className="font-semibold">{name}</span>
            <span className="ml-auto text-[10px] text-neutral-500">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Agent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-neutral-900 p-4 text-white shadow-xl ring-1 ring-white/10",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold">
        <svg viewBox="0 0 24 24" className="connect-spark size-4 fill-sky-300">
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
        </svg>
        AI agent
      </p>
      <ul className="mt-3 space-y-2">
        {AGENT_TASKS.map((t, i) => (
          <li
            key={t}
            style={{ animationDelay: `${i * 1.2}s` }}
            className="connect-task flex items-center gap-2 text-xs text-neutral-200"
          >
            <span className="grid size-4 place-items-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
              ✓
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OutputCard({
  o,
  className,
}: {
  o: (typeof OUTPUTS)[number];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-neutral-200",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold">
        <span className="size-2 rounded-full bg-emerald-500" />
        {o.title}
      </p>
      <p className="mt-0.5 text-xs text-neutral-500">{o.note}</p>
    </div>
  );
}

/* Mobile connector: a soft ribbon with a pulse running down it. */
function VLine() {
  return (
    <span className="relative my-3 block h-12 w-6">
      <span className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 rounded-full bg-primary/15 blur-[3px]" />
      <span className="absolute inset-y-0 left-[calc(50%-4px)] w-px bg-linear-to-b from-primary/20 via-primary/60 to-primary/20" />
      <span className="absolute inset-y-0 left-[calc(50%+3px)] w-px bg-linear-to-b from-primary/20 via-primary/60 to-primary/20" />
      <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-linear-to-b from-sky-300 via-primary to-indigo-400" />
      <span className="connect-vdot absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_6px_1px_rgb(59_130_246/0.5)] ring-1 ring-primary" />
    </span>
  );
}

const STAGE_LABEL =
  "text-[11px] font-semibold uppercase tracking-widest text-neutral-400";

export default function ConnectFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const fit = () => setScale(Math.min(1, wrap.clientWidth / W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mt-16">
      <style>{`
        @keyframes connect-pulse { from { stroke-dashoffset: 7; } to { stroke-dashoffset: -100; } }
        @keyframes connect-travel { 0% { offset-distance: 0%; opacity: 0; } 12% { opacity: .85; } 88% { opacity: .85; } 100% { offset-distance: 100%; opacity: 0; } }
        @keyframes connect-flow-v { from { top: -10%; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } to { top: 100%; opacity: 0; } }
        @keyframes connect-halo { 0%,100% { opacity: .25; transform: scale(1); } 50% { opacity: .9; transform: scale(1.03); } }
        @keyframes connect-row { 0%,70%,100% { background-color: rgb(250 250 250); } 15%,45% { background-color: rgb(239 246 255); } }
        @keyframes connect-task { 0%,100% { opacity: .55; } 20%,60% { opacity: 1; } }
        @keyframes connect-spark { 0%,100% { transform: rotate(0) scale(1); } 50% { transform: rotate(90deg) scale(1.2); } }
        .connect-pulse { stroke-dasharray: 7 93; animation: connect-pulse 3.6s ease-in-out infinite; }
        .connect-particle { offset-rotate: 0deg; opacity: 0; box-shadow: 0 0 6px 1px rgb(59 130 246 / .35); animation: connect-travel 4s linear infinite; }
        .connect-vdot { animation: connect-flow-v 1.8s ease-in-out infinite; }
        .connect-halo { animation: connect-halo 3.6s ease-in-out infinite; }
        .connect-row { animation: connect-row 3.6s ease-in-out infinite; }
        .connect-task { animation: connect-task 3.6s ease-in-out infinite; }
        .connect-spark { animation: connect-spark 3.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .connect-pulse, .connect-particle, .connect-vdot, .connect-halo, .connect-row, .connect-task, .connect-spark { animation: none; }
        }
      `}</style>

      {/* Desktop: one canvas, scaled to fit */}
      <div
        ref={wrapRef}
        className="relative mx-auto hidden w-full max-w-300 md:block"
        style={{ height: scale ? H * scale : undefined }}
      >
        <div
          aria-hidden
          className={cn(
            "absolute left-0 top-0 origin-top-left transition-opacity duration-500",
            scale ? "opacity-100" : "opacity-0",
          )}
          style={{ width: W, height: H, transform: `scale(${scale || 1})` }}
        >
          <svg
            width={W}
            height={H}
            className="absolute inset-0 overflow-visible"
          >
            <defs>
              <filter
                id="connect-blur"
                x="-20%"
                y="-50%"
                width="140%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="6" />
              </filter>
              {LINKS.map((l, i) => (
                <linearGradient
                  key={i}
                  id={`connect-g-${i}`}
                  gradientUnits="userSpaceOnUse"
                  x1={l.x1}
                  y1="0"
                  x2={l.x2}
                  y2="0"
                >
                  <stop offset="0" stopColor="#93c5fd" />
                  <stop offset="0.55" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#6366f1" stopOpacity="0.85" />
                </linearGradient>
              ))}
            </defs>

            {LINKS.map((l, i) => {
              const main = curve(l.x1, l.y1, l.x2, l.y2);
              const up = curve(l.x1, l.y1, l.x2, l.y2, -14);
              const down = curve(l.x1, l.y1, l.x2, l.y2, 14);
              const stroke = `url(#connect-g-${i})`;
              return (
                <g key={i} fill="none" strokeLinecap="round">
                  {/* soft glow */}
                  <path
                    d={main}
                    stroke={stroke}
                    strokeWidth="9"
                    opacity="0.16"
                    filter="url(#connect-blur)"
                  />
                  {/* thin drifting strands */}
                  <path d={up} stroke={stroke} strokeWidth="1" opacity="0.5" />
                  <path
                    d={down}
                    stroke={stroke}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  {/* main ribbon */}
                  <path d={main} stroke={stroke} strokeWidth="2.5" />
                  {/* a brighter pulse travelling along the ribbon */}
                  <path
                    d={main}
                    stroke="#fff"
                    strokeWidth="2"
                    opacity="0.9"
                    pathLength={100}
                    className="connect-pulse"
                    style={{ animationDelay: `${-l.delay}s` }}
                  />
                  {/* end nodes */}
                  {[
                    [l.x1, l.y1],
                    [l.x2, l.y2],
                  ].map(([cx, cy], k) => (
                    <g key={k}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="9"
                        fill="#3b82f6"
                        opacity="0.12"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="4.5"
                        fill="#fff"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* particles drifting along each bundle */}
          {LINKS.flatMap((l, i) =>
            [0, 1, 2].map((k) => (
              <span
                key={`${i}-${k}`}
                className="connect-particle absolute left-0 top-0 rounded-full bg-primary"
                style={{
                  width: k === 1 ? 4 : 3,
                  height: k === 1 ? 4 : 3,
                  offsetPath: `path("${curve(l.x1, l.y1 + (k - 1) * 4, l.x2, l.y2 + (k - 1) * 4, (k - 1) * 10)}")`,
                  animationDelay: `${-(l.delay + k * 1.3)}s`,
                  animationDuration: `${3.6 + k * 0.5}s`,
                }}
              />
            )),
          )}

          {/* Stage labels */}
          {[
            ["Your channels", 0, 200],
            ["One inbox", HUB_LEFT, 220],
            ["AI agent", AGENT_LEFT, 200],
            ["Automation", OUT_LEFT, 250],
          ].map(([label, x, w]) => (
            <p
              key={label as string}
              className={cn("absolute top-3 text-center", STAGE_LABEL)}
              style={{ left: x as number, width: w as number }}
            >
              {label}
            </p>
          ))}

          {SOURCES.map((s) => (
            <div
              key={s.name}
              className="absolute"
              style={{ left: 0, top: s.y, width: 230, height: 90 }}
            >
              <SourceCard s={s} className="h-full" />
            </div>
          ))}

          <div
            className="absolute"
            style={{
              left: HUB_LEFT,
              top: CENTER_Y - 85,
              width: HUB_RIGHT - HUB_LEFT,
            }}
          >
            <Hub />
          </div>

          <div
            className="absolute"
            style={{
              left: AGENT_LEFT,
              top: CENTER_Y - 78,
              width: AGENT_RIGHT - AGENT_LEFT,
            }}
          >
            <Agent />
          </div>

          {OUTPUTS.map((o) => (
            <div
              key={o.title}
              className="absolute"
              style={{ left: OUT_LEFT, top: o.y, width: 250, height: 80 }}
            >
              <OutputCard
                o={o}
                className="flex h-full flex-col justify-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div
        className="mx-auto flex max-w-sm flex-col items-center md:hidden"
        aria-hidden
      >
        <p className={STAGE_LABEL}>Your channels</p>
        <div className="mt-3 w-full space-y-2.5">
          {SOURCES.map((s) => (
            <SourceCard key={s.name} s={s} />
          ))}
        </div>
        <VLine />
        <p className={STAGE_LABEL}>One inbox</p>
        <Hub className="mt-3 w-full" />
        <VLine />
        <p className={STAGE_LABEL}>AI agent</p>
        <Agent className="mt-3 w-full" />
        <VLine />
        <p className={STAGE_LABEL}>Automation</p>
        <div className="mt-3 w-full space-y-2.5">
          {OUTPUTS.map((o) => (
            <OutputCard key={o.title} o={o} />
          ))}
        </div>
      </div>
    </div>
  );
}
