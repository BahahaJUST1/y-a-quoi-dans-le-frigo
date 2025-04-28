const NumberOfPeopleInput = ({ numberOfPeople, handleNumberChange }) => {

  return (
    <div className="flex items-center border border-gray-300 rounded-lg bg-white w-[7.5rem] md:ml-auto mr-1.5">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleNumberChange(-1);
        }}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
      >
        -
      </button>
      <input
        type="text"
        readOnly={true}
        value={`${numberOfPeople}`}
        className="relative cursor-default w-14 text-center border-x border-gray-300 py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min="1"
        max="20"
        step="1"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleNumberChange(1);
        }}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
      >
        +
      </button>
    </div>
  )
}

export default NumberOfPeopleInput;