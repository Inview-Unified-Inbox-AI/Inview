import { cn } from "@repo/ui/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import { Avatar, Card, Meta, Pill } from "./HowItWorksCards";
import Image from "next/image";

/* Feature-section mockups built in the site's own UI language
   (replaces the old SVG screenshots). */

const solid = "bg-white/90 backdrop-blur-lg";

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
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
        <p className="text-sm font-semibold">Unified inbox</p>
        <span className="text-xs text-neutral-400">3 open</span>
      </div>
      <ul className="divide-y divide-neutral-100 relative">
        {INBOX.map((row) => (
          <li key={row.name} className="flex items-center gap-3 px-5 py-3.5">
            <Avatar>{row.name[0]}</Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{row.name}</p>
                {/* <ChannelBadge channel={row.channel} /> */}

                <Image
                  src={row.channel}
                  alt={row.action}
                  width={100}
                  height={100}
                  className="w-5"
                />
              </div>
              <p className="truncate text-xs text-neutral-500">{row.preview}</p>
            </div>
            <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
              <Pill tone={row.tone}>{row.action}</Pill>
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
  },
  {
    title: "Delivery quote",
    detail: "Kandy · 2 items",
    note: "“Can you quote delivery to Kandy?”",
    who: "SP",
    tone: "blue",
    label: "Assigned",
  },
  {
    title: "Size check",
    detail: "Black dress, L",
    note: "“Let me confirm size L and reply.”",
    who: "NK",
    tone: "amber",
    label: "Waiting on us",
  },
] as const;

export function HandoffPreview() {
  return (
    <div className="h-full space-y-1.5 overflow-hidden" aria-hidden>
      {HANDOFFS.map((h) => (
        <Card key={h.title} className={cn(solid, "rounded-md h-28 p-4")}>
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{h.title}</p>
              <Meta>{h.detail}</Meta>
            </div>
            <Pill tone={h.tone}>{h.label}</Pill>
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-100 text-[10px] font-semibold text-neutral-600">
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

/* 3 · Editable draft */
export function DraftPreview() {
  return (
    <Card
      className={cn(
        solid,
        "space-y-3 rounded-b-none h-full shadow-none ring-0",
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Reply draft</p>
        <Pill tone="blue">AI assist</Pill>
      </div>
      <p className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-neutral-100 px-3.5 py-2.5 text-sm text-neutral-700">
        Is the black M available?
      </p>
      <p className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm bg-primary/10 px-3.5 py-2.5 text-sm leading-relaxed text-neutral-700">
        Hi Afthah! Checking black, M and COD for you now.
      </p>
      <div className="flex items-center gap-2 pt-1 mt-10">
        <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm">
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
              style={{ animation: `inview-row-${i} 8s ease-out infinite` }}
              className="inview-row flex items-center gap-2.5 opacity-0"
            >
              <span className="relative size-5 shrink-0">
                <span
                  style={{ animation: `inview-spin-${i} 8s linear infinite` }}
                  className="inview-spin-wrap absolute inset-0 opacity-0"
                >
                  <span className="inview-spinner absolute inset-0 rounded-full border-2 border-primary/25 border-t-primary [animation:inview-spin_.8s_linear_infinite]" />
                </span>
                <span
                  style={{ animation: `inview-tick-${i} 8s ease-out infinite` }}
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

export function OwnershipPreview() {
  const people = [
    {
      initial: "S",
      name: "Sara",
      meta: "Assigned · Morning shift",
      bg: "bg-primary",
    },
    {
      initial: "K",
      name: "Kamal",
      meta: "Reassigned · Evening shift",
      bg: "bg-slate-500",
    },
  ];
  return (
    <Card className={cn(frameCard, "h-[17rem] overflow-hidden")} aria-hidden>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Stock check · Black, M</p>
        <Pill tone="amber">Due 4:30 pm</Pill>
      </div>
      <ol className="mt-4">
        {people.map((p, i) => (
          <li key={p.name} className="relative flex items-center gap-3 pb-4">
            {i === 0 && (
              <span className="absolute left-[17px] top-9 h-[calc(100%-1.25rem)] w-px bg-primary/30" />
            )}
            <span
              className={cn(
                "relative grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-white",
                p.bg,
              )}
            >
              {p.initial}
            </span>
            <div>
              <p className="text-sm font-semibold">{p.name}</p>
              <Meta>{p.meta}</Meta>
            </div>
          </li>
        ))}
      </ol>
      <p className="rounded-lg bg-primary/[0.06] px-3 py-2.5 text-xs text-neutral-600">
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
        "rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
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

export function LabelsPreview() {
  return (
    <Card
      className={cn(frameCard, "h-[17rem] overflow-hidden p-0")}
      aria-hidden
    >
      <div className="flex flex-nowrap items-center gap-2 overflow-hidden whitespace-nowrap border-b border-neutral-100 px-4 py-3">
        <span className="text-xs text-neutral-500">Filter by</span>
        <Tag tone="neutral">Channel</Tag>
        <Tag tone="neutral">Owner</Tag>
        <Tag tone="neutral">Status</Tag>
      </div>
      <ul className="divide-y divide-neutral-100">
        {LABELLED.map((row) => (
          <li key={row.name} className="flex items-center gap-3 px-4 py-3">
            <Avatar>{row.name[0] === "+" ? "?" : row.name[0]}</Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{row.name}</p>
              <p className="truncate text-xs text-neutral-500">{row.preview}</p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
                tagTones[row.tone],
              )}
            >
              {row.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* 7 · Conversation summary */
const SUMMARY = [
  ["Product", "Floral dress"],
  ["Variant", "Black · M"],
  ["Quantity", "1"],
  ["Payment", "COD"],
];

export function SummaryPreview() {
  return (
    <Card className={cn(frameCard, "h-[17rem] overflow-hidden")} aria-hidden>
      <dl className="divide-y divide-neutral-100">
        {SUMMARY.map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between py-2.5 first:pt-0"
          >
            <dt className="text-sm text-neutral-500">{k}</dt>
            <dd className="text-sm font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3">
        <Pill tone="amber">Address · needs review</Pill>
      </div>
    </Card>
  );
}
