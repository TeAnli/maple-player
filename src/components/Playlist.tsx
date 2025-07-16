import { invoke } from "@tauri-apps/api/core";
import React from "react";
import { PlaylistItem } from "../store/folder_store";
import { Box, Flex, Text } from "@radix-ui/themes";

export interface PlaylistProps {
  data?: PlaylistItem,
  name: string;
  cover: string;
  type?: "search" | "default",
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Playlist: React.FC<PlaylistProps> = (
  {
    name, cover, type = "default", onClick, data
  }
) => {

  return (
    <div onClick={onClick} className={`group relative ${type === "search" ? "h-36" : "w-full h-16"} rounded-xl hover:shadow-md hover:bg-hovered/40 transition-all duration-500 overflow-hidden cursor-pointer`}>
      <Flex position="relative" align="center" p="2" height="full">
        <div className="relative mr-4 flex-shrink-0">
          <img
            className={`object-cover w-12 h-12 rounded-lg shadow-md flex items-center justify-center`}
            src={cover}
          ></img>
        </div>

        <Flex direction="column" className="truncate">
          <Box mb="1">
            <h3 className="text-lg font-bold truncate transition-colors duration-300">
              {name}
            </h3>
          </Box>
        </Flex>

        {
          type === "default" &&
          <div className="absolute right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
            <button onClick={async (event) => {
              event.stopPropagation();

              if (!data) return

              for (const media of data.medias) {
                try {
                  //获取cid
                  const cid = await invoke("get_cid_by_bvid", { bvid: media.bvid });
                  //加入至下载队列
                  let content = await invoke("push_download_queue", { bvid: media.bvid, cid: cid });
                  console.log(content);
                } catch (error) {
                  console.error(`处理媒体 ${media.bvid} 失败:`, error);
                }
              }
              let result = await invoke("download")
              console.log(result);
            }} className="w-8 h-8 bg-gray-500/80 hover:bg-gray-500 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">

              <span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <button className="w-8 h-8 bg-gray-500/80 hover:bg-gray-500 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">
              <span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </span>
            </button>
          </div>
        }

      </Flex>



    </div >
  );
};

export default Playlist;
