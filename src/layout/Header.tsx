import InputField from "../components/InputField";
import Search from "../assets/Search.svg";
const Header: React.FC = () => {
  return (
    <div className="fixed w-full">
      <div className="flex items-center h-24 border-b-[0.5px]">
        <InputField
          className="ml-12 mr-12 w-[29rem] h-10"
          placeholder="请输入关键词"
          onChange={(value) => {}}
          internalIcon={Search}
        />
      </div>
    </div>
  );
};

export default Header;
