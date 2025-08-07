import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AccountState = {
  isLogin: boolean;
  mid: number | null;
  name: string;
  face: string;
  sex: string;
  sign: string;
};
type AccountAction = {
  updateLoginState: (isLogin: AccountState["isLogin"]) => void;
  updateUID: (uid: AccountState["mid"]) => void;
  updateName: (name: AccountState["name"]) => void;
  updateHeader: (url: AccountState["face"]) => void;
  updateSex: (sex: AccountState["sex"]) => void;
  updateSign: (sex: AccountState["sign"]) => void;
  updateData: (data: {
    isLogin: AccountState["isLogin"];
    mid: AccountState["mid"] | null;
    name: AccountState["name"];
    face: AccountState["face"];
    sex: AccountState["sex"];
    sign: AccountState["sign"];
  }) => void;
};

export const useAccountStore = create<AccountState & AccountAction>()(
  persist(
    set => ({
      isLogin: false,
      mid: null,
      name: "",
      face: "",
      sex: "",
      sign: "",
      updateLoginState: isLogin => set(() => ({ isLogin: isLogin })),
      updateUID: uid => set(() => ({ mid: uid })),
      updateName: name => set(() => ({ name: name })),
      updateHeader: url => set(() => ({ face: url })),
      updateSex: sex => set(() => ({ name: sex })),
      updateSign: sign => set(() => ({ face: sign })),

      updateData: data =>
        set(() => ({
          isLogin: data.isLogin,
          mid: data.mid,
          name: data.name,
          face: data.face,
          sex: data.sex,
          sign: data.sign
        }))
    }),
    {
      name: "account_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
