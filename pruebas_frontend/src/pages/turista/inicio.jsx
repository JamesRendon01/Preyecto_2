// pages/HomePage.jsx
import { useState, useEffect } from "react";
import CardCarousel from "../../components/CardCarousel.jsx";
import CardComponent from "../../components/card.jsx";
import { Button } from "antd";
import Nav from "../../components/nav.jsx";
import { useFavoritosStore } from "../../storage/favoritos_storage.js";

// Simula un usuario logueado (reemplaza con tu lógica real de login)
const USER_ID = 1;

function HoverCardWrapper({ children }) {
  return (
    <div className="hover-card">
      {children}
      <div className="hover-info">
        <Button type="primary" shape="round" className="button-reservar">
          Reservar
        </Button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const linksParaPagina2 = [
    { href: "https://open.spotify.com/intl-es", label: "Inicio" },
    { href: "https://web.whatsapp.com/", label: "Contacto" },
  ];

  const data = [
    "React",
    "Vue",
    "Angular",
    "Svelte",
    "Next.js",
    "Nuxt.js",
    "Tailwind CSS",
    "JavaScript",
  ];

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setHasSearched(true);
  };

  const { cargarFavoritos } = useFavoritosStore();

  // Cargar favoritos desde backend para este usuario al iniciar
  useEffect(() => {
    cargarFavoritos(USER_ID);
  }, []);

  return (
    <div>
      <Nav
        links={linksParaPagina2}
        query={query}
        setQuery={setQuery}
        results={results}
        hasSearched={hasSearched}
        handleSearch={handleSearch}
        showFilter={true}
      />

      <div className="h-24" />

      <CardCarousel interval={4000} />

      {/* Pasamos userId para que CardComponent gestione favoritos correctamente */}
      <CardComponent showButton userId={USER_ID} />
    </div>
  );
}
