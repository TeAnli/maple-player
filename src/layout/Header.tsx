import InputField from "../components/InputField";

const Header: React.FC = () => {
  return (
    <div className="flex items-center w-full h-28 border-b-[1px] border-neutral-500">
      <InputField
        className="ml-12 mr-12 w-[29rem] h-10"
        placeholder="请输入关键词"
        onChange={(value) => {}}
      />
    </div>
  );
};

export default Header;
