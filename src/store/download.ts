import { create } from "zustand";

export interface Task {
  id: string;
  progress: {
    total_size: number;
    current_size: number;
  };
}
type DownloadProgressState = {
  total: number;
  current: number;
  queue: Array<Task>;
};
type DownloadProgressAction = {
  setTotal: (total: number) => void;
  setCurrent: (current: number) => void;
  getProgress: () => number;
  setQueue: (queue: Array<Task>) => void;
};
export const useProgressStore = create<DownloadProgressState & DownloadProgressAction>()(
  (set, get) => ({
    total: 0,
    current: 0,
    queue: [],

    setTotal: total => set(() => ({ total: total })),
    setCurrent: current => set(() => ({ current: current })),
    getProgress: () => {
      const { total, current } = get();
      return total === 0 ? 0 : (current / total) * 100;
    },
    setQueue: queue => set(() => ({ queue: queue }))
  })
);
