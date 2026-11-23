"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import { Avatar } from "./HowItWorksCards";

/* One Instagram conversation (Afthah) with two small interruptions beside it.
   Plays once when scrolled into view: the seller's reply appears, then the two
   notifications fade in one after the other. Without JS or with reduced motion
   the whole scene is simply visible. */

const NOTIFICATIONS = [
  {
    channel: "WhatsApp",
    name: "Nuwan",
    text: "Do you deliver to Galle?",
    time: "10:44 am",
    dot: "bg-emerald-500",
    offset: "md:ml-8",
  },
  {
    channel: "Messenger",
    name: "Priya",
    text: "Can I collect my order today?",
    time: "10:46 am",
    dot: "bg-sky-500",
    offset: "md:ml-16",
  },
] as const;

function Fade({
  show,
  armed,
  className,
  children,
}: {
  show: boolean;
  armed: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        armed && !show && "translate-y-2 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function ProblemScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false); // hide the later items until played
  const [step, setStep] = useState(0); // 0 shopper only · 1 reply · 2 notif 1 · 3 notif 2

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setArmed(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timers.push(setTimeout(() => setStep(1), 500));
        timers.push(setTimeout(() => setStep(2), 1700));
        timers.push(setTimeout(() => setStep(3), 2600));
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-md" aria-hidden>
      {/* The conversation: the largest element */}
      <div className="rounded-xl bg-white p-5 shadow-xl shadow-neutral-900/5 ring-1 ring-neutral-200/50">
        <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-3.5">
          <Avatar>A</Avatar>
          <p className="text-sm font-semibold">Afthah</p>
          <ChannelBadge channel="Instagram" />
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <p className="w-fit max-w-[88%] rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-3 text-[15px] leading-relaxed text-neutral-800">
              Hi, is the black dress available in size M?
            </p>
            <p className="mt-1.5 pl-1 text-[11px] text-neutral-400">10:42 am</p>
          </div>

          <Fade show={step >= 1} armed={armed}>
            <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 ring-1 ring-primary/15">
              I’ll check stock and get back to you.
            </p>
            <p className="mt-1.5 pr-1 text-right text-[11px] text-neutral-400">
              10:43 am
            </p>
          </Fade>
        </div>
      </div>

      {/* The interruptions: smaller, offset, quieter */}
      <div className="mt-4 space-y-2.5">
        {NOTIFICATIONS.map((n, i) => (
          <Fade
            key={n.name}
            show={step >= i + 2}
            armed={armed}
            className={n.offset}
          >
            <div className="flex items-center gap-3 rounded-lg bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-neutral-200/20">
              <span className={cn("size-2 shrink-0 rounded-full", n.dot)} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-neutral-700">
                  {n.channel} · {n.name}
                </p>
                <p className="truncate text-xs text-neutral-500">“{n.text}”</p>
              </div>
              <span className="shrink-0 text-[10px] text-neutral-400">
                {n.time}
              </span>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
