import { Flex, Progress } from "@radix-ui/themes";
import React, { useContext, useEffect } from "react";
import { useProgressStore } from "../../utils/store/download_store";

const DownloadCard: React.FC = () => {
  const progress = useProgressStore((state) => state.getProgress());
  return (
    <Flex className="w-full h-48">
      <Progress value={progress}></Progress>
    </Flex>
  )
}

const Download: React.FC = () => {
  return (
    <div className="w-full h-full p-6">
      <Flex width="100%" direction="column" >
        <DownloadCard />
      </Flex>
    </div>
  );
};

export default Download;
