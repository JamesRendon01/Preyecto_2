import { useEffect } from "react";
import Nav from "../../components/nav.jsx";
import BreadcrumbNav from "../../components/breadcrumb.jsx";
import { useBreadcrumb } from "../../context/breadcrumb_context.jsx";
import ListarReservas from "../../components/listar_reservas_admin.jsx";

export default function Reservas() {
  const { addBreadcrumb, resetBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    // Al entrar en esta página, limpiamos y establecemos el breadcrumb base
    resetBreadcrumb();
    addBreadcrumb({ title: "Reservas", path: "/listar_reservas_admin" });
  }, []);

  return (
    <div>
      {/* Navbar del administrador */}
      <div className="mb-24">
        <Nav
          showFilter={false}
          showTitleAdmin={false}
          showNavbarAdmin={true}
          showSearch={false}
        />
      </div>
      {/* Contenido principal con Breadcrumb */}
      <div className="border-1 border-black h-8 flex items-center bg-nav/30">
        <BreadcrumbNav />
      </div>

      {/* Contenido principal*/}
      <div className="mt-8 px-8">
        <ListarReservas />
      </div>
    </div>
  );
}
