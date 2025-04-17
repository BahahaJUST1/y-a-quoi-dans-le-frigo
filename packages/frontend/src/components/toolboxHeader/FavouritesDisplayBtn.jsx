import SmallHeart from '../svgs/SmallHeart';

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
      <SmallHeart
        displayFavourites={displayFavourites}
      />
      Favoris
    </button>
  )
}

export default FavouritesDisplayBtn;