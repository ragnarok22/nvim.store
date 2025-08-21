import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => {
  return {
    Inter: vi.fn((opts) => ({ ...opts, className: "inter" })),
    Lusitana: vi.fn((opts) => ({ ...opts, className: "lusitana" })),
    Geist: vi.fn((opts) => ({ ...opts })),
    Geist_Mono: vi.fn((opts) => ({ ...opts })),
  };
});

import { inter, lusitana, geistSans, geistMono } from "../lib/fonts";
import { Inter, Lusitana, Geist, Geist_Mono } from "next/font/google";

describe("fonts", () => {
  it("initializes google fonts with expected options", () => {
    expect(Inter).toHaveBeenCalledWith({ subsets: ["latin"] });
    expect(Lusitana).toHaveBeenCalledWith({
      weight: ["400", "700"],
      subsets: ["latin"],
    });
    expect(Geist).toHaveBeenCalledWith({
      variable: "--font-geist-sans",
      subsets: ["latin"],
    });
    expect(Geist_Mono).toHaveBeenCalledWith({
      variable: "--font-geist-mono",
      subsets: ["latin"],
    });

    expect(inter.className).toBe("inter");
    expect(lusitana.className).toBe("lusitana");
    expect(geistSans.variable).toBe("--font-geist-sans");
    expect(geistMono.variable).toBe("--font-geist-mono");
  });
});
