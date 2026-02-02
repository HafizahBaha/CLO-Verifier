
import React from 'react';

interface LoadingSpinnerProps {
    size?: string;
    color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'h-8 w-8', color = 'text-blue-600' }) => {
  return (
    <div className="flex justify-center items-center p-4">
        <div className={`${size} ${color} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`} role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    </div>
  );
};