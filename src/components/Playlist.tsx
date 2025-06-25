import React from "react";

export interface PlaylistProps {
  name: string;
  author: string;
  cover: string;
}

const Playlist: React.FC<PlaylistProps> = (props: PlaylistProps) => {
  return (
    <div className="group relative w-full h-24 rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="relative flex items-center h-full p-4">
        <div className="relative mr-4 flex-shrink-0">
          <img
            className="w-16 h-16 rounded-lg shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
            src={props.cover}
          ></img>
        </div>

        <div className="flex flex-col mr-4 truncate">
          <div className="mb-1">
            <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
              {props.name}
            </h3>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-600 truncate">
                {props.author}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
          <button className="w-8 h-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">
            <span>
              <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
          <button className="w-8 h-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">
            <span>
              <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
