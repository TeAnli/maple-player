import { useProgressStore } from "../store/download";
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
      <div className="">
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Download: React.FC = () => {
  const queue = useProgressStore(state => state.queue);

  return (
    <div className="flex flex-col w-full h-full p-8 gap-4">
      {queue.map(item => (
        <DownloadCard
          value={
            item.progress.current_size === 0
              ? 0
              : (item.progress.current_size / item.progress.total_size) * 100
          }
          name={item.id}
          total={item.progress.total_size}
        />
      ))}
    </div>
  );
};

export default Download;
