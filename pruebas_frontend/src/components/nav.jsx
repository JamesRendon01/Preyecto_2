import { useState, useEffect } from "react";
import Header from "./header.jsx";
import SearchBar from "./search.jsx";
import SearchResults from "./search_result.jsx";
import FiltroTabs from "./filter.jsx";
import Hamburguer from "./hamburguer.jsx";
import ButtonsLogin from "./buttons_login.jsx";
import { useNavigate } from "react-router-dom";
import { Heart, CircleUserRound, House, CalendarCheck, BellRing, LogOut, PhoneCall } from 'lucide-react';

export default function Nav({
    query,
    setQuery,
    results,
    hasSearched,
    handleSearch,
    showFilter = true,
    showTitle = false,  
    showNavbar = false,     
    showSearch = true,
    showButtonsLogin = false,
    showConfig = false,
    showTitleReservas = false,
    showTitleAdmin = false,
    showNavbarAdmin = false,
    showTitlePlanesAdmin = false,
    showTitleCrearPlanesAdmin = false,
    showTitleUpdatePlanesAdmin = false
}) {

    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // 🔹 Funciones de logout
    const handleLogoutTurista = () => {
        localStorage.removeItem("token"); 
        navigate("/"); 
    };

    const handleLogoutAdmin = () => {
        localStorage.removeItem("token_admin"); 
        navigate("/admin"); 
    };

    // 🔹 Links para turista
    const linksParaPagina2 = [
        { href: "/inicio", icon: House, label: "Inicio" },
        { href: "/menu_config", icon: CircleUserRound, label: "Perfil" },
        { href: "/", icon: CalendarCheck, label: "Reservas" },
        { href: "/favoritos", icon: Heart, label: "Favoritos" },
        { href: "/", icon: BellRing, label: "Novedades" },
        { href: "/", icon: PhoneCall, label: "Contáctanos" },
        { href: "/", icon: LogOut, label: "Cerrar Sesión", onClick: handleLogoutTurista }
    ];

    // 🔹 Links para administrador
    const linksParaAdmin = [
        { href: "/dashboard-administrador", icon: House, label: "Inicio" },
        { href: "/", icon: CircleUserRound, label: "Perfil" },
        { href: "/", icon: LogOut, label: "Cerrar Sesión", onClick: handleLogoutAdmin }
    ];

    // 🔹 Scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={` fixed top-0 left-0 w-full h-24 bg-nav z-50 transition-shadow ${scrolled ? "shadow-2" : "shadow-none"}`}>
            <div className="flex justify-center gap-x-20 ml-30">
                <div className="flex mt-0 ml-30">
                    <Header rol="inicio" />
                </div>

                <div>
                    {showButtonsLogin && (
                        <div><ButtonsLogin /></div>
                    )}

                    {showFilter && <FiltroTabs />}

                    {showTitle && <div className="mr-30"><Header rol="inicio" titulo="FAVORITOS" /></div>}
                    {showTitleReservas && <div className="mr-30"><Header rol="inicio" titulo="RESERVAS" /></div>}
                    {showTitleAdmin && <div className="mr-70 mt-2"><Header rol="inicio" titulo="ADMINISTRADOR" /></div>}
                    {showTitlePlanesAdmin && <div className="ml-80 mr-110 mt-2"><Header rol="inicio" titulo="PLANES" /></div>}
                    {showTitleCrearPlanesAdmin && <div className="ml-50 mr-90 mt-2"><Header rol="inicio" titulo="CREAR PLAN" /></div>}
                    {showTitleUpdatePlanesAdmin && <div className="ml-40 mr-60 mt-2"><Header rol="inicio" titulo="MODIFICAR PLAN" /></div>}
                </div>

                {showSearch && (
                    <div className="max-h-12 mt-4">
                        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
                        <SearchResults results={results} hasSearched={hasSearched} />
                    </div>
                )}

                {showConfig && (
                    <div className="flex gap-100">
                        <Header titulo="PERFIL" />
                        <Hamburguer rol="turista" className="w-300" links={linksParaPagina2} />
                    </div>
                )}

                {showNavbar && (
                    <div>
                        <Hamburguer rol="turista" links={linksParaPagina2} />
                    </div>
                )}

                {showNavbarAdmin && (
                    <div className="mr-10 mt-3">
                        <Hamburguer rol="admin" links={linksParaAdmin} />
                    </div>
                )}

            </div>
        </div>
    );
}
