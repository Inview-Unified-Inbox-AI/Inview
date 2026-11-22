import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import { Avatar, Card, Meta, Pill } from "./HowItWorksCards";

/* Static copies of the Features mockups for the hero strip. They are
   intentionally separate from FeatureVisuals so the hero stays still and can be
   tuned on its own. */

const solid = "bg-white/90 backdrop-blur-lg";

/* Inbox */
const INBOX = [
  {
    name: "Afthah",
    icon: "https://img.icons8.com/fluency/96/instagram-new.png",
    preview: "Do you have this dress in black, size M?",
    action: "Stock check",
    tone: "amber",
    time: "2m",
  },
  {
    name: "Nuwan",
    icon: "https://img.icons8.com/office/40/whatsapp--v1.png",
    preview: "Can I pay COD for two items?",
    action: "Delivery quote",
    tone: "blue",
    time: "8m",
  },
  {
    name: "Priya",
    icon: "https://img.icons8.com/fluency/96/facebook-messenger--v2.png",
    preview: "Is the blue one still in stock?",
    action: "Awaiting reply",
    tone: "green",
    time: "21m",
  },
  {
    name: "Aakif",
    icon: "https://img.icons8.com/office/40/whatsapp--v1.png",
    preview: "Is the black one still in stock?",
    action: "Awaiting reply",
    tone: "green",
    time: "21m",
  },
] as const;

export function HeroInbox() {
  return (
    <Card className={cn(solid, "overflow-hidden p-0")}>
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
        <p className="text-sm font-semibold">Unified inbox</p>
        <span className="text-xs text-neutral-400">4 open</span>
      </div>
      <ul className="divide-y divide-neutral-100">
        {INBOX.map((row) => (
          <li key={row.name} className="flex items-center gap-3 px-5 py-3.5">
            <Avatar>{row.name[0]}</Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{row.name}</p>
                <Image
                  src={row.icon}
                  alt=""
                  width={100}
                  height={100}
                  className="w-5"
                />
              </div>
              <p className="truncate text-xs text-neutral-500">{row.preview}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Pill tone={row.tone}>{row.action}</Pill>
              <span className="text-[11px] text-neutral-400">{row.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* Follow-up hand-offs */
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

export function HeroFollowUps() {
  return (
    <div className="space-y-3">
      {HANDOFFS.map((h) => (
        <Card key={h.title} className={cn(solid, "p-4")}>
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

/* Reply draft */
export function HeroDraft() {
  return (
    <Card className={cn(solid, "flex flex-col gap-3")}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Reply draft</p>
        <Pill tone="blue">AI assist</Pill>
      </div>
      <p className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-neutral-100 px-3.5 py-2.5 text-sm text-neutral-700">
        Is the black M available?
      </p>
      <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-tr-sm bg-primary/10 px-3.5 py-2.5 text-sm leading-relaxed text-neutral-700">
        Hi Afthah! Checking black, M and COD for you now.
      </p>
      <div className="mt-2 flex items-center gap-2">
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

/* Labels and filters */
const tagTones = {
  blue: "bg-primary/10 text-primary ring-primary/20",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  neutral: "bg-neutral-100 text-neutral-700 ring-neutral-200",
} as const;

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
    name: "Kamal",
    preview: "Do you restock the blue one?",
    label: "Sales enquiry",
    tone: "blue",
  },
] as const;

export function HeroLabels() {
  return (
    <Card className={cn(solid, "overflow-hidden p-0")}>
      <div className="flex flex-nowrap items-center gap-2 overflow-hidden whitespace-nowrap border-b border-neutral-100 px-4 py-3">
        <span className="text-xs text-neutral-500">Filter by</span>
        {["Channel", "Owner", "Status"].map((t) => (
          <span
            key={t}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
              tagTones.neutral,
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <ul className="divide-y divide-neutral-100">
        {LABELLED.map((row) => (
          <li key={row.name} className="flex items-center gap-3 px-4 py-3">
            <Avatar>{row.name[0]}</Avatar>
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

/* Conversation summary */
const SUMMARY = [
  ["Product", "Floral dress"],
  ["Variant", "Black · M"],
  ["Quantity", "1"],
  ["Payment", "COD"],
];

export function HeroSummary() {
  return (
    <Card className={cn(solid)}>
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
        <svg viewBox="0 0 24 24" className="size-4 fill-primary">
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
        </svg>
        ✓ Summary ready
      </div>
      <p className="mt-3 rounded-xl rounded-tl-sm bg-neutral-100 px-3 py-2 text-xs leading-relaxed text-neutral-700">
        “Hi! I’d like the floral dress in black, size M. Just one, cash on
        delivery please.”
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-2">
        {SUMMARY.map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg bg-neutral-50 px-3 py-2 ring-1 ring-neutral-100"
          >
            <dt className="text-[11px] text-neutral-500">{k}</dt>
            <dd className="text-[13px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3">
        <Pill tone="amber">Address · needs review</Pill>
      </div>
    </Card>
  );
}
