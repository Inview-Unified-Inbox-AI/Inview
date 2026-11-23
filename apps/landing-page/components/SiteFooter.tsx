import Logo from "@/public/logo.svg";
import Image from "next/image";
const SiteFooter = () => (
  <footer className="border-t border-border py-10">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-10 md:flex-row md:items-center md:justify-between">
      <div>
        <Image
          src={Logo}
          alt="Inview Unified Inbox"
          width={1000}
          height={1000}
          className="w-100"
        />
        <p className="mt-1 text-sm text-muted-foreground">
          The sales inbox for shops that sell through chat.
        </p>
      </div>
      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li>
            <a className="hover:text-foreground" href="#how-it-works">
              How it works
            </a>
          </li>
          <li>
            <a className="hover:text-foreground" href="#faq">
              FAQ
            </a>
          </li>
          <li>
            <a className="hover:text-foreground" href="/privacy">
              Privacy
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default SiteFooter;
