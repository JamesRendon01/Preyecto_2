// components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar({ rol }) {
  return (
    <div className={`sidebar-container ${rol}`}>
      {/* Imagen perfil */}
      <div className="sidebar-profile"></div>
      {rol === "turista" && <p> <Link to="/admin" className="sidebar-button">Admin</Link></p>}
      {rol === "admin" && <p> <Link to="/turista" className="sidebar-button">Turista</Link></p>}
    </div>
  );
}
