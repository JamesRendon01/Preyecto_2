import { useState, useEffect } from "react";
import axios from "axios";
import NavDashAdmin from "../../components/navDashAdmin";
import Contador from "../../components/contador.jsx";
import CrudTable from "../../components/tablaAdmin.jsx";
import ButtonDelete from "../../components/button_eliminar.jsx";
import ButtonUpdate from "../../components/button_update.jsx";
import ProgressCircle from "../../components/barraCarga.jsx";
import { message } from "antd";

export default function Turistas() {
  const [totales, setTotales] = useState(null);
  const [turistas, setTuristas] = useState([]);
  const [filteredTuristas, setFilteredTuristas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const headers = [
    { key: "nombre", label: "Nombre" },
    { key: "correo", label: "Correo" },
    { key: "tipo_identificacion", label: "Tipo ID" },
    { key: "identificacion", label: "Identificación" },
    { key: "celular", label: "Celular" },
    { key: "direccion", label: "Dirección" },
    { key: "ciudad", label: "Ciudad" },
  ];

  // Cargar totales
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/dashboardListarTuristas")
      .then((res) => setTotales(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Cargar turistas
  useEffect(() => {
    axios
      .get("http://localhost:8000/turista/TotalTuristas")
      .then((res) => {
        setTuristas(res.data);
        setFilteredTuristas(res.data);
      })
      .catch((err) => console.error("Error al cargar turistas:", err));
  }, []);

  const handleDeleteTurista = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/turista/delet/${id}`);
      setTuristas(turistas.filter((t) => t.id !== id));
      message.success("Turista eliminado correctamente");
    } catch (err) {
      console.error(err);
      message.error("Error al eliminar el turista");
    }
  };

  // 🟡 Mostrar animación de carga mientras se obtienen datos
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <ProgressCircle size={80} color="primary" />
        <p className="text-gray-600 text-lg">Cargando información de turistas...</p>
      </div>
    );

  if (!totales)
    return <p className="text-center text-red-500">Error al cargar los datos</p>;

  const items = [
    { titulo: "Total Turistas", valor: totales.total_turistas },
    { titulo: "Turistas hoy", valor: totales.registrados_hoy },
  ];

  return (
    <div className="flex">
      <aside className="w-64">
        <NavDashAdmin />
      </aside>
      <main className="flex-1 p-6">
        <header className="mb-6">
        </header>

        <section>
          <Contador items={items} />
          <hr className="border-t-2 border-black my-6 w-full" />

          <CrudTable
            headers={headers}
            data={filteredTuristas}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={filteredTuristas.length}
            onPageChange={setCurrentPage}
            renderActions={(turista) => (
              <div className="flex justify-center gap-2">
                <ButtonUpdate id={turista.id} />
                <ButtonDelete
                  label="Eliminar Turista"
                  onConfirm={() => handleDeleteTurista(turista.id)}
                />
              </div>
            )}
          />
        </section>
      </main>
    </div>
  );
}
