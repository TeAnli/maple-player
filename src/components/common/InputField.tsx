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
          w-full h-10 px-3 rounded-md bg-card
          transition-all duration-300 ease-in-out
          outline-none justify-center
          focus:scale-105 focus:border-neutral-300
        `}
    />
  );
};

export default InputField;
