import { useMusicStore } from "../store/music";
import { useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
/* 抽屉，用于提供用户与音乐播放的交互界面 */
const Drawer: React.FC = () => {
  const currentMusic = useMusicStore(state => state.currentMusic);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const init = async () => {
      if (currentMusic && audioRef.current) {
        try {
          await invoke("play_audio", { url: currentMusic.audioUrl });
        } catch (e) {
          console.error("播放音频失败:", e);
        }
      }
    };
    init();
  }, [currentMusic]);


  return (
    <div className="w-full fade-in-up Drawer-0 h-20 flex justify-between items-center bg-foreground/100 rounded-lg border border-neutral-700 p-2 backdrop-blur-xl">
      <div className="flex flex-row items-center gap-4">
        <div className="relative mx-4 flex-shrink-0">
          <img
            className="object-cover w-12 h-12 rounded-lg shadow-md flex items-center justify-center"
            src={currentMusic?.cover}
          />
        </div>
        <div className="flex flex-col w-full justify-center">
          <p className="text-xl font-bold truncate max-w-[200px]">{currentMusic?.name}</p>
          <p className="text-md text-gray-500 truncate max-w-[200px]"></p>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
