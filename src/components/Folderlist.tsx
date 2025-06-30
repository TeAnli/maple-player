import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { useAccountStore } from "../store/account_store";

const Folderlist: React.FC = () => {
    const uid = useAccountStore((state) => state.uid)
    useEffect(() => {
        console.log(uid)
        const fetchData = async () => {
            if (uid != null) {
                const data = await invoke("get_all_folder", { uid: uid })
                console.log(data)
            }

        }
        fetchData()
    }, [])

    return (
        <div className="w-80 h-full border border-gray-200/60 overflow-auto rounded-lg bg-white/5">
            <div className="flex flex-col gap-4 p-4">

            </div>
        </div>
    )
}
export default Folderlist;