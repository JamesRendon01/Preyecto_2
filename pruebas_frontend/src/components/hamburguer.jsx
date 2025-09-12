import React, { useState, useEffect, useRef } from "react";
import { Heart } from 'lucide-react';
// 🔹 Subcomponente reutilizable: Icono de hamburguesa y menú
const HamburgerMenu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  // 🔹 Cierra el menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* 🔹 Icono hamburguesa */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        className="flex flex-col justify-between w-8 h-6 focus:outline-none"
      >
        <span
          className={`block h-0.5 bg-black transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-black transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-black transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* 🔹 Menú desplegable */}
      <div
        className={`absolute top-full right-0 mt-3 bg-black/70 shadow-md rounded-xl flex-col min-w-[12rem] transition-all duration-300 w-55 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {links.map(({ href, label, onClick, icon: Icon }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              if (onClick){
                e.preventDefault();
                onClick();
              }
              setIsOpen(false)
            }}
            className="px-4 py-2 hover:bg-white hover:Icon-color-black hover:text-black hover:border-black hover:border-2 hover:rounded-xl text-white text-lg font-medium text-center flex gap-10 font-general"
          >
            {Icon && <Icon size={30} className="color-white hover:color-black" />}
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

// 🔹 Componente principal Navbar
const Hamburguer = ({ rol, links = [] }) => {
  return (
    <nav className="flex justify-end items-center py-6 px-4 text-black relative z-50 bg-nav">
      {/* Si el rol es "config" u otros, reutilizamos el mismo componente HamburgerMenu */}
      <HamburgerMenu links={links} />
    </nav>
  );
};

export default Hamburguer;
