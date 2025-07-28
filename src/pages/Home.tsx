import Folderlist from "../components/music/Folderlist";

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
    <div className="flex flex-col overflow-y-auto w-full h-full">
      <Folderlist />
    </div>
  );
};

export default Home;
