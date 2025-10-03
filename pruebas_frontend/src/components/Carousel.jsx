import { useEffect, useState } from "react";
import { Carousel } from "antd";

export default function PlanesCarousel() {
  const [planes, setPlanes] = useState([]);

  // Cargar planes desde la API
  useEffect(() => {
    fetch("http://localhost:8000/plan/api/planes")
      .then((res) => res.json())
      .then((data) => setPlanes(data))
      .catch((err) => console.error("Error cargando planes", err));
  }, []);

  return (
    <div className=" h-12|0 w-full py-10 pl-10 pr-10">
      <Carousel autoplay autoplaySpeed={5000}>
        {planes.map((plan) => (
          <div key={plan.id} className="flex justify-center items-center">
            <div className=" w-full h-120 rounded-lg shadow-lg overflow-hidden relative">
              {/* Imagen */}
              <img
                src={`http://localhost:8000/uploads/planes_img/${plan.imagen}`}
                alt={plan.nombre}
                className="w-full h-full object-cover"
              />

              {/* Overlay con título */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <h2 className="text-xl font-bold">{plan.nombre}</h2>
                <p className="text-sm">{plan.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
