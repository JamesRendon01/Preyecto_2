// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioTurista from "./inicio_turista";
import InicioAdministrador from "./inicio_admin";
import Registro from "./registro";
import IngresarCorreo from "./recuperar_contraseña/ingresar_correo";
import IngresarPin from "./recuperar_contraseña/ingresar_pin";
import NuevaContrasena from "./recuperar_contraseña/nueva_contraseña";

export default function App() {
  return (
    <Router>
      <Routes>
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