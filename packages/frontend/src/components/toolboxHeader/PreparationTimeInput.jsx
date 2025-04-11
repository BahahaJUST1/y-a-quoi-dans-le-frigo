import { checkIfMobile } from '../../styles/react-select';

import { useRef } from 'react';

const PreparationTimeInput = ({ timeValue, handleTimeChange }) => {
  const intervalRef = useRef(null);

  const startTimeInterval = (increment) => {
    intervalRef.current = setInterval(() => {
      handleTimeChange(increment);
    }, 200);
  };

  const stopTimeInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleDown = (increment) => {
    handleTimeChange(increment);
    startTimeInterval(increment);
  };

  const handleUp = () => {
    stopTimeInterval();
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg bg-white w-[9rem]">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          if (!checkIfMobile()) {
            handleDown(-5);
          }
        }}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={() => {
          handleDown(-5);
        }}
        onTouchEnd={handleUp}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
      >
        -
      </button>
      <input
        type="text"
        readOnly={true}
        value={`${timeValue ?? '? '}min`}
        className="cursor-default w-20 text-center border-x border-gray-300 py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min="5"
        max="180"
        step="5"
      />
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          if (!checkIfMobile()) {
            handleDown(5);
          }
        }}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={() => {
          handleDown(5);
        }}
        onTouchEnd={handleUp}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
      >
        +
      </button>
    </div>
  );
};


export default PreparationTimeInput;