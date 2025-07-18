import { invoke } from "@tauri-apps/api/core";
import { useEffect, useRef } from "react";
import { useAccountStore } from "../store/account_store";
import Playlist from "./Playlist";
import { PlaylistItem, useFolderStore } from "../store/folder_store";
import { Flex, Skeleton, Text } from "@radix-ui/themes";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Folderlist: React.FC = () => {

    const uid = useAccountStore((state) => state.mid)
    const isLogin = useAccountStore((state) => state.isLogin)
    const folderList = useFolderStore((state) => state.folderList);
    const setFolderList = useFolderStore((state) => state.setFolderList);
    const setCurrentFolder = useFolderStore((state) => state.setCurrentFolder);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const nagetive = useNavigate()
    useGSAP(() => {
        gsap.timeline()
            .from(itemRefs.current, {
                opacity: 0,
                x: -100,
                stagger: 0.15, // 每个子项依次延迟
                duration: 0.5,
                ease: "power1.out"
            });
    }, [])
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
                <Flex width="100%" height="100%" justify="center" align="center" direction="column" gap="2" p="2">
                    <div className="text-center text-xl font-bold">当前未登录至bilibili账号，请登陆</div>
                    <Button onClick={() => {
                        nagetive("login")
                    }}>登陆</Button>
                </Flex>
            )
        }
        if (folderList.length <= 0) {
            return (
                <div className="w-full h-full flex flex-col gap-4">
                    {
                        Array.from({ length: 5 }).map(() => (
                            <main className="flex flex-row gap-4">
                                <Skeleton>
                                    <section className="w-16 h-16 rounded-lg"></section>
                                </Skeleton>
                                <Flex direction="column" justify="between">
                                    <Text>
                                        <Skeleton>Folder is loading...</Skeleton>
                                    </Text>
                                    <Text>
                                        <Skeleton>This is folder skeleton, please wait</Skeleton>
                                    </Text>
                                </Flex>
                            </main>
                        ))
                    }
                </div>
            )
        }

        return folderList.map((item, idx) => (
            <Flex
                ref={(el) => itemRefs.current[idx] = el}
                width="100%"
                style={{ animationDelay: `${idx * 0.2}s` }}
                key={item.info.id}
            >
                <Playlist data={item} onClick={() => { setCurrentFolder(item); nagetive("folder") }} name={item.info.title} cover={item.info.cover} />
            </Flex>
        ))
    }
    return (

        <Flex width="100%" height="100%" align="center" direction="column" gap="2" px="8" py="2">
            {handleFolder()}
        </Flex>

    )
}
export default Folderlist;