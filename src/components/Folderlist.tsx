import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { useAccountStore } from "../store/account_store";
import Playlist from "./Playlist";

interface FolderItem {
    id: number,
    mid: number,
    attr: number,
    title: string,
    media_count: number,
    cover: string
}

const Folderlist: React.FC = () => {
    const uid = useAccountStore((state) => state.mid)
    const [folderList, setFolderList] = useState<Array<FolderItem>>([])
    useEffect(() => {
        const fetchData = async () => {
            if (uid != null) {
                const data = await invoke("get_all_folder", { uid: uid }) as Array<FolderItem>
                setFolderList(data)
            }

        }
        fetchData()
    }, [])

    return (
        <div className="w-80 h-full border border-gray-200/60 overflow-auto rounded-lg bg-white/5 drop-shadow-md">
            <div className="flex flex-col gap-4 p-4">
                {folderList.map((item) => (
                    <Playlist key={item.id} name={item.title} author={item.mid.toString()} cover={item.cover} />
                ))}
            </div>
        </div>
    )
}
export default Folderlist;