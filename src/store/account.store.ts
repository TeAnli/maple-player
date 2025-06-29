import { create } from "zustand";

interface AccountInfo {
  isLogin: boolean;
  uid: number | null;
  setLoginState: (isLogin: boolean) => void;
  setUID: (uid: number) => void;
}

export const useAccountStore = create<AccountInfo>()((set) => ({
  isLogin: false,
  uid: null,
  setLoginState: (isLogin: boolean) => set(() => ({ isLogin: isLogin })),
  setUID: (uid: number) => set(() => ({ uid: uid })),
}));
