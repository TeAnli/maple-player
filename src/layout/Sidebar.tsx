import { useState } from "react";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const menuItems = [
    {
      id: "home",
      label: "Home",
    },
    {
      id: "settings",
      label: "Settings",
    },
    { id: "download", label: "Download" },
  ];

  return (
    <div className="flex flex-col items-center bg-forgeground h-screen w-28 rounded-tr-2xl rounded-br-2xl">
      {menuItems.map((item) => {
        return (
          <div
            onClick={() => {
              setActiveItem(item.id);
            }}
            className={`mt-12 w-12 h-12 rounded-2xl cursor-pointer transition-opacity duration-300 bg-gradient-to-b from-secondary to-primary  ${
              activeItem == item.id ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default Sidebar;
