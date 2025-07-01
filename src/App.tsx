import { RouterProvider } from "react-router";
import { router } from "./utils/router/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
