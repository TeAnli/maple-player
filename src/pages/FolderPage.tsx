import React from "react";
import MusicContainer from "../components/music/MusicContainer.tsx";

const FolderPage: React.FC = () => {
  return (
    <div className="w-full h-full gap-4 flex flex-col overflow-y-auto">
      <MusicContainer></MusicContainer>
    </div>
  );
};

export default FolderPage;
