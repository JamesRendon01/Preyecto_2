import { useEffect, useState } from "react";
import axios from "axios";
import NavDashAdmin from "../../components/navDashAdmin.jsx";
import GraficaPlanes from "../../components/graficaPlanes.jsx";
import Contador from "../../components/contador.jsx";
import NavAdmin from "../../components/navAdmin.jsx";

export default function DashbordAdmin() {
    const [totales, setTotales] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/dashboard/totales")
            .then((res) => setTotales(res.data))
            .catch((err) => console.error("Error al cargar totales:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center">Cargando...</p>;
    if (!totales) return <p className="text-center text-red-500">Error al cargar los datos</p>;

    // 🔹 Aquí defines qué quieres mostrar y cómo
    const items = [
        { titulo: "Total Reservas", valor: totales.total_reservas },
        { titulo: "Total Turista", valor: totales.total_turistas },
        { titulo: "Total Planes", valor: totales.total_planes },
    ];


    return (
        <div className="flex min-h-screen">
      {/* Barra lateral con ancho fijo */}
      <aside className="w-64">
        <NavDashAdmin />
      </aside>

      {/* Zona principal (incluye NavAdmin en la parte superior) */}
      <main className="flex-1 p-6">
        {/* Nav superior (puede ser un header pequeño) */}
        <header className="mb-6">
          <NavAdmin />
        </header>

        {/* Contenido */}
        <section>
          <Contador items={items} />

          {/* Línea divisoria — ahora sí ocupa todo el ancho del section */}
          <hr className="border-t-2 border-black my-6 w-full" />

          <GraficaPlanes />
        </section>
      </main>
    </div>
    );
}
