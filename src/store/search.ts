import { create } from "zustand";

interface SearchInfo {
  content: string;
  setSearchContent: (newValue: string) => void;
}

export const useSearchStore = create<SearchInfo>()(set => ({
  content: "",
  setSearchContent: (newValue: string) => set(() => ({ content: newValue }))
}));
