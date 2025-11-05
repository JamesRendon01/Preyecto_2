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
    showTitleMisReservas = false,
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


    // 🔹 Links para turista
    const linksParaPagina2 = [
        { href: "/inicio", icon: House, label: "Inicio" },
        { href: "/turista/editar/:id", icon: CircleUserRound, label: "Perfil" },
        { href: "/mis_reservas", icon: CalendarCheck, label: "Reservas" },
        { href: "/favoritos", icon: Heart, label: "Favoritos" },
        { href: "/", icon: BellRing, label: "Novedades" },
        { href: "/", icon: LogOut, label: "Cerrar Sesión", onClick: handleLogoutTurista }
    ];

    // 🔹 Scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={` fixed top-0 left-0 w-full h-24 bg-nav z-50 transition-shadow ${scrolled ? "shadow-2" : "shadow-none"}`}>
            <div className="flex gap-x-20">
                <div className="flex mt-0 absolute xl:left-0 sm:left-0 left-0 top-0 sm:top-5 lg:top-2 ">
                    <Header rol="inicio" />
                </div>

                <div>
                    {showButtonsLogin && (
                        <div className=" absolute sm:left-26 sm:top-5 md:left-100 lg:left-160 xl:left-250"><ButtonsLogin /></div>
                    )}

                    {showFilter && <div className=" absolute  sm:left-30 md:left-25 md:top-5 lg:left-40 xl:left-100"><FiltroTabs /></div>}

                    {showTitle && <div className=" absolute sm:top-3 sm:left-40 md:left-25 md:top-6 xl:left-60"><Header titulo="FAVORITOS" /></div>}
                    {showTitleReservas && <div className="ml-100 mt-5   "><Header titulo="RESERVAS" /></div>}
                    {showTitleMisReservas && <div className=" absolute sm:top-3 sm:left-40 md:left-25 md:top-6 xl:left-60"><Header titulo="MIS RESERVAS" /></div>}
                    {showTitleAdmin && <div className=" absolute sm:top-7 sm:left-60 md:left-45 md:top-6 xl:left-70"><Header titulo="ADMINISTRADOR" /></div>}
                    {showTitlePlanesAdmin && <div className=" absolute sm:top-7 sm:left-60 md:left-70 md:top-6 lg:left-80 xl:left-110"><Header titulo="PLANES" /></div>}
                    {showTitleCrearPlanesAdmin && <div className=" absolute sm:top-7 sm:left-40 md:left-60 md:top-6 lg:left-65 xl:left-90"><Header titulo="CREAR PLAN" /></div>}
                    {showTitleUpdatePlanesAdmin && <div className=" absolute sm:top-7 sm:left-30 md:left-46 md:top-6 lg:left-50 xl:left-70"><Header titulo="MODIFICAR PLAN" /></div>}
                </div>

                {showSearch && (
                    <div className="max-h-12 mt-4 absolute sm:top-10 sm:left-30 md:left-100 md:top-3 lg:left-150 xl:left-240">
                        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
                        <SearchResults results={results} hasSearched={hasSearched} />
                    </div>
                )}

                {showConfig && (
                    <div className=" absolute sm:left-50 sm:top-7 md:left-75 lg:left-85 xl:ml-30 xl:top-5">
                        <Header titulo="PERFIL" />
                    </div>
                )}

                {showNavbar && (
                    <div className="absolute sm:left-100 md:left-170 md:top-3 lg:left-230 xl:left-345">
                        <Hamburguer rol="turista" links={linksParaPagina2} rolt="turista" />
                    </div>
                )}

            </div>
        </div>
    );
}
