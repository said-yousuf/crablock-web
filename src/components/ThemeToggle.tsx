"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_CHANGE_EVENT = "crablock-theme-change";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("crablock-theme");
    const initialTheme: Theme = stored === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = initialTheme;
    const frame = window.requestAnimationFrame(() => setTheme(initialTheme));

    const syncTheme = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
    };

    const syncStoredTheme = (event: StorageEvent) => {
      if (event.key !== "crablock-theme") return;
      const nextTheme: Theme = event.newValue === "dark" ? "dark" : "light";
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
    };

    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);
    window.addEventListener("storage", syncStoredTheme);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
      window.removeEventListener("storage", syncStoredTheme);
    };
  }, []);

  function toggleTheme() {
    const currentTheme: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("crablock-theme", nextTheme);
    window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: nextTheme }));
  }

  return (
    <button
      type="button"
      className="theme-toggle inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/15 bg-white/[0.03] text-[#cac3d9] transition hover:border-[#cbbeff]/60 hover:text-white"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        {theme === "light" ? "dark_mode" : "light_mode"}
      </span>
    </button>
  );
}
