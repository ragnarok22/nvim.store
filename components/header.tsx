import Section from "./section";
import ThemeSelector from "./theme-selector";
import VimToggle from "./vim-toggle";

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
  return (
    <Section className="flex justify-between flex-col md:flex-row">
      <h1 className="font-mono text-[0.4rem] whitespace-pre sm:text-xs md:text-sm font-bold">
        {ASCII_ART.join("\n")}
      </h1>

      <div className="flex flex-col font-mono mt-3 md:mt-0 items-end gap-1">
        <ThemeSelector />
        <VimToggle />
        <span>Filter: {"None"}</span>
        <span>Showing 100 of {total} plugins</span>
        <span>Press ? for help</span>
      </div>
    </Section>
  );
}
