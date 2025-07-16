import Folderlist from "../components/Folderlist";
import { Flex } from "@radix-ui/themes";

interface Response {
  code: number;
  data: Data;
}
interface Data {
  data: Array<Item>;
}
interface Item {
  title: string;
  uname: string;
  cover: string;
}

const Home: React.FC = () => {

  return (
    <Flex direction="column" overflowY="auto" width="100%" height="100%">
      <p className="ml-12 text-4xl font-bold mb-4">收藏夹</p>
      <Folderlist />
    </Flex>
  );
};

export default Home;
