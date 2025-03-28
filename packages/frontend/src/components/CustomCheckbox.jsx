import { useState } from 'react';

const CustomCheckbox = ({ id, label }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-start gap-2 mb-2">
      <div
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={() => setIsChecked(!isChecked)}
        className={`
          mt-1 h-4 w-4 rounded-sm cursor-pointer
          border border-gray-300
          ${isChecked ? 'bg-[#FFE394]' : 'bg-white'}
          relative
        `}
      >
        {isChecked && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            viewBox="0 0 20 20"
            fill="black"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        )}
      </div>
      <label 
        onClick={() => setIsChecked(!isChecked)}
        className="flex-1 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;