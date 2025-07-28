import ReactDOM from "react-dom/client";
import App from "./App";

import "./main.css";
import { EventSystem } from "./events/system";

EventSystem.getInstance().loadEventHandler();
EventSystem.getInstance().handle_all();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);