import { buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import InboxUI from "@/public/landing-page-mockup/unified-inbox.svg";
import QueUI from "@/public/landing-page-mockup/que.svg";
import ReplyUI from "@/public/landing-page-mockup/reply.svg";
import Conversation from "@/public/landing-page-mockup/conversation.svg";
import ReportUI from "@/public/landing-page-mockup/report.svg";
import HeroMockups, { type Mockup } from "./HeroMockups";

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M6 4l14 8-14 8z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8zM19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9z" />
  </svg>
);

/* Mockup screens arranged in a V: the centre inbox is largest and sits lowest,
   dipping past the bottom edge; each step outward is smaller and lifted higher.
   Widths and offsets are percentages of the strip width so the shape scales. */
const MOCKUPS: readonly Mockup[] = [
  {
    src: ReportUI,
    alt: "Report screen summarising replies and response rate",
    className: "hidden md:block md:w-[18%] md:-mt-5 md:z-0",
    sink: 180,
  },
  {
    src: QueUI,
    alt: "Queue of buying enquiries ranked by priority",
    className: "hidden md:block md:w-[20%] md:mt-[4%] md:z-10",
    sink: 120,
  },
  {
    src: InboxUI,
    alt: "Unified inbox combining Instagram, Messenger and WhatsApp messages",
    className: "w-full md:w-[45%] md:mt-[7%] z-20",
    priority: true,
    sink: 0,
  },
  {
    src: ReplyUI,
    alt: "AI-drafted reply ready for review before sending",
    className: "hidden md:block md:w-[20%] md:mt-[4%] md:z-10",
    sink: 120,
  },
  {
    src: Conversation,
    alt: "Customer conversation with an AI reply suggestion",
    className: "hidden md:block md:w-[18%] md:-mt-5 md:z-0",
    sink: 180,
  },
];

const HeroSection = () => {
  return (
    <section className="mx-3 sm:mx-5">
      <div className="relative isolate min-w-full overflow-hidden rounded-2xl bg-primary px-5 pt-10 sm:px-10 sm:pt-14">
        {/* Subtle checkerboard texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1/2 -z-10 -rotate-45 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%)",
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0, 100px 100px",
          }}
        />
        {/* Soft top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-3xl -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-3xl -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1 -z-10 h-80 w-3xl -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0  -z-10 h-80 w-3xl -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0  -z-10 h-80 w-5xl -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-3xl -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            <SparklesIcon className="size-3.5" />
            For Sri Lankan shops that sell through chat
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Your shop’s DMs, <br /> sorted and ready to answer.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white sm:text-lg">
            Inview brings Instagram, Messenger and WhatsApp enquiries into one
            inbox, puts promising buying enquiries first, and drafts replies you
            can review and send.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#waitlist"
              className={cn(
                buttonVariants({ variant: "secondary_white" }),
                "px-7 font-semibold text-primary",
              )}
            >
              Join the waitlist
            </a>
            <a
              href="#how-it-works"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-dashed border-white/70 bg-transparent px-7 font-semibold text-white hover:bg-white/15 hover:text-white focus-visible:border-white focus-visible:ring-white/60 dark:bg-transparent dark:hover:bg-white/15",
              )}
            >
              <span className="grid size-5 place-items-center rounded-full bg-white text-primary">
                <PlayIcon className="size-2.5" />
              </span>
              See how it works
            </a>
          </div>
        </div>

        {/* Dashboard preview strip: V-shaped, centre card dips off the bottom;
            the outer cards sink on scroll (GSAP ScrollTrigger). */}
        <HeroMockups mockups={MOCKUPS} />
      </div>
    </section>
  );
};

export default HeroSection;
