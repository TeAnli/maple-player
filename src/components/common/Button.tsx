import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  color?: "theme" | "default" | "border" | "info";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, color = "default" }) => {
  const colors: Record<NonNullable<ButtonProps["color"]>, string> = {
    theme: "theme-button",
    default: "default-button",
    border: "default-border-button",
    info: "default-button"
  };

  return (
    <button onClick={onClick} className={colors[color]}>
      {children}
    </button>
  );
};

export default Button;
