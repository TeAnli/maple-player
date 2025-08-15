import { useMusicStore } from "../store/music";
import React, { useEffect, useRef, useState } from "react";

import StartIcon from "../assets/icons/Start.svg";
import PauseIcon from "../assets/icons/Pause.svg";
import PreviousIcon from "../assets/icons/Previous.svg";
import NextIcon from "../assets/icons/Next.svg";
import Repeat from "../assets/icons/Repeat.svg";

import { Slider } from "radix-ui";
import { formatTime, formatVolume } from "../utils/utils.ts";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";
import { useToggle } from "@/utils/hooks/useToggle.ts";

/* 抽屉，用于提供用户与音乐播放的交互界面 */
const Drawer: React.FC = () => {
  const navigate = useNavigate();
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
  const [volume, setVolume] = useState(100);
  const [repeat, toggleMode] = useToggle(false);
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
  useEffect(() => {
    if (repeat) {
      audioRef.current!.loop = true
    } else {
      audioRef.current!.loop = false
    }
    console.log(audioRef.current!.loop)
  }, [repeat])
  const togglePlay = async () => {
    setPlaying(!playing);
    if (playing) {
      audioRef.current!.pause();
    } else {
      await audioRef.current!.play();
    }
  };

  return (
    <div className="bg-transparent relative fade-in-up">
      <audio
        onTimeUpdate={() => {
          if (playing && !mouseDown) updateProgress(Math.round(audioRef.current?.currentTime || 0));
        }}
        onEnded={() => {
          updateProgress(currentMusic?.duration || 0);
          if (!repeat) {
            setPlaying(false)
          }
        }}
        ref={audioRef}
      ></audio>
      {currentMusic && (
        <div className="w-full flex flex-col bg-foreground backdrop-blur-xl">
          <div className="w-full absolute -translate-y-3">
            <Slider.Root
              onPointerUp={() => {
                setMouseDown(false);
              }}
              onPointerDown={() => {
                setMouseDown(true);
                updateProgress(progress);
              }}
              className="group flex items-center select-none touch-none h-6 cursor-pointer"
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
              <Slider.Track className="relative flex rounded-full w-full h-[0.3rem] transition-all bg-gradient-to-r">
                <Slider.Range className="absolute rounded-full linear-theme h-full" style={{ boxShadow: "0 0 10px rgba(244, 186, 24, 0.3)" }}></Slider.Range>
              </Slider.Track>
              <Slider.Thumb className="outline-none bg-primary rounded-full size-20"></Slider.Thumb>
            </Slider.Root>
          </div>
          <div className="w-full flex flex-row justify-between items-center px-12 py-4 ">
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="group relative flex-shrink-0">
                <img
                  onClick={() => { navigate("/options") }}
                  className="object-cover w-14 h-14 rounded-xl shadow-md flex items-center justify-center hover:scale-[1.03] cursor-pointer transition-all duration-300"
                  src={currentMusic?.cover}
                />
              </div>
              <div className="flex flex-col w-full justify-center">
                <p className="text-xl font-bold truncate max-w-[200px]">{currentMusic?.name}</p>
                <p className="text-md text-gray-500 truncate max-w-[200px]"></p>
              </div>

            </div>
            <div className="w-[24rem] flex flex-col items-center gap-1">
              <div className="left-0 right-0 flex justify-center items-center gap-8">
                <div
                  onClick={() => { }}
                  className="flex items-center justify-center hover:bg-foreground rounded-lg size-10 transition-all duration-150 active:scale-90 cursor-pointer"
                >
                  <img className="size-7" src={PreviousIcon}></img>
                </div>
                <div
                  onClick={() => {
                    togglePlay();
                  }}
                  className="flex items-center justify-center hover:bg-foreground rounded-xl size-11 transition-all duration-150 cursor-pointer linear-theme"
                  style={{ boxShadow: "0 0 10px rgb(244, 186, 24)" }}
                >
                  {playing ? (
                    <img className="size-7" src={PauseIcon}></img>
                  ) : (
                    <img className="size-9" src={StartIcon}></img>
                  )}
                </div>
                <div
                  onClick={() => { }}
                  className="flex items-center justify-center hover:bg-foreground rounded-lg size-10 transition-all duration-150 active:scale-90 cursor-pointer"
                >
                  <img className="size-8" src={NextIcon}></img>
                </div>
              </div>

            </div>

            <div className="right-0 flex flex-row items-center gap-6">
              <div className="mr-12 w-24">
                <p>{`${formatTime(progress || 0)}  /  ${formatTime(currentMusic.duration)}`}</p>
              </div>
              <div
                className="flex items-center justify-center hover:bg-foreground rounded-lg transition-all duration-150 active:scale-90 cursor-pointer"
                onClick={() => { toggleMode() }}
              >
                <p className="text-2xl">词</p>
              </div>
              <div
                className="flex items-center justify-center hover:bg-foreground rounded-lg transition-all duration-150 active:scale-90 cursor-pointer"
                onClick={() => { toggleMode() }}
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
                  audioRef.current!.volume = value[0] / 100;
                }}
                onValueCommit={(value: number[]) => {
                  audioRef.current!.volume = value[0] / 100;
                }}
              >
                <Slider.Track className="relative flex-1 rounded-full w-full h-4 bg-neutral-700 transition-all" >
                  <Slider.Range className="absolute rounded-full linear-theme h-full" style={{ boxShadow: "0 0 10px rgba(244, 186, 24, 0.3)" }} />
                </Slider.Track>
              </Slider.Root>
            </div>
          </div>

        </div>
      )
      }
    </div >
  );
};

export default Drawer;
