import { useMusicStore } from "../store/music";
import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import ProgressBar from "../components/common/ProgressBar";
import StartIcon from "../assets/icons/Start.svg";

/* 抽屉，用于提供用户与音乐播放的交互界面 */
const Drawer: React.FC = () => {
  const currentMusic = useMusicStore(state => state.currentMusic);
  const progress = useMusicStore(state => state.progress);
  const [playing, setPlaying] = useState(false);
  const durationInterval = useRef<number | null>(null);
  useEffect(() => {
    const init = async () => {
      if (currentMusic != null) {

        try {
          await invoke("play_audio", { url: currentMusic.audioUrl, totalDuration: currentMusic.duration });

          setPlaying(true);
        } catch (e) {
          console.error("播放音频失败:", e);
        }
        startDurationPolling();
      }
    };
    init();
  }, [currentMusic]);
  useEffect(() => {
    return () => {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, [])
  const startDurationPolling = () => {
    // 清除之前的定时器
    if (durationInterval.current) {
      clearInterval(durationInterval.current);
    }

    // 立即获取一次
    getCurrentDuration();

    // 每秒轮询一次
    durationInterval.current = window.setInterval(() => {
      getCurrentDuration();
    }, 100);
  };

  // 获取当前播放时长
  const getCurrentDuration = async () => {
    try {
      await invoke('get_duration');
    } catch (error) {
      console.error('获取时长失败:', error);
    }
  };
  const toggle = async () => {
    setPlaying(!playing);
    if (playing) {
      await invoke("pause_audio");
    } else {
      await invoke("recovery_audio")
    }
  }
  return (
    <div className="w-full flex justify-between">
      <div className="w-full fade-in-up h-20 flex justify-between bg-foreground/100 rounded-b-2xl border border-neutral-700 backdrop-blur-xl">
        <div className="w-full absolute -translate-y-1">
          <ProgressBar duration={currentMusic?.duration || 0} current={progress} onProgressChange={() => { }}></ProgressBar>
        </div>

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
          <div onClick={toggle} className="rounded-full cursor-pointer hover:bg-neutral-700/70 transition-all duration-300">
            <img src={StartIcon} width={110}></img>
          </div>
        </div>
      </div >
    </div >

  );
};

export default Drawer;
