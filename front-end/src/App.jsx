import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioTurista from "./pages/turista/inicio_turista.jsx";
import InicioAdministrador from "./pages/administrador/inicio_admin.jsx";
import Registro from "./pages/turista/registro.jsx";
import IngresarCorreo from "./pages/recuperar_contraseña/ingresar_correo.jsx";
import IngresarPin from "./pages/recuperar_contraseña/ingresar_pin.jsx";
import NuevaContrasena from "./pages/recuperar_contraseña/nueva_contraseña.jsx";
import Table from "./pages/administrador/act_elim_plan.jsx";
import HomePage from "./pages/turista/inicio.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de prueba del carrusel */}
        <Route path="/carousel" element={<HomePage />} />

        {/* Ruta principal */}
        <Route path="/" element={<InicioTurista />} />

        {/* Ruta Turista */}
        <Route path="/turista" element={<InicioTurista />} />

        {/* Ruta Administrador */}
        <Route path="/admin" element={<InicioAdministrador />} />

        {/* Ruta Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Flujo de recuperación de contraseña */}
        <Route path="/ingresar_correo" element={<IngresarCorreo />} />
        <Route path="/ingresar_pin" element={<IngresarPin />} />
        <Route path="/nueva_contrasena" element={<NuevaContrasena />} />

        {/* Redirección para rutas no definidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
