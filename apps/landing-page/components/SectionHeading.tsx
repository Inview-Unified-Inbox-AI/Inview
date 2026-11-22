import { cn } from "@repo/ui/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-5xl"
      >
        {title}
      </h2>
      {children && (
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
          {children}
        </p>
      )}
    </div>
  );
}
