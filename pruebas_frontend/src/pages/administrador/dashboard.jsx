import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import CardCarousel from "../../components/CardCarousel.jsx";
import CardComponent from "../../components/card.jsx";

export default function DashbordAdmin() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        const filtered = favoritos.filter((item) =>
            item.nombre.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setHasSearched(true);
    };
    return (
        <div>
            <Nav
                query={query}
                setQuery={setQuery}
                results={results}
                hasSearched={hasSearched}
                handleSearch={handleSearch}
                showFilter={false} 
                showTitleAdmin={true}
                showNavbarAdmin = {true}
                showSearch={false}
            />
            <div>

            </div>
        </div>
    );
}
