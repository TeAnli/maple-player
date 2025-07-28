import React, { useEffect } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { useConfigStore } from "../store/config";

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
  const select = async () => {
    const directory = await open({
      multiple: false,
      directory: true
    });
    await invoke("set_download_path", {
      downloadPath: directory
    });
    if (directory != null) {
      setConfig(directory);
    }
  };
  return <div className="flex flex-col m-4 p-4 gap-4"></div>;
};

export default Options;
