import { create } from "zustand";

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

export const useStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter: string) => set({ filter }),
  toggleFilter: () => set((state) => ({ showFilter: !state.showFilter })),
  setTheme: (theme: Theme) => set({ theme }),
}));
