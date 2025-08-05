import { useFolderStore } from "../../store/folder";
import LoveIcon from "../../assets/icons/Love.svg";
import MusicNoteIcon from "../../assets/icons/MusicNote.svg";
import MusicCard from "../music/MusicCard";
import Button from "../common/Button";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMusicStore } from "../../store/music";

const MusicContiner: React.FC = () => {
  const currentFolder = useFolderStore(state => state.currentFolder);
  const currentMusic = useMusicStore(state => state.currentMusic);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [toggle, setState] = useState(false);
  const [acitve, setActive] = useState("");
  useGSAP(() => {
    gsap.timeline().from(itemRefs.current, {
      opacity: 0.1,
      scale: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power1.inOut"
    });
  }, [currentFolder?.medias.length, toggle]);

  return (
    <div className="fade-in-up flex flex-col w-full h-full rounded-lg px-4 py-2 gap-2 overflow-auto">
      {currentFolder && (
        <div className="px-8">
          <div className="gap-6 flex flex-row">
            <div className="aspect-square rounded-[2rem] size-64 transition-all">
              <img className="object-cover rounded-[2rem] w-full h-full" src={currentFolder?.info.cover}></img>
            </div>

            <div className="flex flex-col justify-end w-full gap-6">
              <section className="flex flex-col gap-2 w-full">
                <section>
                  <p className="text-4xl font-bold">{currentFolder?.info.title}</p>
                </section>
                <section className="flex flex-col">
                  <p className="text-base text-[#999999]">
                    这是默认收藏夹，没有任何的简介
                  </p>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row items-center gap-2">
                      {/* <img src={LoveIcon}></img> */}
                      <p className="text-[#999999] text-base">loves: 114514</p>
                    </div>
                    -
                    <div className="flex flex-row items-center gap-2">
                      {/* <img src={MusicNoteIcon}></img> */}
                      <p className="text-[#999999] text-base">songs: {currentFolder?.medias.length}</p>
                    </div>
                  </div>
                </section>
              </section>

              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-4">
                  <Button color="theme">播放</Button>
                  <Button>下载全部</Button>
                </div>
                <Button onClick={() => {
                  setState(!toggle);
                }}>切换布局</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        <div
          className={toggle ? "grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-4 fade-in-up" : "flex flex-col w-full px-8 py-4 gap-2"}
          style={{ animationDelay: "0.1s" }}
        >
          {currentFolder?.medias.map((item, idx) => {
            return (
              <div ref={el => (itemRefs.current[idx] = el)} key={item.bvid} onClick={() => { setActive(item.bvid) }}>
                <MusicCard active={acitve} type={toggle ? "card" : "list"} duration={item.duration} name={item.title} cover={item.cover} key={item.id} bvid={item.bvid} />
              </div>
            );
          })}
        </div>
      }

    </div>
  );
};

export default MusicContiner;
