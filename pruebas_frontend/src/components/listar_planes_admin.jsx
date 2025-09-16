import React, { useEffect, useState } from "react";
import ButtonDelete from "./button_eliminar";
import ButtonUpdate from "./button_update";
import { useBreadcrumb } from "../context/breadcrumb_context";
import ButtonCreatePlan from "./button_create_plan";

export default function CrudPlanes() {
    const headers = ["ID", "Nombre", "Descripción Corta", "Descripción Larga", "Precio", "Ciudad", "Ubicación"];

    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        fetch("http://192.168.20.62:8000/plan/listar-planes")
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

    return (
        <div className="overflow-x-auto p-4 w-screen bg-fondo flex justify-center">
            <table className="w-300 bg-white border-2 border-black rounded-lg text-center font-general">
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
                    {planes.length > 0 ? (
                        planes.map((plan) => (
                            <tr key={plan.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{plan.id}</td>
                                <td className="py-2 px-4 border-b">{plan.nombre}</td>
                                <td className="py-2 px-4 border-b">{plan.descripcion_corta}</td>
                                <td className="py-2 px-4 border-b">{plan.descripcion}</td>
                                <td className="py-2 px-4 border-b">{plan.costo_persona}</td>
                                <td className="py-2 px-4 border-b">{plan.id_ciudad}</td>
                                <td className="py-2 px-4 border-b">{plan.ubicaciones?.join(", ")}</td>
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
        </div>
    );
}
