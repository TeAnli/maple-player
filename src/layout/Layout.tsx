import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Drawer from "./Drawer";

const Layout: React.FC = () => {
  return (
    <>
      <div className="font-mukta bg-content text-primary w-full h-[100vh] overflow-hidden grid grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
        <aside className="row-span-full">
          <Sidebar />
        </aside>
        <header>
          <Header />
        </header>
        <main className="overflow-y-auto">
          <Outlet />
        </main>
        <figure className="w-full fixed bg-transparent bottom-0 p-4">
          <Drawer />
        </figure>
      </div>
    </>
  );
};

export default Layout;
