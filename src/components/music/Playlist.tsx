import React from "react";
import { invoke } from "@tauri-apps/api/core";
import { PlaylistItem } from "@/store/folder";

export interface PlaylistProps {
  data?: PlaylistItem;
  name: string;
  cover: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ name, cover, onClick, data }) => {
  const download = async () => {
    if (!data) return;

    for (const media of data.medias) {
      try {
        //获取cid
        const cid = await invoke("get_cid_by_bvid", { bvid: media.bvid });
        //加入至下载队列
        let content = await invoke("push_download_queue", {
          bvid: media.bvid,
          cid: cid
        });
        console.log(content);
      } catch (error) {
        console.error(`处理媒体 ${media.bvid} 失败:`, error);
      }
    }
    let result = await invoke("download");
    console.log(result);
  };

  return (
    <div
      onClick={onClick}
      className={`group relative w-full transition-all duration-150 rounded-xl cursor-pointer`}
    >
      <section className="flex flex-col p-2 gap-2 items-center">
        <div
          className={`flex flex-col gap-4 rounded-2xl overflow-hidden transition-all duration-300`}
        >
          <div className="aspect-square w-full h-full scale-100 rounded-2xl transition-all duration-500 group-hover:scale-150">
            <img className="rounded-2xl object-cover w-full h-full" src={cover} />
          </div>
        </div>

        <div className="flex truncate">
          <section className="mb-1">
            <h3 className="text-lg font-bold truncate transition-colors duration-300">{name}</h3>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Playlist;
