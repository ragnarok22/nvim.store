import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "latte" | "frappe" | "macchiato" | "mocha";

export type SortOption = "default" | "stars" | "updated";

interface State {
  filter: string;
  showFilter: boolean;
  theme: Theme;
  sort: SortOption;
  vimMode: boolean;
  showHelp: boolean;
  showInstall: boolean;
  showMobileMenu: boolean;
}

interface Actions {
  setFilter: (filter: string) => void;
  toggleFilter: () => void;
  setTheme: (theme: Theme) => void;
  setSort: (sort: SortOption) => void;
  setVimMode: (enabled: boolean) => void;
  setShowHelp: (show: boolean) => void;
  setShowInstall: (show: boolean) => void;
  setShowMobileMenu: (show: boolean) => void;
}

const initialState: State = {
  filter: "",
  showFilter: false,
  theme: "mocha",
  sort: "default",
  vimMode: true,
  showHelp: false,
  showInstall: false,
  showMobileMenu: false,
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setFilter: (filter: string) => set({ filter }),
      toggleFilter: () =>
        set((state) => {
          const showFilter = !state.showFilter;
          return {
            showFilter,
            filter: showFilter ? state.filter : "",
          };
        }),
      setTheme: (theme: Theme) => set({ theme }),
      setSort: (sort: SortOption) => set({ sort }),
      setVimMode: (enabled: boolean) => set({ vimMode: enabled }),
      setShowHelp: (show: boolean) => set({ showHelp: show }),
      setShowInstall: (show: boolean) => set({ showInstall: show }),
      setShowMobileMenu: (show: boolean) => set({ showMobileMenu: show }),
    }),
    {
      name: "store-theme",
      partialize: (state) => ({
        theme: state.theme,
        sort: state.sort,
        vimMode: state.vimMode,
      }),
    },
  ),
);
