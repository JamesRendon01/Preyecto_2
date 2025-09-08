import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioTurista from "./pages/turista/inicio_turista.jsx";
import InicioAdministrador from "./pages/administrador/inicio_admin.jsx";
import Registro from "./pages/turista/registro.jsx";
import IngresarCorreo from "./pages/recuperar_contraseña/ingresar_correo.jsx";
import IngresarPin from "./pages/recuperar_contraseña/ingresar_pin.jsx";
import NuevaContrasena from "./pages/recuperar_contraseña/nueva_contraseña.jsx";
import Table from "./pages/administrador/act_elim_plan.jsx";
import HomePage from "./pages/turista/inicio.jsx";
import Favoritos from "./pages/turista/favoritos.jsx"
import DashbordSinLogin from "./pages/turista/dashbord_sin_login.jsx";
import MenuConfig from "./pages/turista/menu_config.jsx";
import Reservas from "./pages/turista/reservas.jsx";


export default function App() {
  return (
    <Router>
      <Routes>

        {/*Ruta inicio de la pagina web*/}
        <Route path="/" element={< DashbordSinLogin />} />

        {/*Rutas del rol Turista*/}
        {/*Ruta para registro.jsx*/}
        <Route path="/registro" element={<Registro />} />
        {/*Ruta para inicio_turista.jsx*/}
        <Route path="/turista" element={<InicioTurista />} />
        {/*Ruta para inicio.jsx*/}
        <Route path="/inicio" element={<HomePage />} />
        {/*Ruta para menu_config.jsx*/}
        <Route path="/menu_config" element={<MenuConfig />} />
        {/*Ruta para favoritos.jsx*/}
        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="/reservas" element={<Reservas />} />

        {/*Ruta para ingresar_correo.jsx*/}
        <Route path="/ingresar_correo" element={<IngresarCorreo />} />
        {/*Ruta para ingresar_pin.jsx*/}
        <Route path="/ingresar_pin" element={<IngresarPin />} />
        {/*Ruta para nueva_contraseña.jsx*/}
        <Route path="/nueva_contrasena" element={<NuevaContrasena />} />
        {/*Ruta para dashboard_sin_login.jsx*/}

        {/*Rutas del rol Administrador*/}
        {/*Ruta para inicio_admin.jsx*/}
        <Route path="/admin" element={<InicioAdministrador />} />
        <Route path="/table" element={<Table />} />
        
      </Routes>
    </Router>
  );
}
