import { create } from "zustand";

export interface Task {
  id: string;
  progress: {
    total_size: number;
    current_size: number;
  };
}
interface DownloadProgress {
  total: number;
  current: number;
  setTotal: (total: number) => void;
  setCurrent: (current: number) => void;
  getProgress: () => number;
  queue: Array<Task>;
  setQueue: (queue: Array<Task>) => void;
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
  queue: [],
  setQueue: (queue: Array<Task>) => set(() => ({ queue: queue }))
}));
