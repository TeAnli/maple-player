import { AspectRatio, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";

export interface MusicProps {
  name: string;
  cover: string
}

const MusicCard: React.FC<MusicProps> = ({ name, cover }) => {
  return (
    <Suspense>
      <div className="group relative w-full transition-all duration-300 hover:scale-105 active:scale-95">
        <div className="flex flex-col gap-4 rounded-xl overflow-hidden transition-all duration-300 p-4">
          <AspectRatio ratio={1} >
            <img
              className="rounded-xl object-cover w-full h-full"
              src={cover}
            />
          </AspectRatio>
          <h3 className="text-center font-semibold truncate" title={name}>{name}</h3>
        </div>
      </div>
    </Suspense>

  );
};
export default MusicCard;
