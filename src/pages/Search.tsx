import React, { useEffect, useState } from "react";
import Playlist from "../components/Playlist";
import { invoke } from "@tauri-apps/api/core";
import { useSearchStore } from "../store/search_store";
import { Flex } from "@radix-ui/themes";

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
    <Flex justify="center" align="center" width="100%" height="100%" p="4" gap="4">
      <p className="truncate font-bold text-xl">搜索结果</p>

      {data && <Playlist type="search" name={data.title} cover={data.pic}></Playlist>}
    </Flex>
  );
};

export default Search;
