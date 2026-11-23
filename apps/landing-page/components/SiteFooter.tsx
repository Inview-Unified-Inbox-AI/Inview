import Logo from "@/public/logo.svg";
import Image from "next/image";
import { buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

/* TODO: replace these with Inview's real profile URLs. */
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "WhatsApp", href: "https://wa.me/", icon: "whatsapp" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/inview-app/home/",
    icon: "linkedin",
  },
] as const;

const COLUMNS = [
  {
    title: "Product",
    links: [
      ["How it works", "#how-it-works"],
      ["Features", "#features"],
      ["Pricing", "#pricing"],
      ["FAQ", "#faq"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Join the waitlist", "#waitlist"],
      ["Privacy Policy", "/privacy"],
    ],
  },
] as const;

function SocialIcon({ name }: { name: (typeof SOCIALS)[number]["icon"] }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "instagram":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...props}>
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
  }
}

const SiteFooter = () => (
  <footer className="border-t border-border bg-muted/30">
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-10">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src={Logo}
            alt="Inview Unified Inbox"
            width={150}
            height={150}
            className="w-36"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            The sales inbox for shops that sell through chat. Built in Sri Lanka
            for Instagram, WhatsApp and Messenger sellers.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Inview on social media">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <a className="hover:text-foreground" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="text-sm font-semibold">Get early access</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Join the waitlist and we’ll contact you on WhatsApp when we’re
            inviting shops like yours.
          </p>
          <a
            href="#waitlist"
            className={cn(
              buttonVariants({ size: "default" }),
              "mt-5 rounded-full",
            )}
          >
            Join the waitlist
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1">
          <p>© {new Date().getFullYear()} Inview. All rights reserved.</p>{" "}
          <p>
            Crafted by{" "}
            <span>
              <a
                href="https://afras.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                Afras
              </a>
            </span>
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a className="hover:text-foreground" href="/privacy">
            Privacy
          </a>
          <a className="hover:text-foreground" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
