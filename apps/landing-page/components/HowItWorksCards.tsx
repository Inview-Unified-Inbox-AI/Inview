import { cn } from "@repo/ui/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import Image from "next/image";

/* Card UI for the "How it works" visuals. One shared shell + header so the
   four steps read as the same product surface. */

export function Card({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white/85 p-5 text-left text-neutral-800 shadow-xl ring-1 ring-white/70 backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({
  left,
  right,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">{left}</div>
      {right}
    </div>
  );
}

type Tone = "amber" | "green" | "blue";

export function Pill({
  tone,
  children,
}: {
  tone: Tone;
  children: React.ReactNode;
}) {
  const tones: Record<Tone, { pill: string; dot: string }> = {
    amber: { pill: "bg-amber-50 text-amber-800", dot: "bg-amber-500" },
    green: { pill: "bg-emerald-50 text-emerald-800", dot: "bg-emerald-500" },
    blue: { pill: "bg-primary/10 text-primary", dot: "bg-primary" },
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        tones[tone].pill,
      )}
    >
      <span className={cn("size-1.5 rounded-full", tones[tone].dot)} />
      {children}
    </span>
  );
}

export function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
      {children}
    </span>
  );
}

export const Meta = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-neutral-500">{children}</p>
);

/* 1 · Inbox */
const INBOX_ROWS = [
  {
    name: "Afthah",
    channel: "https://img.icons8.com/fluency/96/instagram-new.png",
    preview: "Black dress in size M?",
    selected: true,
  },
  {
    name: "Nuwan",
    channel: "https://img.icons8.com/office/40/whatsapp--v1.png",
    preview: "Do you deliver to Galle?",
  },
  {
    name: "Priya",
    channel: "https://img.icons8.com/fluency/96/facebook-messenger--v2.png",
    preview: "Can I collect tomorrow?",
  },
] as const;

export function InboxCard() {
  return (
    <Card className="overflow-hidden p-0 bg-white/80 shadow-lg shadow-muted-foreground/5">
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="border-b border-neutral-200/70 py-3 md:border-b-0 md:border-r">
          <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Inbox
          </p>
          <ul>
            {INBOX_ROWS.map((row) => {
              const selected = "selected" in row && row.selected;
              return (
                <li
                  key={row.name}
                  className={cn(
                    "flex items-center gap-2 border-l-2 px-4 py-2.5",
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-transparent opacity-70",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-1">
                      <p
                        className={cn(
                          "truncate text-[13px]",
                          selected ? "font-semibold" : "font-medium",
                        )}
                      >
                        {row.name} ·
                      </p>
                      <Image
                        src={row.channel}
                        alt="I"
                        width={100}
                        height={100}
                        className="w-5"
                      />
                    </div>
                    <p className="truncate text-xs text-neutral-500">
                      {row.preview}
                    </p>
                  </div>
                  {selected && (
                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2.5">
            <Avatar>A</Avatar>
            <p className="text-sm font-semibold">Afthah</p>
            <Image
              src={INBOX_ROWS[0].channel}
              alt="Instagram"

              width={100}
              height={100}
              className="w-5"
            />
          </div>
          <p className="mt-3 rounded-xl rounded-tl-sm bg-primary/[0.07] p-3.5 text-[15px] leading-relaxed text-neutral-700">
            “Hi! Is the black dress available in size M? Can I pay cash on
            delivery in Kandy?”
          </p>
        </div>
      </div>
    </Card>
  );
}

/* 2 · Follow-up */
export function FollowUpCard() {
  return (
    <Card className="bg-white/70 shadow-lg shadow-muted-foreground/5">
      <CardHeader
        left={
          <>
            <Avatar>Y</Avatar>
            <div>
              <p className="text-sm font-semibold">You</p>
              <Meta>Replying to Afthah · Instagram</Meta>
            </div>
          </>
        }
      />
      <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
        “I’ll check stock and get back to you.”
      </p>
      <div className="mt-4 shadow-md flex items-center justify-between gap-3 rounded-md bg-amber-50/70 px-3.5 py-3 ring-1 ring-amber-100">
        <div className="min-w-0">
          <p className="text-sm font-semibold">Stock check promised</p>
          <Meta>Black dress · Size M</Meta>
        </div>
        <Pill tone="amber">Waiting on us</Pill>
      </div>
    </Card>
  );
}

/* 3 · Reply draft */
export function ReplyDraftCard() {
  return (
    <Card className="bg-white/70 shadow-lg shadow-muted-foreground/5">
      <CardHeader
        left={<p className="text-sm font-semibold">Draft reply</p>}
        right={<Pill tone="green">Stock checked by seller</Pill>}
      />
      <p className="mt-3 rounded-lg bg-primary/[0.07] p-3.5 text-[15px] leading-relaxed text-neutral-700">
        Hi Afthah! The black dress is available in size M, and we offer cash on
        delivery to Kandy.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm">
          Send reply
        </span>
        <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
          Edit draft
        </span>
      </div>
    </Card>
  );
}

/* 4 · Order confirmation */
export function OrderTimelineCard() {
  const items = [
    { title: "Delivery address collected", meta: null, done: false },
    { title: "Order confirmed", meta: "Marked by seller", done: true },
  ];
  return (
    <Card className="bg-white/70 shadow-lg shadow-muted-foreground/5">
      <CardHeader
        left={
          <div>
            <p className="text-sm font-semibold">Black dress · Size M</p>
            <Meta>Cash on delivery</Meta>
          </div>
        }
        right={<Pill tone="green">Confirmed</Pill>}
      />
      <ol className="mt-5">
        {items.map((item, i) => (
          <li key={item.title} className="relative flex gap-3 pb-5 last:pb-0">
            {i < items.length - 1 && (
              <span className="absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-px bg-emerald-200" />
            )}
            <span
              className={cn(
                "relative grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                item.done
                  ? "bg-emerald-500 text-white"
                  : "bg-emerald-100 text-emerald-700",
              )}
            >
              ✓
            </span>
            <div className="-mt-0.5">
              <p className="text-sm font-semibold">{item.title}</p>
              {item.meta && <Meta>{item.meta}</Meta>}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
