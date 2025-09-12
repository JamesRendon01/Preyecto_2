// pages/HomePage.jsx
import { useState, useEffect } from "react";
import CardCarousel from "../../components/CardCarousel.jsx";
import CardComponent from "../../components/card.jsx";
import { Button } from "antd";
import Nav from "../../components/nav.jsx";
import { useNavigate } from "react-router-dom";
import { useFavoritosStore } from "../../storage/favoritos_storage.js";

// Simula un usuario logueado (reemplaza con tu lógica real de login)
const USER_ID = 1;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setHasSearched(true);
    setLoading(true); // 👈 ya no da error

    try {
      const response = await fetch(
        `http://localhost:8000/plan/buscar?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error buscando planes:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const { cargarFavoritos } = useFavoritosStore();

  // Cargar favoritos desde backend para este usuario al iniciar
  useEffect(() => {
    cargarFavoritos(USER_ID);
  }, []);

  return (
    <div>
      <Nav
        query={query}
        setQuery={setQuery}
        results={results}
        hasSearched={hasSearched}
        handleSearch={handleSearch}
        showFilter={true}
        showNavbar = {true}     // 👈 nuevo
      />

      <div className="h-24" />

      <CardCarousel interval={4000} />

      {/* Pasamos userId para que CardComponent gestione favoritos correctamente */}
      <CardComponent showButton userId={USER_ID} />
    </div>
  );
}
