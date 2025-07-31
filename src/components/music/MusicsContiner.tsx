import { useFolderStore } from "../../store/folder";
import LoveIcon from "../../assets/icons/Love.svg";
import MusicNoteIcon from "../../assets/icons/MusicNote.svg";
import MusicCard from "../music/MusicCard";
import Button from "../common/Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MusicContiner: React.FC = () => {
  const currentFolder = useFolderStore(state => state.currentFolder);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.timeline().from(itemRefs.current, {
      opacity: 0.1,
      scale: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power1.inOut"
    });
  }, [currentFolder?.medias.length]);

  return (
    <div className="fade-in-up flex flex-col w-full h-full rounded-lg p-4 gap-8">
      {currentFolder && (
        <div className="px-8">
          <div className="gap-6 flex flex-row">
            <img className="rounded-md w-80" src={currentFolder?.info.cover}></img>
            <div className="flex flex-col w-full justify-center gap-5">
              <section className="flex flex-col gap-3 w-full">
                <p className="text-2xl font-bold">{currentFolder?.info.title}</p>
                <p className="text-md text-[#999999]">
                  这是默认收藏夹，没有任何的简介，我爱你，谢谢你同意
                </p>
              </section>
              <section className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                  <img src={LoveIcon}></img>
                  <p className="text-[#999999] font-bold">114514</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <img src={MusicNoteIcon}></img>
                  <p className="text-[#999999] font-bold">{currentFolder?.medias.length}</p>
                </div>
              </section>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-4">
                  <Button color="theme">{">"}播放</Button>
                  <Button>下载全部</Button>
                  <Button>~</Button>
                </div>
                <Button>|</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 p-4 fade-in-up overflow-auto"
        style={{ animationDelay: "0.1s" }}
      >
        {currentFolder?.medias.map((item, idx) => {
          return (
            <div ref={el => (itemRefs.current[idx] = el)} key={item.bvid}>
              <MusicCard duration={item.duration} name={item.title} cover={item.cover} key={item.id} bvid={item.bvid} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicContiner;
