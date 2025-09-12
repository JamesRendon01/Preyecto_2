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
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token en localStorage");
          return;
        }

        const res = await fetch("http://localhost:8000/turista/mis-datos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          console.error("Token inválido o no proporcionado");
          return;
        }

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
        console.error("Fetch error:", err);
      }
    };

    fetchTurista();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurista((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-125 h-auto bg-nav border-4 border-black p-6 rounded-lg text-black sm:w-90 sm:ml-10 sm:mb-10 md:ml-10 md:mt-30 lg:ml-10 lg:mt-40 xl:ml-30 xl:w-120 xl:mt-50">
      <form className="flex flex-col lg:text-xl xl:text-2xl xl:ml-5">
        <label className="mt-4 lg:mt-0">Correo:</label>
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

        <label className="mt-4">Tipo de identificación:</label>
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
          type="button" // Cambié a button para evitar que recargue la página
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
