"use client";


import Section from "./section";
import { useStore } from "@/lib/store";

export default function InstallModal() {
  const { showInstall, setShowInstall } = useStore();

  if (!showInstall) return null;

  return (
    <div className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-xs flex justify-center items-center">
      <Section className="max-w-10/12 min-w-[200px] font-mono relative">
        <button
          onClick={() => setShowInstall(false)}
          className="absolute right-2 top-2 underline"
        >
          Close
        </button>
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
