import { RouterProvider } from "react-router";
import { router } from "./router/routes";
import { useEffect } from "react";
import { EventSystem } from "./events/system";
import { loadTaskLog } from "./utils/logger";

function App() {
  useEffect(() => {
    loadTaskLog("事件装载", () => {
      EventSystem.getInstance().loadEventHandler();
      EventSystem.getInstance().handle_all();
    });
  }, []);
  return <RouterProvider router={router} />;
}
export default App;
