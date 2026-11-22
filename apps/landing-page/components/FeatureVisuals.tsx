import { cn } from "@repo/ui/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import { Avatar, Card, Meta, Pill } from "./HowItWorksCards";
import Image from "next/image";

/* Feature-section mockups built in the site's own UI language
   (replaces the old SVG screenshots). */

const solid = "bg-white/90 backdrop-blur-lg";

/* Loop length of each card's animation. Keyframes are percentages of this,
   so changing a value slows or speeds up the whole card evenly. */
const INBOX_DURATION = "6s";
const HANDOFF_DURATION = "6s";
const DRAFT_DURATION = "7s";
const VOICE_DURATION = "8s";
const OWNERSHIP_DURATION = "7s";
const LABELS_DURATION = "7s";
const SUMMARY_DURATION = "7s";

/* 1 · Shared inbox with the next action per chat */
const INBOX = [
  {
    name: "Afthah",
    channel: "https://img.icons8.com/fluency/96/instagram-new.png",
    preview: "Do you have this dress in black, size M?",
    action: "Stock check",
    tone: "amber",
    time: "2m",
  },
  {
    name: "Nuwan",
    channel: "https://img.icons8.com/office/40/whatsapp--v1.png",
    preview: "Can I pay COD for two items?",
    action: "Delivery quote",
    tone: "blue",
    time: "8m",
  },
  {
    name: "Priya",
    channel: "https://img.icons8.com/fluency/96/facebook-messenger--v2.png",
    preview: "Is the blue one still in stock?",
    action: "Awaiting reply",
    tone: "green",
    time: "21m",
  },
  {
    name: "Aakif",
    channel: "https://img.icons8.com/office/40/whatsapp--v1.png",
    preview: "Is the black one still in stock?",
    action: "Awaiting reply",
    tone: "green",
    time: "21m",
  },
] as const;

