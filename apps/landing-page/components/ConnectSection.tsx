import { SectionHeading } from "./SectionHeading";
import ConnectFlow from "./ConnectFlow";

const ConnectSection = () => (
  <section
    id="how-it-connects"
    aria-labelledby="connect-heading"
    className="scroll-mt-20 py-20 md:py-32"
  >
    <div className="mx-auto max-w-7xl px-5">
      <SectionHeading
        eyebrow="The full picture"
        title="Every chat in. Every next step handled."
        id="connect-heading"
      >
        Instagram, WhatsApp and Messenger flow into one inbox. An AI agent
        reads, labels and drafts. Automation keeps every promise on your list.
      </SectionHeading>

      <ConnectFlow />
    </div>
  </section>
);

export default ConnectSection;
