"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

function getIsMobile() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer:coarse)").matches
  );
}

export default function VimToggle() {
  const { vimMode, setVimMode } = useStore();
  const [isMobile] = useState(getIsMobile);

  useEffect(() => {
    if (isMobile) {
      setVimMode(false);
    }
  }, [isMobile, setVimMode]);

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
