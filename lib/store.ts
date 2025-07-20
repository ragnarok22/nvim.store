import { create } from "zustand";

interface State {
  filter: string;
  showFilter: boolean;
}

interface Actions {
  setFilter: (filter: string) => void;
  toggleFilter: () => void;
}

const initialState: State = {
  filter: "",
  showFilter: false,
};

export const useStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter: string) => set({ filter }),
  toggleFilter: () => set((state) => ({ showFilter: !state.showFilter })),
}));
