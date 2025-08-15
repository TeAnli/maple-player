import { Outlet, useLocation, useOutlet } from "react-router";
import Header from "./Header";
import Drawer from "./Drawer";
import Sidebar from "./Sidebar";
import { useFolderStore } from "../store/folder";
import React, { useRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
const Layout: React.FC = () => {
  const currentFolder = useFolderStore(state => state.currentFolder);
  const location = useLocation();
  const currentOutlet = useOutlet();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.from(imgRef, {
      opacity: 0,
      duration: 1
    });
  }, []);
  return (
    <div className="font-mukta bg-content text-primary w-full h-[100vh] overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full h-full flex-1 flex flex-col overflow-hidden relative">
          {currentFolder?.info.cover && location.pathname === "/folder" && (
            <div className="absolute inset-0 z-0 blur-3xl fade-in">
              <img
                ref={imgRef}
                className="h-full w-full object-cover"
                src={currentFolder?.info.cover}
                alt="Folder cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-content to-neutral-700/80"></div>
            </div>
          )

          }

          <header className="relative z-10 transition-all duration-300">
            <Header />
          </header>
          <div className="h-full flex flex-1 overflow-hidden">
            <aside className="h-full flex flex-col justify-center items-center">
              <Sidebar />
            </aside>
            <main ref={menuRef} className={`flex-1 relative h-full overflow-hidden transition-all duration-300`}>
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={location.pathname}
                  appear={true}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  {currentOutlet}
                </CSSTransition>
              </SwitchTransition>
            </main>
          </div>

          <div className="w-full bg-transparent">
            <Drawer />
            {/* <div className="w-full bg-transparent  absolute bottom-0">
              
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
