import React, { useState } from "react";
import { useFolderStore } from "@/store/folder.ts";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import MusicCard from "../music/MusicCard";
import Button from "../common/Button";
import { useToggle } from "@/utils/hooks/useToggle";

const MusicContainer: React.FC = () => {
  const currentFolder = useFolderStore(state => state.currentFolder);

  const [value, toggle] = useToggle(false);
  const [active, setActive] = useState("");
  useGSAP(() => {
    gsap.from("#title", {
      opacity: 0,
      duration: 1
    });
  }, []);

  return (
    <div id="title" className="flex flex-col w-full h-full rounded-lg p-4 gap-12 ">
      {currentFolder && (
        <div className="gap-6 flex flex-row">
          <div className="aspect-square rounded-[2rem] size-72 transition-all">
            <img
              className="object-cover rounded-[2rem] w-full h-full"
              src={currentFolder?.info.cover}
            ></img>
          </div>

          <div className="flex flex-col justify-end w-full gap-6">
            <section className="flex flex-col gap-2 w-full">
              <section>
                <p className="text-4xl font-bold">{currentFolder?.info.title}</p>
              </section>
              <section className="flex flex-col">
                <p className="text-base text-[#999999]">这是默认收藏夹，没有任何的简介</p>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-[#999999] text-base">loves: 114514</p>
                  </div>
                  -
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-[#999999] text-base">
                      songs: {currentFolder?.medias.length}
                    </p>
                  </div>
                </div>
              </section>
            </section>

            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row gap-4">
                <Button>播放</Button>
                <Button>下载全部</Button>
              </div>
              <Button onClick={toggle}>切换布局</Button>
            </div>
          </div>
        </div>
      )}
      {
        <div
          id="items"
          className={
            value
              ? "grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2"
              : "flex flex-col w-full py-2 gap-1"
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
