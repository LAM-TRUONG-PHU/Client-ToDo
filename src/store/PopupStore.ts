import { create } from "zustand";

type TPopupStore = {
  isPopupOpen: string;
  setIsPopupOpen: (isPopupOpen: string) => Promise<void>;
};

export const usePopupStore = create<TPopupStore>()((set) => ({
  isPopupOpen: "",
  setIsPopupOpen: async (isPopupOpen: string) => {
    set({
      isPopupOpen: isPopupOpen,
    });
  },
}));
