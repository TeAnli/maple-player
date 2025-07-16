import { ChangeEvent, useState, ReactNode } from "react";

export interface InputFieldProps {
  // 基础属性
  type?: "text" | "password" | "number" | "email" | "search";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;

  // 状态展示
  error?: string | boolean;
  success?: boolean;
  warning?: boolean;

  // 扩展性插槽
  icon?: ReactNode;

  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled,
  readOnly,
  error,
  success,
  warning,
  icon,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  // 受控/非受控模式处理
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  // 确定当前值
  const currentValue = value !== undefined ? value : internalValue;

  // 状态样式处理
  const getStatusClasses = () => {
    if (disabled) return "border-border bg-muted";
    if (error) return "border-destructive focus:ring-destructive/20";
    if (success) return "border-emerald-500 focus:ring-emerald-500/20";
    if (warning) return "border-amber-500 focus:ring-amber-500/20";
  };

  return (
    <div className={`relative flex items-center w-full`}>
      <input
        type={type}
        value={currentValue}
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        onKeyDown={onKeyDown}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`
          w-full h-10 px-3 rounded-md border bg-card
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-1
          ${getStatusClasses()}
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${readOnly ? "bg-muted" : ""}
        `}
      />

      {typeof error === "string" && error && (
        <p className="mt-1 text-xs text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
