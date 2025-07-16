import ReactDOM from "react-dom/client";
import App from "./App";
import { Theme } from "@radix-ui/themes";

import "./main.css";
import "@radix-ui/themes/layout.css";
import { EventSystem } from "./utils/event_system";

async function setupEventListeners() {
  console.log('正在装载监听事件..');
  EventSystem.getInstance().loadEventHandler()
  EventSystem.getInstance().handle_all()
  console.log("事件监听装载完毕")
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Theme>
    <App />
  </Theme>
);

setupEventListeners().catch(console.error);