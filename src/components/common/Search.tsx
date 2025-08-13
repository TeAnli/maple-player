import React, { ChangeEvent, useState } from "react";

export interface InputFieldProps {
  type?: "text" | "password" | "number" | "email" | "search";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Search: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur
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
      onFocus={onFocus}
      placeholder={placeholder}
      className={`
          w-1/3 h-full rounded-md bg-transparent p-6 text-lg
          transition-all duration-300 outline-none justify-center`}
    />
  );
};

export default Search;
