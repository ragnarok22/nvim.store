"use client";
import { useStore } from "@/lib/store";

const themes = ["latte", "frappe", "macchiato", "mocha"] as const;

export default function ThemeSelector() {
  const { theme, setTheme } = useStore();

  return (
    <select
      className="bg-background text-foreground border border-foreground rounded px-1"
      value={theme}
      onChange={(e) => setTheme(e.target.value as typeof themes[number])}
    >
      {themes.map((th) => (
        <option key={th} value={th}>
          {th}
        </option>
      ))}
    </select>
  );
}
