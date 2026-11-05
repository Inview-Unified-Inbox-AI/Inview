"use client";

import type { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes renders an inline <script>; React 19 logs a harmless dev-only warning
// about it on the client. Filter just that message until next-themes ships a fix.
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

/**
 * Wrap the app once in the root layout. It adds the `dark` / `light` class to <html>,
 * remembers the choice in localStorage, and follows the OS setting by default.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
