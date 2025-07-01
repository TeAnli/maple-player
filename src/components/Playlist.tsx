import { event } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/core";
import React from "react";
import { PlaylistItem } from "../store/folder_store";
import { data } from "react-router";

export interface PlaylistProps {
  data: PlaylistItem,
  name: string;
  author: string;
  cover: string;
  type?: "search" | "default",
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Playlist: React.FC<PlaylistProps> = (
  {
    name, author, cover, type = "default", onClick, data
  }
) => {

  return (
    <div onClick={onClick} className={`group relative ${type === "search" ? "h-36" : "w-full h-24"} rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer`}>
      <div className="relative flex items-center h-full p-2">
        <div className="relative mr-4 flex-shrink-0">
          <img
            className={`object-cover w-16 h-16 rounded-lg shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
            src={cover}
          ></img>
        </div>

        <div className="flex flex-col truncate">
          <div className="mb-1">
            <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h3>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-600 truncate">
                <span className="inline-block mr-1">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                {author}
              </p>
            </div>
          </div>
        </div>
        {
          type === "default" &&
          <div className="absolute right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
            <button onClick={(event) => {
              data.medias.forEach(async (item) => {
                let cid = await invoke("get_cid_by_bvid", { bvid: item.bvid })
              })
            }} className="w-8 h-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">

              <span>
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <button className="w-8 h-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">
              <span>
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </span>
            </button>
          </div>
        }

      </div>
    </div>
  );
};

export default Playlist;
