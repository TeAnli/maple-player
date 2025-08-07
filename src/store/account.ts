import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AccountState = {
  isLogin: boolean;
  mid: number | null;
  name: string;
  face: string;
  sex: string;
  sign: string;
  fans: number;
  attention: number;
  archive_count: number;
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
    fans: AccountState["fans"];
    attention: AccountState["attention"];
    archive_count: AccountState["archive_count"];
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
      fans: 0,
      attention: 0,
      archive_count: 0,
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
          sign: data.sign,
          fans: data.fans,
          attention: data.attention,
          archive_count: data.archive_count
        }))
    }),
    {
      name: "account_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
