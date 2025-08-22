import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function nuevaContrasena() {
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("tokenRecuperacion"); // Captura el token de la URL

  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    if (!token) {
      alert("Token inválido ❌");
      return;
  }

    try {
      const res = await fetch("http://localhost:8000/turista/cambiar-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nueva_contrasena: password, }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Contraseña restablecida con éxito ✅");
        window.location.href = "/"; // Redirigir al login
      } else {
        alert("Error: " + (result.detail || "No se pudo cambiar la contraseña"));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor ❌");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-400 to-white flex flex-col items-center">
      <header className="w-full flex flex-col items-center py-4 relative">
        <img className="w-52 h-28 mt-2 absolute left-155 top-0" src="/img/logo.png" alt="logo" />
        <img src="/img/esquina_sup_derecha.png" alt="" className=" z-13 w-40 h-40  absolute left-215 top-107" />
        <img src="/img/esquina_sup_izquierda.png" alt="" className=" z-13 w-40 h-40  absolute left-97 top-35" />

        <div className="w-80 md:w-130 h-25 bg-[#9e9e9e] border-2 border-black p-6 [border-radius:20px] text-white absolute right-130 top-46 z-12">
          <h1 className="font-serif text-5xl text-black text-center ">
            Nueva Contraseña
          </h1>
        </div>
      </header>

      <main className="flex flex-col md:flex-row items-center mt-10 space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-80 md:w-128 h-80 bg-[#003366] border-2 border-black p-6 [border-radius:30px] text-white absolute right-123 top-56 z-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="mt-12">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded-md text-black mt-2 bg-gray-200"
            />

            <label className="mt-4">Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
              className="w-full p-2 rounded-md text-black mt-2 bg-gray-200"
            />

            <button
              type="submit"
              className=" w-30 bg-[#9e9e9e] text-black py-2 rounded-full mt-4 hover:bg-gray-300 font-playfair border-2 border-black absolute left-50 top-60"
            >
              Continuar
            </button>
          </form>
        </div>

        <div className="w-80 md:w-156 h-115 bg-white border-4 border-[#5e637e] p-6 [border-radius:30px] flex flex-col items-center absolute left-100 top-33">
          <div></div>
        </div>
      </main>
    </div>
  );
}
