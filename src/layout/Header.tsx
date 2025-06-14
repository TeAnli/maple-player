import InputField from "../components/InputField";
import Search from "../assets/Search.svg";
import Cross from "../assets/Cross.svg"

import { invoke } from "@tauri-apps/api/core";
const Header: React.FC = () => {
  return (
    <div className="fixed w-full">
      <div className="flex items-center h-24 border-b-[0.5px]">
        <InputField
          className="ml-12 mr-12 w-96 h-10"
          placeholder="请输入关键词"
          onChange={(value) => { }}
          internalIcon={Search}
        />
        <div onClick={async () => {
          invoke("exit");
        }} className="right-0 hover:cursor-pointer">
          <img src={Cross} width={20} height={20}></img>
        </div>
      </div>
    </div >
  );
};

export default Header;
