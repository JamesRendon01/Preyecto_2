import { useState, useEffect } from "react";
import axios from "axios";
import NavDashAdmin from "../../components/navDashAdmin.jsx";
import Contador from "../../components/contador.jsx";
import CrudTable from "../../components/tablaAdmin.jsx";
import ButtonUpdate from "../../components/button_update.jsx";
import ButtonDelete from "../../components/button_eliminar.jsx";
import SearchBar from "../../components/search.jsx";
import ProgressCircle from "../../components/barraCarga.jsx"; // ✅ Animación de carga
import { message } from "antd";

export default function Reservas() {
  const [totales, setTotales] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(""); // 🔍 Estado para búsqueda
  const pageSize = 5;

  // 🔹 Cargar totales
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/reservas")
      .then((res) => setTotales(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Cargar reservas
  useEffect(() => {
    axios
      .get("http://localhost:8000/reserva/listar_reservas")
      .then((res) => setReservas(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Eliminar reserva
  const handleDeleteReserva = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/reserva/${id}`);
      setReservas((prev) => prev.filter((r) => r.id !== id));
      message.success("Reserva eliminada correctamente");
    } catch (error) {
      console.error(error);
      message.error("Error al eliminar la reserva");
    }
  };

  // 🔍 Filtrado por búsqueda (turista o plan)
  const filteredReservas = reservas.filter((reserva) => {
    const search = query.toLowerCase();
    return (
      reserva.turista_nombre?.toLowerCase().includes(search) ||
      reserva.plan_nombre?.toLowerCase().includes(search)
    );
  });

  // 🟡 Mostrar animación mientras carga
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <ProgressCircle size={80} color="primary" />
        <p className="text-gray-600 text-lg">Cargando información de reservas...</p>
      </div>
    );

  // 🔴 Error si no hay datos
  if (!totales)
    return <p className="text-center text-red-500">Error al cargar los datos</p>;

  // 🧾 Datos para el contador
  const items = [
    { titulo: "Total Reservas", valor: totales.total_reservas },
    { titulo: "Reservas Hoy", valor: totales.reservas_hoy },
    {
      titulo: "Total Ingresos",
      valor: `$${totales.total_ingresos.toLocaleString("es-CO")}`,
    },
  ];

  // 🧱 Encabezados de la tabla
  const headers = [
    { key: "turista_nombre", label: "Turista" },
    { key: "plan_nombre", label: "Plan" },
    {
      key: "fecha_reserva",
      label: "Fecha Reserva",
      render: (val) => new Date(val).toLocaleDateString(),
    },
    { key: "numero_personas", label: "Número de Personas" },
    { key: "disponibilidad", label: "Estado" },
    { key: "costo_final", label: "Total" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64">
        <NavDashAdmin />
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        {/* Navbar superior */}
        <header className="mb-6">
          {/* Encabezado + buscador */}
          <div className="flex items-center mb-4">
            <SearchBar query={query} setQuery={setQuery} />
          </div>
        </header>

        <section>
          {/* Tarjetas con totales */}
          <Contador items={items} />

          <hr className="border-t-2 border-black my-6 w-full" />

          {/* Tabla de reservas */}
          <CrudTable
            headers={headers}
            data={filteredReservas}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={filteredReservas.length}
            onPageChange={setCurrentPage}
            renderActions={(reserva) => (
              <div className="flex justify-center gap-2">
                <ButtonUpdate id={reserva.id} />
                <ButtonDelete
                  label="Eliminar"
                  onConfirm={() => handleDeleteReserva(reserva.id)}
                />
              </div>
            )}
          />
        </section>
      </main>
    </div>
  );
}
