import { create } from "zustand";
import { listen } from "@tauri-apps/api/event";

interface AccountInfo {
  isLogin: boolean;
  uid: number | null;
  setLoginState: (isLogin: boolean) => void;
  setUID: (uid: number) => void;
}

export const useAccountStore = create<AccountInfo>()((set) => {
  const initializeEventListeners = async () => {
    await listen("login", (event) => {
      const data = event.payload as { mid: number };
      if (data) {
        set(() => ({ isLogin: true, uid: 440078311 }));
      }
    });
  };

  initializeEventListeners();

  return {
    isLogin: false,
    uid: null,
    setLoginState: (isLogin: boolean) => set(() => ({ isLogin: isLogin })),
    setUID: (uid: number) => set(() => ({ uid: uid })),
  };
});
