import { useLocation } from 'react-router-dom';

const SearchBar = ({ searchTerm, onTextTypingHandler }) => {

  const location = useLocation();

  return (
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
             fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={`Rechercher un ${location.pathname.includes("ingredients") ? "ingrédient" : "plat"}...`}
        className="focus:outline-0 border border-gray-300 rounded-lg py-2 pl-10 pr-3 w-full"
        value={searchTerm}
        onChange={onTextTypingHandler}
      />
    </div>
  )
}

export default SearchBar;