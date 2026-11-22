import { cn } from "@repo/ui/lib/utils";

const STYLES = {
  Instagram: "bg-pink-100 text-pink-700",
  WhatsApp: "bg-emerald-100 text-emerald-700",
  Messenger: "bg-sky-100 text-sky-700",
} as const;

export function ChannelBadge({
  channel,
  className,
}: {
  channel: keyof typeof STYLES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        STYLES[channel],
        className,
      )}
    >
      {channel}
    </span>
  );
}
