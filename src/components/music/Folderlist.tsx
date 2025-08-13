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
    const data = await invoke("get_recommand_video") as Array<RecommandVideo>;
    console.log(data);
    setRecommands(data)
  };
  useEffect(() => {
    fetchFolderData();
    fetchRecommandData();
  }, []);

  const handleFolder = () => {
    return (
      <div className="w-full flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row h-full gap-4 items-center justify-center">
            <div className="relative rounded-2xl h-8 w-[0.4rem] bg-primary"></div>
            <h1 className="w-full text-2xl font-bold">每日推荐</h1>
          </div>

          <div className=" h-full flex flex-row gap-12">
            <div className="w-[36rem] h-full relative flex flex-col gap-8">
              <Banner></Banner>
              <div className="w-full flex flex-row gap-4">
                <StarUser cover="https://i2.hdslb.com/bfs/face/927600c9ac351375bc63fa6e0ce06e7ed7a8bbd3.jpg@128w_128h_1c_1s.webp" name="大家的音乐机"></StarUser>
                <StarUser cover="https://i2.hdslb.com/bfs/face/91a6526445f61e2d491523242b532d5e76f0435a.jpg@128w_128h_1c_1s.webp" name="音乐私藏馆"></StarUser>
              </div>
            </div>
            <div className="w-full flex flex-col bg-foreground p-8 rounded-2xl gap-4 overflow-hidden justify-center">
              <p className="text-xl font-bold ">最近火热的歌曲和事件</p>
              <div className="h-full flex flex-row gap-12">

                {recommands.map((item, index) => {
                  return <MultipleMusicCard key={index} onClick={() => { setActive(item.bvid) }} active={item.bvid === active} title={item.title} cover={item.cover} duration={0} name={item.author.name}></MultipleMusicCard>
                })}
              </div>
            </div>

          </div>

        </div>
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
                        negative("folder");
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

  return <div className="w-full h-full px-4 items-center justify-center">{handleFolder()}</div>;
};

export default Folderlist;
