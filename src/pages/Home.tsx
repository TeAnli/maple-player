import Folderlist from "../components/music/Folderlist";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col overflow-y-auto w-full h-full">
      <Folderlist />
    </div>
  );
};

export default Home;
