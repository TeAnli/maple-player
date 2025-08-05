import { ChangeEvent, useState } from "react";

export interface InputFieldProps {
  type?: "text" | "password" | "number" | "email" | "search";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const currentValue = value !== undefined ? value : internalValue;

  return (
    <input
      type={type}
      value={currentValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={`
          w-64 h-8 px-3 rounded-md bg-foreground
          transition-all duration-300 outline-none justify-center
          border border-[0.5px] border-neutral-600
          focus:w-72 focus:drop-shadow-xl
        `}
    />
  );
};

export default InputField;
