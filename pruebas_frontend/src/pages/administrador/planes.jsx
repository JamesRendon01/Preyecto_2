import { useEffect } from "react";
import Nav from "../../components/nav.jsx";
import BreadcrumbNav from "../../components/breadcrumb.jsx";
import CrudPlanes from "../../components/listar_planes_admin.jsx";
import { useBreadcrumb } from "../../context/breadcrumb_context.jsx";

export default function ListarPlanesAdmin() {
  const { addBreadcrumb, resetBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    // Al entrar en esta página, limpiamos y establecemos el breadcrumb base
    resetBreadcrumb();
    addBreadcrumb({ title: "Listar Planes", path: "/listar_planes_admin" });
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
          showTitlePlanesAdmin={true}
        />
      </div>
      {/* Contenido principal con Breadcrumb */}
      <div className="border-1 border-black h-8 flex items-center bg-nav/30">
        <BreadcrumbNav />
      </div>

      {/* Contenido principal*/}
      <div className="mt-8 px-8">
        <CrudPlanes />
      </div>
    </div>
  );
}
