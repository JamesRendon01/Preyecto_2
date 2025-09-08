import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";//Icono de corazón
import { useFavoritosStore } from "../storage/favoritos_storage.js";// Store para manejar favoritos 
import { Link } from "react-router-dom";

//Componente principalque muestra un conjunto de cards
export default function CardComponent({ showButton, plans: initialPlans }) {
  //Estado para almacenar los planes
  const [plans, setPlans] = useState(initialPlans || []);
  //Acceso al store de favoritos
  const { favoritos, cargarFavoritos } = useFavoritosStore();

  // Para cargar planes desde el backend solo si no vienen como props
  useEffect(() => {
    if (!initialPlans) {
      fetch("http://localhost:8000/plan/card_planes")
        .then((res) => res.json())
        .then((data) => setPlans(data))// guardamos la data en el estado
        .catch((err) => console.error("Error cargando planes:", err));
    }
  }, [initialPlans]);

  // Para inicializar los favoritos
  useEffect(() => {
    cargarFavoritos();
  }, [cargarFavoritos]);

  //Renderiza o muestra los planes
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-16 mb-16">
      {Array.isArray(plans) && plans.length > 0 ? (
        plans.map((plan) => (
          <Card key={plan.id} plan={plan} showButton={showButton} />
        ))
      ) : (
        <p className="text-center text-gray-700">No hay planes disponibles</p>
      )}
    </div>
  );
}

//Componente hijo: representa una card individual
function Card({ plan, showButton }) {
  const [hovered, setHovered] = useState(false);// Estado para detectar hover
  const { favoritos, toggleFavorito } = useFavoritosStore();// Store para gestionar favoritos

  // Verifica si la card ya está en favoritos
  const esFavorito = favoritos.some((fav) => fav.id === plan.id);

  return (
    // Detecta cuando el mouse entra y sale de la card
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full sm:w-[250px] h-[350px] bg-white text-black text-sm mt mb-16 p-2 rounded-md opacity-90 transform transition-transform duration-300 hover:scale-110 hover:shadow-[10px_10px_20px_rgba(0,0,0,0.2)] border-black border-2 relative"
    >
      {/* Imagen del plan */}
      <img
        src={`http://localhost:8000${plan.imagen}`}
        alt={plan.nombre}
        className="w-full h-[180px] object-cover rounded-t-md block"
      />

      {/* Contenido textual */}
      <div className="mt-2">
        <h3 className="font-bold text-lg">{plan.nombre}</h3>
      {/* Muestra descripcion corta o larga segun el hover*/}
        <p className="text-black">{hovered ? plan.descripcion : plan.descripcion_corta}</p>
      </div>

      {/* Seccion de Botones: solo se rendiriza si showbutton es true*/}
      {showButton && (
        <div className="absolute inset-x-0 bottom-4 flex flex-col items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* boton de reserva */}
          <Link to="/reservas">
          <button className="flex bg-nav mr-20 text-black border-2 border-black font-bold text-sm px-4 py-2 rounded-full mb-2">
            Reservar
          </button>
          </Link>

          {/* Boton de favoritos */}
          <button
            onClick={() => toggleFavorito(plan)} // 👈 ya no pasamos userId
            className={`w-8 h-8 flex ml-30 mt-[-45px] mb-0 items-center justify-center p-0 rounded-full border-2 ${
              esFavorito ? "bg-fondo border-black" : "bg-white border-black"
            }`}
          >
            {/* Icono de corazón(Se llena si es favorito) */}
            <Heart
              size={20}
              color={esFavorito ? "black" : "#62b6cb"}
              fill={esFavorito ? "#62b6cb" : "none"}
              strokeWidth={1.5}
            />
          </button>
        </div>
      )}
    </div>
  );
}
