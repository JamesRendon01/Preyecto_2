// pages/HomePage.jsx
import { useState, useEffect } from "react";
import CardCarousel from "../../components/CardCarousel.jsx";
import CardComponent from "../../components/card.jsx";
import { Button, Pagination } from "antd";
import Nav from "../../components/nav.jsx";
import { useNavigate } from "react-router-dom";
import { useFavoritosStore } from "../../storage/favoritos_storage.js";
import Footer from "../../components/footer.jsx";
import Paginacion from "../../components/paginacion.jsx";

// Simula un usuario logueado (reemplaza con tu lógica real de login)
const USER_ID = 1;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]); // 👉 todos los planes
  const [filteredPlans, setFilteredPlans] = useState([]); // 👉 filtrados por búsqueda

  const { cargarFavoritos } = useFavoritosStore();

    // Simula carga inicial de planes desde API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("http://localhost:8000/plan/card_planes");
        const data = await res.json();
        console.log("Planes recibidos:", data); // 👈 DEBUG
        setPlans(data);
        setFilteredPlans(data); // al inicio no hay filtro
      } catch (error) {
        console.error("Error cargando planes:", error);
      }
    };
    fetchPlans();
    cargarFavoritos(USER_ID);
  }, []);

  // Filtrado en tiempo real
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredPlans(plans);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = plans.filter(
        (plan) =>
          plan.nombre.toLowerCase().includes(lowerQuery) ||
          plan.descripcion.toLowerCase().includes(lowerQuery)
      );
      setFilteredPlans(filtered);
    }
  }, [query, plans]);

  // Cargar favoritos desde backend para este usuario al iniciar
  useEffect(() => {
    cargarFavoritos(USER_ID);
  }, []);

  //limpia resultados y estado cuando query esta vacio
  useEffect(() => {
    if (query.trim() === "") {
      setHasSearched(false);
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <Nav
        query={query}
        setQuery={setQuery}
        // results={results}
        // hasSearched={hasSearched}
        // handleSearch={handleSearch}
        showFilter={true}
        showNavbar = {true}     // 👈 nuevo
      />

      <div className="h-24" />

      <CardCarousel interval={4000} />

      {/* Pasamos userId para que CardComponent gestione favoritos correctamente */}
      <CardComponent showButton userId={USER_ID} />

      {filteredPlans.length > 0 ? (
        <CardComponent showButton userId={USER_ID} plans={filteredPlans} />
      ) : (
        <p className="text-center text-gray-700">
          No se encontraron resultados
        </p>
      )}

      <Paginacion />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