export function InboxPreview() {
  return (
    <Card className={cn(solid, "p-0 overflow-hidden")} aria-hidden>
      <style>{`
        ${inboxKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .inview-ianim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .inview-icount:not(:last-child) { display: none; }
        }
      `}</style>
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
        <p className="text-sm font-semibold">Unified inbox</p>
        <span className="relative grid text-xs text-neutral-400">
          {INBOX.map((_, i) => (
            <span
              key={i}
              style={{
                gridArea: "1 / 1",
                animation: `inview-icount-${i} ${INBOX_DURATION} ease-out infinite`,
              }}
              className="inview-ianim inview-icount text-right opacity-0"
            >
              {i + 1} open
            </span>
          ))}
        </span>
      </div>
      <ul className="divide-y divide-neutral-100 relative">
        {INBOX.map((row, i) => (
          <li
            key={row.name}
            style={{
              animation: `inview-irow-${i} ${INBOX_DURATION} ease-out infinite`,
            }}
            className="inview-ianim flex items-center gap-3 px-5 py-3.5 opacity-0"
          >
            <span className="relative">
              <Avatar>{row.name[0]}</Avatar>
              <span
                style={{
                  animation: `inview-idot-${i} ${INBOX_DURATION} ease-out infinite`,
                }}
                className="inview-ianim absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary opacity-0 ring-2 ring-white"
              />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{row.name}</p>
                <Image
                  src={row.channel}
                  alt=""
                  width={100}
                  height={100}
                  className="w-5"
                />
              </div>
              <p className="truncate text-xs text-neutral-500">{row.preview}</p>
            </div>
            <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
              <span
                style={{
                  animation: `inview-ipill-${i} ${INBOX_DURATION} ease-out infinite`,
                }}
                className="inview-ianim opacity-0"
              >
                <Pill tone={row.tone}>{row.action}</Pill>
              </span>
              <span className="text-[11px] text-neutral-400">{row.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* 2 · Follow-up handoff */
const HANDOFFS = [
  {
    title: "Stock check",
    detail: "Black dress, M",
    note: "“I’ll check stock and get back to you.”",
    who: "NK",
    tone: "amber",
    label: "Waiting on us",
    after: "✓ Done",
  },
  {
    title: "Delivery quote",
    detail: "Kandy · 2 items",
    note: "“Can you quote delivery to Kandy?”",
    who: "SP",
    tone: "blue",
    label: "Assigned",
    after: "✓ Accepted",
  },
  {
    title: "Size check",
    detail: "Black dress, L",
    note: "“Let me confirm size L and reply.”",
    who: "NK",
    tone: "amber",
    label: "Waiting on us",
    after: null,
  },
] as const;

export function HandoffPreview() {
  return (
    <div className="h-full space-y-1.5 overflow-hidden" aria-hidden>
      <style>{`
        ${handoffKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .inview-hanim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .inview-hbefore { display: none; }
        }
      `}</style>
      {HANDOFFS.map((h, i) => (
        <Card
          key={h.title}
          style={{
            animation: `inview-hcard-${i} ${HANDOFF_DURATION} ease-out infinite`,
          }}
          className={cn(solid, "inview-hanim h-28 rounded-md p-4 opacity-0")}
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{h.title}</p>
              <Meta>{h.detail}</Meta>
            </div>
            <div className="grid justify-items-end">
              <span
                style={{
                  gridArea: "1 / 1",
                  animation: h.after
                    ? `inview-hbefore-${i} ${HANDOFF_DURATION} ease-out infinite`
                    : undefined,
                }}
                className="inview-hanim inview-hbefore"
              >
                <Pill tone={h.tone}>{h.label}</Pill>
              </span>
              {h.after && (
                <span
                  style={{
                    gridArea: "1 / 1",
                    animation: `inview-hafter-${i} ${HANDOFF_DURATION} ease-out infinite`,
                  }}
                  className="inview-hanim opacity-0"
                >
                  <Pill tone="green">{h.after}</Pill>
                </span>
              )}
            </div>
            <span
              style={{
                animation: `inview-hring-${i} ${HANDOFF_DURATION} ease-out infinite`,
              }}
              className="inview-hanim grid size-7 shrink-0 place-items-center rounded-full bg-neutral-100 text-[10px] font-semibold text-neutral-600"
            >
              {h.who}
            </span>
          </div>
          <p className="mt-3 rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
            {h.note}
          </p>
        </Card>
      ))}
    </div>
  );
}

/* 3 · Editable draft: question arrives, AI drafts word by word, seller sends (7s loop) */
const DRAFT_WORDS = "Hi Afthah! Checking black, M and COD for you now.".split(
  " ",
);

const kf = (name: string, stops: [number, string][]) =>
  `@keyframes ${name} { ${stops.map(([p, css]) => `${p}% { ${css} }`).join(" ")} }`;
const SHOW = "opacity:1; transform:none;";
const HIDE = "opacity:0; transform:translateY(6px);";

const rowStart = (i: number) => 6 + i * 11;
const inboxKeyframes = [
  ...INBOX.flatMap((_, i) => {
    const st = rowStart(i);
    const last = i === INBOX.length - 1;
    const nextSt = last ? 94 : rowStart(i + 1);
    const endOp = last ? "opacity:1;" : "opacity:0;";
    return [
      kf(`inview-irow-${i}`, [
        [0, HIDE],
        [st, HIDE],
        [st + 4, SHOW],
        [94, SHOW],
        [100, HIDE],
      ]),
      kf(`inview-ipill-${i}`, [
        [0, "opacity:0;transform:scale(.6);"],
        [st + 4, "opacity:0;transform:scale(.6);"],
        [st + 8, "opacity:1;transform:scale(1);"],
        [94, "opacity:1;transform:scale(1);"],
        [100, "opacity:0;"],
      ]),
      kf(`inview-idot-${i}`, [
        [0, "opacity:0;"],
        [st + 3, "opacity:0;"],
        [st + 5, "opacity:1;"],
        [94, "opacity:1;"],
        [100, "opacity:0;"],
      ]),
      kf(`inview-icount-${i}`, [
        [0, "opacity:0;"],
        [st + 3, "opacity:0;"],
        [st + 5, "opacity:1;"],
        [nextSt + 3, "opacity:1;"],
        [nextSt + 5, endOp],
        [94, endOp],
        [100, "opacity:0;"],
      ]),
    ];
  }),
].join(" ");

const handoffKeyframes = [
  ...HANDOFFS.flatMap((_, i) => {
    const st = 4 + i * 12;
    const done = 56 + i * 14;
    return [
      kf(`inview-hcard-${i}`, [
        [0, HIDE],
        [st, HIDE],
        [st + 5, SHOW],
        [94, SHOW],
        [100, HIDE],
      ]),
      kf(`inview-hbefore-${i}`, [
        [0, "opacity:1;"],
        [done, "opacity:1;"],
        [done + 3, "opacity:0;"],
        [99, "opacity:0;"],
        [100, "opacity:1;"],
      ]),
      kf(`inview-hafter-${i}`, [
        [0, "opacity:0;transform:scale(.7);"],
        [done + 2, "opacity:0;transform:scale(.7);"],
        [done + 6, "opacity:1;transform:scale(1);"],
        [94, "opacity:1;transform:scale(1);"],
        [100, "opacity:0;"],
      ]),
      kf(`inview-hring-${i}`, [
        [0, "box-shadow:0 0 0 0 rgba(96,165,250,0);"],
        [done, "box-shadow:0 0 0 0 rgba(96,165,250,.55);"],
        [done + 8, "box-shadow:0 0 0 9px rgba(96,165,250,0);"],
        [100, "box-shadow:0 0 0 0 rgba(96,165,250,0);"],
      ]),
    ];
  }),
].join(" ");

const draftKeyframes = [
  kf("inview-q", [
    [0, HIDE],
    [4, HIDE],
    [8, SHOW],
    [94, SHOW],
    [100, HIDE],
  ]),
  kf("inview-typing", [
    [0, HIDE],
    [12, HIDE],
    [15, SHOW],
    [26, SHOW],
    [28, HIDE],
    [100, HIDE],
  ]),
  kf("inview-reply", [
    [0, "opacity:0;"],
    [27, "opacity:0;"],
    [29, "opacity:1;"],
    [94, "opacity:1;"],
    [100, "opacity:0;"],
  ]),
  kf("inview-sentbg", [
    [0, "opacity:0;"],
    [61, "opacity:0;"],
    [66, "opacity:1;"],
    [94, "opacity:1;"],
    [100, "opacity:0;"],
  ]),
  kf("inview-sentfg", [
    [0, "color:#404040;"],
    [61, "color:#404040;"],
    [66, "color:#fff;"],
    [94, "color:#fff;"],
    [100, "color:#404040;"],
  ]),
  kf("inview-status", [
    [0, HIDE],
    [68, HIDE],
    [72, SHOW],
    [94, SHOW],
    [100, HIDE],
  ]),
  kf("inview-press", [
    [0, "transform:scale(1);"],
    [56, "transform:scale(1);"],
    [59, "transform:scale(.92);"],
    [63, "transform:scale(1);"],
    [100, "transform:scale(1);"],
  ]),
  kf("inview-dot", [
    [0, "transform:translateY(0);"],
    [50, "transform:translateY(-3px);"],
    [100, "transform:translateY(0);"],
  ]),
  ...DRAFT_WORDS.map((_, i) => {
    const t = 28 + (i * 24) / DRAFT_WORDS.length;
    return kf(`inview-w${i}`, [
      [0, "opacity:0;"],
      [t, "opacity:0;"],
      [t + 1.5, "opacity:1;"],
      [94, "opacity:1;"],
      [100, "opacity:0;"],
    ]);
  }),
].join(" ");

export function DraftPreview() {
  return (
    <Card
      className={cn(
        solid,
        "flex h-full flex-col gap-3 rounded-b-none shadow-none ring-0",
      )}
      aria-hidden
    >
      <style>{`
        ${draftKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .inview-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .inview-typing { display: none; }
        }
      `}</style>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Reply draft</p>
        <Pill tone="blue">AI assist</Pill>
      </div>

      <p
        style={{ animation: `inview-q ${DRAFT_DURATION} ease-out infinite` }}
        className="inview-anim w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-neutral-100 px-3.5 py-2.5 text-sm text-neutral-700 opacity-0"
      >
        Is the black M available?
      </p>

      <div className="relative min-h-[6.75rem]">
        <div
          style={{
            animation: `inview-typing ${DRAFT_DURATION} ease-out infinite`,
          }}
          className="inview-anim inview-typing absolute right-0 top-0 flex items-center gap-1 rounded-xl rounded-tr-sm bg-primary/10 px-3.5 py-3.5 opacity-0"
        >
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              style={{
                animation: `inview-dot .9s ease-in-out ${d * 0.15}s infinite`,
              }}
              className="inview-anim size-1.5 rounded-full bg-primary"
            />
          ))}
        </div>

        <div
          style={{
            animation: `inview-reply ${DRAFT_DURATION} ease-out infinite`,
          }}
          className="inview-anim ml-auto w-fit max-w-[90%] opacity-0"
        >
          <div className="relative rounded-xl rounded-tr-sm bg-primary/10">
            <span
              style={{
                animation: `inview-sentbg ${DRAFT_DURATION} ease-out infinite`,
              }}
              className="inview-anim absolute inset-0 rounded-xl rounded-tr-sm bg-primary opacity-0"
            />
            <p
              style={{
                animation: `inview-sentfg ${DRAFT_DURATION} linear infinite`,
              }}
              className="inview-anim relative px-3.5 py-2.5 text-sm leading-relaxed text-neutral-700"
            >
              {DRAFT_WORDS.map((w, i) => (
                <span
                  key={i}
                  style={{
                    animation: `inview-w${i} ${DRAFT_DURATION} ease-out infinite`,
                  }}
                  className="inview-anim opacity-0"
                >
                  {w}
                  {i < DRAFT_WORDS.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>
          <p
            style={{
              animation: `inview-status ${DRAFT_DURATION} ease-out infinite`,
            }}
            className="inview-anim mt-1 text-right text-[11px] font-medium text-emerald-600 opacity-0"
          >
            ✓✓ Sent · just now
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 pb-2">
        <span
          style={{
            animation: `inview-press ${DRAFT_DURATION} ease-in-out infinite`,
          }}
          className="inview-anim rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm"
        >
          Send
        </span>
        <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
          Saved replies
        </span>
      </div>
    </Card>
  );
}

/* 4 · Voice assistant: animated waveform + automation steps on the card gradient */
const WAVE = Array.from({ length: 27 }, (_, i) => {
  const d = (i - 13) / 6;
  return {
    h: Math.round(14 + 86 * Math.exp(-d * d)),
    dur: 0.9 + ((i * 7) % 5) * 0.14,
    delay: -((i * 13) % 11) * 0.11,
  };
});

const AUTOMATION = [
  "Found stock check · Black dress, M",
  "Assigned to Nuwan",
  "Reminder set · 4:30 pm",
];

/* One 8s loop: each step slides in, spins, then ticks; the list fades and restarts. */
const stepKeyframes = AUTOMATION.map((_, i) => {
  const start = 8 + i * 22;
  const done = start + 16;
  return `
    @keyframes inview-row-${i} { 0%,${start - 1}% { opacity:0; transform:translateY(6px);} ${start + 3}%,92% { opacity:1; transform:none;} 100% { opacity:0; transform:none;} }
    @keyframes inview-spin-${i} { 0%,${start}% { opacity:0;} ${start + 2}%,${done - 1}% { opacity:1;} ${done}%,100% { opacity:0;} }
    @keyframes inview-tick-${i} { 0%,${done - 1}% { opacity:0; transform:scale(.4);} ${done + 3}%,92% { opacity:1; transform:scale(1);} 100% { opacity:0;} }`;
}).join("");

export function VoicePreview() {
  return (
    <div
      className="flex flex-col items-center gap-6 pb-8 md:flex-row md:gap-8"
      aria-hidden
    >
      <style>{`
        @keyframes inview-wave { 0%,100% { transform: scaleY(.28); } 50% { transform: scaleY(1); } }
        @keyframes inview-ping { 0% { transform: scale(.9); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes inview-spin { to { transform: rotate(360deg); } }
        ${stepKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .inview-bar, .inview-ping, .inview-spinner { animation: none !important; }
          .inview-row, .inview-tick { animation: none !important; opacity: 1 !important; transform: none !important; }
          .inview-spin-wrap { display: none; }
        }
      `}</style>

      {/* Voice */}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-5 self-stretch">
        <div className="flex max-w-full items-center gap-2.5 rounded-full bg-white/85 py-2 pl-2 pr-4 text-sm shadow-lg ring-1 ring-white/70 backdrop-blur-xl">
          <span className="relative grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white">
            <span className="inview-ping absolute inset-0 rounded-full bg-primary [animation:inview-ping_1.8s_ease-out_infinite]" />
            <svg
              viewBox="0 0 24 24"
              className="relative size-3.5 fill-none stroke-current stroke-2"
            >
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="truncate text-neutral-700">
            “Assign the stock check to Nuwan and remind me at 4:30.”
          </span>
        </div>

        <div className="flex h-28 w-full items-center justify-center gap-[5px]">
          {WAVE.map((b, i) => (
            <span
              key={i}
              style={{
                height: `${b.h}%`,
                animation: `inview-wave ${b.dur}s ease-in-out ${b.delay}s infinite`,
              }}
              className={cn(
                "inview-bar w-[5px] origin-center rounded-full",
                Math.abs(i - 13) < 5 ? "bg-white" : "bg-white/60",
              )}
            />
          ))}
        </div>
      </div>

      {/* Automation working through the request */}
      <div className="w-full shrink-0 rounded-xl bg-white/85 p-4 shadow-xl ring-1 ring-white/70 backdrop-blur-xl md:w-64">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
          <span className="relative flex size-2">
            <span className="inview-ping absolute inset-0 rounded-full bg-emerald-500 [animation:inview-ping_1.6s_ease-out_infinite]" />
            <span className="relative size-2 rounded-full bg-emerald-500" />
          </span>
          Inview is working on it
        </div>
        <ul className="mt-3 space-y-2.5">
          {AUTOMATION.map((label, i) => (
            <li
              key={label}
              style={{
                animation: `inview-row-${i} ${VOICE_DURATION} ease-out infinite`,
              }}
              className="inview-row flex items-center gap-2.5 opacity-0"
            >
              <span className="relative size-5 shrink-0">
                <span
                  style={{
                    animation: `inview-spin-${i} ${VOICE_DURATION} linear infinite`,
                  }}
                  className="inview-spin-wrap absolute inset-0 opacity-0"
                >
                  <span className="inview-spinner absolute inset-0 rounded-full border-2 border-primary/25 border-t-primary [animation:inview-spin_.8s_linear_infinite]" />
                </span>
                <span
                  style={{
                    animation: `inview-tick-${i} ${VOICE_DURATION} ease-out infinite`,
                  }}
                  className="inview-tick absolute inset-0 grid place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white opacity-0"
                >
                  ✓
                </span>
              </span>
              <span className="text-xs font-medium text-neutral-700">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 5 · Ownership and handoff */
const frameCard = cn(
  solid,
  "rounded-b-none rounded-t-[3px] shadow-none ring-0",
);

const ownKeyframes = [
  kf("inview-otitle", [
    [0, HIDE],
    [2, HIDE],
    [6, SHOW],
    [94, SHOW],
    [100, HIDE],
  ]),
  kf("inview-odue", [
    [0, "opacity:0;transform:scale(.7);"],
    [7, "opacity:0;transform:scale(.7);"],
    [11, "opacity:1;transform:scale(1);"],
    [94, "opacity:1;transform:scale(1);"],
    [100, "opacity:0;"],
  ]),
  kf("inview-osara", [
    [0, HIDE],
    [11, HIDE],
    [15, SHOW],
    [40, SHOW],
    [46, "opacity:.5;transform:none;"],
    [94, "opacity:.5;transform:none;"],
    [100, HIDE],
  ]),
  kf("inview-onote", [
    [0, HIDE],
    [20, HIDE],
    [25, SHOW],
    [94, SHOW],
    [100, HIDE],
  ]),
  kf("inview-oline", [
    [0, "transform:scaleY(0);opacity:0;"],
    [38, "transform:scaleY(0);opacity:1;"],
    [46, "transform:scaleY(1);opacity:1;"],
    [94, "transform:scaleY(1);opacity:1;"],
    [100, "opacity:0;"],
  ]),
  kf("inview-ohanded", [
    [0, "opacity:0;"],
    [44, "opacity:0;"],
    [48, "opacity:1;"],
    [94, "opacity:1;"],
    [100, "opacity:0;"],
  ]),
  kf("inview-okamal", [
    [0, HIDE],
    [46, HIDE],
    [52, SHOW],
    [94, SHOW],
    [100, HIDE],
  ]),
  kf("inview-oring", [
    [0, "box-shadow:0 0 0 0 rgba(100,116,139,0);"],
    [52, "box-shadow:0 0 0 0 rgba(100,116,139,.45);"],
    [62, "box-shadow:0 0 0 9px rgba(100,116,139,0);"],
    [100, "box-shadow:0 0 0 0 rgba(100,116,139,0);"],
  ]),
  kf("inview-oflash", [
    [0, "background-color:rgba(96,165,250,.08);"],
    [54, "background-color:rgba(96,165,250,.08);"],
    [58, "background-color:rgba(96,165,250,.28);"],
    [64, "background-color:rgba(96,165,250,.08);"],
    [100, "background-color:rgba(96,165,250,.08);"],
  ]),
  kf("inview-oseen", [
    [0, "opacity:0;"],
    [62, "opacity:0;"],
    [66, "opacity:1;"],
    [94, "opacity:1;"],
    [100, "opacity:0;"],
  ]),
].join(" ");

export function OwnershipPreview() {
  return (
    <Card className={cn(frameCard, "h-[17rem] overflow-hidden")} aria-hidden>
      <style>{`
        ${ownKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .inview-oanim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="flex items-center justify-between gap-3">
        <p
          style={{
            animation: `inview-otitle ${OWNERSHIP_DURATION} ease-out infinite`,
          }}
          className="inview-oanim text-sm font-semibold opacity-0"
        >
          Stock check · Black, M
        </p>
        <span
          style={{
            animation: `inview-odue ${OWNERSHIP_DURATION} ease-out infinite`,
          }}
          className="inview-oanim opacity-0"
        >
          <Pill tone="amber">Due 4:30 pm</Pill>
        </span>
      </div>

      <ol className="mt-4">
        <li
          style={{
            animation: `inview-osara ${OWNERSHIP_DURATION} ease-out infinite`,
          }}
          className="inview-oanim relative flex items-center gap-3 pb-4 opacity-0"
        >
          <span
            style={{
              animation: `inview-oline ${OWNERSHIP_DURATION} ease-in-out infinite`,
            }}
            className="inview-oanim absolute left-[17px] top-9 h-[calc(100%-1.25rem)] w-px origin-top bg-primary/40 opacity-0"
          />
          <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
            S
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Sara</p>
            <Meta>Assigned · Morning shift</Meta>
          </div>
          <span
            style={{
              animation: `inview-ohanded ${OWNERSHIP_DURATION} ease-out infinite`,
            }}
            className="inview-oanim rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500 opacity-0"
          >
            Handed off
          </span>
        </li>

        <li
          style={{
            animation: `inview-okamal ${OWNERSHIP_DURATION} ease-out infinite`,
          }}
          className="inview-oanim relative flex items-center gap-3 pb-4 opacity-0"
        >
          <span
            style={{
              animation: `inview-oring ${OWNERSHIP_DURATION} ease-out infinite`,
            }}
            className="inview-oanim relative grid size-9 shrink-0 place-items-center rounded-full bg-slate-500 text-sm font-semibold text-white"
          >
            K
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Kamal</p>
            <Meta>Reassigned · Evening shift</Meta>
          </div>
          <span
            style={{
              animation: `inview-oseen ${OWNERSHIP_DURATION} ease-out infinite`,
            }}
            className="inview-oanim rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 opacity-0"
          >
            ✓ Seen
          </span>
        </li>
      </ol>

      <p
        style={{
          animation: `inview-onote ${OWNERSHIP_DURATION} ease-out infinite, inview-oflash ${OWNERSHIP_DURATION} ease-in-out infinite`,
        }}
        className="inview-oanim rounded-lg px-3 py-2.5 text-xs text-neutral-600 opacity-0"
      >
        Note: promised to confirm stock by 4:30 pm
      </p>
    </Card>
  );
}

/* 6 · Labels and filters */
const tagTones = {
  blue: "bg-primary/10 text-primary ring-primary/20",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  neutral: "bg-neutral-100 text-neutral-700 ring-neutral-200",
} as const;

function Tag({
  tone,
  children,
}: {
  tone: keyof typeof tagTones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "rounded-sm px-2.5 py-1 text-[11px] font-medium ring-1",
        tagTones[tone],
      )}
    >
      {children}
    </span>
  );
}

const LABELLED = [
  {
    name: "Aisha",
    preview: "Is the black dress available in M?",
    label: "Sales enquiry",
    tone: "blue",
  },
  {
    name: "Nuwan",
    preview: "Confirmed, 2 items to Galle",
    label: "Order",
    tone: "green",
  },
  {
    name: "Priya",
    preview: "The zip broke on my last order",
    label: "Support",
    tone: "amber",
  },
  {
    name: "+94 77 123 4567",
    preview: "Win a free phone, click here",
    label: "Likely spam",
    tone: "red",
  },
  {
    name: "Kamal",
    preview: "Do you restock the blue one?",
    label: "Sales enquiry",
    tone: "blue",
  },
] as const;

const labelKeyframes = [
  ...LABELLED.flatMap((_, i) => {
    const start = 4 + i * 11;
    return [
      kf(`inview-lrow-${i}`, [
        [0, HIDE],
        [start, HIDE],
        [start + 3, SHOW],
        [94, SHOW],
        [100, HIDE],
      ]),
      kf(`inview-lpend-${i}`, [
        [0, "opacity:0;"],
        [start + 2, "opacity:0;"],
        [start + 4, "opacity:1;"],
        [start + 12, "opacity:1;"],
        [start + 14, "opacity:0;"],
        [100, "opacity:0;"],
      ]),
      kf(`inview-llabel-${i}`, [
        [0, "opacity:0;transform:scale(.6);"],
        [start + 13, "opacity:0;transform:scale(.6);"],
        [start + 17, "opacity:1;transform:scale(1);"],
        [94, "opacity:1;transform:scale(1);"],
        [100, "opacity:0;"],
      ]),
    ];
  }),
  kf("inview-lblink", [
    [0, "opacity:.3;"],
    [50, "opacity:1;"],
    [100, "opacity:.3;"],
  ]),
].join(" ");

export function LabelsPreview() {
  return (
    <Card
      className={cn(frameCard, "h-[17rem] overflow-hidden p-0")}
      aria-hidden
    >
      <style>{`
        ${labelKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .inview-lanim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .inview-lpend { display: none; }
        }
      `}</style>
      <div className="flex flex-nowrap items-center gap-2 overflow-hidden whitespace-nowrap border-b border-neutral-100 px-4 py-3">
        <span className="text-xs text-neutral-500">Filter by</span>
        <Tag tone="neutral">Channel</Tag>
        <Tag tone="neutral">Owner</Tag>
        <Tag tone="neutral">Status</Tag>
      </div>
      <ul className="divide-y divide-neutral-100">
        {LABELLED.map((row, i) => (
          <li
            key={row.name}
            style={{
              animation: `inview-lrow-${i} ${LABELS_DURATION} ease-out infinite`,
            }}
            className="inview-lanim flex items-center gap-3 px-4 py-3 opacity-0"
          >
            <Avatar>{row.name[0] === "+" ? "?" : row.name[0]}</Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{row.name}</p>
              <p className="truncate text-xs text-neutral-500">{row.preview}</p>
            </div>
            <div className="grid shrink-0 justify-items-end">
              <span
                style={{
                  gridArea: "1 / 1",
                  animation: `inview-lpend-${i} ${LABELS_DURATION} ease-out infinite`,
                }}
                className="inview-lanim inview-lpend inline-flex items-center gap-1.5 rounded-sm bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500 opacity-0 ring-0 ring-neutral-200"
              >
                <span
                  style={{
                    animation: "inview-lblink .8s ease-in-out infinite",
                  }}
                  className="inview-lanim size-1.5 rounded-full bg-primary"
                />
                Labelling…
              </span>
              <span
                style={{
                  gridArea: "1 / 1",
                  animation: `inview-llabel-${i} ${LABELS_DURATION} ease-out infinite`,
                }}
                className={cn(
                  "inview-lanim h-fit rounded-sm px-2.5 py-1 text-[11px] font-medium opacity-0  shadow-md shadow-muted-foreground/5",
                  tagTones[row.tone],
                )}
              >
                {row.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* 7 · Conversation summary: an AI agent reads the chat and fills in the order details (7s loop) */
const SUMMARY = [
  ["Product", "Floral dress"],
  ["Variant", "Black · M"],
  ["Quantity", "1"],
  ["Payment", "COD"],
];

const summaryKeyframes = [
  kf("inview-sbubble", [
    [0, HIDE],
    [3, SHOW],
    [94, SHOW],
    [100, HIDE],
  ]),
  kf("inview-sscan", [
    [0, "transform:translateX(-120%);opacity:0;"],
    [6, "transform:translateX(-120%);opacity:1;"],
    [28, "transform:translateX(420%);opacity:1;"],
    [30, "transform:translateX(420%);opacity:0;"],
    [100, "transform:translateX(420%);opacity:0;"],
  ]),
  kf("inview-sreading", [
    [0, "opacity:0;"],
    [3, "opacity:1;"],
    [30, "opacity:1;"],
    [33, "opacity:0;"],
    [100, "opacity:0;"],
  ]),
  kf("inview-sready", [
    [0, "opacity:0;"],
    [33, "opacity:0;"],
    [37, "opacity:1;"],
    [94, "opacity:1;"],
    [100, "opacity:0;"],
  ]),
  kf("inview-sspark", [
    [0, "transform:rotate(0);"],
    [100, "transform:rotate(360deg);"],
  ]),
  ...SUMMARY.map((_, i) =>
    kf(`inview-sfield-${i}`, [
      [0, "opacity:0;transform:scale(.92);"],
      [32 + i * 5, "opacity:0;transform:scale(.92);"],
      [36 + i * 5, "opacity:1;transform:scale(1);"],
      [94, "opacity:1;transform:scale(1);"],
      [100, "opacity:0;transform:scale(1);"],
    ]),
  ),
  kf("inview-sflag", [
    [0, "opacity:0;transform:translateY(6px);"],
    [56, "opacity:0;transform:translateY(6px);"],
    [60, "opacity:1;transform:none;"],
    [94, "opacity:1;transform:none;"],
    [100, "opacity:0;"],
  ]),
].join(" ");

export function SummaryPreview() {
  return (
    <Card className={cn(frameCard, "h-[17rem] overflow-hidden")} aria-hidden>
      <style>{`
        ${summaryKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .inview-sanim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .inview-sreading, .inview-sscan { display: none; }
        }
      `}</style>

      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
        <svg
          viewBox="0 0 24 24"
          style={{ animation: "inview-sspark 3s linear infinite" }}
          className="inview-sanim size-4 fill-primary"
        >
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
        </svg>
        <span className="relative h-4 flex-1">
          <span
            style={{
              animation: `inview-sreading ${SUMMARY_DURATION} ease-out infinite`,
            }}
            className="inview-sanim inview-sreading absolute inset-0 opacity-0"
          >
            AI is reading the chat…
          </span>
          <span
            style={{
              animation: `inview-sready ${SUMMARY_DURATION} ease-out infinite`,
            }}
            className="inview-sanim absolute inset-0 text-emerald-600 opacity-0"
          >
            ✓ Summary ready
          </span>
        </span>
      </div>

      <p
        style={{
          animation: `inview-sbubble ${SUMMARY_DURATION} ease-out infinite`,
        }}
        className="inview-sanim relative mt-3 overflow-hidden rounded-xl rounded-tl-sm bg-card px-3 py-2 text-xs leading-relaxed text-neutral-700 opacity-0"
      >
        “Hi! I’d like the floral dress in black, size M. Just one, cash on
        delivery please.”
        <span
          style={{
            animation: `inview-sscan ${SUMMARY_DURATION} ease-in-out infinite`,
          }}
          className="inview-sanim inview-sscan pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0"
        />
      </p>

      <dl className="mt-3 grid grid-cols-2 gap-2">
        {SUMMARY.map(([k, v], i) => (
          <div
            key={k}
            style={{
              animation: `inview-sfield-${i} ${SUMMARY_DURATION} ease-out infinite`,
            }}
            className="inview-sanim rounded-sm bg-card px-3 py-2 opacity-0  shadow-xs"
          >
            <dt className="text-[11px] text-neutral-500">{k}</dt>
            <dd className="text-[13px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div
        style={{
          animation: `inview-sflag ${SUMMARY_DURATION} ease-out infinite`,
        }}
        className="inview-sanim mt-3 opacity-0"
      >
        <Pill tone="amber">Address · needs review</Pill>
      </div>
    </Card>
  );
}
