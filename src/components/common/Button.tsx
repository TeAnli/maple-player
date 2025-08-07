import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  style?: "theme" | "default";
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, style = "default" }) => {
  const styles: Record<NonNullable<ButtonProps["style"]>, string> = {
    theme: "theme-button",
    default: "default-button"
  };
  return (
    <button onClick={onClick} className={styles[style]}>
      {children}
    </button>
  );
};

export default Button;
