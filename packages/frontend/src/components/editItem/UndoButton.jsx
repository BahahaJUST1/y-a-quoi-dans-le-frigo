const UndoButton = ({ handleUndo }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleUndo();
      }}
      className="p-1.5 rounded-full hover:scale-105 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5a5b5c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </button>
  )
}

export default UndoButton;