import { SectionHeading } from "./SectionHeading";
import { Message } from "./MiniUI";

const ProblemSection = () => (
  <section aria-labelledby="problem-heading" className="  py-20  md:py-32">
    <div className="mx-auto max-w-3xl px-5 sm:px-5">
      <SectionHeading
        eyebrow="The problem"
        title="“I’ll check and get back to you.”"
        id="problem-heading"
      />

      <div className="mt-8 space-y-4 text-center text-base leading-relaxed text-muted-foreground md:text-lg">
        <p>Then the next message comes in.</p>
        <p>
          A customer asks if you have their size. You tell them you’ll check.
          Before you get to it, someone asks about delivery on WhatsApp, another
          shopper replies to your Instagram story, and you’re back to packing
          orders.
        </p>
        <p className="font-medium text-foreground">
          Later, the chat looks answered. The shopper is still waiting.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-md space-y-3" aria-hidden>
        <Message
          name="Aisha"
          channel="Instagram"
          text="Is the black dress available in size M?"
          status="Waiting on us"
        />
        <Message
          name="Nuwan"
          channel="WhatsApp"
          text="Can I pay COD for two items?"
        />
        <Message
          name="Priya"
          channel="Messenger"
          text="Is the blue one still in stock?"
        />
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-lg font-medium text-balance text-primary md:text-xl">
        Inview keeps the stock checks, delivery questions and missing order
        details your shop still needs to handle in one place.
      </p>
    </div>
  </section>
);

export default ProblemSection;
