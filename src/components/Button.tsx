import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = ''
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    px-4 py-2 text-sm font-medium 
    bg-blue-500 text-white
    rounded-md
    transition-all duration-150 ease-in-out
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:shadow-lg hover:bg-blue-400
    active:bg-blue-600
  `;

  const classes = `
    ${baseClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

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
