import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { useAccountStore } from "../utils/store/account_store";
import Playlist from "./Playlist";
import { PlaylistItem, useFolderStore } from "../utils/store/folder_store";
import { Box, Flex } from "@radix-ui/themes";

const Folderlist: React.FC = () => {
    const uid = useAccountStore((state) => state.mid)
    const isLogin = useAccountStore((state) => state.isLogin)
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
    const handleFolder = () => {
        if (!isLogin) {
            return (
                <Flex direction="column" gap="2" p="2">
                    <div className="text-center">当前未登录至bilibili账号，请登陆</div>
                </Flex>
            )
        }
        if (folderList.length <= 0) {
            return (
                <Flex direction="column" gap="2" p="2">
                    当前账号没有创建任何收藏夹
                </Flex>
            )
        }

        return folderList.map((item) => (
            <Playlist data={item} onClick={() => { setCurrentFolder(item); }} key={item.info.id} name={item.info.title} cover={item.info.cover} />
        ))
    }
    return (
        <Box className="w-80 h-full border border-gray-200/60 overflow-auto bg-white/5 rounded-md">
            <Flex direction="column" gap="4" p="2">
                {handleFolder()}
            </Flex>
        </Box>
    )
}
export default Folderlist;