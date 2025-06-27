import { invoke } from "@tauri-apps/api/core"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react"


interface Response {
    data: Data
}
interface Data {
    url: string,
    qrcode_key: string
}

export const QRCodePage: React.FC = () => {
    const [url, setUrl] = useState("")
    useEffect(() => {
        invoke("login").then((result) => {
            let response = result as Response
            setUrl(response.data.url)
        })
    }, [])

    return (
        <main className="space-y-2 h-screen w-full flex flex-col justify-center items-center">
            <QRCodeSVG size={256} value={url}></QRCodeSVG>
            <h1 className="truncate font-bold text-2xl">扫描二维码进行登录</h1>
        </main>
    )
}