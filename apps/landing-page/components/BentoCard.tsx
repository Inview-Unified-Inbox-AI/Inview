import { cn } from "@repo/ui/lib/utils";

export function BentoCard({
  title,
  children,
  visual,
  className,
}: {
  title: string;
  children: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <div className="p-6 pb-0 md:p-8 md:pb-0">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
          {children}
        </p>
      </div>
      {visual && (
        <div className="mt-6 flex-1 overflow-hidden bg-gradient-to-b from-card to-muted/60 p-6 pt-0 md:px-8">
          {visual}
        </div>
      )}
    </article>
  );
}
