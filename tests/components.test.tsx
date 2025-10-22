import React from "react";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const storage: Record<string, string> = {};

vi.stubGlobal("localStorage", {
  getItem: (key: string) => (key in storage ? storage[key] : null),
  setItem: (key: string, value: string) => {
    storage[key] = value;
  },
  removeItem: (key: string) => {
    delete storage[key];
  },
});

type StoreModule = typeof import("../lib/store");
type ThemeSelectorComponent =
  (typeof import("../components/theme-selector"))["default"];
type VimToggleComponent =
  (typeof import("../components/vim-toggle"))["default"];
type RepoFilterComponent =
  (typeof import("../components/repo-filter"))["default"];

let useStore: StoreModule["useStore"];
let ThemeSelector: ThemeSelectorComponent;
let VimToggle: VimToggleComponent;
let RepoFilter: RepoFilterComponent;

const resetStore = (
  state?: Partial<ReturnType<StoreModule["useStore"]["getState"]>>,
) => {
  useStore.setState({
    filter: "",
    showFilter: false,
    theme: "mocha",
    sort: "default",
    vimMode: true,
    showHelp: false,
    showInstall: false,
    ...state,
  });
};

beforeAll(async () => {
  ({ useStore } = await import("../lib/store"));
  ({ default: ThemeSelector } = await import("../components/theme-selector"));
  ({ default: VimToggle } = await import("../components/vim-toggle"));
  ({ default: RepoFilter } = await import("../components/repo-filter"));
});

beforeEach(() => {
  Object.keys(storage).forEach((key) => delete storage[key]);
  resetStore();
});

describe("ThemeSelector", () => {
  it("renders theme options with the default selection", () => {
    const html = renderToStaticMarkup(<ThemeSelector />);
    expect(html).toContain(
      '<select class="bg-background text-foreground border border-foreground rounded px-1">',
    );

    ["latte", "frappe", "macchiato", "mocha"].forEach((theme) => {
      expect(html).toMatch(new RegExp(`<option[^>]*value="${theme}"`));
    });

    expect(html).toMatch(/<option[^>]*value="mocha"[^>]*selected=""/);
  });
});

describe("VimToggle", () => {
  it("reflects the vim mode flag", () => {
    const enabled = renderToStaticMarkup(<VimToggle />);
    expect(enabled).toMatch(/<input[^>]*type="checkbox"[^>]*checked=""/);
  });
});

describe("RepoFilter", () => {
  it("does not render when the filter is hidden", () => {
    const html = renderToStaticMarkup(<RepoFilter />);
    expect(html).toBe("");
  });
});
