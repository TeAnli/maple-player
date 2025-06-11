import { useState } from "react";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Home");
  return (
    <div className="flex flex-col items-center bg-forgeground h-screen w-28 rounded-tr-2xl rounded-br-2xl">
      <div
        onClick={() => {
          setActiveItem("Home");
        }}
        className="mt-12 size-12 bg-slate-500 cursor-pointer"
      ></div>
      <div
        onClick={() => {
          setActiveItem("Setting");
        }}
        className="mt-12 size-12 bg-slate-500 cursor-pointer"
      ></div>
      <div
        onClick={() => {
          setActiveItem("Downloadd");
        }}
        className="mt-12 size-12 bg-slate-500 cursor-pointer"
      ></div>
      <div
        onClick={() => {
          setActiveItem("Null");
        }}
        className="mt-12 size-12 bg-slate-500 cursor-pointer"
      ></div>
    </div>
  );
};

export default Sidebar;
