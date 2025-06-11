import * as React from "react";

export interface InputFieldProps {
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
      <input
        className="bg-component w-full outline-0 rounded-[10px] pl-12 text-neutral-600 font-normal text-[16px] placeholder:text-font-primary"
        type={props.type}
        ref={inputRef}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};
export default InputField;
