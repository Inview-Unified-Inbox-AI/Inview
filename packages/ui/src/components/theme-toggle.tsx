"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  ThemeTogglerButton,
  ThemeTogglerButtonIcon,
  type Resolved,
  type ThemeSelection,
} from "@repo/ui/components/animate-ui/buttons/theme-toggler";

/** Ready-made light/dark toggle. Needs <ThemeProvider> above it (see theme-provider.tsx). */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeTogglerButton
      theme={(theme ?? "system") as ThemeSelection}
      resolvedTheme={(resolvedTheme ?? "light") as Resolved}
      setTheme={setTheme}
      modes={["light", "dark"]}
      variant="outline"
      aria-label="Toggle theme"
      className={className}
    >
      <ThemeTogglerButtonIcon light={<SunIcon />} dark={<MoonIcon />} />
    </ThemeTogglerButton>
  );
}
