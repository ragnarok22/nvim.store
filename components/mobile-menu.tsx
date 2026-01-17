"use client";

import Section from "./section";
import { useStore, Theme } from "@/lib/store";

const themes: Theme[] = ["latte", "frappe", "macchiato", "mocha"];

export default function MobileMenu() {
  const {
    showMobileMenu,
    setShowMobileMenu,
    setShowHelp,
    setShowInstall,
    toggleFilter,
    theme,
    setTheme,
  } = useStore();

  if (!showMobileMenu) {
    return null;
  }

  const handleOption = (action: () => void) => {
    setShowMobileMenu(false);
    action();
  };

  return (
    <div className="absolute h-full w-full inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50">
      <Section className="min-w-[200px] max-w-10/12 relative bg-background">
        <button
          onClick={() => setShowMobileMenu(false)}
          className="absolute right-2 top-2 underline"
        >
          Close
        </button>
        <nav className="font-mono flex flex-col gap-4 pt-4">
          <button
            onClick={() => handleOption(() => toggleFilter())}
            className="text-left underline"
          >
            Filter
          </button>
          <button
            onClick={() => handleOption(() => setShowHelp(true))}
            className="text-left underline"
          >
            Help
          </button>
          <a
            href="https://github.com/ragnarok22/nvim.store"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            onClick={() => setShowMobileMenu(false)}
          >
            About
          </a>
          <div className="flex flex-col gap-2">
            <span>Theme</span>
            <div className="flex gap-2 flex-wrap">
              {themes.map((th) => (
                <button
                  key={th}
                  onClick={() => setTheme(th)}
                  className={`px-2 py-1 border border-foreground rounded ${
                    theme === th ? "bg-foreground text-background" : ""
                  }`}
                >
                  {th}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleOption(() => setShowInstall(true))}
            className="text-left underline"
          >
            How to install
          </button>
        </nav>
      </Section>
    </div>
  );
}
