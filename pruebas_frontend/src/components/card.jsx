import React, { useEffect, useState, useRef } from "react";
import { Heart } from "lucide-react"; // Icono de corazón
import { useFavoritosStore } from "../storage/favoritos_storage.js"; // Store para manejar favoritos 
import { useNavigate } from "react-router-dom";

// Componente principal que muestra un conjunto de cards
export default function CardComponent({ showButton, plans = [] }) {
  const { cargarFavoritos } = useFavoritosStore();

  
  useEffect(() => {
    cargarFavoritos();
  }, [cargarFavoritos]);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-0 mb-16">
      {Array.isArray(plans) && plans.length > 0 ? (
        plans.map((plan) => (
          <Card key={plan.id} plan={plan} showButton={showButton} />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

// Componente hijo: representa una card individual
function Card({ plan, showButton }) {
  const [hovered, setHovered] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const tituloRef = useRef(null);
  const { favoritos, toggleFavorito } = useFavoritosStore();
  const navigate = useNavigate();


  const esFavorito = favoritos.some((fav) => fav.id === plan.id);

  useEffect(() => {
    if (tituloRef.current) {
      const el = tituloRef.current;
      setIsOverflow(el.scrollWidth > el.clientWidth);
    }
  }, [plan.nombre]);

  const handleReservar = () => {
    navigate("/reservas", { state: { plan } });
  };

  return (

    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group w-full sm:w-[250px] h-[350px] bg-white text-black font-general text-sm mb-16 p-2 rounded-md opacity-90 transform transition-transform duration-300 hover:scale-110 hover:shadow-[10px_10px_20px_rgba(0,0,0,0.2)] border-black border-2 relative"
    >
      {/* Imagen */}
      <img
        src={`http://localhost:8000/uploads/planes_img/${plan.imagen}`}
        alt={plan.nombre}
        className="w-full h-[180px] object-cover rounded-t-md block"
      />

      {/* Contenido textual */}
      <div className="mt-2">
        <div className="relative overflow-hidden max-w-full">
          <h3
            ref={tituloRef}
            key={hovered ? "hover" : "normal"} // 🔑 reinicia animación al cambiar hover
            className={`
              font-bold font-title text-lg inline-block transition-all duration-500
              ${hovered ? "whitespace-nowrap overflow-hidden" : "whitespace-normal break-words"}
              ${hovered && isOverflow ? "animate-marquee" : ""}
            `}
          >
            {plan.nombre}
          </h3>
        </div>

        <p className="text-black break-words max-h-15 overflow-y-auto">
          {hovered ? plan.descripcion : plan.descripcion_corta}
        </p>
      </div>

      {/* Sección de botones */}
      {showButton && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Botón de reserva */}
          <button
            onClick={handleReservar}
            className="flex bg-nav text-black border-2 border-black font-bold text-sm px-4 py-2 rounded-full"
          >
            Reservar
          </button>

          {/* Botón de favoritos */}
          <button
            onClick={() => toggleFavorito(plan)}
            className={`w-10 h-10 flex items-center justify-center p-0 rounded-full border-2 ${
              esFavorito ? "bg-fondo border-black" : "bg-white border-black"
            }`}
          >

            <Heart
              size={20}
              color="black"
              fill={esFavorito ? "#62b6cb" : "none"}
              strokeWidth={1.5}
            />
          </button>
        </div>
      )}
    </div>
  );
}
