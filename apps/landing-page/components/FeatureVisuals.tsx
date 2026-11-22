import { cn } from "@repo/ui/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import { Avatar, Card, Meta, Pill } from "./HowItWorksCards";

/* Feature-section mockups built in the site's own UI language
   (replaces the old SVG screenshots). */

const solid = "bg-white backdrop-blur-none";

/* 1 · Shared inbox with the next action per chat */
const INBOX = [
  {
    name: "Aisha",
    channel: "Instagram",
    preview: "Do you have this dress in black, size M?",
    action: "Stock check",
    tone: "amber",
    time: "2m",
  },
  {
    name: "Nuwan",
    channel: "WhatsApp",
    preview: "Can I pay COD for two items?",
    action: "Delivery quote",
    tone: "blue",
    time: "8m",
  },
  {
    name: "Priya",
    channel: "Messenger",
    preview: "Is the blue one still in stock?",
    action: "Awaiting reply",
    tone: "green",
    time: "21m",
  },
] as const;

export function InboxPreview() {
  return (
    <Card className={cn(solid, "p-0 overflow-hidden")} aria-hidden>
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
        <p className="text-sm font-semibold">Shared inbox</p>
        <span className="text-xs text-neutral-400">3 open</span>
      </div>
      <ul className="divide-y divide-neutral-100">
        {INBOX.map((row) => (
          <li key={row.name} className="flex items-center gap-3 px-5 py-3.5">
            <Avatar>{row.name[0]}</Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{row.name}</p>
                <ChannelBadge channel={row.channel} />
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
    <div className="h-[16.9rem] space-y-1.5 overflow-hidden" aria-hidden>
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
        "space-y-3 rounded-b-none rounded-t-[5px] shadow-none ring-0",
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
        Hi Aisha! Checking black, M and COD for you now.
      </p>
      <div className="flex items-center gap-2 pt-1">
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

/* 4 · Reporting */
const BARS = [28, 44, 36, 56, 40, 68, 48, 84, 60];
const STATS = [
  { value: "24", label: "Open actions", cls: "" },
  { value: "5", label: "Overdue", cls: "text-rose-600" },
  { value: "61", label: "Follow-ups done", cls: "" },
  { value: "18", label: "Orders confirmed", cls: "text-emerald-600" },
];

export function ReportPreview() {
  return (
    <Card className={cn(solid, "p-5 md:p-6")} aria-hidden>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Follow-up report</p>
        <span className="text-xs text-neutral-400">Last 9 days</span>
      </div>
      <div className="mt-5 flex h-24 items-end gap-2">
        {BARS.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={cn(
              "flex-1 rounded-md",
              i === 7 ? "bg-primary" : "bg-primary/20",
            )}
          />
        ))}
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-neutral-100 pt-5 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <dd className={cn("text-2xl font-semibold tracking-tight", s.cls)}>
              {s.value}
            </dd>
            <dt className="text-xs text-neutral-500">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Card>
  );
}
