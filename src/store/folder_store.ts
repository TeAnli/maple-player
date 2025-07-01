import { create } from "zustand";
import { listen } from "@tauri-apps/api/event";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PlaylistItem {
  info: {
    id: number;
    mid: number;
    attr: number;
    title: string;
    media_count: number;
    cover: string;
  };
  medias: Array<{
    id: number;
    title: string;
    cover: string;
    bvid: string;
    duration: number;
  }>;
}

interface FolderInfo {
  folderList: Array<PlaylistItem>;
  setFolderList: (list: Array<PlaylistItem>) => void;
}

export const useFolderStore = create<FolderInfo>()(
  persist(
    (set, get) => ({
      folderList: [],
      setFolderList: (list: Array<PlaylistItem>) =>
        set(() => ({ folderList: list })),
    }),
    {
      name: "folder_storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
