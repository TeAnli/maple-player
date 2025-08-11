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
      <div>
        <Progress.Root
          className="w-80 h-5 rounded-md bg-neutral-700 overflow-hidden"
          value={value || 0}
          max={total || 100}
        >
          <Progress.Indicator
            className="h-full rounded-md bg-slate-500 transition-all duration-75"
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
    <div className="min-h-screen w-full p-6 md:p-8 gap-6 overflow-auto">
      <h1
        className="text-2xl font-bold mb-8"
      >
        下载
      </h1>

      {queue.length === 0 ? (

        <div className="flex flex-col items-center justify-center h-64">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-36 w-366 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <p className="text-neutral-500 text-lg">暂无下载任务</p>
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
