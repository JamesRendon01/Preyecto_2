import React, { useEffect, useState } from "react";
import ButtonDelete from "./button_eliminar";
import ButtonUpdate from "./button_update";
import ButtonCreatePlan from "./button_create_plan";
import { useBreadcrumb } from "../context/breadcrumb_context";
import Paginacion from "./paginacion"; // 👈 Importamos el componente de paginación

export default function CrudPlanes() {
  const headers = [
    "Nombre",
    "Descripción Corta",
    "Descripción Larga",
    "Precio",
    "Ciudad",
    "Ubicación",
  ];

  const [planes, setPlanes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 👈 Página actual
  const pageSize = 5; // 👈 Mostramos 5 planes por página

  useEffect(() => {
    fetch("http://localhost:8000/plan/listar-planes")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los planes");
        return res.json();
      })
      .then((data) => setPlanes(data))
      .catch((err) => console.error(err));
  }, []);

  const { addBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    addBreadcrumb({ title: "Listar Planes", path: "/listar_planes_admin" });
  }, []);

  // 👇 Lógica de paginación
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const planesPaginados = planes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-10 bg-fondo flex flex-col items-center">
      <table className="w-300 bg-white border-2 border-black rounded-lg text-center">
        {/* Header */}
        <thead className="bg-gray-100 font-title">
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="py-2 px-4 text-center border-b border-gray-800 font-medium"
              >
                {head}
              </th>
            ))}
            <th colSpan={2}>
              <ButtonCreatePlan />
            </th>
          </tr>
        </thead>

        {/* Filas con datos */}
        <tbody>
          {planesPaginados.length > 0 ? (
            planesPaginados.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{plan.nombre}</td>
                <td className="py-2 px-4 border-b">{plan.descripcion_corta}</td>
                <td className="py-2 px-4 border-b">{plan.descripcion}</td>
                <td className="py-2 px-4 border-b">{plan.costo_persona}</td>
                <td className="py-2 px-4 border-b">{plan.id_ciudad}</td>
                <td className="py-2 px-4 border-b">
                  {plan.ubicaciones?.join(", ")}
                </td>
                <td className="py-2 px-4 border-b">
                  <ButtonUpdate id={plan.id} />
                </td>
                <td className="py-2 px-4 border-b">
                  <ButtonDelete
                    planId={plan.id}
                    onDeleted={(id) =>
                      setPlanes(planes.filter((p) => p.id !== id))
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 2} className="text-center py-4">
                No hay planes registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔹 Componente de paginación */}
      <div className="mt-5">
        <Paginacion
          current={currentPage}
          total={planes.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
