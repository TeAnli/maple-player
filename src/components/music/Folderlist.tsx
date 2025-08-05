import { invoke } from "@tauri-apps/api/core";
import { useEffect, useRef } from "react";
import { useAccountStore } from "../../store/account";
import Playlist from "./Playlist";
import { PlaylistItem, useFolderStore } from "../../store/folder";
import { useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Skeleton from '../common/Skeleton';

const Folderlist: React.FC = () => {
  const uid = useAccountStore(state => state.mid);
  const isLogin = useAccountStore(state => state.isLogin);
  const folderList = useFolderStore(state => state.folderList);
  const setFolderList = useFolderStore(state => state.setFolderList);
  const setCurrentFolder = useFolderStore(state => state.setCurrentFolder);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nagetive = useNavigate();

  useGSAP(() => {
    gsap.timeline().from(itemRefs.current, {
      opacity: 0,
      y: 30,
      stagger: 0.05,
      duration: 0.4,
      ease: "power1.inOut"
    });
  }, [folderList.length]);

  useEffect(() => {
    const fetchData = async () => {
      if (uid != null) {
        const data = (await invoke("get_all_folder", { uid: uid })) as Array<PlaylistItem>;
        setFolderList(data);
      }
    };
    fetchData();
  }, []);

  const handleFolder = () => {
    if (!isLogin) {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-2 p-2">
          <div className="text-center text-xl font-bold">当前未登录至bilibili账号，请登陆</div>
        </div>
      );
    }
    if (folderList.length <= 0) {
      return (
        <Skeleton height="4rem" count={9} className="mb-2" />
      );
    }

    return folderList.map((item, idx) => (
      <div
        ref={el => (itemRefs.current[idx] = el)}
        className="w-full"
        style={{ animationDelay: `${idx * 0.2}s` }}
        key={item.info.id}
      >
        <Playlist
          data={item}
          onClick={() => {
            setCurrentFolder(item);
            nagetive("folder");
          }}
          name={item.info.title}
          cover={item.info.cover}
        />
      </div>
    ));
  };
  return (
    <div className="w-full h-full flex flex-col gap-2 px-8 py-2">
      <h1 className="text-2xl font-bold">你的收藏夹</h1>
      <div className="px-4">{handleFolder()}</div>
    </div>
  );
};

export default Folderlist;
