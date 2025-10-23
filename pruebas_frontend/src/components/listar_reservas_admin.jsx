import React, { useEffect, useState } from "react";
import ButtonDelete from "./button_eliminar";
import ButtonUpdate from "./button_update";
import { useBreadcrumb } from "../context/breadcrumb_context";
import Paginacion from "./paginacion"; // 👈 Importamos la paginación

export default function ListarReservas() {
  const headers = [
    "Turista",
    "Plan",
    "Fecha Reserva",
    "Número de Personas",
    "Estado",
    "Total",
  ];

  const [reservas, setReservas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 👈 Página actual
  const pageSize = 5; // 👈 Mostramos 5 reservas por página

  // 🔹 Cargar reservas desde el backend
  useEffect(() => {
    fetch("http://localhost:8000/reserva/listar_reservas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener las reservas");
        return res.json();
      })
      .then((data) => setReservas(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Breadcrumb
  const { addBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    addBreadcrumb({ title: "Listar Reservas", path: "/listar_reservas_admin" });
  }, []);

  // 🔹 Lógica de paginación
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const reservasPaginadas = reservas.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-10 items-center bg-fondo flex flex-col">
      <table className="w-300 bg-white border-2 border-black rounded-lg text-center">
        {/* Header */}
        <thead className="bg-gray-100">
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="py-2 px-4 text-center border-b border-gray-800 font-medium"
              >
                {head}
              </th>
            ))}
            <th colSpan={2}></th>
          </tr>
        </thead>

        {/* Filas con datos */}
        <tbody>
          {reservasPaginadas.length > 0 ? (
            reservasPaginadas.map((reserva) => (
              <tr key={reserva.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{reserva.turista_nombre}</td>
                <td className="py-2 px-4 border-b">{reserva.plan_nombre}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(reserva.fecha_reserva).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {reserva.numero_personas}
                </td>
                <td className="py-2 px-4 border-b">{reserva.disponibilidad}</td>
                <td className="py-2 px-4 border-b">{reserva.costo_final}</td>

                {/* Botones de acción */}
                <td className="py-2 px-4 border-b">
                  <ButtonUpdate id={reserva.id} />
                </td>
                <td className="py-2 px-4 border-b">
                  <ButtonDelete
                    reservaId={reserva.id}
                    onDeleted={(id) =>
                      setReservas(reservas.filter((r) => r.id !== id))
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 2} className="text-center py-4">
                No hay reservas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔹 Paginación debajo de la tabla */}
      <div className="mt-5">
      <Paginacion
        current={currentPage}
        total={reservas.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
      </div>
    </div>
  );
}
