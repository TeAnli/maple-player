import InputField from "../components/InputField";

const Header: React.FC = () => {
  return (
    <div className="flex w-full h-28 border-b-[1px] border-neutral-500">
      <InputField
        className="ml-12"
        placeholder="请输入关键词"
        onChange={(value) => {}}
      />
    </div>
  );
};

export default Header;
