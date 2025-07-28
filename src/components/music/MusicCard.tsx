import { Suspense } from "react";
import { useMusicStore } from "../../store/music";
import { invoke } from "@tauri-apps/api/core";

export interface MusicProps {
  name: string;
  cover: string;
  bvid: string;
}

const MusicCard: React.FC<MusicProps> = ({ name, cover, bvid }) => {
  const setCurrentMusic = useMusicStore(state => state.setCurrentMusic);

  const playMusic = async () => {
    let cid = await invoke("get_cid_by_bvid", { bvid });
    let url = await invoke<string>("get_audio_url", { cid, bvid });
    console.log(url);
    setCurrentMusic({
      name,
      cover,
      duration: 0,
      current: 0,
      audioUrl: url
    });
  };

  return (
    <Suspense>
      <div
        onClick={playMusic}
        className="group relative w-full transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="flex flex-col gap-4 rounded-xl overflow-hidden transition-all duration-300 p-4">
          <div className="aspect-square">
            <img
              className="rounded-xl object-cover w-full h-full transition-all duration-500 group-hover:shadow-xl group-active:shadow-xl"
              src={cover}
            />
          </div>
          <h3 className="text-center font-semibold truncate" title={name}>
            {name}
          </h3>
        </div>
      </div>
    </Suspense>
  );
};
export default MusicCard;
