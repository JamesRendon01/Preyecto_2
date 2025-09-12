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
import PrivateRoute from "./components/private_router.jsx";
import DashbordAdmin from "./pages/administrador/dashboard.jsx";


export default function App() {
  return (
    <Router>
      <Routes>
        {/*Ruta pública*/}
        <Route path="/" element={<DashbordSinLogin />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/turista" element={<InicioTurista />} />
        <Route path="/ingresar_correo" element={<IngresarCorreo />} />
        <Route path="/ingresar_pin" element={<IngresarPin />} />
        <Route path="/nueva_contrasena" element={<NuevaContrasena />} />

        {/*Rutas privadas del turista*/}
        <Route path="/inicio" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/menu_config" element={<PrivateRoute><MenuConfig /></PrivateRoute>} />
        <Route path="/favoritos" element={<PrivateRoute><Favoritos /></PrivateRoute>} />
        <Route path="/reservas" element={<PrivateRoute><Reservas /></PrivateRoute>} />

        {/*Rutas del administrador*/}
        <Route path="/admin" element={<InicioAdministrador />} />
        <Route path="/table" element={<Table />} />
        <Route path="/dashboard-administrador" element={<DashbordAdmin />} />

      </Routes>
    </Router>
  );
}
