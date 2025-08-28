import { useMusicStore } from "../store/music";
import React, { useEffect, useRef, useState } from "react";

import StartIcon from "../assets/icons/Start.svg";
import PauseIcon from "../assets/icons/Pause.svg";
import PreviousIcon from "../assets/icons/Previous.svg";
import NextIcon from "../assets/icons/Next.svg";
import Repeat from "../assets/icons/Repeat.svg";
import Loop from "@/assets/icons/Loop.svg";
import PlaylistIcon from "@/assets/icons/Playlist.svg";
import TrashIcon from "@/assets/icons/Trash.svg";
import MusicCover from "@/components/music/MusicCover";
import { Slider } from "radix-ui";
import { formatTime, formatVolume } from "../utils/utils.ts";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";

/* 抽屉，用于提供用户与音乐播放的交互界面 */
const Drawer: React.FC = () => {
  const navigate = useNavigate();
  const [audioInit, setAudioInit] = useState(false);
  const { 
    currentMusic, 
    progress, 
    playlist,
    updateProgress, 
    playNext,
    playPrevious,
    playMode,
    setPlayMode,
    clearPlaylist
  } = useMusicStore(
    useShallow(state => ({
      currentMusic: state.currentMusic,
      progress: state.progress,
      playlist: state.playlist,
      updateProgress: state.updateProgress,
      playNext: state.playNext,
      playPrevious: state.playPrevious,
      playMode: state.playMode,
      setPlayMode: state.setPlayMode,
      clearPlaylist: state.clearPlaylist
    }))
  );
  const [playing, setPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [mouseDown, setMouseDown] = useState(false); 
  const [volume, setVolume] = useState(100);
  
  // 修改repeat状态为playMode
  const toggleRepeatMode = () => {
    if (playMode === 'normal') {
      setPlayMode('repeat');
    } else if (playMode === 'repeat') {
      setPlayMode('shuffle');
    } else {
      setPlayMode('normal');
    }
  };
  
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
    if (playMode === 'repeat') {
      audioRef.current!.loop = true;
    } else {
      audioRef.current!.loop = false;
    }
  }, [playMode]);
  
  const togglePlay = async () => {
    setPlaying(!playing);
    if (playing) {
      audioRef.current!.pause();
    } else {
      await audioRef.current!.play();
    }  
  };
  
  // 处理音乐结束事件
  const handleMusicEnded = () => {
    updateProgress(currentMusic?.duration || 0);
    if (playMode !== 'repeat') { // 非单曲循环模式下，播放下一曲
      playNext();
    }
  };
  
  // 切换播放列表显示
  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };
  
  // 播放列表动画引用
  const playlistRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="bg-transparent relative fade-in-up">
      <audio
        onTimeUpdate={() => {
          if (playing && !mouseDown) updateProgress(Math.round(audioRef.current?.currentTime || 0));
        }}
        onEnded={handleMusicEnded}
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
          <div className="w-full flex flex-row justify-between items-center px-8 py-4 ">
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="group relative flex-shrink-0">
                <MusicCover
                  cover={currentMusic?.cover}
                  alt={currentMusic?.name}
                  size="medium"
                  className="shadow-md"
                  onClick={() => { navigate("/lyric") }}
                />
              </div>
              <div className="flex flex-col w-full justify-center">
                <p className="text-xl font-bold truncate max-w-[200px]">{currentMusic?.name}</p>
                <p className="text-md text-gray-500 truncate max-w-[200px]"></p>
              </div>
            </div>
            <div className=" flex flex-col items-center gap-1">
              <div className="left-0 right-0 flex justify-center items-center gap-8">
                <div
                  onClick={() => { playPrevious(); }}
                  className="flex items-center justify-center hover:bg-foreground rounded-lg size-10 transition-all duration-150 active:scale-90 cursor-pointer"
                >
                  <img className="size-7" src={PreviousIcon}></img>
                </div>
                <div
                  onClick={() => {
                    togglePlay();
                  }}
                  className="flex items-center justify-center hover:bg-foreground rounded-xl size-11 transition-all hover:scale-110 active:scale-90 duration-300 cursor-pointer linear-theme"
                  style={{ boxShadow: "0 0 10px rgb(244, 186, 24)" }}
                >
                  {playing ? (
                    <img className="size-7" src={PauseIcon}></img>
                  ) : (
                    <img className="size-9" src={StartIcon}></img>
                  )}
                </div>
                <div
                  onClick={() => { playNext(); }}
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
                onClick={() => { navigate("/lyric") }}
              >
                <p className="text-2xl">词</p>
              </div>
              <div
                className="flex items-center justify-center hover:bg-foreground rounded-lg transition-all duration-150 active:scale-90 cursor-pointer"
                onClick={toggleRepeatMode}
              >
                <img className="size-6" src={playMode === 'repeat' ? Loop : Repeat}></img>
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
              <div
                className={`flex items-center justify-center rounded-lg size-10 transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer ${showPlaylist ? 'linear-theme' : 'hover:bg-foreground'}`}
                onClick={togglePlaylist}
                style={{
                  boxShadow: showPlaylist ? '0 0 10px rgba(244, 186, 24, 0.6)' : 'none'
                }}
              >
                <img className="size-6" src={PlaylistIcon}></img>
              </div>
            </div>
          </div>
          
          {/* 播放列表 */}
          <div 
            ref={playlistRef}
            className={`absolute bottom-full right-0 w-1/3 bg-foreground backdrop-blur-xl rounded-tl-xl shadow-lg max-h-96 overflow-y-auto transition-all duration-300 ${showPlaylist ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">播放列表 ({playlist.length})</h3>
                {playlist.length > 0 && (
                  <button 
                    className="flex items-center gap-1 text-sm px-2 py-1 text-white hover:opacity-80 hover:text-neutral-300 transition-colors duration-300"
                    onClick={() => {
                      audioRef.current?.pause();
                      clearPlaylist();
                      setPlaying(false);
                    }}
                  >
                    <img src={TrashIcon} className="size-4" />
                    清空
                  </button>
                )}
              </div>
              
              {playlist.length === 0 ? (
                <div className="text-center py-12 text-gray-500 animate-pulse">
                  <p className="text-lg">播放列表为空</p>
                  <p className="text-sm mt-2">添加喜欢的音乐到播放列表</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {playlist.map((music, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-neutral-800/50 cursor-pointer"
                      onClick={() => useMusicStore.getState().playAt(index)}
                    >
                      <MusicCover 
                        cover={music.cover} 
                        alt={music.name} 
                        size="small" 
                        className="mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{music.name}</p>
                        <p className="text-xs text-neutral-500">{formatTime(music.duration)}</p>
                      </div>
                      <button 
                        className="p-2 rounded-full hover:bg-neutral-700 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          useMusicStore.getState().removeFromPlaylist(index);
                        }}
                      >
                        <span className="text-lg">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drawer;
