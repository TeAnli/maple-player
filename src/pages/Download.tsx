import { Flex, Progress } from "@radix-ui/themes";
import { useProgressStore } from "../store/download_store";
import { Text } from "@radix-ui/themes";

interface DownloadCardProps {
  value: number;
  name: string;
  total: number
}
const DownloadCard: React.FC<DownloadCardProps> = ({ value, name, total }) => {
  return (
    <Flex gap="2" p="4" direction="column" className="w-full bg-card/30 h-24 rounded-lg">
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
    <Flex direction="column" width="100%" height="100%" p="8" gap="4">
      {
        queue.map((item) => (
          <DownloadCard

            value={item.progress.current_size === 0 ? 0 :
              (item.progress.current_size / item.progress.total_size) * 100} name={item.id} total={item.progress.total_size} />
        ))
      }
    </Flex>
  );
};

export default Download;
