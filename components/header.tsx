"use client";

import Section from "./section";
import ThemeSelector from "./theme-selector";
import VimToggle from "./vim-toggle";
import { useStore } from "@/lib/store";

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
  const { toggleFilter, setShowHelp, setShowInstall } = useStore();
  return (
    <Section className="flex justify-between flex-col md:flex-row">
      <h1 className="font-mono text-[0.4rem] whitespace-pre sm:text-xs md:text-sm font-bold">
        {ASCII_ART.join("\n")}
      </h1>

      <div className="flex flex-col font-mono mt-3 md:mt-0 items-end gap-1">
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
