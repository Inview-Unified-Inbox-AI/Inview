import { BentoCard } from "./BentoCard";
import { SectionHeading } from "./SectionHeading";
import {
  DraftPreview,
  HandoffPreview,
  InboxPreview,
  LabelsPreview,
  OwnershipPreview,
  VoicePreview,
  SummaryPreview,
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
        title="Know what Inview can do for you"
        id="features-heading"
      />

      <div className="mt-16 grid gap-5 md:grid-cols-9">
        <BentoCard
          className="md:col-span-5"
          title="See the next action in each chat"
          visual={<InboxPreview />}
          bgClass=""
          imgClass=""
          visualClass="h-72"
          framedRight
        >
          Pick up a conversation with the product, size, delivery preference and
          outstanding question in view. Open the original message whenever you
          need the full context.
        </BentoCard>

        <BentoCard
          className="md:col-span-4"
          title="See overdue follow-ups"
          visual={<HandoffPreview />}
          visualClass="h-72"
          framed
        >
          Assign a stock check or delivery quote to the person handling it. They
          can see what was promised and where to pick up the conversation.
        </BentoCard>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-[repeat(3,minmax(0,1fr))]">
        <BentoCard
          title="Ownership and handoff"
          visual={<OwnershipPreview />}
          framedLeft
        >
          Assign an action, set a due time and leave a note. The next person on
          shift knows exactly what was promised.
        </BentoCard>

        <BentoCard
          title="Labels and filters"
          visual={<LabelsPreview />}
          framed
          imgClass="-mb-10"
        >
          Sales enquiries, orders, support and spam sorted for you. Correct a
          label any time.
        </BentoCard>

        <BentoCard
          title="Conversation summary"
          visual={<SummaryPreview />}
          framedRight
        >
          Product, variant, quantity and delivery in one glance. Uncertain
          details are flagged for review.
        </BentoCard>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-5">
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
          title="Run your workflows with your voice"
          visual={<VoicePreview />}
          bgClass="object-top"
          imgClass="px-5 pt-6 md:px-8 md:pt-8"
          framed
        >
          Just say what needs doing, like assigning a stock check or setting a
          reminder, and Inview takes care of the steps.
        </BentoCard>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
