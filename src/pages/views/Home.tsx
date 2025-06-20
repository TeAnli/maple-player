import React from 'react';
import Playlist from '../../components/Playlist';


const Home: React.FC = () => {
  return (
    <div className="w-full p-8">
      <div className="mb-8">
        <div className="flex flex-row justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">推荐歌单</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 gap-4">
          {/* {playlists.map((playlist) => (
            <Playlist
              key={playlist.id}
              name={playlist.name}
              author={playlist.author}
            />
          ))} */}
        </div>
      </div>
      <div className='mb-8'>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">推荐单曲</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;