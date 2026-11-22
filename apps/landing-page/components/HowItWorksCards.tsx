import { cn } from "@repo/ui/lib/utils";

/* Shared UI primitives for the landing-page mockups: a frosted Card shell,
   status Pill, Avatar and Meta line. */

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
