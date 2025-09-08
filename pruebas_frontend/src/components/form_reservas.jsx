import { useState, useEffect } from "react";

export default function FormReservas() {
  const [turista, setTurista] = useState({
    correo: "",
    nombre: "",
    tipo_identificacion: "",
    identificacion: "",
    celular: "",
  });

  useEffect(() => {
    const fetchTurista = async () => {
      try {
        const idTurista = localStorage.getItem("id_turista");
        if (!idTurista) return;

        const res = await fetch(`http://localhost:8000/turista/${idTurista}`);
        if (!res.ok) throw new Error("Error al obtener los datos del turista");

        const data = await res.json();
        setTurista({
          correo: data.correo || "",
          nombre: data.nombre || "",
          tipo_identificacion: data.tipo_identificacion || "",
          identificacion: data.identificacion || "",
          celular: data.celular || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchTurista();
  }, []);

  const handleChange = (e) => {
    setTurista({
      ...turista,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-125 h-auto bg-nav border-4 border-black p-6 rounded-lg text-black sm:w-100 sm:ml-10 md:ml-50 lg:ml-80 xl:ml-130 xl:w-120">
      <form className="flex flex-col">
        <label className="mt-4">Correo:</label>
        <input
          type="email"
          name="correo"
          value={turista.correo}
          onChange={handleChange}
          className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
        />

        <label className="mt-4">Nombre Completo:</label>
        <input
          type="text"
          name="nombre"
          value={turista.nombre}
          onChange={handleChange}
          required
          className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
        />

        <label className="mt-4">Tipo de identificación</label>
        <select
          name="tipo_identificacion"
          value={turista.tipo_identificacion}
          onChange={handleChange}
          required
          className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
        >
          <option value="">Seleccione un tipo de documento</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="PP">Pasaporte</option>
          <option value="PPT">Permiso por Protección Temporal</option>
        </select>

        <label className="mt-4">Identificación:</label>
        <input
          type="number"
          name="identificacion"
          value={turista.identificacion}
          onChange={handleChange}
          required
          className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
        />

        <label className="mt-4">Número de celular:</label>
        <input
          type="number"
          name="celular"
          value={turista.celular}
          onChange={handleChange}
          required
          className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
        />

        <button
          type="submit"
          className="bg-fondo text-black font-bold px-4 py-2 rounded-md mt-4 hover:bg-white"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-fondo text-black font-bold px-4 py-2 rounded-md mt-4 hover:bg-white"
        >
          Reservar
        </button>
      </form>
    </div>
  );
}
