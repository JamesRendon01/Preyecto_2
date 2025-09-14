import Nav from "../../components/nav.jsx";
import CrudPlanes from "../../components/listar_planes_admin.jsx";
import BreadcrumbNav from "../../components/breadcrumb.jsx";

export default function ListarPlanesAdmin() {

    return (
        <div>
            <div className="mb-25">
            <Nav
                showFilter={false}
                showTitleAdmin={true}
                showNavbarAdmin={true}
                showSearch={false}
            />
            </div>
            <div className=" items-center justify-center">
                <BreadcrumbNav />
                <CrudPlanes/>
            </div>
        </div>
    );
}