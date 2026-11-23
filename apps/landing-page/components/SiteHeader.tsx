"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

const LINKS = [
  ["How it works", "#how-it-works"],
  ["Features", "#features"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
] as const;

/* Over the hero the header is the usual full-width bar. Once the hero has
   scrolled out from under it, it condenses into a floating, centred pill with
   a gap above it. The outer element keeps a fixed height so the page never
   jumps between states. */
const HEADER_HEIGHT = 78; // keep in sync with the h-19.5 class below

const SiteHeader = () => {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("main > section");
    const onScroll = () => {
      // Compact when the hero's bottom edge passes under the header.
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      setCompact(heroBottom <= HEADER_HEIGHT);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-40 h-19.5">
      {/* Full-width band: fades out once the header turns into a pill */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 border-b border-muted-foreground/5 bg-background/70 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none",
          compact ? "opacity-0" : "opacity-100",
        )}
      />

      <nav
        aria-label="Main"
        className={cn(
          "pointer-events-auto relative mx-auto flex items-center justify-between transition-all duration-300 ease-out motion-reduce:transition-none",
          compact
            ? "translate-y-4 w-[calc(100%-1.5rem)] max-w-3xl gap-6 rounded-full bg-background/80 py-1.5 pl-5 pr-1.5 shadow-lg shadow-black/5 ring-1 ring-border backdrop-blur-md"
            : "translate-y-0 w-full max-w-6xl gap-6 rounded-none bg-transparent px-5 py-4 shadow-none ring-0 ring-transparent sm:px-10",
        )}
      >
        <a href="#top" className="text-lg font-semibold tracking-tight">
          Inview
        </a>
        <ul className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a className="hover:text-foreground" href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#waitlist"
          className={cn(
            buttonVariants({ size: "default" }),
            compact && "h-9 rounded-full",
          )}
        >
          Join the waitlist
        </a>
      </nav>
    </header>
  );
};

export default SiteHeader;
