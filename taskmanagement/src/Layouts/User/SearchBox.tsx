import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { ItemTypes } from "../../Types/ItemsTypes";

interface SearchBoxProps {
  userItems: ItemTypes[];
  onSearch: (searchTerm: string) => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [inputfield, setInputField] = useState(false);

  const Focus = () => {
    setInputField(true);
  };

  const Blur = () => {
    setInputField(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className={`rounded relative items-center bg-white ${
        inputfield ? "w-full" : "w-full"
      } flex transition-width duration-700`}
    >
      <input
        type="text"
        onFocus={Focus}
        onBlur={Blur}
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
        className={`${
          inputfield ? "flex" : ""
        } p-2  relative flex bg-inherit border border-gray-300 rounded focus:border-2 w-full md:w-3/5 focus:outline-yellow-400 pl-8 flex-1 transition-width duration-700 focus:w-full`}
      />

      <span
        className={`absolute left-2 md:flex-1 ${
          inputfield ? "text-yellow-400" : ""
        }`}
        onClick={() => setInputField(!inputfield)}
      >
        <FiSearch />
      </span>
    </span>
  );
};

export default SearchBox;
