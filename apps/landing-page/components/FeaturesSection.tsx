import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import InboxUI from "@/public/landing-page-mockup/unified-inbox.svg";
import ReportUI from "@/public/landing-page-mockup/report.svg";
import ReplyUI from "@/public/landing-page-mockup/reply.svg";
import { BentoCard } from "./BentoCard";
import { SectionHeading } from "./SectionHeading";
import { FollowUpRow } from "./MiniUI";

const shot = (src: typeof InboxUI, alt: string, className?: string) => (
  <Image
    src={src}
    alt={alt}
    sizes="(min-width: 1152px) 560px, 90vw"
    className={cn("h-auto w-full rounded-xl", className)}
  />
);

const FeaturesSection = () => (
  <section
    id="features"
    aria-labelledby="features-heading"
    className="scroll-mt-20 bg-muted/50 py-20 md:py-32"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-5">
      <SectionHeading
        eyebrow="Features"
        title="Know what’s waiting and who’s handling it."
        id="features-heading"
      />

      <div className="mt-16 grid gap-5 md:grid-cols-5">
        <BentoCard
          className="md:col-span-3"
          title="See the next action in each chat"
          visual={shot(
            InboxUI,
            "Shared inbox showing each chat with its channel and latest question",
          )}
        >
          Pick up a conversation with the product, size, delivery preference and
          outstanding question in view. Open the original message whenever you
          need the full context.
        </BentoCard>

        <BentoCard
          className="md:col-span-2"
          title="Hand off a follow-up with the details attached"
          visual={
            <div className="space-y-3" aria-hidden>
              <FollowUpRow
                title="Stock check"
                detail="Black dress, M"
                tone="amber"
                assignee="NK"
              />
              <FollowUpRow
                title="Delivery quote"
                detail="Kandy · 2 items"
                tone="blue"
                assignee="SP"
              />
            </div>
          }
        >
          Assign a stock check or delivery quote to the person handling it. They
          can see what was promised and where to pick up the conversation.
        </BentoCard>

        <BentoCard
          className="md:col-span-2"
          title="Start with a draft you can edit"
          visual={shot(ReplyUI, "Drafted reply ready to edit and send")}
        >
          Use your shop’s product details, listed prices and delivery policies
          to draft answers to common questions. Your team checks the details and
          decides what to send.
        </BentoCard>

        <BentoCard
          className="md:col-span-3"
          title="See where work is piling up"
          visual={shot(
            ReportUI,
            "Report of open and overdue follow-ups and confirmed orders",
          )}
        >
          Review open and overdue follow-ups alongside enquiries your team
          marked as confirmed orders.
        </BentoCard>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
