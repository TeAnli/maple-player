import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AccountState = {
  isLogin: boolean;
  mid: number | null;
  uname: string;
  face: string;
};
type AccountAction = {
  updateLoginState: (isLogin: AccountState["isLogin"]) => void;
  updateUID: (uid: AccountState["mid"]) => void;
  updateName: (name: AccountState["uname"]) => void;
  updateHeader: (url: AccountState["face"]) => void;
  updateData: (data: {
    isLogin: AccountState["isLogin"];
    mid: AccountState["mid"] | null;
    uname: AccountState["uname"];
    face: AccountState["face"];
  }) => void;
};

export const useAccountStore = create<AccountState & AccountAction>()(
  persist(
    set => ({
      isLogin: false,
      mid: null,
      uname: "",
      face: "",
      updateLoginState: isLogin => set(() => ({ isLogin: isLogin })),
      updateUID: uid => set(() => ({ mid: uid })),
      updateName: name => set(() => ({ uname: name })),
      updateHeader: url => set(() => ({ face: url })),

      updateData: data =>
        set(() => ({
          isLogin: data.isLogin,
          mid: data.mid,
          uname: data.uname,
          face: data.face
        }))
    }),
    {
      name: "account_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
