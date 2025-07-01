export interface MusicProps {
  name: string;
  author: string;
  cover: string
}

const MusicCard: React.FC<MusicProps> = ({ name, author, cover }) => {
  return (
    <div className="group relative w-full transition-all duration-300 hover:scale-105 active:scale-95">
      <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative bg-gray-100">
          <img
            src={cover}
            className="transition-transform duration-500 group-hover:scale-110"
          />

        </div>
        <div className="p-2">
          <h3 className="text-base font-semibold text-gray-800 truncate line-clamp-1" title={name}>{name}</h3>
          <p className="text-xs font-medium text-gray-500 truncate line-clamp-1 mt-1" title={author}>{author}</p>
        </div>
      </div>
    </div>
  );
};
export default MusicCard;
