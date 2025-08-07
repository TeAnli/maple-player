import { useMusicStore } from "../store/music";
import React, { useEffect, useRef, useState } from "react";

import StartIcon from "../assets/icons/Start.svg";
import PauseIcon from "../assets/icons/Pause.svg";
import PreviousIcon from "../assets/icons/Previous.svg";
import NextIcon from "../assets/icons/Next.svg";
import Repeat from "../assets/icons/Repeat.svg";

import { Slider } from "radix-ui";
import { formatVolume } from "../utils/utils.ts";
import { useShallow } from "zustand/react/shallow";

/* 抽屉，用于提供用户与音乐播放的交互界面 */
const Drawer: React.FC = () => {
  const { currentMusic, progress, updateProgress } = useMusicStore(
    useShallow(state => ({
      currentMusic: state.currentMusic,
      progress: state.progress,
      updateProgress: state.updateProgress
    }))
  );
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [volume, setVolume] = useState(50);
  useEffect(() => {
    console.log(audioRef);
    const init = async () => {
      if (currentMusic != null && audioRef.current?.volume != null) {
        try {
          audioRef.current!.src = currentMusic.audioUrl;
          console.info("成功播放音频");
          setVolume(audioRef.current!.volume * 100);
          await audioRef.current!.play();
          setPlaying(true);
        } catch (e) {
          console.error("播放音频失败:", e);
        }
      }
    };
    init();
  }, [currentMusic]);
  const toggle = async () => {
    setPlaying(!playing);
    if (playing) {
      audioRef.current!.pause();
    } else {
      await audioRef.current!.play();
    }
  };

  return (
    <div>
      <audio
        onTimeUpdate={() => {
          if (playing && !mouseDown) updateProgress(Math.round(audioRef.current?.currentTime || 0));
        }}
        onEnded={() => {
          updateProgress(currentMusic?.duration || 0);
          setPlaying(false);
        }}
        ref={audioRef}
      ></audio>
      {currentMusic && (
        <div className="w-full fade-in-up flex justify-between items-center bg-white/1 border-t border-neutral-700 backdrop-blur-xl shadow-[0_-10px_30px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full flex flex-row justify-between items-center px-12 py-4 ">
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="group relative flex-shrink-0">
                <img
                  className="object-cover w-16 h-16 rounded-xl shadow-md flex items-center justify-center"
                  src={currentMusic?.cover}
                />
              </div>
              <div className="flex flex-col w-full justify-center">
                <p className="text-xl font-bold truncate max-w-[200px]">{currentMusic?.name}</p>
                <p className="text-md text-gray-500 truncate max-w-[200px]"></p>
              </div>
            </div>
            <div className="w-[24rem] flex flex-col items-center justify-center">
              <div className="left-0 right-0 flex justify-center items-center gap-4">
                <div
                  onClick={() => {}}
                  className="flex items-center justify-center hover:bg-foreground rounded-lg size-10 transition-all duration-150 active:scale-90 cursor-pointer"
                >
                  <img className="size-8" src={PreviousIcon}></img>
                </div>
                <div
                  onClick={() => {
                    toggle();
                  }}
                  className="flex items-center justify-center hover:bg-foreground rounded-lg size-14 transition-all duration-150 active:scale-90 cursor-pointer"
                >
                  {playing ? (
                    <img className="size-12" src={PauseIcon}></img>
                  ) : (
                    <img className="size-14" src={StartIcon}></img>
                  )}
                </div>
                <div
                  onClick={() => {}}
                  className="flex items-center justify-center hover:bg-foreground rounded-lg size-10 transition-all duration-150 active:scale-90 cursor-pointer"
                >
                  <img className="size-8" src={NextIcon}></img>
                </div>
              </div>
              <div className="h-4 w-[24rem]">
                <Slider.Root
                  onPointerUp={() => {
                    setMouseDown(false);
                  }}
                  onPointerDown={() => {
                    setMouseDown(true);
                    updateProgress(progress);
                  }}
                  className="group absolute flex items-center select-none touch-none h-6 cursor-pointer"
                  value={[progress]}
                  max={currentMusic?.duration}
                  onValueChange={(value: number[]) => {
                    updateProgress(value[0]);
                  }}
                  onValueCommit={(value: number[]) => {
                    updateProgress(value[0]);
                    audioRef.current!!.currentTime = progress;
                  }}
                >
                  <Slider.Track className="relative flex rounded-full w-[24rem] h-1 group-hover:h-2 bg-neutral-700 transition-all">
                    <Slider.Range className="absolute rounded-full bg-primary h-full"></Slider.Range>
                  </Slider.Track>
                  <Slider.Thumb className="outline-none bg-primary rounded-full size-20"></Slider.Thumb>
                </Slider.Root>
              </div>
            </div>

            <div className="right-0 flex flex-row items-center gap-4">
              <div
                className="flex items-center justify-center hover:bg-foreground rounded-lg size-8 transition-all duration-150 active:scale-90 cursor-pointer"
                onClick={() => {}}
              >
                <img className="size-6" src={Repeat}></img>
              </div>

              {audioRef.current && (
                <img className="size-6" src={formatVolume(audioRef.current.volume)} />
              )}

              <Slider.Root
                className="group relative flex items-center select-none touch-none w-36 h-4 cursor-pointer"
                value={[volume]}
                max={100}
                onValueChange={(value: number[]) => {
                  setVolume(value[0]);
                  audioRef.current!.volume = volume / 100;
                }}
              >
                <Slider.Track className="relative flex-1 rounded-full w-full h-4 bg-neutral-700 transition-all">
                  <Slider.Range className="absolute rounded-full bg-primary h-full" />
                </Slider.Track>
              </Slider.Root>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drawer;
