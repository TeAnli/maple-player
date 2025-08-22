import { RouterProvider } from "react-router";
import { router } from "./router/routes";
import { useEffect } from "react";
import { EventSystem } from "./utils/events/system";
import { loadTaskLog } from "./utils/logger";
import { AppConfig, useConfigStore } from "./store/config";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const updateAppConfig = useConfigStore(state => state.updateAppConfig);
  const get_app_config = async () => {
    try {
      const config = await invoke<AppConfig>("get_app_config");
      console.log(config);
      updateAppConfig(config);
      console.log("应用配置已加载", config);
    } catch (error) {
      console.error("加载应用配置失败", error);
    }
  }
  useEffect(() => {
    loadTaskLog("事件装载", () => {
      EventSystem.getInstance().loadEventHandler();
      EventSystem.getInstance().handle_all();
    });
    get_app_config();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
