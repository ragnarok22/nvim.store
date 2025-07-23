"use client";

import { useEffect, useState } from "react";
import Section from "./section";
import { useStore } from "@/lib/store";

type Shortcut = {
  description: string;
  action: () => void;
};

export default function Help() {
  const { toggleFilter, vimMode } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts: Record<string, Shortcut> = {
    "?": {
      description: "Open help",
      action: () => setIsOpen(true),
    },
    Escape: {
      description: "Close help",
      action: () => setIsOpen(false),
    },
    f: {
      description: "Toggle filter",
      action: toggleFilter,
    },
  };

  const tableShortcuts = {
    ...shortcuts,
    I: {
      description: "Show install guide",
    },
    ...(vimMode
      ? {
          j: { description: "Next repository" },
          k: { description: "Previous repository" },
        }
      : {}),
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      const shortcut = shortcuts[event.key];
      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute h-full w-full inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center">
      <Section className="min-w-[200px] max-w-10/12">
        <table className="table-auto w-full font-mono">
          <thead className="">
            <tr className="border-b">
              <th className="">Key</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="pt-1">
            {Object.entries(tableShortcuts).map(([key, item]) => (
              <tr key={key}>
                <td>{key}</td>
                <td className="text-right">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
