import { buttonVariants } from "@repo/ui/components/button";

const SiteHeader = () => (
  <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md">
    <nav
      aria-label="Main"
      className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-10"
    >
      <a href="#top" className="text-lg font-semibold tracking-tight">
        Inview
      </a>
      <ul className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
        <li>
          <a className="hover:text-foreground" href="#how-it-works">
            How it works
          </a>
        </li>
        <li>
          <a className="hover:text-foreground" href="#features">
            Features
          </a>
        </li>
        <li>
          <a className="hover:text-foreground" href="#faq">
            FAQ
          </a>
        </li>
      </ul>
      <a href="#waitlist" className={buttonVariants({ size: "default" })}>
        Join the waitlist
      </a>
    </nav>
  </header>
);

export default SiteHeader;
