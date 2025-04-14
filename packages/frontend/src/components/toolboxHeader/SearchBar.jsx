import { useLocation } from 'react-router-dom';
import Search from '../svgs/Search';

const SearchBar = ({ searchTerm, onTextTypingHandler }) => {

  const location = useLocation();

  return (
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search />
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