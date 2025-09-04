import { useEffect, useState } from "react";

export default function CardCarousel({ interval = 3000 }) {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const visibleCards = 5;

  useEffect(() => {
    fetch("http://localhost:8000/plan/api/planes")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Error cargando planes", err));
  }, []);

  useEffect(() => {
    if (cards.length === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, cards]);

  const visibleCardsCount = Math.min(visibleCards, cards.length);

  const getVisibleCards = () => {
    if (cards.length <= visibleCardsCount) return cards;
    const end = index + visibleCards;
    if (end <= cards.length) return cards.slice(index, end);
    return [...cards.slice(index), ...cards.slice(0, end - cards.length)];
  };

  const visible = getVisibleCards();
  const center = Math.floor(visibleCards / 2);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {visible.map((card, i) => (
          <div
            key={card.id}
            className={`carousel-card ${i === center ? "active" : ""}`}
          >
            <img
              src={`http://localhost:8000${card.imagen}`}
              alt={card.nombre}
              className="carousel-image" />
            <h3 className="carousel-title">{card.nombre}</h3>
            <p>{card.descripcion_corta}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
}
