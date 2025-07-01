import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { useAccountStore } from "../store/account_store";
import Playlist from "./Playlist";
import { PlaylistItem, useFolderStore } from "../store/folder_store";


const Folderlist: React.FC = () => {
    const uid = useAccountStore((state) => state.mid)
    const folderList = useFolderStore((state) => state.folderList);
    const setFolderList = useFolderStore((state) => state.setFolderList);
    const setCurrentFolder = useFolderStore((state) => state.setCurrentFolder);
    useEffect(() => {
        const fetchData = async () => {
            if (uid != null) {
                const data = await invoke("get_all_folder", { uid: uid }) as Array<PlaylistItem>
                setFolderList(data)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="w-80 h-full border border-gray-200/60 overflow-auto rounded-lg bg-white/5 drop-shadow-md">
            <div className="flex flex-col gap-4 p-4">
                {folderList.map((item) => (
                    <Playlist onClick={() => { setCurrentFolder(item) }} key={item.info.id} name={item.info.title} author={item.info.mid.toString()} cover={item.info.cover} />
                ))}
            </div>
        </div>
    )
}
export default Folderlist;