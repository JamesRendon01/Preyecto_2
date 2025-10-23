import { useState, useEffect } from "react";
import axios from "axios";
import NavDashAdmin from "../../components/navDashAdmin.jsx";
import Contador from "../../components/contador.jsx";
import ListarReservas from "../../components/listar_reservas_admin.jsx";
import NavAdmin from "../../components/navAdmin.jsx";

export default function Reservas() {
  const [totales, setTotales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/reservas")
      .then((res) => setTotales(res.data))
      .catch((err) => console.error("Error al cargar totales:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (!totales) return <p className="text-center text-red-500">Error al cargar los datos</p>;

  const items = [
    { titulo: "Total Reservas", valor: totales.total_reservas },
    { titulo: "Reservas Hoy", valor: totales.reservas_hoy },
    { titulo: "Total Ingresos", valor: `$${totales.total_ingresos.toLocaleString("es-CO")}` },
  ];

  return (
    <div className="flex min-h-screen">
      {/* 🔹 Barra lateral izquierda */}
      <aside className="w-64">
        <NavDashAdmin />
      </aside>

      {/* 🔹 Contenido principal */}
      <main className="flex-1 p-6">
        {/* 🔸 Navbar superior */}
        <header className="mb-6">
          <NavAdmin />
        </header>

        {/* 🔸 Contador y reservas */}
        <section>
          <Contador items={items} />

          {/* Línea divisoria (opcional) */}
          <hr className="border-t-2 border-black my-6 w-full" />

          <ListarReservas />
        </section>
      </main>
    </div>
  );
}
