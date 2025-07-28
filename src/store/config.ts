import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface Config {
  downlaodPath: string;
  setDownlaodPath: (newValue: string) => void;
}

export const useConfigStore = create<Config>()(
  persist(
    (set, get) => ({
      downlaodPath: "",
      setDownlaodPath: (newValue: string) => set(() => ({ downlaodPath: newValue }))
    }),
    {
      name: "config_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
