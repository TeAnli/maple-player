import ReactDOM from "react-dom/client";
import App from "./App";

import "./main.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
    <App />
  </Theme>

);
