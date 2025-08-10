import { useDownloadStore } from "@/store/download";
import { Progress } from "radix-ui";
import React from "react";

interface DownloadCardProps {
  value: number;
  name: string;
  total: number;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ value, name, total }) => {
  return (
    <div className="flex flex-col gap-2 p-4 w-full bg-card/30 h-24 rounded-lg">
      <p className="text-2xl font-bold">任务: {name}</p>
      <p className="text-lg">总量: {total}</p>
      <p className="text-lg">Value: {value}</p>
      <Progress.Root>
        <Progress.Indicator />
      </Progress.Root>
    </div>
  );
};

const DownloadPage: React.FC = () => {
  const queue = useDownloadStore(state => state.queue);
  return (
    <div className="flex flex-col w-full h-full p-8 gap-4">
      {queue.map(item => (
        <DownloadCard
          value={
            item.progress.current_size
          }
          name={item.id}
          total={item.progress.total_size}
        />
      ))}
    </div>
  );
};

export default DownloadPage;
