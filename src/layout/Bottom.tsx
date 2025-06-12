import Play from "../assets/Start.svg";
import Next from "../assets/Next.svg";
import Previous from "../assets/Previous.svg";

const Bottom: React.FC = () => {
  return (
    <div className="fixed flex bottom-0 w-full h-28 border-t-[0.5px]">
      <div className="m-4 rounded-2xl w-20 h-20 bg-neutral-500"></div>
      <div className="flex ml-20 items-center">
        <img width={42} height={42} src={Previous}></img>
        <div className="flex items-center justify-center m-4 rounded-xl w-14 h-14 bg-forgeground cursor-pointer">
          <img src={Play}></img>
        </div>
        <img width={42} height={42} src={Next}></img>
      </div>
    </div>
  );
};

export default Bottom;
