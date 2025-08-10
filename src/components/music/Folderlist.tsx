import React, { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import { useAccountStore } from "@/store/account.ts";
import { PlaylistItem, useFolderStore } from "@/store/folder.ts";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

import Skeleton from "../common/Skeleton";
import Playlist from "./Playlist";
import Banner from "../common/Banner";
import MultipleMusicCard from "./MultipleMusicCard";



type RecommandVideo = {
  bvid: string,
  cid: number,
  title: string,
  cover: string,
  duration: number,
  author: {
    mid: number,
    name: string
  },
}

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
  const [active, setActive] = useState("")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [recommands, setRecommands] = useState<Array<RecommandVideo>>([])
  const negative = useNavigate();

  const fetchFolderData = async () => {
    if (uid != null) {
      const data = (await invoke("get_all_folder", { uid })) as Array<PlaylistItem>;
      updateFolderList(data);
    }
  };
  const fetchRecommandData = async () => {
    if (uid != null) {
      const data = await invoke("get_recommand_video") as Array<RecommandVideo>;
      console.log(data);
      setRecommands(data)
    }
  };
  useEffect(() => {
    fetchFolderData();
    fetchRecommandData();
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
      <div className="w-full flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col w-full h-full gap-2 justify-center ">
          <h1 className="w-full text-2xl font-bold">每日推荐</h1>
          <div className=" h-full flex flex-row gap-12 justify-center">
            <div className="w-[44rem] h-full relative ">
              <Banner></Banner>
            </div>
            <div className="flex flex-col w-[32rem] gap-6">
              {recommands.map(item => {
                return <MultipleMusicCard onClick={() => { setActive(item.bvid) }} active={item.bvid === active} title={item.title} cover={item.cover} duration={0} name={item.author.name}></MultipleMusicCard>
              })}
            </div>
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
      </div >
    );
  };

  return <div className="w-full h-full px-4 items-center justify-center">{handleFolder()}</div>;
};

export default Folderlist;
