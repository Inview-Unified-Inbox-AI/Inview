import { SectionHeading } from "./SectionHeading";
import ProblemScene from "./ProblemScene";

const ProblemSection = () => (
  <section aria-labelledby="problem-heading" className="py-20 md:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16">
      <div>
        <SectionHeading
          eyebrow="The problem"
          title="You replied. The shopper’s still waiting."
          id="problem-heading"
          align="left"
        />

        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            Afthah asks if the black dress comes in size M. You promise to
            check. Then a WhatsApp message comes in, and you’re back to packing
            orders.
          </p>
          <p className="font-medium text-foreground">
            An hour later, Afthah is still waiting to hear if you have her size.
          </p>
        </div>
      </div>

      <ProblemScene />
    </div>
  </section>
);

export default ProblemSection;
