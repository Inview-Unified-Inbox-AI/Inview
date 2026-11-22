import { cn } from "@repo/ui/lib/utils";
import { SectionHeading } from "./SectionHeading";
import {
  FollowUpCard,
  InboxCard,
  OrderTimelineCard,
  ReplyDraftCard,
} from "./HowItWorksCards";
import BG2 from "@/public/landing-page-mockup/bg-2.jpg";
import BG3 from "@/public/landing-page-mockup/bg-3.jpg";
import BG4 from "@/public/landing-page-mockup/bg-4.jpg";
import BG5 from "@/public/landing-page-mockup/bg-5.jpg";

import Image from "next/image";
const STEPS = [
  {
    title: "See messages from all three apps in one inbox",
    copy: "Afthah’s Instagram DM appears in your shared inbox alongside WhatsApp and Messenger chats.",
    visual: <InboxCard />,
    imageClassName: "pt-1 pl-1 pb-2 pr-2",
    bg: BG5,
  },
  {
    title: "Keep promised follow-ups open",
    copy: "You say you’ll check stock. Inview surfaces the promise in your follow-up queue, so you can find it again while you’re handling other chats.",
    visual: <FollowUpCard />,
    imageClassName: "pb-1 pr-1 pl-2 pt-2",
    bg: BG5,
  },
  {
    title: "Review a draft and send it",
    copy: "Once you confirm stock, Inview prepares a reply using that confirmation and your shop’s delivery policy. Edit it if needed, then send it from the same inbox.",
    visual: <ReplyDraftCard />,
    imageClassName: "pt-2 pb-2 pl-1 pr-2",
    bg: BG5,
  },
  {
    title: "Collect the details and confirm the order",
    copy: "Afthah says she’ll take it. If a delivery detail is missing, the enquiry stays open. Once you’ve collected what you need, mark the order confirmed.",
    visual: <OrderTimelineCard />,
    imageClassName: "pb-1 pl-2 pt-1 pr-1",
    bg: BG5,
  },
];

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    aria-labelledby="how-heading"
    className="scroll-mt-20 py-20 md:py-32"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-5">
      <SectionHeading
        eyebrow="How it works"
        title="From the first question to a confirmed order."
        id="how-heading"
      >
        Follow one enquiry as it moves through Inview.
      </SectionHeading>

      <ol className="mt-16 space-y-16 md:space-y-24">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
          >
            <div className={cn(i % 2 === 1 && "md:order-2", "z-2")}>
              <span className="grid tabular-nums size-9 place-items-center rounded-full bg-[#EFF6FF] text-sm font-semibold text-secondary">
                {i + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                {step.copy}
              </p>
            </div>
            <div
              className={cn(
                "relative isolate flex items-center overflow-hidden rounded-xl shadow-lg shadow-muted-foreground/10",
                i % 2 === 1 && "md:order-1",
              )}
              aria-hidden
            >
              <Image
                src={step.bg}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="-z-10 object-cover "
              />
              <div
                className={cn(
                  `relative  w-full shadow- ${step.imageClassName}`,
                )}
              >
                {step.visual}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorksSection;
