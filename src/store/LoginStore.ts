import { create } from "zustand";

type TLoginStore = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => Promise<void>;
};

export const useLoginStore = create<TLoginStore>()((set) => ({
  isLogged: false,
  setIsLogged: async (isLogged: boolean) => {
    set({
      isLogged: isLogged,
    });
  },
}));
