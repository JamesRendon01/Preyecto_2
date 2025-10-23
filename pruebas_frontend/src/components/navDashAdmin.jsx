import { House, CalendarRange, Earth, Users, ChartLine, BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavDashAdmin() {
  return (
    <nav className="fixed top-0 left-0 h-screen w-56 bg-nav p-6 flex flex-col justify-start gap-8 font-bold shadow-lg z-50">
      <h2 className="pb-5 border-b-2 text-center text-lg">ESCAPADE PARFAITE</h2>

      <Link to="/dashboard-administrador">
        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
          <House />
          <span>Dashboard</span>
        </div>
      </Link>

      <Link to="/listar_reservas_admin">
        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
          <CalendarRange />
          <span>Reservas</span>
        </div>
      </Link>

      <Link to="/listar_planes_admin">
        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
          <Earth />
          <span>Planes</span>
        </div>
      </Link>

      <Link>
        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
          <Users />
          <span>Turistas</span>
        </div>
      </Link>

      <Link>
        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
          <BookOpenText />
          <span>Informes</span>
        </div>
      </Link>

      <Link>
        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-500 transition">
          <ChartLine />
          <span>Estadísticas</span>
        </div>
      </Link>
    </nav>
  );
}
