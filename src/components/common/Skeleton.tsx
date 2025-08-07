import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "100%",
  borderRadius = "1rem",
  count = 1,
  className = ""
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div className="aspect-square flex flex-col items-center gap-4 object-cover p-2">
      <div
        key={index}
        className={`skeleton ${className}`}
        style={{
          width,
          height,
          borderRadius
        }}
      />
      <div className="skeleton w-2/3 h-1/6 rounded-lg"></div>
    </div>
  ));

  return <>{skeletons}</>;
};

export default Skeleton;
