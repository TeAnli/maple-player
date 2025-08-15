import React, { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import { useAccountStore } from "@/store/account.ts";
import { PlaylistItem, useFolderStore } from "@/store/folder.ts";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

import Playlist from "./Playlist";
import Banner from "../common/Banner";
import MultipleMusicCard from "./MultipleMusicCard";
import StarUser from "./StarUser";
import NullIcon from "@/assets/icons/Null.svg"



const Folderlist: React.FC = () => {
  /* 获取当前用户信息和状态 */
  const { uid, isLogin } = useAccountStore(
    useShallow(state => ({
      uid: state.mid,
      isLogin: state.isLogin
    }))
  );
  const { folderList, updateCurrentFolder, updateFolderList } = useFolderStore(
    useShallow(state => ({
      folderList: state.folderList,
      updateCurrentFolder: state.updateCurrentFolder,
      updateFolderList: state.updateFolderList
    }))
  );

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const negative = useNavigate();

  const fetchFolderData = async () => {
    if (uid != null) {
      const data = (await invoke("get_all_folder", { uid })) as Array<PlaylistItem>;
      updateFolderList(data);
    }
  };

  useEffect(() => {
    fetchFolderData();
  }, []);

  const handleFolder = () => {
    return (
      <div className="w-full flex flex-col gap-12">

        <div className="flex flex-col gap-2">
          <div className="flex flex-row h-full gap-4 items-center justify-center">
            <div className="relative rounded-2xl h-8 w-[0.4rem] bg-primary"></div>
            <h1 className="w-full text-2xl font-bold">你的收藏夹</h1>
          </div>
          {
            folderList.length === 0 ? <div className="w-full h-full flex justify-center items-center flex-col">
              <img className="size-64" src={NullIcon}></img>
              <p className="text-xl font-bold text-neutral-600">你的收藏夹为空</p>
            </div>
              :
              <div className="w-full h-full gap-8 grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
                {folderList.map((item, idx) => (
                  <div
                    ref={el => (itemRefs.current[idx] = el)}
                    className="w-full"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                    key={item.info.id}
                  >
                    <Playlist
                      data={item}
                      onClick={() => {
                        updateCurrentFolder(item);
                        negative("/folder");
                      }}
                      name={item.info.title}
                      cover={item.info.cover}
                    />
                  </div>
                ))}
              </div>
          }

        </div>
      </div >
    );
  };

  return <div>{handleFolder()}</div>;
};

export default Folderlist;
