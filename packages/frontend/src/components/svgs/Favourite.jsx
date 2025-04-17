const Favourite = ({ isItemLiked, isItemSelected, handleLike }) => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill={isItemLiked ? "#EF4444" : "none"}
      stroke={
        isItemSelected
          ? isItemLiked ? "#EF4444" : "red"
          : "red"
      }
      strokeWidth={isItemSelected ? '1' : '0.5'}
      className="cursor-pointer transition-transform duration-200 hover:scale-110 mt-2"
      onClick={(event) => {
        event.stopPropagation();
        if (handleLike) {
          handleLike()
        }
      }}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export default Favourite;