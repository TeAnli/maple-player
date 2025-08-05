import { useMusicStore } from "../store/music";
import React, { useEffect, useRef, useState } from "react";
// import ProgressBar from "../components/common/ProgressBar";
import StartIcon from "../assets/icons/Start.svg";
import PauseIcon from "../assets/icons/Pause.svg";
import PreviousIcon from "../assets/icons/Previous.svg";
import NextIcon from "../assets/icons/Next.svg";
import Repeat from "../assets/icons/Repeat.svg";
import Volume from "../assets/icons/Volume.svg";
import Volume1 from "../assets/icons/Volume 1.svg";
import Volume2 from "../assets/icons/Volume 2.svg";
import VolumeX from "../assets/icons/Volume x.svg";
import { Slider } from "radix-ui";

function formatTime(time: number): string {
  let secondsText: string = "00";
  let minutesText: string = "00";
  let minute = Math.floor(time / 60);
  let second = Math.round(time % 60);
  if (second > 0 && second < 10) {
    secondsText = `0${second}`;
  } else if (second >= 10 && second < 60) {
    secondsText = second.toString();
  }
  if (second == 60) {
    minute += 1;
  }

  if (minute > 0 && minute < 10) {
    minutesText = `0${minute}`;
  } else if (minute >= 10 && minute < 60) {
    minutesText = minute.toString();
  }
  return `${minutesText}:${secondsText}`
}
function formatVolume(volume: number) {
  if (volume > 0.7) {
    return Volume2;
  } else if (volume <= 0.7 && volume > 0.3) {
    return Volume1;
  } else if (volume <= 0.3 && volume > 0.01) {
    return Volume;
  } else {
    return VolumeX;
  }
}
/* 抽屉，用于提供用户与音乐播放的交互界面 */
const Drawer: React.FC = () => {
  const currentMusic = useMusicStore(state => state.currentMusic);
  const progress = useMusicStore(state => state.progress);
  const setProgress = useMusicStore(state => state.setProgress);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [volume, setVolume] = useState(50)
  useEffect(() => {
    const init = async () => {
      if (currentMusic != null) {
        try {
          audioRef.current!.src = currentMusic.audioUrl;
          console.info("成功播放音频");
          setVolume(audioRef.current!.volume * 100)
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
    setPlaying(!playing)
    if (playing) {
      audioRef.current!.pause();
    } else {
      await audioRef.current!.play();
    }
  }

  return (
    <>
      <audio onTimeUpdate={
        () => {
          if (playing && !mouseDown) setProgress(Math.round(audioRef.current?.currentTime || 0));
        }
      } onEnded={
        () => {
          setProgress(currentMusic?.duration || 0);
          setPlaying(false)
        }
      } ref={audioRef}></audio>
      {currentMusic
        &&

        <div className="w-full fade-in-up flex justify-between items-center bg-white/1 border-t border-neutral-700 backdrop-blur-xl shadow-[0_-10px_30px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full flex flex-row justify-between items-center px-12 py-6 ">

            <div className="flex flex-row items-center justify-center gap-4">
              <div className="group relative flex-shrink-0">
                <img
                  className="object-cover w-14 h-14 rounded-xl shadow-md flex items-center justify-center"
                  src={currentMusic?.cover} />
              </div>
              <div className="flex flex-col w-full justify-center">
                <p className="text-xl font-bold truncate max-w-[200px]">{currentMusic?.name}</p>
                <p className="text-md text-gray-500 truncate max-w-[200px]"></p>
              </div>
            </div>
            <div className="w-[24rem] flex flex-col items-center justify-center">
              <div className="left-0 right-0 flex justify-center items-center gap-4">

                <div onClick={() => {

                }} className="flex items-center justify-center hover:bg-foreground rounded-lg size-10 transition-all duration-150 active:scale-90 cursor-pointer">
                  <img className="size-8" src={PreviousIcon}></img>
                </div>
                <div onClick={() => {
                  toggle();
                }} className="flex items-center justify-center hover:bg-foreground rounded-lg size-14 transition-all duration-150 active:scale-90 cursor-pointer">
                  {
                    playing ? <img className="size-12" src={PauseIcon}></img> : <img className="size-14" src={StartIcon}></img>
                  }
                </div>
                <div onClick={() => {

                }} className="flex items-center justify-center hover:bg-foreground rounded-lg size-10 transition-all duration-150 active:scale-90 cursor-pointer">
                  <img className="size-8" src={NextIcon}></img>
                </div>

              </div>
              <div className="h-4 w-[24rem]">
                <Slider.Root onPointerUp={() => {
                  setMouseDown(false)
                }} onPointerDown={() => {
                  setMouseDown(true)
                  setProgress(progress);
                }} className="group absolute flex items-center select-none touch-none h-6 cursor-pointer" value={[progress]} max={currentMusic?.duration}
                  onValueChange={(value: number[]) => {
                    setProgress(value[0]);
                  }}
                  onValueCommit={(value: number[]) => {
                    setProgress(value[0]);
                    audioRef.current!!.currentTime = progress;
                  }}
                >
                  <Slider.Track className="relative flex rounded-full w-[24rem] h-1 group-hover:h-2 bg-neutral-700 transition-all">
                    <Slider.Range className="absolute rounded-full bg-primary h-full">
                    </Slider.Range>
                  </Slider.Track>
                  <Slider.Thumb className="outline-none bg-primary rounded-full size-20"></Slider.Thumb>
                </Slider.Root >
              </div>
            </div>

            <div className="right-0 flex flex-row items-center gap-4">
              <div className="flex items-center justify-center hover:bg-foreground rounded-lg size-8 transition-all duration-150 active:scale-90 cursor-pointer"
                onClick={() => { }}>
                <img className="size-6" src={Repeat}></img>
              </div>

              <img className="size-6" src={formatVolume(audioRef.current!.volume)} />

              <Slider.Root className="group relative flex items-center select-none touch-none w-36 h-4 cursor-pointer" value={[volume]} max={100}
                onValueChange={(value: number[]) => {
                  setVolume(value[0])
                  audioRef.current!.volume = volume / 100;
                }}
              >
                <Slider.Track className="relative flex-1 rounded-full w-full h-4 bg-neutral-700 transition-all">
                  <Slider.Range className="absolute rounded-full bg-primary h-full" />
                </Slider.Track>
              </Slider.Root >
            </div>
          </div>


        </div>
      }
    </>

  );
};

export default Drawer;
