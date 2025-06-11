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
        type={props.type}
        ref={inputRef}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};
export default InputField;
