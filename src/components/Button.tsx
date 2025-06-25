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
  const baseClasses = `
    inline-flex items-center justify-center px-4 py-3 text-sm font-medium border border-gray-200/60 hover:border-gray-300/80
    transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed active:shadow-lg
    ${type === "button" ? "rounded-md" : "rounded-full size-8 "}
  `;

  const classes = `
    ${baseClasses}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
