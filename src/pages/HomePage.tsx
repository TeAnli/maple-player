import MultipleMusicCard from "@/components/music/MultipleMusicCard";
import Folderlist from "../components/music/Folderlist";
import React, { useEffect, useState } from "react";
import StarUser from "@/components/music/StarUser";
import Banner from "@/components/common/Banner";
import { invoke } from "@tauri-apps/api/core";
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

const HomePage: React.FC = () => {
  const [active, setActive] = useState("")
  const [recommands, setRecommands] = useState<Array<RecommandVideo>>([])
  const fetchRecommandData = async () => {
    const data = await invoke("get_recommand_video") as Array<RecommandVideo>;
    console.log(data);
    setRecommands(data)
  };
  useEffect(() => {
    fetchRecommandData()
  }, [])
  return (
    <div className="flex flex-col overflow-y-auto w-full h-full transition-all duration-300 gap-4 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row h-full gap-4 items-center justify-center">
          <h1 className="w-full text-3xl font-bold">每日推荐</h1>
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
      <Folderlist />
    </div>
  );
};

export default HomePage;
