import React from "react";

const SearchResults = ({ results, hasSearched }) => {

  
  if(hasSearched && results.length === 0){
    return <p>No se encontraron resultados</p>;
  }

  if (results.length === 0) return null;

  return (
    <ul>
      {results.map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
