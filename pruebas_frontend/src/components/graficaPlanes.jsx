// src/components/GraficaPlanes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GraficaPlanes() {
  const [data, setData] = useState([]);

  // 🔹 Función para convertir "YYYY-MM" a "Enero 2025"
  const formatearMes = (valor) => {
    const [anio, mes] = valor.split("-");
    const nombresMeses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const nombreMes = nombresMeses[parseInt(mes) - 1];
    return `${nombreMes} ${anio}`;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/plan/estadisticas")
      .then((res) => {
        // 🔹 Transformar el mes al nombre antes de guardarlo
        const datosFormateados = res.data.data.map((item) => ({
          ...item,
          mes: formatearMes(item.mes),
        }));
        setData(datosFormateados);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  return (
    <div className="bg-white shadow-lg p-4 rounded-2xl w-full h-96">
      <h2 className="text-3xl font-bold mb-4 text-black text-center">Actividad</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_planes" fill="#16a34a" name="Planes creados" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
