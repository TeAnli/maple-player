import React from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    count?: number;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '1rem',
    borderRadius = '0.25rem',
    count = 1,
    className = '',
}) => {
    const skeletons = Array.from({ length: count }, (_, index) => (
        <div
            key={index}
            className={`skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius,
            }}
        />
    ));

    return <>{skeletons}</>;
};

export default Skeleton;