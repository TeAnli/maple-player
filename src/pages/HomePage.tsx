import Folderlist from "../components/music/Folderlist";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col overflow-y-auto w-full h-full justify-center">
      <Folderlist />
    </div>
  );
};

export default HomePage;
