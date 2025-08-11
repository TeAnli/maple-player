import React, { useState } from "react";
import { useFolderStore } from "@/store/folder.ts";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import MusicCard from "../music/MusicCard";
import Button from "../common/Button";
import { useToggle } from "@/utils/hooks/useToggle";


import StartIcon from "@/assets/icons/Start.svg"
import { invoke } from "@tauri-apps/api/core";
import { useDownloadQueue } from "@/utils/hooks/useDownloadQueue";
const MusicContainer: React.FC = () => {
  const currentFolder = useFolderStore(state => state.currentFolder);

  const [value, toggle] = useToggle(false);
  const [active, setActive] = useState("");
  const { addTask, download } = useDownloadQueue();


  return (
    <div id="title" className="flex flex-col w-full h-full rounded-lg p-2 gap-2 ">
      {currentFolder && (

        <div className="gap-6 flex flex-row relative">
          <div className=" absolute bottom-0 w-full h-20 rounded-b-2xl bg-neutral-700/40" style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}></div>

          <div className="w-full gap-6 flex flex-row px-6 py-4 relative">
            <div className="relative aspect-square rounded-[2rem] size-72 transition-all ">

              <img
                className="object-cover rounded-[2rem] w-full h-full"
                style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)" }}
                src={currentFolder?.info.cover}
              ></img>
              <button className="flex justify-center items-center absolute rounded-2xl p-2 linear-theme right-0 top-2/3 -translate-y-2 translate-x-8" style={{ boxShadow: "0px 0px 10px rgba(244, 186, 24, 0.8)" }}>
                <img className="size-14" src={StartIcon}></img>
              </button>
            </div>

            <div className="flex flex-col justify-end w-full gap-6 ml-8 relative">
              <section className="flex flex-col gap-2 w-full">
                <section>
                  <p className="text-4xl font-bold">{currentFolder?.info.title}</p>
                </section>
                <section className="flex flex-col">
                  <p className="text-base text-[#999999]">这是默认收藏夹，没有任何的简介</p>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-[#999999] text-base">
                        歌曲数: {currentFolder?.medias.length}
                      </p>
                    </div>
                  </div>
                </section>
              </section>
              <div>
                <Button onClick={() => {
                  currentFolder.medias.forEach(media => {
                    addTask(media.bvid, media.title, media.cover);
                  })
                  download()
                }}>下载全部歌曲</Button>
              </div>
            </div>

          </div>
        </div>
      )}
      {
        <div
          id="items"
          className={
            value
              ? "grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-2"
              : "flex flex-col w-full py-2 gap-2"
          }
          style={{ animationDelay: "0.1s" }}
        >
          {currentFolder?.medias.map(item => {
            return (
              <div
                key={item.bvid}
                onClick={() => {
                  setActive(item.bvid);
                }}
              >
                <MusicCard
                  active={active}
                  type={value ? "card" : "list"}
                  duration={item.duration}
                  name={item.title}
                  cover={item.cover}
                  key={item.id}
                  bvid={item.bvid}
                />
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default MusicContainer;
