import ReactDOM from "react-dom/client";
import App from "./App";

import "./main.css";
import { EventSystem } from "./events/system";
import { loadTaskLog } from "./utils/logger"

loadTaskLog("事件装载", () => {
    EventSystem.getInstance().loadEventHandler();
    EventSystem.getInstance().handle_all();
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);