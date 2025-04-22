import React from 'react';

const LoadingSpinner = ({ isLoading }) => {

  if (!isLoading) {
    return null;
  }

  const SpinnerElement = (
    <div className={`
      md:w-16 md:h-16 md:border-[4px] 
      max-[768px]:w-12 max-[768px]:h-12 max-[768px]:border-[2px]
      rounded-full border-gray-300 border-t-gray-200 animate-spin`} />
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60] bg-black bg-opacity-20">
      {SpinnerElement}
    </div>
  );
};

export default LoadingSpinner;