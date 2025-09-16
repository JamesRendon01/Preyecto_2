import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ query, setQuery, onSearch }) => {
    //Manejar enter para ejecutar la busqueda
    const handleKeyDown = (e) => {
        if (e.key === "Enter") onSearch();
    };

    return (
        <div className=" flex items-center max-w-[28rem]">
            {/* Icono de búsqueda */}
            {!query && (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            )}

            {/* Input */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar..."
                className=" w-full pl-10 pr-4 py-2 bg-white border-3 border-black rounded-full transition-shadow duration-200 focus:ring-2
        "
            />
        </div>
    );
};

export default SearchBar;
