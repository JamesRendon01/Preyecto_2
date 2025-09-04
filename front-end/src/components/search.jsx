import React from "react";
import { Search } from 'lucide-react';
import { UserRound } from 'lucide-react';

const SearchBar = ({ query, setQuery, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch(); // dispara la búsqueda
        }
    };

    return (
        <div className="searchbar-container">
            {!query && (
                    <Search className="icon-search" />
            )}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder=""
                className="searchbar-input"
            />
        </div>
    );
};

export default SearchBar;
