import { useFolderStore } from "../store/folder_store";
import MusicCard from "./MusicCard";

const MusicContiner: React.FC = () => {
    const currentFolder = useFolderStore((state) => state.currentFolder);
    return (
        <div className="w-full h-full border border-gray-200/60 overflow-auto rounded-lg bg-white/5 drop-shadow-md">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-16 p-4">
                {currentFolder?.medias.map((item) => {
                    return <MusicCard name={item.title} author={"sb"} cover={item.cover} key={item.id} />
                })}
            </div>
        </div>

    )
}
export default MusicContiner;