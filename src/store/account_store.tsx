import { create } from "zustand"

interface QRCodeType {
    qrcodeKey: string,
    setQRCodeKey: (newValue: string) => void
}

export const accountStore = create<QRCodeType>()((set) => ({
    qrcodeKey: "",
    setQRCodeKey: (newValue: string) => set(() => ({ qrcodeKey: newValue })),
})) 