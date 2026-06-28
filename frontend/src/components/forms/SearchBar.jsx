import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch, onSearch, placeholder }) {

    return (

        <div className="flex items-center gap-3 my-6">

            <div className="relative flex-1">

                <FaSearch className="absolute left-3 top-4 text-gray-400" />

                <input

                    type="text"

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    placeholder={placeholder}

                    className="w-full border rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"

                />

            </div>

            <button

                onClick={onSearch}

                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

            >

                Search

            </button>

        </div>

    );

}

export default SearchBar;