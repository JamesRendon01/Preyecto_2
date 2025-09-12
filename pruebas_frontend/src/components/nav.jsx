import { useState, useEffect } from "react";
import Header from "./header.jsx";
import SearchBar from "./search.jsx";
import SearchResults from "./search_result.jsx";
import FiltroTabs from "./filter.jsx";
import Hamburguer from "./hamburguer.jsx";
import ButtonsLogin from "./buttons_login.jsx";
import { useNavigate } from "react-router-dom";
import { Heart, CircleUserRound, House, CalendarCheck, BellRing, UserRoundCog, LogOut, PhoneCall } from 'lucide-react';

export default function Nav({
    query,
    setQuery,
    results,
    hasSearched,
    handleSearch,
    showFilter = true,
    showTitle = false,  // 👈 nuevo
    showNavbar = false,     // 👈 nuevo
    showSearch = true,
    showButtonsLogin = false,
    showConfig = false,
    showTitleReservas = false,
    showTitleAdmin = false,
    showNavbarAdmin = false 
}) {

    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const handleLogoutTurista = () => {
        localStorage.removeItem("token"); // Borra token
        navigate("/"); // Redirige al login
    };

    const handleLogoutAdmin = () => {
        localStorage.removeItem("token_admin"); // Borra token
        navigate("/"); // Redirige al login
    };

    const linksParaPagina2 = [
        { href: "/inicio", icon: House, label: "Inicio" },
        { href: "/", icon: CircleUserRound, label: "Perfil" },
        { href: "/", icon: CalendarCheck, label: "Reservas" },
        { href: "/favoritos", icon: Heart, label: "Favoritos" },
        { href: "/", icon: BellRing, label: "Novedades" },
        { href: "/", icon: PhoneCall, label: "Contáctanos" },
        { href: "/", icon: LogOut, label: "Cerrar Sesión", onClick: handleLogoutTurista }
    ];

    const linksParaAdmin = [
        { href: "/inicio", icon: House, label: "Inicio" },
        { href: "/", icon: CircleUserRound, label: "Perfil" },
        { href: "/", icon: LogOut, label: "Cerrar Sesión", onClick: handleLogoutAdmin }
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
                    <Header rol="inicio" />
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
                    <div className="mr-30">
                        {showTitleReservas && (
                            <Header rol="inicio" titulo="RESERVAS" />
                        )}
                    </div>
                    <div className="mr-70 mt-2">
                        {showTitleAdmin && (
                            <Header rol="inicio" titulo="ADMINISTRADOR" />
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
                        <Header titulo="PERFIL" />
                        <Hamburguer className="w-300" />
                    </div>
                )}

                {showNavbar && (
                    <div>
                        <Hamburguer links={linksParaPagina2} />
                    </div>
                )}

                {showNavbarAdmin && (
                    <div className="mr-50 mt-3">
                        <Hamburguer links={linksParaAdmin} />
                    </div>
                )}

            </div>
        </div>
    );
}
