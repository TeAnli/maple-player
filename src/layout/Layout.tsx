import { Outlet } from 'react-router';
import Sidebar from "./Sidebar";
import Header from "./Header";
import Bottom from "./Bottom";

const Layout: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col h-full ml-[80px]">
        <Header />
        <div className="flex overflow-hidden pt-24 pb-24">
          <div className="w-full h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <Bottom />
      </div>
    </div>
  );
};

export default Layout;