"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import BG from "@/public/landing-page-mockup/bg-5.jpg";
import { StoryPreview, type Scene } from "./StoryPreview";

const SCENES = [
  {
    tab: "Enquiry",
    title: "A shopper asks",
    copy: "Afthah wants the black dress in size M and asks about cash on delivery to Kandy.",
  },
  {
    tab: "Follow-up",
    title: "You promise to check",
    copy: "You reply and go back to serving other customers. Inview keeps the stock check open so you can pick it up later.",
  },
  {
    tab: "Reply",
    title: "You get back to the shopper",
    copy: "Once you check stock, Inview drafts an answer using your shop’s delivery policy. You review it and send it.",
  },
  {
    tab: "Confirmed",
    title: "The order is confirmed",
    copy: "Afthah says, “I’ll take it.” You collect the delivery address and confirm the order.",
  },
] as const;

const DESKTOP = "(min-width: 768px)";

export default function HowItWorksStory() {
  // Mobile starts on "Follow-up", the strongest moment.
  const [active, setActive] = useState<Scene>(1);
  const [desktop, setDesktop] = useState(false);
  const blocks = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => {
      setDesktop(mq.matches);
      // Desktop starts at the first scene and follows the scroll position;
      // mobile starts on "Follow-up".
      setActive(mq.matches ? 0 : 1);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Desktop: the scene whose copy is closest to the middle of the viewport is
  // active. A scroll listener (rather than IntersectionObserver) can't skip a
  // scene when the visitor scrolls or jumps quickly; setActive is a no-op
  // when the scene hasn't changed.
  useEffect(() => {
    if (!desktop) return;
    const update = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      blocks.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best as Scene);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [desktop]);

  const scene = SCENES[active];

  return (
    <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-16">
      {/* Desktop: the story, one block per scene */}
      <ol className="hidden md:block">
        {SCENES.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              blocks.current[i] = el;
            }}
            className={cn(
              "flex min-h-[70vh] items-center transition-opacity duration-500 motion-reduce:transition-none",
              active === i ? "opacity-100" : "opacity-40",
            )}
          >
            <div>
              <span className="grid size-9 place-items-center rounded-full bg-[#EFF6FF] text-sm font-semibold tabular-nums text-secondary">
                {i + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                {s.copy}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* The preview (pinned on desktop) + mobile steps */}
      <div className="md:sticky md:top-24 md:self-start md:py-4">
        <div className="relative isolate overflow-hidden rounded-xl p-1 shadow-lg shadow-muted-foreground/10 md:p-1">
          <Image
            src={BG}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover"
          />
          <StoryPreview scene={active} />
        </div>

        <div className="md:hidden">
          <div
            role="tablist"
            aria-label="Steps"
            className="mt-5 grid grid-cols-4 gap-1.5"
          >
            {SCENES.map((s, i) => (
              <button
                key={s.tab}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i as Scene)}
                className={cn(
                  "rounded-full px-2 py-2 text-xs font-medium transition-colors motion-reduce:transition-none",
                  active === i
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="mt-5">
            <h3 className="text-xl font-semibold tracking-tight">
              {scene.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              {scene.copy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
