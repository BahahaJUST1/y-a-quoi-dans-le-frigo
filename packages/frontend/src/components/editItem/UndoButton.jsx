import Undo from '../svgs/Undo';

const UndoButton = ({ handleUndo }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleUndo();
      }}
      className="p-1.5 rounded-full hover:scale-105 transition-colors"
    >
      <Undo />
    </button>
  )
}

export default UndoButton;