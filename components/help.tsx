"use client";

import Section from "./section";
import { useStore } from "@/lib/store";

export default function Help() {
  const { vimMode, showHelp, setShowHelp } = useStore();

  const shortcuts: Record<string, string> = {
    "?": "Open help",
    Escape: "Close overlays",
    f: "Toggle filter",
    I: "Show install guide",
  };

  const tableShortcuts: Record<string, string> = {
    ...shortcuts,
    ...(vimMode
      ? {
          j: "Next repository",
          k: "Previous repository",
        }
      : {}),
  };

  if (!showHelp) {
    return null;
  }

  return (
    <div className="absolute h-full w-full inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center">
      <Section className="min-w-[200px] max-w-10/12 relative bg-background">
        <button
          onClick={() => setShowHelp(false)}
          className="absolute right-2 top-2 underline"
        >
          Close
        </button>
        <table className="table-auto w-full font-mono">
          <thead className="">
            <tr className="border-b">
              <th className="">Key</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="pt-1">
            {Object.entries(tableShortcuts).map(([key, description]) => (
              <tr key={key}>
                <td>{key}</td>
                <td className="text-right">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
