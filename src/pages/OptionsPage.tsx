import React, { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { useConfigStore } from "@/store/config";
import { invoke } from "@tauri-apps/api/core";
const OptionsPage: React.FC = () => {
  const updateAppConfig = useConfigStore(state => state.updateAppConfig);
  const download_path = useConfigStore(state => state.download_path);
  const header_visible = useConfigStore(state => state.header_visible);
  const auto_play = useConfigStore(state => state.auto_play);
  return (
    <div className="flex flex-col h-full p-2 gap-6 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold">设置</h1>
        <div className="bg-primary w-14 h-1 rounded-md"></div>
      </div>

      {/* 下载设置卡片 */}
      <div className="bg-foreground rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold  mb-4">下载设置</h2>
        <div className="flex flex-row gap-4">
          <input
            className="outline-none rounded-md bg-neutral-600 px-4 py-2 w-96"
            placeholder="下载目录"
            value={download_path}
            onChange={() => {}}
          ></input>
          <button
            className="rounded-md bg-primary px-4 py-2 transition-colors"
            onClick={async () => {
              const file = await open({
                multiple: false,
                directory: true
              });
              console.log(file);
              if (file) {
                updateAppConfig({
                  download_path: file
                });
              }
            }}
          >
            选择目录
          </button>
        </div>
      </div>

      {/* 音频设置卡片 */}
      <div className="bg-foreground rounded-xl p-6 shadow-lg  -gray-200">
        <h2 className="text-xl font-semibold  mb-4">音频设置</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium  mb-1">音频质量</label>
          </div>
        </div>
      </div>

      {/* 主题设置卡片 */}
      <div className="bg-foreground rounded-xl p-6 shadow-lg ">
        <h2 className="text-xl font-semibold  mb-4">界面设置</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium  mb-1">选择主题</label>
            <div className="flex gap-3"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold  mb-4">头图设置</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium  mb-1"></label>
            <div className="flex gap-3"></div>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end mt-6">
        <button
          onClick={async () => {
            await invoke("save_app_config", {
              downloadPath: download_path,
              headerVisible: header_visible,
              autoPlay: auto_play
            });
          }}
          className="rounded-md bg-green-500 px-6 py-2 hover:bg-green-600 transition-colors"
        >
          保存设置
        </button>
      </div>
    </div>
  );
};

export default OptionsPage;
