import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { ThemeToggle } from "@repo/ui/components/theme-toggle";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Inview | A sales inbox for shops that sell through chat",
  description:
    "Bring Instagram, WhatsApp and Messenger into one inbox. Keep track of buyer follow-ups and draft replies you can review and send. Join the Inview waitlist.",
  openGraph: {
    title: "Your shop’s DMs, sorted and ready to answer.",
    description:
      "One inbox for Sri Lankan shops to track what shoppers are waiting for and get replies ready.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your shop’s DMs, sorted and ready to answer.",
    description:
      "One inbox for Sri Lankan shops to track what shoppers are waiting for and get replies ready.",
  },
};

// The reference desktop layout is a 1440px-wide viewport. On any PC-sized
// screen (>= MIN_SCALE_WIDTH) the page is scaled to match it, up or down.
// Narrower screens (tablet/phone) keep the normal responsive layout.
const DESIGN_WIDTH = 1440;
const MIN_SCALE_WIDTH = 1024;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Scale the whole page (px and rem alike) to the design width so the
            layout is identical on every PC screen or zoom level. Runs before
            paint to avoid a flash of the unscaled layout. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;function f(){var w=window.innerWidth;d.style.zoom=w>=${MIN_SCALE_WIDTH}?String(w/${DESIGN_WIDTH}):"";}f();addEventListener("resize",f);})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">
          {/* <ThemeToggle className="fixed top-4 right-4 z-50" /> */}
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
