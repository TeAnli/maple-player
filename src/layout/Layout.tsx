import { Outlet } from "react-router";
import Header from "./Header";
import Drawer from "./Drawer";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useFolderStore } from "../store/folder";
import { useMusicStore } from "../store/music";  // 导入音乐存储

const Layout: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const currentFolder = useFolderStore((state) => state.currentFolder);
  const currentMusic = useMusicStore((state) => state.currentMusic);  // 获取当前音乐状态

  // 计算主内容区域的底部边距
  // 当有音乐播放时(Drawer显示)，添加120px的底部边距
  const mainBottomMargin = currentMusic ? "pb-[120px]" : "pb-0";

  return (
    <div className="font-mukta bg-content text-primary w-full h-[100vh] overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-sidebar border-r border-neutral-700 bg-foreground h-full">
          <Sidebar />
        </aside>

        <div className="w-full flex-1 flex flex-col overflow-hidden relative">
          {/* 背景图片 */}

          {currentFolder?.info.cover &&
            <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-100 blur-3xl">
              <img
                className="h-full w-full object-cover"
                src={currentFolder?.info.cover}
                alt="Folder cover"
              />
              {/* 渐变遮罩层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-content to-neutral-700/80"></div>
            </div>
          }

          <header data-tauri-drag-region className="relative z-10">
            <Header />
          </header>

          {/* 主内容区域 - 根据Drawer状态添加底部边距 */}
          <main className={`flex-1 overflow-y-auto p-4 relative z-10 ${mainBottomMargin} transition-all duration-300`}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* 底部抽屉 - 使用fixed定位固定在底部 */}
      <div className="w-full fixed bottom-0 left-0 right-0 z-20">
        <Drawer />
      </div>
    </div >
  );
};

export default Layout;
