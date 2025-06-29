import React, { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import { invoke } from "@tauri-apps/api/core";
import { useSearchStore } from "../../store/search_store";

interface VideoData {
  bvid: string,
  aid: number,
  title: string,
  owner: any,
  pic: string,
}

const Search: React.FC = () => {
  const content = useSearchStore((state) => state.content);
  const [data, setData] = useState<VideoData>()
  useEffect(() => {
    const fetchData = async () => {
      setData(await invoke("search_bvid_info", { bvid: content }) as VideoData)
    }
    fetchData()
  }, [])
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <p className="truncate font-bold text-xl">搜索结果</p>

      {data && <Playlist type="search" name={data.title} author={data.owner.name} cover={data.pic}></Playlist>}
    </div>
  );
};

export default Search;
