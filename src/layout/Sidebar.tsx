import { useNavigate, useLocation } from "react-router";
import { authRoutes, mainRoutes } from "../router/routes";
import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`h-full fade-in-enter transition-all`}>
      <div className="h-full flex flex-col items-center gap-4 px-6 py-2">
        <div className="flex justify-center bg-neutral-800/50 bg-netural-800/50 items-center rounded-2xl flex-col gap-4 p-2">
          {mainRoutes.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.id}
                className={`flex items-center justify-center rounded-2xl size-12 cursor-pointer transition-transform duration-500 ${isActive ? "linear-theme" : "hover:scale-110 "}`}
                style={{ boxShadow: isActive ? "0px 0px 10px rgba(244, 186, 24, 0.8)" : "" }}
                onClick={() => handleItemClick(item.path)}
              >
                <img
                  className={`transition-all duration-300 ${isActive ? "opacity-100" : "dark:opacity-30 size-5"
                    }`}
                  src={item.icon}
                  alt={item.label}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center bg-neutral-800/50 items-center rounded-2xl flex-col gap-6 p-2">
          {authRoutes.map(item => {
            const isActive = location.pathname === item.path;

            if (item.id === "logout") {
            }
            return (
              <div
                key={item.id}
                className={`flex items-center justify-center rounded-2xl size-12 cursor-pointer transition-transform  duration-500 ${isActive ? "linear-theme shdaow-xl shadow-primary/50" : "hover:scale-110 "}`}
                style={{ boxShadow: isActive ? "0px 0px 10px rgba(244, 186, 24, 0.8)" : "" }}
                onClick={() => {
                  if (item.id === "logout") {
                    getCurrentWindow().close();
                  }
                  handleItemClick(item.path);
                }}
              >
                <img
                  className={`transition-all duration-500 ${isActive ? "opacity-100" : "dark:opacity-30"}`}
                  src={item.icon}
                  alt={item.label}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
