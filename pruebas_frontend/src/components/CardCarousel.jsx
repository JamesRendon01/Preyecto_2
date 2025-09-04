import { useEffect, useState } from "react";

// Componente de carrucel automatico de cards
export default function CardCarousel({ interval = 3000 }) {
  // Estado que guarda todas las cards(Planes)
  const [cards, setCards] = useState([]);
  //Índice que indica cuál card se muestra primero en el carrucel 
  const [index, setIndex] = useState(0);
  // Numero de card visibles a la vez
  const visibleCards = 5;

  //Para recargar los planes desde la API
  useEffect(() => {
    fetch("http://localhost:8000/plan/api/planes")
      .then((res) => res.json())
      .then((data) => setCards(data))//Guardamos los estados en estado
      .catch((err) => console.error("Error cargando planes", err));
  }, []);

  //useEffect para avanzar automaticamente el carrucel cada "interval"
  useEffect(() => {
    if (cards.length === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);// Suma 1 al índice y si llega al final, vuelve al inicio
    }, interval);
    return () => clearInterval(id); // Limpieza del intervalo al desmontar
  }, [interval, cards]);

  // Cantidad de cards visibles (maximo 5 o menos si existen menos planes)
  const visibleCardsCount = Math.min(visibleCards, cards.length);

  // Funcion que calcula cuales card mostrar
  const getVisibleCards = () => {
    if (cards.length <= visibleCardsCount) return cards;
    const end = index + visibleCards;
    if (end <= cards.length) return cards.slice(index, end);//Toma desde el indice hasta el final
    return [...cards.slice(index), ...cards.slice(0, end - cards.length)];//Toma desde index fianl y el resto desde el inicio
  };

  //Lista de cards visibles en este momento
  const visible = getVisibleCards();

  //Determina cual Card esta en el centro (para palicar Zoom)
  const center = Math.floor(visibleCards / 2);

  //Renderiza el Carrucel
  return (
    // Divisor principal
    <div className="bg-fondo w-full py-10 flex justify-center overflow-hidden">
      {/* Divisor donde esta ubicado el Carrucel */}
      <div className="flex gap-10 transition-transform duration-700 ease-in-out">
        {visible.map((card, i) => (
          <div
            key={card.id}
            className={`
              flex-shrink-0 rounded-md shadow-lg p-2
              bg-white
              w-70 h-[350px]
              transform transition-all duration-700 ease-in-out
              text-white text-[18px] opacity-70
              ${i === center ? "scale-120 opacity-100" : "scale-100"}
            `}
          >
            
            {/* Imagen del Plan */}
            <img
              src={`http://localhost:8000${card.imagen}`}
              alt={card.nombre}
              className="w-full h-full object-cover rounded-sm mb-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
