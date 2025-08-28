import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Music = {
  name: string;
  cover: string;
  duration: number;
  current: number;
  audioUrl: string;
};

type MusicState = {
  currentMusic: Music | null;
  progress: number;
  playlist: Array<Music>;
  currentIndex: number;
  playMode: 'normal' | 'repeat' | 'shuffle'; // 播放模式：普通、循环、随机
};

type MusicAction = {
  updateCurrentMusic: (newValue: MusicState["currentMusic"]) => void;
  updateProgress: (newValue: MusicState["progress"]) => void;
  addToPlaylist: (music: Music) => void;
  removeFromPlaylist: (index: number) => void;
  clearPlaylist: () => void;
  playNext: () => void;
  playPrevious: () => void;
  playAt: (index: number) => void;
  setPlayMode: (mode: MusicState["playMode"]) => void;
};

export const useMusicStore = create<MusicState & MusicAction>()(
  persist(
    (set, get) => ({
      currentMusic: null,
      progress: 0,
      playlist: [],
      currentIndex: -1,
      playMode: 'normal',
      
      updateCurrentMusic: (newValue) => set(() => ({ currentMusic: newValue })),
      updateProgress: (newValue) => set(() => ({ progress: newValue })),
      
      // 添加音乐到播放列表
      addToPlaylist: (music) => set((state) => {
        const newPlaylist = [...state.playlist, music];
        // 如果当前没有播放音乐，则自动播放新添加的音乐
        if (state.currentMusic === null) {
          return {
            playlist: newPlaylist,
            currentMusic: music,
            currentIndex: newPlaylist.length - 1,
            progress: 0
          };
        }
        return { playlist: newPlaylist };
      }),
      
      // 从播放列表移除音乐
      removeFromPlaylist: (index) => set((state) => {
        const newPlaylist = [...state.playlist];
        newPlaylist.splice(index, 1);
        
        // 如果删除的是当前播放的音乐
        if (index === state.currentIndex) {
          // 如果列表为空，清空当前播放
          if (newPlaylist.length === 0) {
            return {
              playlist: [],
              currentMusic: null,
              currentIndex: -1,
              progress: 0
            };
          }
          // 否则播放下一首（或第一首）
          const newIndex = index >= newPlaylist.length ? 0 : index;
          return {
            playlist: newPlaylist,
            currentMusic: newPlaylist[newIndex],
            currentIndex: newIndex,
            progress: 0
          };
        }
        // 如果删除的是当前播放音乐之前的音乐，需要调整currentIndex
        else if (index < state.currentIndex) {
          return {
            playlist: newPlaylist,
            currentIndex: state.currentIndex - 1
          };
        }
        
        return { playlist: newPlaylist };
      }),
      
      // 清空播放列表
      clearPlaylist: () => set(() => ({
        playlist: [],
        currentMusic: null,
        currentIndex: -1,
        progress: 0
      })),
      
      // 播放下一曲
      playNext: () => set((state) => {
        if (state.playlist.length === 0) return {};
        
        let nextIndex;
        if (state.playMode === 'shuffle') {
          // 随机模式：随机选择一首（不是当前播放的）
          if (state.playlist.length === 1) {
            nextIndex = 0; // 只有一首歌时，继续播放当前歌曲
          } else {
            // 随机选择一首不是当前播放的歌
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * state.playlist.length);
            } while (randomIndex === state.currentIndex && state.playlist.length > 1);
            nextIndex = randomIndex;
          }
        } else {
          // 普通模式和循环模式：顺序播放下一首
          nextIndex = (state.currentIndex + 1) % state.playlist.length;
        }
        
        return {
          currentMusic: state.playlist[nextIndex],
          currentIndex: nextIndex,
          progress: 0
        };
      }),
      
      // 播放上一曲
      playPrevious: () => set((state) => {
        if (state.playlist.length === 0) return {};
        
        let prevIndex;
        if (state.playMode === 'shuffle') {
          // 随机模式：随机选择一首（不是当前播放的）
          if (state.playlist.length === 1) {
            prevIndex = 0; // 只有一首歌时，继续播放当前歌曲
          } else {
            // 随机选择一首不是当前播放的歌
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * state.playlist.length);
            } while (randomIndex === state.currentIndex && state.playlist.length > 1);
            prevIndex = randomIndex;
          }
        } else {
          // 普通模式和循环模式：顺序播放上一首
          prevIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
        }
        
        return {
          currentMusic: state.playlist[prevIndex],
          currentIndex: prevIndex,
          progress: 0
        };
      }),
      
      // 播放指定索引的音乐
      playAt: (index) => set((state) => {
        if (index < 0 || index >= state.playlist.length) return {};
        
        return {
          currentMusic: state.playlist[index],
          currentIndex: index,
          progress: 0
        };
      }),
      
      // 设置播放模式
      setPlayMode: (mode) => set(() => ({ playMode: mode }))
    }),
    {
      name: "music_storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
