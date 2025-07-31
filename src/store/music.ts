import { create } from "zustand";

interface Music {
  name: string;
  cover: string;
  duration: number;
  current: number;
  audioUrl: string;
}

interface MusicInfo {
  currentMusic: Music | null;
  progress: number;
  setCurrentMusic: (newValue: Music) => void;
  setProgress: (newValue: number) => void;
}

export const useMusicStore = create<MusicInfo>()(set => ({
  currentMusic: null,
  progress: 0,
  setCurrentMusic: (newValue: Music) => set(() => ({ currentMusic: newValue })),
  setProgress: (newValue: number) => set(() => ({ progress: newValue }))
}));
