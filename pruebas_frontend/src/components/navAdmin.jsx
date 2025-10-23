import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserStar, CircleUserRound, Cog, LogOut } from "lucide-react";

export default function NavAdmin() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("Administrador");
  const [rol, setRol] = useState("Administrador del sistema");
  const navigate = useNavigate();

  // 🔹 Decodificar token del administrador (si existe)
  useEffect(() => {
    try {
      const token = localStorage.getItem("token_admin");
      if (token) {
        const decoded = jwtDecode(token);
        setNombre(decoded.nombre || "Administrador");
        setRol(decoded.rol || "Administrador");
      } else {
        // Si no hay token, intenta usar localStorage directo (backup)
        setNombre(localStorage.getItem("nombre_admin") || "Administrador");
        setRol(localStorage.getItem("rol_admin") || "Administrador del sistema");
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }, []);

  // 🔹 Cierre de sesión
  const handleLogoutAdmin = () => {
    localStorage.removeItem("token_admin");
    localStorage.removeItem("nombre_admin");
    localStorage.removeItem("rol_admin");
    navigate("/admin");
  };

  return (
    <div className="fixed top-4 right-6">
      {/* 🔹 Icono del usuario */}
      <div
        className="cursor-pointer bg-nav p-2 rounded-full hover:bg-black/50 transition flex items-center justify-center shadow-md border-2 border-black hover:border-white"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        <UserStar className="text-black hover:text-white" size={36} />
      </div>

      {/* 🔹 Menú desplegable */}
      {open && (
        <div className="absolute top-14 right-0 bg-black/90 shadow-lg rounded-xl flex flex-col min-w-[16rem] text-white p-3 backdrop-blur-sm">
          {/* 🔸 Encabezado con nombre y rol */}
          <div className="px-3 py-2 border-b border-gray-500 text-center mb-2">
            <h3 className="text-lg font-semibold">{nombre}</h3>
            <p className="text-sm text-white">{rol}</p>
          </div>

          {/* 🔸 Opciones del menú */}
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 hover:bg-gray-100 hover:text-black px-3 py-2 rounded cursor-pointer transition">
              <CircleUserRound />
              Perfil
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 hover:text-black px-3 py-2 rounded cursor-pointer transition">
              <Cog />
              Configuración
            </li>
            <li className="border-t border-gray-400 my-1"></li>
            <li
              className="flex items-center gap-2 hover:bg-red-100 text-red-500 px-3 py-2 rounded cursor-pointer transition"
              onClick={handleLogoutAdmin}
            >
              <LogOut />
              Cerrar sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
    