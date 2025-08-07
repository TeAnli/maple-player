import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export type PlaylistItem = {
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
    url: string;
  }>;
};

type FolderState = {
  folderList: Array<PlaylistItem>;
  currentFolder: PlaylistItem | null;
};
type FolderAction = {
  updateCurrentFolder: (item: FolderState["currentFolder"]) => void;
  updateFolderList: (list: FolderState["folderList"]) => void;
};

export const useFolderStore = create<FolderState & FolderAction>()(
  persist(
    set => ({
      currentFolder: null,
      folderList: [],
      updateCurrentFolder: newValue => set(() => ({ currentFolder: newValue })),
      updateFolderList: newValue => set(() => ({ folderList: newValue }))
    }),
    {
      name: "folder_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
