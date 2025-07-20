import { create } from "zustand";

interface State {
  filter: string;
}

interface Actions {
  setFilter: (filter: string) => void;
}

const initialState: State = {
  filter: "",
};

export const useStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilter: (filter: string) => set({ filter }),
}));
