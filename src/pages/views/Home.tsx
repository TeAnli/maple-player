import Folderlist from "../../components/Folderlist";
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
    <Flex overflowY="auto" width="100%" height="100%">
      <Folderlist />
    </Flex>
  );
};

export default Home;
