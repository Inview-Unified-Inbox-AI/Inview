import { SectionHeading } from "./SectionHeading";

const ROWS = [
  {
    lead: "Clothing boutiques",
    text: "handling a rush of size and availability questions after a new drop.",
  },
  {
    lead: "Jewellery and accessories shops",
    text: "answering questions about variants, gift orders and delivery.",
  },
  {
    lead: "Small teams sharing replies",
    text: "who need to know what’s already been promised and who’s following up.",
  },
];

const AudienceSection = () => (
  <section aria-labelledby="audience-heading" className="py-20 md:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-10 md:grid-cols-2 md:gap-16">
      <SectionHeading
        align="left"
        eyebrow="Who it’s for"
        title="Built for shops that sell through chat."
        id="audience-heading"
      >
        Inview is starting with Sri Lankan fashion and accessories shops. If
        customers ask about sizes, colours, stock and delivery before placing an
        order in chat, this is for you.
      </SectionHeading>

      <ul className="space-y-4">
        {ROWS.map((row) => (
          <li
            key={row.lead}
            className="flex gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <span
              aria-hidden
              className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 text-sm text-primary"
            >
              ✓
            </span>
            <p className="text-base leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                {row.lead}
              </strong>{" "}
              {row.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default AudienceSection;
