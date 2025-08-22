import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppConfig {
  download_path: string;
  lyric_visible: boolean;
  mode: boolean;
  volume: number;
  auto_play: boolean;
  header_visible: boolean;
}

type ConfigAction = {
  updateAppConfig: (config: Partial<AppConfig>) => void;
};

export const useConfigStore = create<AppConfig & ConfigAction>()(
  persist(
    (set) => ({
      download_path: "",
      lyric_visible: false,
      mode: false,
      volume: 0.6,
      auto_play: false,
      header_visible: true,
      updateAppConfig: (config) => set((state) => ({ ...state, ...config })),
    }),
    {
      name: "config_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
