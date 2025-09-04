import React from "react";

const SearchResults = ({ results, hasSearched }) => {

  
  if(hasSearched && results.length === 0){
    return <p className="searchresults-empty">No se encontraron resultados</p>;
  }

  if (results.length === 0) return null;

  return (
    <ul className="searchresults-list">
      {results.map((item, index) => (
        <li key={index} className="searchresults-item">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
