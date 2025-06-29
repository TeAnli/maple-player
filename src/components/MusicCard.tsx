export interface MusicProps {
  name: string;
  author: string;
  cover: string
}

const MusicCard: React.FC<MusicProps> = (props: MusicProps) => {
  return (
    <div className="group relative hover:scale-110 active:scale-90 transition-all">
      <div className="">
        <div className="pb-[100%] hover:shadow-md bg-primary rounded-md cursor-pointer"></div>
        <div className="flex flex-col w-full items-center justify-center">
          <h3 className="text-lg font-bold text-gray-800 truncate">SB</h3>

          <p className="text-sm font-medium text-gray-600 truncate">youm</p>
        </div>
      </div>
    </div>
  );
};
export default MusicCard;
