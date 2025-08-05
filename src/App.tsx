import { RouterProvider } from "react-router";
import { router } from "./router/routes";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    const init = async () => {
      /* 启动拦截代理服务器 */
      await invoke("start_proxy_server");
    }
    init();
  }, [])

  return <RouterProvider router={router} />;
}
export default App;
