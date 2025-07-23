"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

export default function VimToggle() {
  const { vimMode, setVimMode } = useStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer:coarse)").matches;
    setIsMobile(mobile);
    if (mobile) {
      setVimMode(false);
    }
  }, [setVimMode]);

  if (isMobile) return null;

  return (
    <label className="flex items-center gap-1 cursor-pointer">
      <input
        type="checkbox"
        checked={vimMode}
        onChange={(e) => setVimMode(e.target.checked)}
        className="cursor-pointer"
      />
      vim motions
    </label>
  );
}
