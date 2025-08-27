import { useDownloadStore } from "@/store/download";
import { Progress } from "radix-ui";
import React from "react";

interface DownloadCardProps {
  value: number;
  name: string;
  total: number;
  bvid: string;
  status: string;
  cover: string
}

const DownloadCard: React.FC<DownloadCardProps> = ({ value, bvid, total, name, cover }) => {

  return (
    <div className="flex flex-row py-4 px-16 w-full rounded-md bg-neutral-600/30 items-center gap-4 justify-between relative">
      <div className="flex items-center gap-4">
        <div>
          <img className="object-cover size-12 rounded-md" src={cover}></img>
        </div>
        <h3 className="text-lg truncate max-w-[70%] w-96">{name}</h3>
      </div>

      <div className="flex flex-row gap-12 items-center">
        <p className="">下载进度: {Math.round((value / total) * 100)}%</p>
        <Progress.Root
          className="w-80 h-5 rounded-md bg-neutral-700 overflow-hidden"
          value={value || 0}
          max={total || 100}
        >
          <Progress.Indicator
            className="h-full rounded-md bg-primary transition-all duration-[30ms]"
            style={{ transform: `translateX(-${total - (value || 0)}%)` }}
          />
        </Progress.Root>
      </div>
    </div>
  );
};

const DownloadPage: React.FC = () => {
  const queue = useDownloadStore(state => state.queue);

  return (
    <div className="flex flex-col h-full p-2 gap-6 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold">下载</h1>
        <div className='bg-primary w-14 h-1 rounded-md'></div>
      </div>

      {queue.length === 0 ? (

        <div className="flex flex-col items-center justify-center h-64">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-36 w-36 text-neutral-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          <p className="text-neutral-500 text-lg mt-4">暂无下载任务</p>
          <p className="text-neutral-400 text-sm mt-1">您可以从视频页面添加下载任务</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {queue.map((item, index) => (
            <DownloadCard
              key={index}
              value={item.progress.total_size > 0 ? (item.progress.current_size * 100) / item.progress.total_size : 0}
              name={item.id}
              total={100}
              bvid={item.id}
              cover={item.cover} status={""} />
          ))}
        </div>
      )
      }
    </div >
  );
};

export default DownloadPage;
