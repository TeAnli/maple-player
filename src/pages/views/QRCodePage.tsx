import { invoke } from "@tauri-apps/api/core";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { emit } from '@tauri-apps/api/event';
interface Response {
  data: Data;
}
interface Data {
  url: string;
  qrcode_key: string;
}
interface UserData {
  mid: number,
}
export const QRCodePage: React.FC = () => {
  const [url, setUrl] = useState("");

  const [success, setSuccess] = useState(false)

  const isMounted = useRef(true);

  const checkQRCodeState = async (code: string) => {
    const MAX_RETRIES = 90;
    const INTERVAL = 2000;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      if (!isMounted.current) return;
      try {
        console.log("code:" + code);
        const status = await invoke("scan_check", { qrcodeKey: code })
        console.log(`当前状态: ${status}`);
        if (status === 0) {
          console.log("成功识别");
          if (isMounted.current) {
            const data = await invoke("get_user_data") as UserData;
            await emit("login", { data: data })
            setSuccess(true)
            console.log("成功");
            return;
          }
          return;
        } else {
          console.warn("未确认");
        }
      } catch (error) {
        console.warn("检测失败:", error);
      }
      // 等待间隔后继续检测
      await new Promise((resolve) => setTimeout(resolve, INTERVAL));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let response: Response = await invoke("login");
      setUrl(response.data.url);
      await checkQRCodeState(response.data.qrcode_key);
    };
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <main className="space-y-2 h-screen w-full flex flex-col justify-center items-center">
      {url !== "" && <QRCodeSVG size={256} value={url}></QRCodeSVG>}
      <h1 className="truncate font-bold text-2xl">扫描二维码进行登录</h1>
      {success && (
        <p className="truncate font-bold text-xl text-green-600">登陆成功</p>

      )}
    </main>
  );
};
