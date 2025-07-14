import { create } from "zustand";
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

  setData: (data: {
    isLogin: boolean;
    mid: number | null;
    uname: string;
    face: string;
  }) => void;
}

export const useAccountStore = create<AccountInfo>()(
  persist(
    (set, get) => ({
      isLogin: false,
      mid: null,
      uname: "",
      face: "",
      setLoginState: (isLogin: boolean) => set(() => ({ isLogin: isLogin })),
      setUID: (uid: number) => set(() => ({ mid: uid })),
      setName: (name: string) => set(() => ({ uname: name })),
      setHeader: (url: string) => set(() => ({ face: url })),

      setData: (data: {
        isLogin: boolean;
        mid: number | null;
        uname: string;
        face: string;
      }) =>
        set(() => ({
          isLogin: data.isLogin,
          mid: data.mid,
          uname: data.uname,
          face: data.face,
        })),
    }),
    {
      name: "account_storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
