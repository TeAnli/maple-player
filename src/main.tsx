import ReactDOM from "react-dom/client";
import App from "./App";

import "./main.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { listen } from "@tauri-apps/api/event";
import { useProgressStore } from "./utils/store/download_store";
async function setupEventListeners() {
  const progressStore = useProgressStore.getState();
  console.log('正在装载监听事件..');
  const unlistenDownloadProgress = await listen("download_progress", (event) => {
    const { total, current } = event.payload as { total: number, current: number };
    progressStore.setTotal(total);
    progressStore.setCurrent(current);
    console.log(event);
  });
  console.log("事件监听装载完毕")
  window.addEventListener('beforeunload', () => {
    unlistenDownloadProgress();
  });
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
    <App />
  </Theme>
);
setupEventListeners().catch(console.error);