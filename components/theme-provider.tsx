"use client";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

export default function ThemeProvider() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
}
