"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

/* Smooth wheel scrolling (Lenis), plus smooth jumps for every in-page link:
   the header nav, "Join the waitlist", "See how it works", the logo… */

const HEADER_OFFSET = 80; // sticky header height + a little breathing room

function AnchorLinks() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = link?.getAttribute("href");
      if (!link || !hash || hash === "#") return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      // Take over from the browser's instant jump.
      e.preventDefault();
      const y =
        target.getBoundingClientRect().top + lenis.scroll - HEADER_OFFSET;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      lenis.scrollTo(Math.max(0, y), { duration: 1.3, immediate: reduce });
      // Keep the address bar clean: no #section in the URL.
      if (window.location.hash) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <AnchorLinks />
      {children}
    </ReactLenis>
  );
}
