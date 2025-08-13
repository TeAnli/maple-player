import React, { Suspense } from "react";
import { useMusicStore } from "@/store/music.ts";
import { invoke } from "@tauri-apps/api/core";

import PlayIcon from "@/assets/icons/Start.svg";
import PauseIcon from "@/assets/icons/Pause.svg";
import LoveIcon from "@/assets/icons/Love.svg";
import { ContextMenu } from "radix-ui";
import { convertToProxy, formatTime } from "@/utils/utils.ts";

export interface MusicProps {
  id: number;
  name: string;
  cover: string;
  bvid: string;
  duration: number;
  type: "list";
  active: string;
}

const MusicCard: React.FC<MusicProps> = ({ id, name, cover, bvid, duration, type, active }) => {
  const setCurrentMusic = useMusicStore(state => state.updateCurrentMusic);
  const playMusic = async () => {
    let cid = await invoke("get_cid_by_bvid", { bvid });
    let url = await invoke<string>("get_audio_url", { cid, bvid });
    console.log("播放链接:", url);
    setCurrentMusic({
      name,
      cover,
      duration,
      current: 0,
      audioUrl: convertToProxy(url)
    });
  };
  return (
    <Suspense>

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            onClick={() => {
              if (active === bvid) return;
              playMusic();
            }}
            className={`rounded-md hover:bg-hovered/40 transition-all duration-500 overflow-hidden ${active === bvid ? "bg-hovered/60 animate-pulse" : "cursor-pointer"} `}
          >
            <section className="flex flex-row items-center p-3 justify-between">

              <div className="flex items-center gap-8 px-8">

                <div className="relative flex flex-row items-center gap-12">
                  <div>
                    <p className="text-lg font-bold">{id}</p>
                  </div>
                  <img
                    className="object-cover w-16 h-16 rounded-2xl flex items-center justify-center"
                    src={cover}
                  />
                </div>
                <div className="opacity-20">
                  <img className="size-6" src={LoveIcon}></img>
                </div>
                <div className="flex truncate">
                  <section className="mb-1">
                    <h3 className="text-base font-bold truncate transition-colors duration-300 max-w-80">
                      {name}
                    </h3>
                  </section>
                </div>
              </div>

              <div className="flex flex-row justify-center items-center px-8 gap-16">
                <div className="flex justify-center">{formatTime(duration)}</div>
                <div>
                  <span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </span>
                </div>
              </div>
            </section>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content className="w-48 bg-neutral-700 rounded-2xl p-2 text-white shadow-xl">
            <ContextMenu.Item className="outline-none hover:bg-card rounded-2xl p-2 transition-all">
              播放
            </ContextMenu.Item>
            <ContextMenu.Item className="outline-none hover:bg-card rounded-2xl p-2 transition-all">
              下载单曲
            </ContextMenu.Item>
            <ContextMenu.Separator className=" h-[1px] bg-card m-1" />
            <ContextMenu.Item className="outline-none hover:bg-card rounded-2xl p-2 transition-all">
              打开网址
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>

    </Suspense>
  );
};
export default MusicCard;
