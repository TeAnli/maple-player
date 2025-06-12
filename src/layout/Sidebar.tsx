import { useState } from "react";
import Home from "../assets/Home.svg";
import Send from "../assets/Send.svg";
import Download from "../assets/Download.svg";
import Options from "../assets/Options.svg";
const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Send,
    },
    { id: "download", label: "Download", icon: Download },
    { id: "options", label: "Options", icon: Options },
  ];

  return (
    <div className="flex flex-col items-center bg-forgeground h-screen w-28 rounded-tr-2xl rounded-br-2xl">
      {menuItems.map((item) => {
        return (
          <div
            className={`flex justify-center rounded-2xl mt-12 w-12 h-12 cursor-pointer  transition-all ${
              activeItem == item.id
                ? "bg-gradient-to-b from-secondary to-primary"
                : "hover:bg-hover-primary hover:scale-110"
            }`}
            onClick={() => {
              setActiveItem(item.id);
            }}
          >
            <img
              className={`transition-all duration-500 ${
                activeItem == item.id ? "opacity-100" : "opacity-30"
              }`}
              src={item.icon}
            ></img>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
