import { SectionHeading } from "./SectionHeading";
import HowItWorksStory from "./HowItWorksStory";

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    aria-labelledby="how-heading"
    className="scroll-mt-20 py-20 md:py-32"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-5">
      <SectionHeading
        eyebrow="How it works"
        title="You said you’d check. Inview keeps it on your list."
        id="how-heading"
      >
        Follow one Instagram enquiry from a promised stock check to a confirmed
        order.
      </SectionHeading>

      <HowItWorksStory />
    </div>
  </section>
);

export default HowItWorksSection;
