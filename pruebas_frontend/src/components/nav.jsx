import { useState, useEffect } from "react";
import Header from "./header.jsx";
import SearchBar from "./search.jsx";
import SearchResults from "./search_result.jsx";
import FiltroTabs from "./filter.jsx";
import Navbar from "./navbar.jsx";
import ButtonsLogin from "./buttons_login.jsx";
import { useNavigate } from "react-router-dom";

export default function Nav({
    query,
    setQuery,
    results,
    hasSearched,
    handleSearch,
    showFilter = true,
    showTitle = false,  // 👈 nuevo
    showNavbar = true,     // 👈 nuevo
    showSearch = true,
    showButtonsLogin = false,
    showConfig = false
}) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const linksParaPagina2 = [
        { href: "/inicio", label: "Inicio" },
        { href: "/favoritos", label: "Favoritos" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={` fixed top-0 left-0 w-full h-24 bg-nav z-50 transition-shadow ${scrolled ? "shadow-2" : "shadow-none"
                }`}
        >
            <div className="flex justify-center gap-x-20 ml-30">
                <div className="flex mt-0 ml-30">
                    <Header rol="inicio" titulo="" />
                </div>
                <div>

                    {showButtonsLogin && (   // 👈 solo se renderiza si es true
                        <div>
                            <ButtonsLogin />
                        </div>
                    )}

                    {showFilter && (
                        <FiltroTabs />
                    )}
                    <div className="mr-30">
                        {showTitle && (
                            <Header rol="inicio" titulo="FAVORITOS" />
                        )}
                    </div>
                </div>
                {showSearch && (
                    <div className="max-h-12 mt-4">
                        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
                        <SearchResults results={results} hasSearched={hasSearched} />
                    </div>
                )}

                {showConfig && (   // 👈 solo se renderiza si es true
                    <div className="flex gap-100">
                        <Header titulo="PERFIL"/>
                        <Navbar className="w-300"/>
                    </div>
                )}

                {showNavbar && (   // 👈 solo se renderiza si es true
                    <div>
                        <Navbar links={linksParaPagina2} />
                    </div>
                )}

            </div>
        </div>
    );
}
