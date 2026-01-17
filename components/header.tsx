"use client";

import Section from "./section";
import ThemeSelector from "./theme-selector";
import VimToggle from "./vim-toggle";
import { useEffect } from "react";

import { useStore } from "@/lib/store";

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

const ASCII_ART = [
  "      _                              _",
  "     | |                            (_)",
  "  ___| |_ ___  _ __ ___   _ ____   ___ _ __ ___",
  " / __| __/ _ \\| '__/ _ \\ | '_ \\ \\ / / | '_ ` _ \\",
  " \\__ \\ || (_) | | |  __/_| | | \\ V /| | | | | | |",
  " |___/\\__\\___/|_|  \\___(_)_| |_|\\_/ |_|_| |_| |_|",
];

type HeaderProps = {
  total: number;
};

export default function Header({ total }: HeaderProps) {
  const {
    toggleFilter,
    setShowHelp,
    setShowInstall,
    setShowMobileMenu,
    vimMode,
  } = useStore();

  useEffect(() => {
    const isMobile =
      typeof navigator !== "undefined" &&
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (!vimMode || isMobile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      switch (event.key) {
        case "?":
          event.preventDefault();
          setShowHelp(true);
          break;
        case "Escape":
          setShowHelp(false);
          setShowInstall(false);
          break;
        case "f":
          event.preventDefault();
          toggleFilter();
          break;
        case "I":
          event.preventDefault();
          setShowInstall(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vimMode, toggleFilter, setShowHelp, setShowInstall]);

  return (
    <Section className="flex justify-between flex-col md:flex-row">
      <div className="flex justify-between items-start">
        <h1 className="font-mono text-[0.5rem] whitespace-pre w-fit mx-auto sm:text-xs md:text-sm md:m-0 font-bold">
          {ASCII_ART.join("\n")}
        </h1>
        <button
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden p-1"
          aria-label="Open menu"
        >
          <HamburgerIcon />
        </button>
      </div>

      <div className="hidden md:flex flex-col font-mono items-end gap-1">
        <ThemeSelector />
        <VimToggle />
        <div className="flex gap-1">
          <button onClick={toggleFilter} className="underline">
            Filter
          </button>
          <button onClick={() => setShowHelp(true)} className="underline">
            Help
          </button>
          <button onClick={() => setShowInstall(true)} className="underline">
            Install
          </button>
        </div>
        <span>Showing 100 of {total} plugins</span>
      </div>
    </Section>
  );
}
