import { describe, it, expect, beforeEach, vi } from "vitest";

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

const { useStore } = await import("../lib/store");

beforeEach(() => {
  useStore.setState({
    filter: "",
    showFilter: false,
    theme: "mocha",
    sort: "default",
    vimMode: true,
    showHelp: false,
    showInstall: false,
  });
});

describe("store", () => {
  it("updates filter and toggles visibility", () => {
    useStore.getState().setFilter("vim");
    expect(useStore.getState().filter).toBe("vim");
    useStore.getState().toggleFilter();
    expect(useStore.getState().showFilter).toBe(true);
    useStore.getState().toggleFilter();
    expect(useStore.getState().showFilter).toBe(false);
    expect(useStore.getState().filter).toBe("");
  });

  it("sets theme, sort, vim mode and dialogs", () => {
    const state = useStore.getState();
    state.setTheme("latte");
    state.setSort("stars");
    state.setVimMode(false);
    state.setShowHelp(true);
    state.setShowInstall(true);

    const current = useStore.getState();
    expect(current.theme).toBe("latte");
    expect(current.sort).toBe("stars");
    expect(current.vimMode).toBe(false);
    expect(current.showHelp).toBe(true);
    expect(current.showInstall).toBe(true);
  });
});
