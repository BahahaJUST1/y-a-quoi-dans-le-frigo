const FavouritesDisplayBtn = ({ displayFavourites, onButtonClick }) => {
  return (
    <button
      className={`${
        displayFavourites
          ? "bg-red-500 border border-red-400 text-white hover:bg-red-400"
          : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
      } py-2 px-4 rounded-lg text-base font-medium h9 flex items-center gap-1 flex-shrink-0`}
      onClick={onButtonClick}
      type="button"
    >
      <svg className="mt-1 ml-[-3px]" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
           fill={displayFavourites ? "white" : "none"} stroke={displayFavourites ? "white" : "red"} strokeWidth="2">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      Favoris
    </button>
  )
}

export default FavouritesDisplayBtn;