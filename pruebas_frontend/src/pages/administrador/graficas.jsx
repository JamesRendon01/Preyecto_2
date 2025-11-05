import { useEffect, useState } from "react";
import axios from "axios";
import NavDashAdmin from "../../components/navDashAdmin.jsx";
import GraficasGenerico from "../../components/graficasGenerico.jsx";
import Contador from "../../components/contador.jsx";
import BarraCarga from "../../components/barraCarga.jsx";

// 🔹 Formatear mes "YYYY-MM" → "Ene 2025"
const formatearMes = (valor) => {
  const [anio, mes] = valor.split("-");
  const nombresMeses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];
  const nombreMes = nombresMeses[parseInt(mes) - 1];
  return `${nombreMes} ${anio}`;
};

export default function Estadisticas() {
  const [totales, setTotales] = useState(null);
  const [dataPlanes, setDataPlanes] = useState([]);
  const [dataCiudades, setDataCiudades] = useState([]);
  const [dataReservasMes, setDataReservasMes] = useState([]); // 📅 Nuevo estado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/dashboard/totales"),
      axios.get("http://localhost:8000/graficas/estadisticas"),
      axios.get("http://localhost:8000/graficas/ciudades_mas_reservas"),
      axios.get("http://localhost:8000/graficas/reservas_por_mes"), // 👈 Nuevo endpoint
    ])
      .then(([resTotales, resPlanes, resCiudades, resReservasMes]) => {
        setTotales(resTotales.data);

        // 🧱 Planes por mes
        const datosPlanes = resPlanes.data.data.map((item) => ({
          ...item,
          mes: formatearMes(item.mes),
        }));
        setDataPlanes(datosPlanes);

        // 🏙️ Ciudades con más reservas
        const datosCiudades = resCiudades.data.data.map((item) => ({
          ciudad: item.ciudad,
          total_reservas: item.total_reservas,
        }));
        setDataCiudades(datosCiudades);

        // 📅 Reservas por mes
        const datosReservasMes = resReservasMes.data.data.map((item) => ({
          mes: formatearMes(item.mes),
          total_reservas: item.total_reservas,
        }));
        setDataReservasMes(datosReservasMes);
      })
      .catch((err) => console.error("Error al cargar datos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <BarraCarga size={80} color="primary" />
        <p className="text-gray-700 text-lg font-semibold">
          Cargando información del dashboard...
        </p>
      </div>
    );

  if (!totales)
    return (
      <p className="text-center text-red-500">
        Error al cargar los datos del dashboard
      </p>
    );

  const items = [
    { titulo: "Total Reservas", valor: totales.total_reservas },
    { titulo: "Total Turistas", valor: totales.total_turistas },
    { titulo: "Total Planes", valor: totales.total_planes },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64">
        <NavDashAdmin />
      </aside>

      <main className="flex-1 p-6">
        <section>
          <Contador items={items} />
          <hr className="border-t-2 border-black my-6 w-full" />

          {/* 📊 Planes creados por mes */}
          <GraficasGenerico
            data={dataPlanes}
            campoEjeX="mes"
            campoValor="total_planes"
            titulo="Planes creados por mes"
            tipo="barras"
            onGenerarInforme={() => generarInforme("barras")}
          />

          <hr className="border-t-2 border-black my-6 w-full" />

          {/* 📅 Reservas por mes */}
          <GraficasGenerico
            data={dataReservasMes}
            campoEjeX="mes"
            campoValor="total_reservas"
            titulo="Reservas por mes"
            tipo="lineas"
            onGenerarInforme={() => generarInforme("lineas")}
          />

          <hr className="border-t-2 border-black my-6 w-full" />

          {/* 🥧 Ciudades con más reservas */}
          <GraficasGenerico
            data={dataCiudades}
            campoEjeX="ciudad"
            campoValor="total_reservas"
            titulo="Ciudades con más reservas"
            tipo="pastel"
            onGenerarInforme={() => generarInforme("pastel")}
          />
        </section>
      </main>
    </div>
  );
}
