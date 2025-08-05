import React from "react";
import MusicContiner from "../components/music/MusicsContiner";

const FolderPage: React.FC = () => {
  return (
    <div className="w-full h-full px-4 gap-4 flex flex-col overflow-y-auto">
      <MusicContiner></MusicContiner>
    </div>
  );
};

export default FolderPage;
