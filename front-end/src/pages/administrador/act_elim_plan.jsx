import React, { useEffect, useState } from "react";

export default function Table() {
    const headers = ["Nombre", "Descripción", "Número de días", "Número de noches", "Horario", "Ubicación", "", ""];

    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/plan")
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener los planes");
                return res.json();
            })
            .then((data) => setPlanes(data))
            .catch((err) => console.error(err));
    }, []);

    const handleEdit = (id) => {
        alert(`Editar plan con ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Eliminar plan con ID: ${id}`);
    };

    return (
        <div className="overflow-x-auto p-4 w-screen min-h-screen bg-gradient-to-r from-gray-400 to-white flex flex-col items-center">
            <header className="w-full flex flex-col items-center py-4 relative">
                <div
                    className="w-50 h-30 bg-cover absolute left-10 mt-5"
                    style={{ backgroundImage: "url('/img/avion.gif')" }}
                ></div>

                <div className="w-130 h-20 bg-[#003366] [border-radius:30px] mb-15 mt-15">
                    <h1 className="text-5xl font-bold font-playfair pt-3 text-center text-white">PLANES EXISTENTES</h1>
                </div>

            </header>

            <table className="w-300 bg-white border border-gray-200 rounded-lg">
                {/* Header */}
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map((head, index) => (
                            <th
                                key={index} className="py-2 px-4 text-left border-b font-medium">
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Filas vacías con botones */}
                <tbody>
                    {planes.length > 0 ? (
                        planes.map((plan) => (
                            <tr key={plan.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{plan.nombre}</td>
                                <td className="py-2 px-4 border-b">{plan.descripcion}</td>
                                <td className="py-2 px-4 border-b">{plan.numero_dias}</td>
                                <td className="py-2 px-4 border-b">{plan.numero_noches}</td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(plan.horario).toLocaleString()}
                                </td>
                                <td className="py-2 px-4 border-b">{plan.nombre_ciudad}</td>

                                {/* Botón Editar */}
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleEdit(plan.id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Editar
                                    </button>
                                </td>

                                {/* Botón Eliminar */}
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(plan.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="text-center py-4">
                                No hay planes registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}