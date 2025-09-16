import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import ActualizarTurista from "../../components/config_perfil.jsx";

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
            <div className="flex mt-30 gap-10 items-center justify-center">
            
                <div>
                    <ActualizarTurista />
                </div>
                
            </div>

        </div>
    );
}
