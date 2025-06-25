import React, { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import { invoke } from "@tauri-apps/api/core";

interface Response {
  code: number;
  data: Data;
}
interface Data {
  data: Array<Item>;
}
interface Item {
  title: string;
  uname: string;
  cover: string;
}

const Home: React.FC = () => {
  const [playlists, setPlaylists] = useState<Item[]>([]);

  useEffect(() => {
    invoke("get_hot_playlists", {
      page: 1,
      pageSize: 6,
    })
      .then((result) => {
        const response = result as Response;
        setPlaylists(response.data.data);
        console.log(response.data.data[0].cover);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <div className="w-full p-8">
      <div className="mb-8">
        <div className="flex flex-row justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">推荐歌单</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <Playlist
              name={playlist.title}
              author={playlist.uname}
              cover={playlist.cover}
            />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            推荐单曲
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-20"></div>
      </div>
    </div>
  );
};

export default Home;
