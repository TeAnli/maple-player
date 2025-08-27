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
  analyser: AnalyserNode | null;
};

type MusicAction = {
  updateCurrentMusic: (newValue: MusicState["currentMusic"]) => void;
  updateProgress: (newValue: MusicState["progress"]) => void;
  updateAnalyser: (newValue: MusicState["analyser"]) => void;
};

export const useMusicStore = create<MusicState & MusicAction>()(
  persist(
    set => ({
      currentMusic: null,
      progress: 0,
      audioData: null,
      analyser: null,
      updateCurrentMusic: newValue => set(() => ({ currentMusic: newValue })),
      updateProgress: newValue => set(() => ({ progress: newValue })),
      updateAnalyser: newValue => set(() => ({ analyser: newValue }))
    }),
    {
      name: "music_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
