import { create } from "zustand"

interface AccountCookie {
    qrcodeKey: string,
    setQRCodeKey: (newValue: string) => void
}

export const accountStore = create<AccountCookie>()((set) => ({
    qrcodeKey: "",
    setQRCodeKey: (newValue: string) => set(() => ({ qrcodeKey: newValue })),
})) 