import { buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { SectionHeading } from "./SectionHeading";
import BG from "@/public/landing-page-mockup/bg-1.jpg";
import Image from "next/image";
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M4.5 10.5l3.5 3.5 7.5-8" />
  </svg>
);

const PLANS = [
  {
    name: "Free",
    price: "LKR 0",
    period: "to start",
    blurb: "For trying Inview before you commit.",
    people: "1 person",
    features: [
      "One connected channel",
      "See what each shopper is still waiting for",
      "Review and edit suggested replies",
    ],
    featured: false,
  },
  {
    name: "Solo",
    price: "LKR 1,990",
    period: "/ month per shop",
    blurb: "For shop owners who handle their own DMs.",
    people: "1 person",
    features: [
      "One inbox for your connected channels",
      "See what each shopper is still waiting for",
      "Review and edit suggested replies",
      "Mark orders as confirmed",
    ],
    featured: true,
  },
  {
    name: "Team",
    price: "LKR 4,490",
    period: "/ month per shop",
    blurb: "For shops where several people reply or follow up.",
    people: "Up to 5 people",
    features: [
      "Everything in Solo",
      "Assign stock checks and delivery quotes",
      "Hand off a follow-up with its chat and notes",
      "See who’s handling each follow-up and what’s overdue",
    ],
    featured: false,
  },
] as const;

const PricingSection = () => (
  <section
    id="pricing"
    aria-labelledby="pricing-heading"
    className="scroll-mt-20 py-20 md:py-32"
  >
    <div className="mx-auto max-w-6xl px-5">
      <SectionHeading
        eyebrow="Pricing"
        title="One simple price per shop."
        id="pricing-heading"
      >
        Start free, then pick the plan that fits how many people answer your
        chats.
      </SectionHeading>

      <div className="mt-14 grid items-stretch gap-5 md:grid-cols-3">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "relative isolate flex flex-col overflow-hidden rounded-xl bg-card",
              plan.featured
                ? "shadow-xl shadow-primary/10 ring-0 ring-primary"
                : "shadow-lg shadow-muted-foreground/5 ring-border",
            )}
          >
            {plan.featured && (
              <Image
                src={BG}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="-z-10 object-cover"
              />
            )}
            <div className="flex h-full flex-col p-7 md:p-8">
              <h3
                className={cn(
                  "text-lg font-semibold",
                  plan.featured && "text-white",
                )}
              >
                {plan.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "text-3xl font-semibold tracking-tight tabular-nums md:text-4xl",
                    plan.featured && "text-white",
                  )}
                >
                  {plan.price}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    plan.featured ? "text-white" : "text-muted-foreground",
                  )}
                >
                  {plan.period}
                </span>
              </p>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed md:min-h-12",
                  plan.featured ? "text-white" : "text-muted-foreground",
                )}
              >
                {plan.blurb}
              </p>

              <p
                className={cn(
                  "mt-6 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold text-primary",
                  plan.featured ? "bg-white/80" : "bg-primary/10",
                )}
              >
                {plan.people}
              </p>

              <ul
                className={cn(
                  "mt-6 flex-1 space-y-3.5 border-t pt-6 text-sm",
                  plan.featured ? "border-white/50" : "border-border",
                )}
              >
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <CheckIcon
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.featured ? "text-white" : "text-primary",
                      )}
                    />
                    <span className={cn("", plan.featured && "text-white")}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={cn(
                  buttonVariants({
                    variant: plan.featured ? "secondary_white" : "outline",
                  }),
                  "mt-8 w-full font-semibold",
                  plan.featured && "text-primary",
                )}
              >
                Join the waitlist
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
