import { useEffect } from "react";
import Nav from "../../components/nav.jsx";
import FormUpdatePlans from "../../components/form_update_planes.jsx";
import BreadcrumbNav from "../../components/breadcrumb.jsx";
import { useBreadcrumb } from "../../context/breadcrumb_context.jsx";
import { useParams } from "react-router-dom";

export default function UpdatePlanes() {
  const { id } = useParams();
  const { addBreadcrumb, resetBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    resetBreadcrumb();
    addBreadcrumb({ title: "Listar Planes", path: "/listar_planes_admin" });
    addBreadcrumb({ title: `Editar Plan ${id}`, path: `/update-planes/${id}` });
  }, [id]);

  return (
    <div>
      <div className="mb-24">
        <Nav
          showFilter={false}
          showTitleAdmin={false}
          showNavbarAdmin={true}
          showSearch={false}
          showTitleUpdatePlanesAdmin={true}
        />
      </div>

      {/* Contenido principal con Breadcrumb */}
      <div className="border-1 border-black h-8 flex items-center bg-nav/30">
        <BreadcrumbNav />
      </div>

      <div className="mt-8 px-8">
        <FormUpdatePlans />
      </div>
    </div>
  );
}
