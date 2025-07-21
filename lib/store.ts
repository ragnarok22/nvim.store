import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "latte" | "frappe" | "macchiato" | "mocha";

interface State {
  filter: string;
  showFilter: boolean;
  theme: Theme;
}

interface Actions {
  setFilter: (filter: string) => void;
  toggleFilter: () => void;
  setTheme: (theme: Theme) => void;
}

const initialState: State = {
  filter: "",
  showFilter: false,
  theme: "mocha",
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setFilter: (filter: string) => set({ filter }),
      toggleFilter: () => set((state) => ({ showFilter: !state.showFilter })),
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "store-theme",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
