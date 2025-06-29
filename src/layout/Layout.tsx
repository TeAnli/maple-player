import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col h-full ml-[80px]">
        <Header />
        <div className="flex h-full overflow-hidden mt-24">
          <div className="w-full h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
