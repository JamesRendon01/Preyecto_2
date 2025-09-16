import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import ButtonDeleteTurista from "../../components/button_delet_turista.jsx";

export default function MenuConfig() {

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
                showTitle={false}
                showProfile={false}
                showNavbar={true}
                showSearch={false}
                showButtonsLogin={false}
                showConfig={true}
            />
            <div className="mt-50">
                <ButtonDeleteTurista />
            </div>
        </div>
    );
}
