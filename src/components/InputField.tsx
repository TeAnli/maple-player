import { ChangeEvent, useRef, useState } from "react";
export interface InputFieldProps {
  internalIcon?: string;
  type?: "text" | "password";
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`flex ${props.className}`}>
      <div
        className={`relative flex items-center w-full h-12 bg-white/80 backdrop-blur-sm rounded-xl border transition-all duration-300 ${isFocused
          ? "shadow-lg"
          : "border-gray-200/60 hover:border-gray-300/80 hover:bg-white/90"
          }`}
      >
        {props.internalIcon && (
          <div className="flex items-center justify-center w-12 h-12">
            <img
              width={18}
              height={18}
              src={props.internalIcon}
              className={`transition-all duration-300 ${isFocused ? "opacity-80 scale-110" : "opacity-60"
                }`}
            ></img>
          </div>
        )}
        <input
          className={`w-full outline-none px-4 text-gray-800 placeholder-gray-500 text-sm font-medium transition-all duration-300 ${props.disabled ? "cursor-not-allowed" : ""
            }`}
          type={props.type}
          ref={inputRef}
          placeholder={props.placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};
export default InputField;
