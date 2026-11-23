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
      <body>
        <ThemeProvider defaultTheme="light">
          {/* <ThemeToggle className="fixed top-4 right-4 z-50" /> */}
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
