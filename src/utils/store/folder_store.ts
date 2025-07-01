import { create } from "zustand";
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
  currentFolder: PlaylistItem | null;
  setCurrentFolder: (item: PlaylistItem) => void;
  setFolderList: (list: Array<PlaylistItem>) => void;
}

export const useFolderStore = create<FolderInfo>()(
  persist(
    (set, get) => ({
      currentFolder: null,
      setCurrentFolder: (item: PlaylistItem) =>
        set(() => ({ currentFolder: item })),
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
