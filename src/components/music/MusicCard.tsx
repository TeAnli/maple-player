import { Suspense, useEffect } from "react";
import { useMusicStore } from "../../store/music";
import { invoke } from "@tauri-apps/api/core";
import { convertToProxy } from "../../utils/request";

import PlayIcon from "../../assets/icons/Start.svg"
import PauseIcon from "../../assets/icons/Pause.svg"
import { ContextMenu } from "radix-ui";

export interface MusicProps {
  name: string;
  cover: string;
  bvid: string;
  duration: number;
  type: "card" | "list";
  active: string;
}

const MusicCard: React.FC<MusicProps> = ({ name, cover, bvid, duration, type, active }) => {
  const setCurrentMusic = useMusicStore(state => state.setCurrentMusic);
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
      {type === "card" ?
        <div
          onClick={() => {
            if (active === bvid) return;
            playMusic()
          }}
          className={`group relative w-full transition-all duration-150 rounded-xl ${active === bvid ? "bg-foreground" : "cursor-pointer"} `}
        >
          <div className={`flex flex-col gap-4 rounded-2xl  overflow-hidden transition-all duration-300 p-4 `}>
            <div className="aspect-square w-full h-full scale-100 rounded-2xl transition-all duration-150 group-hover:scale-105 group-active:scale-95 group-hover:shadow-xl group-active:shadow-xl">

              <img
                src={active === bvid ? PauseIcon : PlayIcon}
                className={`${active === bvid ? "" : "opacity-0"} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-300 absolute size-20`}
              />
              <img
                className="rounded-2xl object-cover w-full h-full"
                src={cover}
              />
            </div>
            <h3 className="text-center font-semibold truncate" title={name}>
              {name}
            </h3>
          </div>
        </div> :
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div onClick={() => {
              if (active === bvid) return;
              playMusic()
            }} className={`rounded-2xl hover:bg-hovered/40 transition-all duration-500 overflow-hidden ${active === bvid ? "bg-hovered/60 animate-pulse" : "cursor-pointer"} `}>
              <section className="flex items-center p-2">
                <div className="relative flex-shrink-0">
                  <img
                    className="object-cover w-16 h-16 rounded-2xl shadow-md flex items-center justify-center"
                    src={cover}
                  />
                </div>

                <div className="flex truncate">
                  <section className="mb-1">
                    <h3 className="text-lg font-bold truncate transition-colors duration-300">{name}</h3>
                  </section>
                </div>
              </section>
            </div>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Content
              className="w-48 bg-neutral-700 rounded-2xl p-2 text-white shadow-xl"
            >
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
      }
    </Suspense >
  );
};
export default MusicCard;
