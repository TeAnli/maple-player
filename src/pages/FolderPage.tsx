import React from "react";
import MusicContiner from "../components/music/MusicsContiner";

const FolderPage: React.FC = () => {
  return (
    <div className="w-full h-full overflow-hidden p-4 gap-4 flex flex-col">
      <MusicContiner></MusicContiner>
    </div>
  );
};

export default FolderPage;
