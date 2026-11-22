import { BentoCard } from "./BentoCard";
import { SectionHeading } from "./SectionHeading";
import {
  DraftPreview,
  HandoffPreview,
  InboxPreview,
  ReportPreview,
} from "./FeatureVisuals";

const FeaturesSection = () => (
  <section
    id="features"
    aria-labelledby="features-heading"
    className=" bg-muted/50 py-20 md:py-32"
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
          visual={<InboxPreview />}
          bgClass="mx-7 mt-7 rounded-lg"
          imgClass="pr-0 md:pr-0 -mr-2 "
        >
          Pick up a conversation with the product, size, delivery preference and
          outstanding question in view. Open the original message whenever you
          need the full context.
        </BentoCard>

        <BentoCard
          className="md:col-span-2"
          title="Hand off a follow-up with the details attached"
          visual={<HandoffPreview />}
          framed
        >
          Assign a stock check or delivery quote to the person handling it. They
          can see what was promised and where to pick up the conversation.
        </BentoCard>

        <BentoCard
          className="md:col-span-2"
          title="Start with a draft you can edit"
          visual={<DraftPreview />}
          bgClass=""
          imgClass=""
          framed
        >
          Use your shop’s product details, listed prices and delivery policies
          to draft answers to common questions. Your team checks the details and
          decides what to send.
        </BentoCard>

        <BentoCard
          className="md:col-span-3"
          title="See where work is piling up"
          visual={<ReportPreview />}
          bgClass=" rounded-lg -ml-7 mt-5"
          imgClass="md:pl-0 -ml-2   -mb-5 -mt-2"
        >
          Review open and overdue follow-ups alongside enquiries your team
          marked as confirmed orders.
        </BentoCard>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
