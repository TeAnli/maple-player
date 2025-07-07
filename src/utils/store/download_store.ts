import { create } from "zustand";

interface DownloadProgress {
  total: number;
  current: number;
  setTotal: (total: number) => void;
  setCurrent: (current: number) => void;
  getProgress: () => number;
}

export const useProgressStore = create<DownloadProgress>()((set, get) => ({
  total: 0,
  current: 0,
  setTotal: (total: number) => set(() => ({ total: total })),
  setCurrent: (current: number) => set(() => ({ current: current })),
  getProgress: () => {
    const { total, current } = get();
    const progress = total === 0 ? 0 : (current / total) * 100;
    return progress;
  },
}));
