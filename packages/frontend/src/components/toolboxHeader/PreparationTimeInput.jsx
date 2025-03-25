import { checkIfMobile } from '../../styles/react-select';

const PreparationTimeInput = ({ timeValue, handleTimeChange }) => {

  const startTimeInterval = (increment) => {
    return setInterval(() => {
      handleTimeChange(increment);
    }, 200);
  };

  const handleMouseDown = (increment) => {
    handleTimeChange(increment);
    return startTimeInterval(increment);
  };

  const handleMouseUp = (intervalId) => {
    clearInterval(intervalId);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
      <button
        onMouseDown={() => {
          if (!checkIfMobile()) {
            const intervalId = handleMouseDown(-5);
            const cleanup = () => handleMouseUp(intervalId);
            document.addEventListener('mouseup', cleanup, { once: true });
          }
        }}
        onTouchStart={() => {
          const intervalId = handleMouseDown(-5);
          const cleanup = () => handleMouseUp(intervalId);
          document.addEventListener('touchend', cleanup, { once: true });
        }}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
      >
        -
      </button>
      <input
        type="text"
        value={`${timeValue}min`}
        onChange={handleTimeChange}
        className="w-20 text-center border-x border-gray-300 py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min="5"
        max="180"
        step="5"
      />
      <button
        onMouseDown={() => {
          if (!checkIfMobile()) {
            const intervalId = handleMouseDown(5);
            const cleanup = () => handleMouseUp(intervalId);
            document.addEventListener('mouseup', cleanup, { once: true });
          }
        }}
        onTouchStart={() => {
          const intervalId = handleMouseDown(5);
          const cleanup = () => handleMouseUp(intervalId);
          document.addEventListener('touchend', cleanup, { once: true });
        }}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
      >
        +
      </button>
    </div>
  )
}

export default PreparationTimeInput;