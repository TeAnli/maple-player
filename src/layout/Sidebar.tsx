import { useNavigate, useLocation } from "react-router";
import { authRoutes, mainRoutes } from "../router/routes";
import React, { useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`h-full flex flex-col transition-all duration-300`}>
      <div className="h-full flex flex-col items-center gap-4 px-6 py-2 jus">
        <div className="flex justify-center bg-foreground bg-netural-800/50 items-center rounded-2xl flex-col gap-4 p-2 shadow-lg">
          {mainRoutes.map(item => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.id;
            return (
              <div
                key={item.id}
                className={`flex items-center justify-center rounded-2xl size-12 cursor-pointer transition-all duration-300 ${isActive 
                  ? "linear-theme transform-gpu" 
                  : "hover:bg-white/5"}`}
                style={{
                  boxShadow: isActive 
                    ? "0px 0px 15px rgba(244, 186, 24, 0.6)" 
                    : isHovered 
                      ? "0px 0px 8px rgba(255, 255, 255, 0.1)" 
                      : "",
                    transform: isHovered 
                      ? "scale(1.1)" 
                      : "scale(1)"
                }}
                onClick={() => handleItemClick(item.path)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  className={`transition-all duration-300 ${isActive 
                    ? "opacity-100 size-6" 
                    : `dark:opacity-50 size-${isHovered ? "5.5" : "5"}`}`}
                  src={item.icon}
                  alt={item.label}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center bg-foreground items-center rounded-2xl flex-col gap-6 p-2 shadow-lg">
          {authRoutes.map(item => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.id;

            return (
              <div
                key={item.id}
                className={`flex items-center justify-center rounded-2xl size-12 cursor-pointer transition-all duration-300 ${isActive 
                  ? "linear-theme transform-gpu" 
                  : "hover:bg-white/5"}`}
                style={{
                  boxShadow: isActive 
                    ? "0px 0px 15px rgba(244, 186, 24, 0.6)" 
                    : isHovered 
                      ? "0px 0px 8px rgba(255, 255, 255, 0.1)" 
                      : "",
                    transform: isHovered 
                      ? "scale(1.1)" 
                      : "scale(1)"
                }}
                onClick={() => {
                  if (item.id === "logout") {
                    getCurrentWindow().close();
                  }
                  handleItemClick(item.path);
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  className={`transition-all duration-300 ${isActive 
                    ? "opacity-100 size-6" 
                    : `dark:opacity-50 size-${isHovered ? "5.5" : "5"}`}`}
                  src={item.icon}
                  alt={item.label}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-12 flex justify-center">

      </div>
    </div>
  );
};

export default Sidebar;
