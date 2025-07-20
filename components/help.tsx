"use client";

import { useEffect, useState } from "react";
import Section from "./section";

export default function Help() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "?") {
        setIsOpen(true);
      } else if (event.key === "Escape") {
        setIsOpen(false);
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
            <tr>
              <td>?</td>
              <td className="text-right">Open help</td>
            </tr>
            <tr>
              <td>ESC</td>
              <td className="text-right">Close help</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
}
