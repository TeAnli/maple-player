import React, { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

const Options: React.FC = () => {
  const setConfig = useConfigStore(state => state.setDownlaodPath);
  const path = useConfigStore(state => state.downlaodPath);

  useEffect(() => {
    const fetchConfig = async () => {
      let path = (await invoke("get_config")) as string;
      setConfig(path);
      console.log(path);
    };
    fetchConfig();
  }, [path]);
  return <div className="flex flex-col m-4 p-4 gap-4"></div>;
};

export default Options;
