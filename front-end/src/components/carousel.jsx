import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ items = [], autoPlay = true, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const maxIndex = items.length - 1;
  const intervalRef = useRef(null);

  const goTo = (i) => {
    if (i < 0) setIndex(maxIndex);
    else if (i > maxIndex) setIndex(0);
    else setIndex(i);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [autoPlay, interval, maxIndex, items.length]);

  if (!items || items.length === 0) {
    return <p className="text-center py-10">No hay elementos para mostrar</p>;
  }

  return (
    <div className="relative w-full overflow-hidden h-64 md:h-80 lg:h-96">
      {/* Track */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((item, i) => (
          <div key={i} className="min-w-full h-64 md:h-80 lg:h-96">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/50"} cursor-pointer`}
            onClick={() => goTo(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
