import React from 'react';
import InputField from '../../components/InputField';
import { TextField, Text, Button } from '@radix-ui/themes';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
const Options: React.FC = () => {
  return (
    <div className="flex-1 flex-col w-full h-full p-6 gap-4">
      <div className="size-96 rounded-md shadow-md p-4">
        <Text>歌曲下载路径</Text>
        <Button onClick={async () => {
          const directory = await open({
            multiple: false,
            directory: true,
          })
          console.log(directory)
          let result = await invoke("set_download_path", {
            downloadPath: directory
          })
          console.log(result);
        }}>选择路径</Button>
      </div>

    </div>
  );
};

export default Options;

