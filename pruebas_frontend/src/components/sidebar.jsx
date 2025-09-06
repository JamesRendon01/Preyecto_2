import { Link } from "react-router-dom";

export default function Sidebar({ rol }) {
  //Configuración dinámica del botón
  const toggleLink =
    rol === "turista"
      ? { to: "/admin", label: "Admin" }
      : rol === "admin"
      ? { to: "/turista", label: "Turista" }
      : null;

  return (
    //Divisor principal
    <div
      className={`w-80 relative bg-white border-2 border-black p-6 rounded-md flex flex-col items-center z-0
      ${rol === "turista" ? "ml-[365px] mt-[72px]" : ""}
      ${rol === "admin" ? "mr-[300px] mt-[72px]" : ""}`}
    >
      {/* Imagen de perfil */}
      <img
        src="/img/imagen.png"
        alt="Foto de perfil"
        className="w-[13.5rem] h-[13.5rem] rounded-full border-2 border-black object-cover bg-fondo"
      />

      {/* Botón Cambio de rol "Turista" y "Administrador " */}
      {toggleLink && (
        <Link
          to={toggleLink.to}
          className="w-48 h-16 mt-6 font-bold bg-fondo border-2 border-black rounded-2xl text-black text-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          {toggleLink.label}
        </Link>
      )}
    </div>
  );
}
