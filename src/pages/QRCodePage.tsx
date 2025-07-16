import { invoke } from "@tauri-apps/api/core";
import { QRCodeSVG } from "qrcode.react";
import { Suspense, useEffect, useRef, useState } from "react";
import { emit } from '@tauri-apps/api/event';
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useAccountStore } from "../store/account_store";
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
// 类型定义
interface QRCodeResponse {
  data: {
    url: string;
    qrcode_key: string;
  };
}

interface UserData {
  mid: number;
  face: string;
  uname: string;
}

const QRCODE_CONFIG = {
  MAX_RETRIES: 90,
  CHECK_INTERVAL: 2000,
};
gsap.registerPlugin(useGSAP); // register the hook to avoid React version 
const QRCodePage: React.FC = () => {
  const navigate = useNavigate();
  // 状态管理
  const [state, setState] = useState<{
    url: string;
    status: 'loading' | 'scanning' | 'success' | 'error';
    error: string | null;
  }>({
    url: '',
    status: 'loading',
    error: null
  });
  const setData = useAccountStore((state) => state.setData);
  const checkInterval = useRef<number | null>(null);
  const retryCount = useRef(0);
  const qrcodeKey = useRef('');
  useGSAP(() => {
    if (state.status === "success") {
      gsap.from("#tick", { rotate: -180, opacity: 0, scale: 0.2 }).duration(0.5).delay(0.3)
      gsap.from("#content", { y: 20, opacity: 0 }).duration(1)
      gsap.from("#success", { y: 40, opacity: 0, scale: 0.2 }).duration(1)

    }
  }, [state.status])

  // 检查二维码状态
  const checkQRCodeState = async () => {
    if (retryCount.current >= QRCODE_CONFIG.MAX_RETRIES) {
      setState(prev => ({ ...prev, status: 'error', error: '二维码已过期，请刷新重试' }));
      checkInterval.current && window.clearInterval(checkInterval.current);
      return;
    }

    try {
      const status = await invoke<number>("scan_check", { qrcodeKey: qrcodeKey.current });

      if (status === 0) {
        // 登录成功
        const userData = await invoke<UserData>("get_user_data");
        setData({
          isLogin: true,
          mid: userData.mid,
          uname: userData.uname,
          face: userData.face,
        })
        setState(prev => ({ ...prev, status: 'success' }));

        // 关闭窗口
        setTimeout(() => {
          navigate("/");
        }, 2000);

        checkInterval.current && window.clearInterval(checkInterval.current);
      }

      retryCount.current++;
    } catch (error) {
      console.error("登录状态检查失败:", error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : '登录失败，请重试'
      }));
      checkInterval.current && window.clearInterval(checkInterval.current);
    }
  };

  // 获取二维码
  const fetchQRCode = async () => {
    try {
      const response = await invoke<QRCodeResponse>("login");
      qrcodeKey.current = response.data.qrcode_key;
      setState(prev => ({ ...prev, url: response.data.url, status: 'scanning' }));

      // 开始轮询检查
      checkInterval.current = window.setInterval(checkQRCodeState, QRCODE_CONFIG.CHECK_INTERVAL);
      checkQRCodeState(); // 立即检查一次
    } catch (error) {
      console.error("获取二维码失败:", error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : '获取二维码失败，请重试'
      }));
    }
  };

  // 组件挂载时获取二维码
  useEffect(() => {
    fetchQRCode();

    // 清理函数
    return () => {
      checkInterval.current && window.clearInterval(checkInterval.current);
    };
  }, []);

  const render = () => {
    switch (state.status) {
      case 'error':
        return (
          <div className="text-center space-y-2">
            <p className="text-red-500 font-medium">{state.error}</p>
            <Button
              onClick={fetchQRCode}
            >
              重试
            </Button>
          </div>
        );
      case 'success':
        return (
          <>
            <p id="tick" className="text-green-400 text-4xl font-bold">✔</p>
            <p className="text-2xl" id="content" > 登录 < span id="success" className="truncate font-bold text-3xl text-green-400" > 成功</span >，正在跳转...</p >
          </>
        )
      default:
        return (
          <div className="bg-foreground p-4 rounded-2xl m-4 transition-all duration-500">
            <div className={`bg-white rounded-2xl shadow-2xl shadow-gray-500/40 m-8 p-8 transition-all duration-500`}>
              <QRCodeSVG className="transition-all duration-500" size={state.url == "" ? 0 : 256} value={state.url} />
            </div>
          </div >
        )
    }
  };

  return (
    <main className="w-full h-full flex flex-col justify-center items-center p-4">
      {render()}
      {state.status === 'scanning' && (
        <h1 className="truncate font-bold text-2xl text-center">扫描二维码进行登录</h1>
      )}
    </main>
  );
};
export default QRCodePage