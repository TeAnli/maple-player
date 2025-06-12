import * as React from "react";

export interface InputFieldProps {
  internalIcon?: string;
  type?: "text" | "password";
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={`flex ${props.className}`}>
      <img
        width={18}
        height={18}
        src={props.internalIcon}
        className="absolute ml-4 top-1/2 -translate-y-1/2"
      ></img>
      <input
        className="bg-component w-full outline-0 rounded-[10px] pl-12 font-normal text-[16px] text-font-primary transition-all duration-500 focus:border-[0.5px]"
        type={props.type}
        ref={inputRef}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};
export default InputField;
