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
  setCurrentMusic: (newValue: Music) => void;
}

export const useMusicStore = create<MusicInfo>()(set => ({
  currentMusic: null,
  setCurrentMusic: (newValue: Music) => set(() => ({ currentMusic: newValue }))
}));
