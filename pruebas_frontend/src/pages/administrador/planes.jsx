import axios from "axios";
import { useState, useEffect } from "react";
import NavDashAdmin from "../../components/navDashAdmin.jsx";
import CrudPlanes from "../../components/listar_planes_admin.jsx";
import Contador from "../../components/contador.jsx";
import NavAdmin from "../../components/navAdmin.jsx";

export default function ListarPlanesAdmin() {
  const [totales, setTotales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/total_planes")
      .then((res) => setTotales(res.data))
      .catch((err) => console.error("Error al cargar totales:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (!totales) return <p className="text-center text-red-500">Error al cargar los datos</p>;

  const items = [
    { titulo: "Total Planes", valor: totales.total_planes },
    { titulo: "Planes Hoy", valor: totales.planes_hoy },
  ];

  return (
    <div className="flex min-h-screen">
      {/* 🔹 Barra lateral */}
      <aside className="w-64">
        <NavDashAdmin />
      </aside>

      {/* 🔹 Contenedor principal */}
      <main className="flex-1 p-6">
        {/* 🔸 Navbar superior */}
        <header className="mb-6">
          <NavAdmin />
        </header>

        {/* 🔸 Contenido principal */}
        <section>
          <Contador items={items} />

          {/* Línea divisoria opcional */}
          <hr className="border-t-2 border-black my-6 w-full" />

          <CrudPlanes />
        </section>
      </main>
    </div>
  );
}
