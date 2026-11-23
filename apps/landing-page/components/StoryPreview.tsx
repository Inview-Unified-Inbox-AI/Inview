import { cn } from "@repo/ui/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import { Avatar, Card, Meta, Pill } from "./HowItWorksCards";
import Image from "next/image";

/* The "How it works" product preview: ONE conversation (Afthah on Instagram)
   plus its follow-up panel. Everything is derived from `scene` (0–3), so
   scrolling or tapping back simply plays the story in reverse.

   0 · shopper asks          buyer message
   1 · you promise to check  your reply, then the amber "Waiting on us" panel
   2 · you get back          panel turns green, editable draft appears
   3 · order confirmed       reply is sent, buyer says "I'll take it", timeline */

export type Scene = 0 | 1 | 2 | 3;

/** Fades + slides an element in, and collapses its space when hidden. */
function Reveal({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        show
          ? "translate-y-0 grid-rows-[1fr] opacity-100"
          : "translate-y-2 grid-rows-[0fr] opacity-0",
      )}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

const bubble = "w-fit max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed";

/** One state of the follow-up panel; all states stack in one grid cell. */
function PanelState({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "col-start-1 row-start-1 self-center transition-opacity duration-500 motion-reduce:transition-none",
        active ? "opacity-100 delay-150" : "pointer-events-none opacity-0",
      )}
    >
      {children}
    </div>
  );
}

export function StoryPreview({
  scene,
  className,
}: {
  scene: Scene;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex h-[33rem] flex-col gap-3 overflow-hidden p-4 md:p-5",
        className,
      )}
      aria-hidden
    >
      {/* Fixed header: the buyer never changes */}
      <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-3">
        <Avatar>A</Avatar>
        <p className="text-sm font-semibold">Afthah</p>
        <Image
          src={"https://img.icons8.com/fluency/96/instagram-new.png"}
          alt="Instagram"
          width={100}
          height={100}
          className="w-6"
        />
      </div>

      {/* Thread */}
      <div className="flex min-h-0 flex-1 flex-col">
        <Reveal show={scene >= 0}>
          <div className="pb-2.5">
            <p
              className={cn(
                bubble,
                "rounded-2xl rounded-tl-sm bg-card text-neutral-700",
              )}
            >
              Is the black dress available in M? Can I pay cash on delivery in
              Kandy?
            </p>
          </div>
        </Reveal>

        <Reveal show={scene >= 1}>
          <div className="flex justify-end pb-2.5">
            <p
              className={cn(
                bubble,
                "rounded-2xl rounded-tr-sm bg-primary text-white",
              )}
            >
              I’ll check stock and get back to you.
            </p>
          </div>
        </Reveal>

        <Reveal show={scene >= 3}>
          <div className="flex justify-end pb-2.5">
            <p
              className={cn(
                bubble,
                "rounded-2xl rounded-tr-sm bg-primary text-white",
              )}
            >
              Yes, the black dress is available in M. We offer cash on delivery
              to Kandy.
            </p>
          </div>
        </Reveal>

        <Reveal show={scene >= 3} delay={250}>
          <div className="pb-2.5">
            <p
              className={cn(
                bubble,
                "rounded-2xl rounded-tl-sm bg-neutral-100 text-neutral-700",
              )}
            >
              I’ll take it.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Editable draft (scene 2 only) */}
      <Reveal show={scene === 2}>
        <div className="rounded-xl bg-primary/[0.06] p-3.5 ring-1 shadow-sm my-1 ring-primary/10">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-neutral-700">
              Draft reply
            </p>
            <Pill tone="green">Stock checked by seller</Pill>
          </div>
          <p className="mt-2.5 rounded-lg bg-white/80 p-3 text-sm leading-relaxed text-neutral-700">
            Yes, the black dress is available in M. We offer cash on delivery to
            Kandy.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
              Send reply
            </span>
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
              Edit draft
            </span>
          </div>
        </div>
      </Reveal>

      {/* Follow-up panel: updates in place */}
      <Reveal show={scene >= 1} delay={350}>
        <div className="p-0.5">
          <div
            className={cn(
              "grid rounded-xl bg-white/80 p-3.5 ring-1 transition-[box-shadow,--tw-ring-color] duration-500 motion-reduce:transition-none",
              scene === 1
                ? "shadow-md shadow-amber-200/60 ring-0 "
                : "shadow-sm ring-neutral-200",
            )}
          >
            <PanelState active={scene === 1}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Stock check promised</p>
                  <Meta>Black dress · Size M</Meta>
                </div>
                <span
                  key={scene === 1 ? "pulse" : "idle"}
                  className={cn(
                    "rounded-full",
                    scene === 1 &&
                      "[animation:story-pulse_1.2s_ease-out_1] motion-reduce:animate-none",
                  )}
                >
                  <Pill tone="amber">Waiting on us</Pill>
                </span>
              </div>
            </PanelState>

            <PanelState active={scene === 2}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Stock check</p>
                  <Meta>Black dress · Size M</Meta>
                </div>
                <Pill tone="green">Checked</Pill>
              </div>
            </PanelState>

            <PanelState active={scene === 3}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Black dress · Size M</p>
                  <Meta>Cash on delivery</Meta>
                </div>
                <Pill tone="green">Confirmed</Pill>
              </div>
              <ol className="mt-3 space-y-2">
                {[
                  "Delivery address collected",
                  "Order confirmed · Marked by seller",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 text-xs font-medium text-neutral-700"
                  >
                    <span className="grid size-4 place-items-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
            </PanelState>
          </div>
        </div>
      </Reveal>

      <style>{`
        @keyframes story-pulse {
          0% { box-shadow: 0 0 0 0 rgba(245,158,11,.55); }
          100% { box-shadow: 0 0 0 12px rgba(245,158,11,0); }
        }
      `}</style>
    </Card>
  );
}
