import { Flex, Progress } from "@radix-ui/themes";
import React, { useContext, useEffect } from "react";
import { Task, useProgressStore } from "../../utils/store/download_store";
import { Text } from "@radix-ui/themes";

interface DownloadCardProps {
  value: number;
  name: string;
  total: number
}
const DownloadCard: React.FC<DownloadCardProps> = ({ value, name, total }) => {
  return (
    <Flex gap="2" p="4" direction="column" className="w-full h-48 m-4 shadow-lg rounded-lg">
      <Text size="6" weight="bold">任务: {name}</Text>
      <Text size="4">总量: {total}</Text>
      <div className="">
        <Progress size="3" value={value}></Progress>
      </div>

    </Flex>
  )
}

const Download: React.FC = () => {
  const queue = useProgressStore((state) => state.queue);

  return (
    <div className="w-full h-full p-6">
      <Flex width="100%" gap="4" direction="column" >
        {
          queue.map((item) => (
            <DownloadCard

              value={item.progress.current_size === 0 ? 0 :
                (item.progress.current_size / item.progress.total_size) * 100} name={item.id} total={item.progress.total_size} />
          ))
        }
      </Flex>
    </div>
  );
};

export default Download;
