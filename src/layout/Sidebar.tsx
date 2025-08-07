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
        <div className="flex justify-center bg-neutral-800/50 items-center rounded-full flex-col gap-6 px-2 py-4">
          {mainRoutes.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.id}
                className={`flex items-center justify-center rounded-full size-10 cursor-pointer transition-all duration-500 ${
                  isActive ? "" : "hover:scale-110 "
                }`}
                onClick={() => handleItemClick(item.path)}
              >
                <img
                  className={`transition-all duration-500 ${
                    isActive ? "opacity-100" : "dark:opacity-30 size-6"
                  }`}
                  src={item.icon}
                  alt={item.label}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center bg-neutral-800/50 items-center rounded-full flex-col gap-6 px-2 py-4">
          {authRoutes.map(item => {
            const isActive = location.pathname === item.path;

            if (item.id === "logout") {
            }
            return (
              <div
                key={item.id}
                className={`flex items-center justify-center rounded-full size-10 cursor-pointer transition-all duration-500 ${
                  isActive ? "" : "hover:scale-110 "
                }`}
                onClick={() => {
                  if (item.id === "logout") {
                    getCurrentWindow().close();
                  }
                  handleItemClick(item.path);
                }}
              >
                <img
                  className={`transition-all duration-500 ${
                    isActive ? "opacity-100" : "dark:opacity-30"
                  }`}
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
