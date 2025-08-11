import { useDownloadStore } from "@/store/download";
import { Progress } from "radix-ui";
import React, { useEffect } from "react";

interface DownloadCardProps {
  value: number;
  name: string;
  total: number;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ value, name, total }) => {
  return (
    <div className="flex flex-col gap-2 p-4 w-full bg-card/30 rounded-lg">
      <p className="text-2xl font-bold">任务: {name}</p>
      <Progress.Root className="w-full h-3 rounded-full bg-sky-400 relative overflow-hidden" value={value || 0} max={total || 100} >
        <Progress.Indicator className="bg-green-300 rounded-full w-full h-full" style={{ transform: `translateX(-${total - (value || 0)}%)` }} />
      </Progress.Root>
    </div>
  );
};

const DownloadPage: React.FC = () => {
  const queue = useDownloadStore(state => state.queue);
  return (
    <div className="flex flex-col w-full h-full p-8 gap-4 overflow-auto">
      {queue.map((item, index) => (
        <DownloadCard
          key={index}
          value={
            item.progress.current_size * (100 / item.progress.total_size)
          }
          name={item.id}
          total={100}
        />
      ))}
    </div>
  );
};

export default DownloadPage;
