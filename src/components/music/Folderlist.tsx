import React, { useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";

import { useAccountStore } from "@/store/account.ts";
import { PlaylistItem, useFolderStore } from "@/store/folder.ts";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

import Skeleton from "../common/Skeleton";
import Playlist from "./Playlist";
import Banner from "../common/Banner";

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
    if (!isLogin) {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-2">
          <div className="text-center text-xl font-bold">当前未登录至bilibili账号，请登陆</div>
        </div>
      );
    }

    if (folderList.length <= 0) {
      return (
        <div className="w-full grid grid-cols-5 gap-8 py-12">
          <Skeleton count={5}></Skeleton>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">每日推荐</h1>
          <div className="w-full h-full">
            <Banner></Banner>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">你的收藏夹</h1>
          <div className="w-full h-full grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
                    negative("folder");
                  }}
                  name={item.info.title}
                  cover={item.info.cover}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return <div className="w-full h-full px-4 py-2">{handleFolder()}</div>;
};

export default Folderlist;
