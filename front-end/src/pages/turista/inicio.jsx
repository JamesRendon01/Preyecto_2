// pages/HomePage.jsx
import { useState, useEffect } from "react";
import CardCarousel from "../../components/CardCarousel.jsx";
import Header from "../../components/header.jsx";
import SearchBar from "../../components/search.jsx";
import SearchResults from "../../components/search_result.jsx";
import FiltroTabs from "../../components/filter.jsx";
import CardComponent from "../../components/card.jsx";
import Profile from "../../components/profile.jsx";
import { Button } from "antd";

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
  const [scrolled, setScrolled] = useState(false);

  // Lista de ejemplo 
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

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // cambia a true si baja más de 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="inicio">
      <div className={`title ${scrolled ? "scrolled" : ""}`}>
        <Header rol="inicio" />

        <div className="search-filter-container">
          <div className="filtro-inicio">
            <FiltroTabs />
            <Profile />
          </div>


          <div className="searchbar-wrapper">
            <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
            <SearchResults results={results} hasSearched={hasSearched} />
          </div>
        </div>
      </div>

      {/* Para que no tape el contenido */}
      <div className="spacer" />

      <CardCarousel interval={4000} />

      <div className="card-init">
          <CardComponent showButton />
          
      </div>
    </div>
  );
}
