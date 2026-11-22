import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import BG from "@/public/landing-page-mockup/bg-2.jpg";
export function BentoCard({
  title,
  children,
  visual,
  className,
  bgClass,
  imgClass,
  framed,
}: {
  title: string;
  children: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
  bgClass?: string;
  imgClass?: string;
  /** Centered gradient hairline frame around the visual, flush with the bottom. */
  framed?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl shadow-lg border border-muted-foreground/5 bg-card",
        className,
      )}
    >
      <div className={cn("p-6 pb-0 md:p-8 md:pb-0", framed && "pb-6 md:pb-6")}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
          {children}
        </p>
      </div>
      {visual && (
        <div
          className={cn(
            "relative isolate mt-6 flex flex-1 flex-col overflow-hidden",
            framed && "mx-6 mt-auto flex-none rounded-t-md px-1 pt-1 md:mx-8",
          )}
        >
          <Image
            src={BG}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className={cn("-z-10 object-cover", bgClass)}
          />
          <div
            className={cn(
              "relative",
              !framed && "px-5 pt-6 md:px-8 md:pt-8",
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
