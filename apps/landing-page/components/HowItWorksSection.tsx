import { cn } from "@repo/ui/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Chip, FollowUpRow, Message, Panel } from "./MiniUI";
import BG1 from "@/public/landing-page-mockup/bg-1.jpg";
import BG2 from "@/public/landing-page-mockup/bg-2.jpg";
import BG3 from "@/public/landing-page-mockup/bg-3.jpg";
import BG4 from "@/public/landing-page-mockup/bg-4.jpg";
import BG5 from "@/public/landing-page-mockup/bg-5.jpg";

import Image from "next/image";
const STEPS = [
  {
    title: "See the enquiry in your inbox",
    copy: "Aisha asks whether the black dress is available in size M and whether she can pay cash on delivery in Kandy. Her Instagram DM appears in your shared inbox.",
    visual: (
      <Message
        name="Aisha"
        channel="Instagram"
        text="Hi! Is the black dress available in size M? Can I pay cash on delivery in Kandy?"
      />
    ),
    imageClassName: "pt-0.5 pl-0.5 pb-2 pr-4",
    bg: BG2,
  },
  {
    title: "Keep promised follow-ups open",
    copy: "You say you’ll check stock. Inview surfaces the promise in your follow-up queue, so you can find it again while you’re handling other chats.",
    visual: (
      <div className="space-y-3">
        <Panel className="text-sm">
          <span className="text-xs font-semibold text-neutral-500">You</span>
          <p className="mt-1">Let me check and get back to you!</p>
        </Panel>
        <FollowUpRow
          title="Stock check promised"
          detail="Black dress, M · Waiting on us"
          tone="amber"
        />
      </div>
    ),
    imageClassName: "pb-1 pr-1 pl-4 pt-3",
    bg: BG4,
  },
  {
    title: "Review a draft and send it",
    copy: "Once you confirm stock, Inview prepares a reply using that confirmation and your shop’s delivery policy. Edit it if needed, then send it from the same inbox.",
    visual: (
      <Panel className="space-y-3">
        <Chip tone="green">Stock checked by seller</Chip>
        <p className="rounded-lg bg-primary/10 p-3 text-sm">
          Hi Aisha! The black dress in M is available, and we can deliver to
          Kandy with cash on delivery.
        </p>
        <div className="flex gap-2">
          <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white">
            Send
          </span>
          <span className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium">
            Edit
          </span>
        </div>
      </Panel>
    ),
    imageClassName: "pt-3 pb-3 pl-1 pr-5",
    bg: BG3,
  },
  {
    title: "Collect the details and confirm the order",
    copy: "Aisha says she’ll take it. If a delivery detail is missing, the enquiry stays open. Once you’ve collected what you need, mark the order confirmed.",
    visual: (
      <div className="space-y-3">
        <FollowUpRow
          title="Delivery address missing"
          detail="Black dress, M · COD · Kandy"
          tone="red"
        />
        <Panel className="flex items-center justify-between">
          <p className="text-sm font-semibold">Order confirmed</p>
          <Chip tone="green">✓ Confirmed</Chip>
        </Panel>
      </div>
    ),
    imageClassName: "pb-2 pl-4 pt-1 pr-1",
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
              <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
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
                "relative isolate flex items-center overflow-hidden rounded-md shadow-lg",
                i % 2 === 1 && "md:order-1",
              )}
              aria-hidden
            >
              <Image
                src={step.bg}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="-z-10 object-cover"
              />
              <div
                className={cn(
                  `relative rounded-sm w-full shadow- ${step.imageClassName}`,
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
