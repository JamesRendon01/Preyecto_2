import { Routes, Route } from "react-router-dom";
import InicioTurista from "./pages/turista/inicio_turista.jsx";
import InicioAdministrador from "./pages/administrador/inicio_admin.jsx";
import Registro from "./pages/turista/registro.jsx";
import IngresarCorreo from "./pages/recuperar_contraseña/ingresar_correo.jsx";
import IngresarPin from "./pages/recuperar_contraseña/ingresar_pin.jsx";
import NuevaContrasena from "./pages/recuperar_contraseña/nueva_contraseña.jsx";
import HomePage from "./pages/turista/inicio.jsx";
import Favoritos from "./pages/turista/favoritos.jsx";
import DashbordSinLogin from "./pages/turista/dashbord_sin_login.jsx";
import MenuConfig from "./pages/turista/menu_config.jsx";
import Reservas from "./pages/turista/reservas.jsx";
import PrivateRouteTurista from "./components/private_router_turista.jsx";
import DashbordAdmin from "./pages/administrador/dashboard.jsx";
import PrivateRouteAdmin from "./components/private_router_admin.jsx";
import ListarPlanesAdmin from "./pages/administrador/planes.jsx";
import UpdatePlanes from "./pages/administrador/update_planes.jsx";
import CreatePlan from "./pages/administrador/crear_plan.jsx";

import { BreadcrumbProvider } from "./context/breadcrumb_context.jsx";
import BreadcrumbBar from "./components/breadcrumb.jsx";
import ListarReservas from "./pages/administrador/reservas.jsx";
import MisReservasPage from "./pages/turista/MisReservas.jsx";

export default function App() {
  return (
    <>

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<DashbordSinLogin />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/turista" element={<InicioTurista />} />
        <Route path="/ingresar_correo" element={<IngresarCorreo />} />
        <Route path="/ingresar_pin" element={<IngresarPin />} />
        <Route path="/nueva_contrasena" element={<NuevaContrasena />} />

        {/* Rutas privadas del turista */}
        <Route path="/inicio" element={<PrivateRouteTurista><HomePage /></PrivateRouteTurista>} />
        <Route path="/turista/editar/:id" element={<PrivateRouteTurista><MenuConfig /></PrivateRouteTurista>} />
        <Route path="/favoritos" element={<PrivateRouteTurista><Favoritos /></PrivateRouteTurista>} />
        <Route path="/reservas" element={<PrivateRouteTurista><Reservas /></PrivateRouteTurista>} />
        <Route path="/mis_reservas" element={<PrivateRouteTurista><MisReservasPage /></PrivateRouteTurista>} />


        {/* Rutas del administrador */}
        <Route path="/admin" element={<InicioAdministrador />} />
        <Route path="/listar_planes_admin"
          element={
            <PrivateRouteAdmin>
              <BreadcrumbProvider>
                <ListarPlanesAdmin />
              </BreadcrumbProvider>
            </PrivateRouteAdmin>
          }
        />
<Route path="/listar_reservas_admin"
          element={
            <PrivateRouteAdmin>
              <BreadcrumbProvider>
                <ListarReservas />
              </BreadcrumbProvider>
            </PrivateRouteAdmin>
          }
        />

        <Route path="/dashboard-administrador" element={<PrivateRouteAdmin><DashbordAdmin /></PrivateRouteAdmin>} />
        <Route path="/update-planes/:id"
          element={
            <PrivateRouteAdmin>
              <BreadcrumbProvider>
                <UpdatePlanes />
              </BreadcrumbProvider>
            </PrivateRouteAdmin>
          }
        />
        <Route path="/create-plan"
          element={
            <PrivateRouteAdmin>
              <BreadcrumbProvider>
                <CreatePlan />
              </BreadcrumbProvider>
            </PrivateRouteAdmin>
          }
        />
      </Routes>
    </>
  );
}
