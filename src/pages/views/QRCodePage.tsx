import { invoke } from "@tauri-apps/api/core";
import { QRCodeSVG } from "qrcode.react";
import { Suspense, useEffect, useRef, useState } from "react";
import { emit } from '@tauri-apps/api/event';
import Button from "../../components/Button";
import { useNavigate } from "react-router";

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

  const checkInterval = useRef<number | null>(null);
  const retryCount = useRef(0);
  const qrcodeKey = useRef('');

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
        await emit("login", { ...userData });
        setState(prev => ({ ...prev, status: 'success' }));

        // 关闭窗口
        setTimeout(() => {
          navigate("/");
        }, 1000);

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
        return <p className="truncate font-bold text-xl text-green-600">登录成功，正在跳转...</p>;
      default:
        return (
          <Suspense fallback={<div className="size-256"></div>}>
            <QRCodeSVG size={256} value={state.url} />
          </Suspense>
        )
    }
  };

  return (
    <main className="space-y-4 h-screen w-full flex flex-col justify-center items-center p-4">
      {render()}
      {state.status === 'scanning' && (
        <h1 className="truncate font-bold text-2xl text-center">扫描二维码进行登录</h1>
      )}
    </main>
  );
};
export default QRCodePage