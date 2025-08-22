// Registro.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Registro() {
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    fecha_nacimiento: "",
    identificacion: "",
    contrasena: "",
    confirmar_contrasena: "",
    ciudad_residencia: "",
    celular: "",
    direccion: "",
  });

  const [error, setError] = useState("");

  // Manejar cambios de inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.contrasena !== formData.confirmar_contrasena) {
      setError("Las contraseñas no coinciden ❌");
      return;
    }
    delete formData.confirmar_contrasena; // Eliminar campo de confirmación antes de enviar

    try {
      const res = await fetch("http://localhost:8000/turista/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Registro exitoso ✅");
        window.location.href = "/turista"; // Redirige al login
      } else {
        setError(result.detail || "No se pudo registrar");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar al servidor ❌");
    }
  };

  return (
    <div className="w-screen h-300   bg-gradient-to-r from-gray-400 to-white flex flex-col">
      {/* Header */}
      <header className="w-full flex flex-col items-center py-4 relative">
        <div
          className="w-32 h-20 bg-cover absolute left-40"
          style={{ backgroundImage: "url('/img/avion.gif')" }}
        ></div>

        <img
          className="w-48 h-24 mt-2 absolute left-0 top-0"
          src="/img/logo.png"
          alt="logo"
        />

        <h1 className="font-playfair text-6xl text-black text-center absolute left-140 top-5">
          Registrarse
        </h1>
      </header>

      {/* Main */}
      <main className="flex flex-col md:flex-row items-center mt-10 space-y-8 md:space-y-0 md:space-x-8">
        {/* Formulario */}
        <div className="w-80 md:w-130 h-240 bg-[#003366] border-4 border-black p-6 rounded-lg text-white absolute left-125 top-25 z-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="mt-4">Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Nombre Completo:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Fecha de nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Identificacion:</label>
            <input
              type="number"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Contraseña:</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Confirmar contraseña:</label>
            <input
              type="password"
              name="confirmar_contrasena"
              value={formData.confirmar_contrasena}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Ciudad de residencia:</label>
            <input
              type="text"
              name="ciudad_residencia"
              value={formData.ciudad_residencia}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Numero de celular:</label>
            <input
              type="number"
              name="celular"
              value={formData.numero_celular}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Direccion:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            <p className="text-center mt-2 text-sm">
              <Link to="/inicio_turista" className="underline text-white">
                ¿Ya tienes Cuenta? Inicia Sesion
              </Link>
            </p>

            <button
              type="submit"
              className="bg-gray-200 text-[#003366] px-4 py-2 rounded-md mt-4 hover:bg-gray-300 font-playfair"
            >
              Registrarme
            </button>
          </form>
        </div>

        {/* Contenedor lateral */}
          <div
            className="w-20 h-20 rounded-full bg-[#0a3273] bg-contain bg-no-repeat absolute right-125 top-3"
            style={{ backgroundImage: "url('/img/imagen.png')" }}
          ></div>
        
      </main>
    </div>
  );
}
