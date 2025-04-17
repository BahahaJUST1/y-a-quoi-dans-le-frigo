import { useState } from 'react';
import CheckMark from './svgs/CheckMark';

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
          <CheckMark />
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