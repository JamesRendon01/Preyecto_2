import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import CardComponent from "../../components/card.jsx";
import { useFavoritosStore } from "../../storage/favoritos_storage.js";

export default function Favoritos() {
  const { favoritos, cargarFavoritos } = useFavoritosStore();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    cargarFavoritos();
  }, [cargarFavoritos]);

  const handleSearch = () => {
    const filtered = favoritos.filter((item) =>
      item.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setHasSearched(true);
  };

  // Determinar qué planes mostrar (resultados filtrados o todos)
  const planesAMostrar = hasSearched ? results : favoritos;

  return (
    <div className="bg-gradient-to-t from-white to-grispri">
      <Nav
        query={query}
        setQuery={setQuery}
        results={results}
        hasSearched={hasSearched}
        handleSearch={handleSearch}
        showFilter={false}
        showTitle={true}
      />

      <main className="p-4 mt-30">
        {planesAMostrar.length === 0 ? (
          <p className="text-center mt-16 text-gray-700">
            {hasSearched
              ? "No se encontraron resultados"
              : "No tienes favoritos todavía"}
          </p>
        ) : (
          <CardComponent showButton plans={planesAMostrar} />
        )}
      </main>
    </div>
  );
}
