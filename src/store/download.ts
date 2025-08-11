import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum Status {
  PENDING = "pending",
  DOWNLOADING = "downloading",
  COMPLETED = "completed",
  FAILED = "failed"
}
export interface Task {
  id: string;
  status: Status;
  progress: {
    total_size: number;
    current_size: number;
  };
}
type DownloadState = {
  queue: Array<Task>;
};
type DownloadAction = {
  updateQueue: (queue: DownloadState["queue"]) => void;
  addTask: (task: Task) => void;
};

export const useDownloadStore = create<DownloadState & DownloadAction>()(
  persist(
    (set, get) => ({
      queue: [],
      updateQueue: (newValue: DownloadState["queue"]) => set(() => ({ queue: newValue })),
      addTask: (newValue: Task) => set(() => ({ queue: [...get().queue, newValue] }))
    }),
    {
      name: "download_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
