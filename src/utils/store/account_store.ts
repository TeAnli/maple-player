import { create } from "zustand";
import { listen } from "@tauri-apps/api/event";
import { persist, createJSONStorage } from "zustand/middleware";

interface AccountInfo {
  isLogin: boolean;
  mid: number | null;
  uname: string;
  face: string;
  setLoginState: (isLogin: boolean) => void;
  setUID: (uid: number) => void;
  setName: (name: string) => void;
  setHeader: (url: string) => void;
}

export const useAccountStore = create<AccountInfo>()(
  persist(
    (set, get) => {
      const initializeEventListeners = async () => {
        await listen("login", (event) => {
          const data = event.payload as {
            mid: number;
            uname: string;
            face: string;
          };
          if (data) {
            console.log(data);
            set(() => ({ ...data, isLogin: true }));
          }
        });
      };
      initializeEventListeners();
      return {
        isLogin: false,
        mid: null,
        uname: "",
        face: "",
        setLoginState: (isLogin: boolean) => set(() => ({ isLogin: isLogin })),
        setUID: (uid: number) => set(() => ({ mid: uid })),
        setName: (name: string) => set(() => ({ uname: name })),
        setHeader: (url: string) => set(() => ({ face: url })),
      };
    },
    {
      name: "account_storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
