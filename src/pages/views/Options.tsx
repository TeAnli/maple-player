import React, { useEffect } from 'react';
import { TextField, Text, Button, Flex } from '@radix-ui/themes';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { useConfigStore } from '../../utils/store/config_store';
const Options: React.FC = () => {
  const setConfig = useConfigStore((state) => state.setDownlaodPath);
  const path = useConfigStore((state) => state.downlaodPath)

  useEffect(() => {
    const fetchConfig = async () => {
      let path = await invoke("get_config") as string;
      setConfig(path)
      console.log(path)
    }
    fetchConfig()
  }, [path])
  return (
    <Flex direction="column" m="4" p="4" gap="4">
      <Text>歌曲下载路径</Text>
      <Button onClick={async () => {
        const directory = await open({
          multiple: false,
          directory: true,
        })
        await invoke("set_download_path", {
          downloadPath: directory
        })
        if (directory != null) {
          setConfig(directory);
        }
      }}>选择路径</Button>
      <TextField.Root className="text-gray-400" value={path} onChange={() => { }}>
        <TextField.Slot>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

export default Options;

