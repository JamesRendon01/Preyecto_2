import { useEffect, useState } from "react";

const cards = [
  { title: "Destino 1", image: "/img/img_prueba.jpeg" },
  { title: "Destino 1", image: "/img/img_prueba.jpeg" },
  { title: "Destino 1", image: "/img/img_prueba.jpeg" },
  { title: "Destino 1", image: "/img/img_prueba.jpeg" },
  { title: "Destino 1", image: "/img/img_prueba.jpeg" },
  { title: "Destino 1", image: "/img/img_prueba.jpeg" },
  { title: "Destino 1", image: "/img/avion.gif  " },
];

export default function CardCarousel({ interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const visibleCards = 5;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  const getVisibleCards = () => {
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
            key={i}
            className={`carousel-card ${i === center ? "active" : ""}`}
          >
            <img src={card.image} alt={card.title} className="carousel-image" />
            <h3 className="carousel-title">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
