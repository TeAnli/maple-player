import InputField from "../components/InputField";
import Search from "../assets/Search.svg";
import Cross from "../assets/Cross.svg";

import { useState } from "react";
import Button from "../components/Button";


import { getCurrentWindow } from "@tauri-apps/api/window";

import { invoke } from "@tauri-apps/api/core";
import { QRCodeCanvas } from "qrcode.react";



const Header: React.FC = () => {
  const [content, setContent] = useState("");
  const handleInput = (value: string) => {
    setContent(value);
  };
  const closeWindow = () => {
    let window = getCurrentWindow();
    window.close();
  };
  return (
    <div className="fixed w-full bg-white">
      <div
        data-tauri-drag-region
        className="flex justify-between items-center h-24 border-b-[0.5px]"
      >
        <div className="flex flex-row items-center">
          <InputField
            className="ml-12 mr-4 w-80"
            placeholder="请输入关键词"
            onChange={handleInput}
            internalIcon={Search}
          />
          <Button>搜索</Button>

          <Button
            onClick={async () => {
              invoke("create_window", { title: "login", url: "/login" });
            }}
          >
            打开登陆窗口
          </Button>
        </div>
        <div onClick={closeWindow} className="hover:cursor-pointer mr-32">
          <img src={Cross} width={20} height={20}></img>
        </div>
      </div>
    </div >
  );
};

export default Header;
