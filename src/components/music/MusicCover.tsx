import React from "react";

export interface MusicCoverProps {
  cover: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
}

const MusicCover: React.FC<MusicCoverProps> = ({
  cover,
  alt = "",
  size = "medium",
  className = "",
  onClick
}) => {
  // 根据size属性设置不同的尺寸类名
  const sizeClass = {
    small: "w-10 h-10 rounded-md",
    medium: "w-16 h-16 rounded-xl",
    large: "w-20 h-20 rounded-2xl"
  }[size];

  return (
    <img
      src={cover}
      alt={alt}
      className={`object-cover ${sizeClass} flex items-center justify-center ${onClick ? "hover:scale-110 cursor-pointer transition-all duration-300" : ""} ${className}`}
      onClick={onClick}
    />
  );
};

export default MusicCover;