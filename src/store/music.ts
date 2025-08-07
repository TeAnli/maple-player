import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Music = {
  name: string;
  cover: string;
  duration: number;
  current: number;
  audioUrl: string;
};

type MusicState = {
  currentMusic: Music | null;
  progress: number;
};

type MusicAction = {
  updateCurrentMusic: (newValue: MusicState["currentMusic"]) => void;
  updateProgress: (newValue: MusicState["progress"]) => void;
};

export const useMusicStore = create<MusicState & MusicAction>()(
  persist(
    set => ({
      currentMusic: null,
      progress: 0,
      updateCurrentMusic: newValue => set(() => ({ currentMusic: newValue })),
      updateProgress: newValue => set(() => ({ progress: newValue }))
    }),
    {
      name: "music_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
