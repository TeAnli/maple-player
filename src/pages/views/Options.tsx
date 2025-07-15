import React, { useEffect } from 'react';
import { TextField, Text, Flex, IconButton } from '@radix-ui/themes';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { useConfigStore } from '../../utils/store/config_store';
import { DotsHorizontalIcon, FileIcon } from '@radix-ui/react-icons';
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
  const select = async () => {
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
  }
  return (
    <Flex direction="column" m="4" p="4" gap="4">
      <Text>歌曲下载路径</Text>
      <TextField.Root className="text-gray-400" value={path} onChange={() => { }}>

        <TextField.Slot>
          <FileIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot>

          <IconButton size="1" variant="ghost" onClick={select}>
            <DotsHorizontalIcon height="14" width="14" />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

export default Options;

