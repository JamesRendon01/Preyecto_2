// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioTurista from "./inicio_turista";
import InicioAdministrador from "./inicio_admin";
import Registro from "./registro";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Inicio Turista */}
        <Route path="/" element={<InicioTurista />} />

        {/* Ruta Turista */}
        <Route path="/turista" element={<InicioTurista />} />

        {/* Ruta Administrador */}
        <Route path="/admin" element={<InicioAdministrador />} />

        {/* Ruta Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Redireccionar rutas no definidas a "/" */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
