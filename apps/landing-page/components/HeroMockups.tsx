"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@repo/ui/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type Mockup = {
  src: StaticImageData;
  alt: string;
  className: string;
  priority?: boolean;
  /** How far (px) the card sinks while the hero scrolls away. 0 = stays put. */
  sink: number;
};

/* Dashboard preview strip. The outer cards (two left, two right) drift down as
   the page scrolls, so the centre inbox stays put while its neighbours sink. */
export default function HeroMockups({
  mockups,
}: {
  mockups: readonly Mockup[];
}) {
  const stripRef = useRef<HTMLDivElement>(null);

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
      className="relative mx-auto flex aspect-100/38 w-full items-start justify-center overflow-hidden md:aspect-100/26 md:space-x-[-1%]"
    >
      {mockups.map(({ src, alt, className, priority, sink }) => (
        <div
          key={alt}
          data-sink={sink || undefined}
          className={cn("relative will-change-transform", className)}
        >
          <Image
            src={src}
            alt={alt}
            sizes="(min-width: 1280px) 512px, (min-width: 768px) 40vw, 100vw"
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
