import Section from "./section";

const ASCII_ART = [
  "      _                              _",
  "     | |                            (_)",
  "  ___| |_ ___  _ __ ___   _ ____   ___ _ __ ___",
  " / __| __/ _ \\| '__/ _ \\ | '_ \\ \\ / / | '_ ` _ \\",
  " \\__ \\ || (_) | | |  __/_| | | \\ V /| | | | | | |",
  " |___/\\__\\___/|_|  \\___(_)_| |_|\\_/ |_|_| |_| |_|",
];

export default function Header() {
  return (
    <Section className="flex justify-between">
      <h1 className="font-mono text-xs whitespace-pre md:text-sm">
        {ASCII_ART.join("\n")}
      </h1>

      <div className="flex flex-col">
        <span>Filter: {"None"}</span>
        <span>Showing 100 of 100 plugins</span>
        <span>Press ? for help</span>
      </div>
    </Section>
  );
}
