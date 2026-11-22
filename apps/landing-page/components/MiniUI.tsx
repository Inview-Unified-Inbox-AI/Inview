import { cn } from "@repo/ui/lib/utils";
import { ChannelBadge } from "./ChannelBadge";

/* Small HTML mockups reused by the Problem, How it works and Features sections. */

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-sm  bg-white/80 backdrop-blur-lg p-4 text-left text-neutral-800 shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Message({
  name,
  text,
  channel,
  status,
}: {
  name: string;
  text: string;
  channel: "Instagram" | "WhatsApp" | "Messenger";
  status?: string;
}) {
  return (
    <Panel className="flex items-start gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
        {name[0]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold">{name}</p>
          <ChannelBadge channel={channel} />
          {status && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
              {status}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-neutral-600">{text}</p>
      </div>
    </Panel>
  );
}

export function Chip({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "amber" | "green" | "red" | "blue";
  children: React.ReactNode;
}) {
  const tones = {
    neutral: "bg-neutral-100 text-neutral-700",
    amber: "bg-amber-100 text-amber-800",
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-rose-100 text-rose-800",
    blue: "bg-primary/15 text-primary",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function FollowUpRow({
  title,
  detail,
  tone,
  assignee,
}: {
  title: string;
  detail: string;
  tone: "amber" | "blue" | "red";
  assignee?: string;
}) {
  const dot = { amber: "bg-amber-500", blue: "bg-primary", red: "bg-rose-500" };
  return (
    <Panel className="flex items-center gap-3 py-3">
      <span className={cn("size-2.5 shrink-0 rounded-full", dot[tone])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-neutral-500">{detail}</p>
      </div>
      {assignee && (
        <span className="grid size-6 place-items-center rounded-full bg-neutral-100 text-[10px] font-semibold">
          {assignee}
        </span>
      )}
    </Panel>
  );
}
