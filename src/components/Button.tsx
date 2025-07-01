import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "circle";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseStyles = "inline-flex items-center justify-center text-sm font-medium border border-gray-200/60 hover:border-gray-300/80 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed active:shadow-lg";

  const typeStyles: Record<NonNullable<ButtonProps["type"]>, string> = {
    button: "rounded-md px-4 py-3",
    circle: "rounded-full size-16",
  };

  const combinedClasses = [baseStyles, typeStyles[type], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;
