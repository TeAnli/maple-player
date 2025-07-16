import ReactDOM from "react-dom/client";
import App from "./App";
import { Theme } from "@radix-ui/themes";
import { Task, useProgressStore } from "./utils/store/download_store";

import { listen } from "@tauri-apps/api/event";

import "./main.css";
import "@radix-ui/themes/layout.css";

async function setupEventListeners() {
  const progressStore = useProgressStore.getState();
  console.log('正在装载监听事件..');
  const unlistenDownloadProgress = await listen("download_progress", async (event) => {
    const queue = event.payload as Task[];
    if (queue.length === 0) {
      progressStore.setCurrent(0);
      progressStore.setTotal(0);
      progressStore.setQueue([]);
    } else {
      const current = queue[0].progress.current_size;
      const total = queue[0].progress.total_size;
      progressStore.setCurrent(current);
      progressStore.setTotal(total);
      progressStore.setQueue(queue);
    }

  });
  console.log("事件监听装载完毕")
  window.addEventListener('beforeunload', () => {
    unlistenDownloadProgress();
  });
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Theme>
    <App />
  </Theme>
);
setupEventListeners().catch(console.error);