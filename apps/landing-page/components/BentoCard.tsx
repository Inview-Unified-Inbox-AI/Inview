import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import BG from "@/public/landing-page-mockup/bg-5.jpg";
export function BentoCard({
  title,
  children,
  visual,
  className,
  bgClass,
  imgClass,
  visualClass,
  framed,
  framedLeft,
  framedRight,
}: {
  title: string;
  children: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
  bgClass?: string;
  imgClass?: string;
  /** Classes for the visual wrapper, e.g. a fixed height so content overflows. */
  visualClass?: string;
  /** Centered gradient hairline frame around the visual, flush with the bottom. */
  framed?: boolean;
  /** Same frame, but the gradient bleeds off the card's left edge. */
  framedLeft?: boolean;
  /** Same frame, but the gradient bleeds off the card's right edge. */
  framedRight?: boolean;
}) {
  const isFramed = framed || framedLeft || framedRight;
  return (
    <article
      className={cn(
        "row-span-2 grid gap-y-0 [grid-template-rows:subgrid] overflow-hidden rounded-lg shadow-xl shadow-muted-foreground/5 border border-muted-foreground/5 bg-card",
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
        <div
          className={cn(
            "relative isolate mt-6 flex flex-col overflow-hidden shadow-xl",
            framed && "mx-6 rounded-t-md px-1 pt-1 md:mx-8",
            framedLeft && "mr-6 rounded-tr-md pr-1 pt-1 md:mr-8",
            framedRight && "ml-6 rounded-tl-md pl-1 pt-1 md:ml-8",
            visualClass,
          )}
        >
          <Image
            src={BG}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className={cn("-z-10 object-cover shadow-2xl ", bgClass)}
          />
          <div
            className={cn(
              "relative shadow-2xl",
              isFramed ? "min-h-0 flex-1" : "px-5 pt-6 md:px-8 md:pt-8",
              imgClass,
            )}
          >
            {visual}
          </div>
        </div>
      )}
    </article>
  );
}
