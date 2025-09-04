import { useState, useEffect } from "react";
import Header from "../../components/header.jsx";
import SearchBar from "../../components/search.jsx";
import SearchResults from "../../components/search_result.jsx";
import CardComponent from "../../components/card.jsx";
import Profile from "../../components/profile.jsx";

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
                <div className="title-favoritos">
                    <Header rol="inicio" titulo="FAVORITOS" />
                </div>

                <div className="search-filter-container">
                    <div className="filtro-inicio">
                        <Profile />
                    </div>


                    <div className="searchbar-wrapper">
                        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
                        <SearchResults results={results} hasSearched={hasSearched} />
                    </div>
                </div>
            </div>


            <div className="card-init">
                <CardComponent />
            </div>
        </div>
    );
}
