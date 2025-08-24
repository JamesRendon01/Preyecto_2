import { useState } from "react";
import { Link } from "react-router-dom";

export default function InicioAdministrador() {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

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

    try {
      const res = await fetch("http://localhost:8000/administrador/iniciarsesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Inicio de sesión exitoso ✅");
        window.location.href = "/pagina_principal.html";
      } else {
        alert("Error: " + (result.detail || "Credenciales inválidas"));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor ❌");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-400 to-white flex flex-col items-center">
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

        <h1 className="font-playfair text-6xl text-black text-center absolute left-100 top-10">
          Inicio Sesión Administrador
        </h1>
      </header>

      {/* Main */}
      <main className="flex flex-col md:flex-row items-center mt-10 space-y-8 md:space-y-0 md:space-x-8">
        {/* Formulario */}
        <div className="w-80 md:w-96 h-100 bg-[#003366] border-4 border-black p-6 rounded-lg text-white absolute right-90 top-38 z-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="mt-4">Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Contraseña:</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md text-black mt-2 bg-gray-200 
              "
            />

            <p className="text-center mt-4 text-sm">
              <a href="/recuperar_contraseña/form_recuperacion.html" className="underline text-white">
                ¿Olvidaste tu contraseña?
              </a>
            </p>

            <button
              type="submit"
              className="bg-gray-200 text-[#003366] px-4 py-2 rounded-md mt-4 hover:bg-gray-300 font-playfair"
            >
              Continuar
            </button>
          </form>
        </div>

        {/* Contenedor lateral */}
        <div className="w-80 md:w-96 bg-[#b6b7bb] border-4 border-[#5e637e] p-6 rounded-lg flex flex-col items-center absolute left-100 top-43">
          <div
            className="w-54 h-54 rounded-full bg-[#0a3273] bg-contain bg-no-repeat"
            style={{ backgroundImage: "url('/img/imagen.png')" }}
          ></div>

          {/* Botón para ir a InicioTurista usando Link */}
          <Link
            to="/turista"
            className="w-48 h-16 mt-6 bg-[#073c80] border-2 border-black rounded-2xl text-white text-xl flex items-center justify-center hover:bg-[#042248]"
          >
            Turista
          </Link>
        </div>
      </main>
    </div>
  );
}
