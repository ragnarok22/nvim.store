import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "latte" | "frappe" | "macchiato" | "mocha";

export type SortOption = "default" | "stars" | "updated";

interface State {
  filter: string;
  showFilter: boolean;
  theme: Theme;
  sort: SortOption;
}

interface Actions {
  setFilter: (filter: string) => void;
  toggleFilter: () => void;
  setTheme: (theme: Theme) => void;
  setSort: (sort: SortOption) => void;
}

const initialState: State = {
  filter: "",
  showFilter: false,
  theme: "mocha",
  sort: "default",
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
    }),
    {
      name: "store-theme",
      partialize: (state) => ({ theme: state.theme, sort: state.sort }),
    },
  ),
);
