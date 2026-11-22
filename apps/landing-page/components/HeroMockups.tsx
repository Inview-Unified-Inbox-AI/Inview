"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@repo/ui/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type Mockup = {
  key: string;
  /** The card to show (real DOM, not an image). */
  node: React.ReactNode;
  /** Width in px the card is designed at; it is zoomed to fit its slot. */
  designWidth: number;
  /** Slot sizing/visibility classes (width as % of the strip, offsets). */
  className: string;
  /** How far (px) the card sinks while the hero scrolls away. 0 = stays put. */
  sink: number;
};

/* Dashboard preview strip. Each card is designed at a fixed width and zoomed to
   fill its slot, so the V-shape scales like the old screenshots did. The outer
   cards (two left, two right) drift down as the page scrolls. */
export default function HeroMockups({
  mockups,
}: {
  mockups: readonly Mockup[];
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Fit every card to its slot, and keep it fitted on resize.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const fit = () => {
      strip
        .querySelectorAll<HTMLElement>("[data-design-width]")
        .forEach((slot) => {
          const inner = slot.firstElementChild as HTMLElement | null;
          const design = Number(slot.dataset.designWidth);
          if (!inner || !slot.clientWidth) return;
          inner.style.width = `${design}px`;
          inner.style.zoom = String(slot.clientWidth / design);
        });
      setReady(true);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(strip);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const mm = gsap.matchMedia();
    // Desktop only (the side cards are hidden on small screens) and skipped
    // for people who prefer reduced motion.
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>("[data-sink]", strip).forEach((el) => {
          gsap.to(el, {
            y: Number(el.dataset.sink),
            ease: "none",
            scrollTrigger: {
              trigger: strip,
              start: "top bottom", // strip enters the viewport
              end: "bottom top", // strip has left the viewport
              scrub: 0.6,
            },
          });
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={stripRef}
      className={cn(
        "relative mx-auto flex aspect-100/56 w-full items-start justify-center overflow-hidden transition-opacity duration-500 md:aspect-100/24 md:space-x-[-1%]",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      {mockups.map(({ key, node, designWidth, className, sink }) => (
        <div
          key={key}
          data-design-width={designWidth}
          data-sink={sink || undefined}
          className={cn("relative min-w-0 will-change-transform", className)}
        >
          <div
            className="pointer-events-none select-none bg-card p-1 rounded-md"
            aria-hidden
          >
            {node}
          </div>
        </div>
      ))}
    </div>
  );
}
