"use client";

import { useEffect, useState } from "react";
import Section from "./section";

export default function InstallModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      if (event.key === "I") {
        event.preventDefault();
        setIsOpen(true);
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-xs flex justify-center items-center">
      <Section className="max-w-10/12 min-w-[200px] font-mono">
        <h3 className="text-lg font-bold mb-2">Install store.nvim</h3>
        <pre className="text-sm whitespace-pre-wrap">
{`-- Using lazy.nvim
{
  'alex-popov-tech/store.nvim',
  dependencies = {
    'MunifTanjim/nui.nvim',
    'nvim-lua/plenary.nvim',
  },
  config = function()
    require('store').setup()
  end,
}
`}
        </pre>
        <p className="text-sm mt-2">
          Then run <code>:Store</code> inside Neovim.
        </p>
      </Section>
    </div>
  );
}
