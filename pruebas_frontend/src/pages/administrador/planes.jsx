import Nav from "../../components/nav.jsx";
import BreadcrumbNav from "../../components/breadcrumb.jsx";
import CrudPlanes from "../../components/listar_planes_admin.jsx";

export default function ListarPlanesAdmin() {

    return (
        <div>
            <div className="mb-25">
            <Nav
                showFilter={false}
                showTitleAdmin={false}
                showNavbarAdmin={true}
                showSearch={false}
                showTitlePlanesAdmin={true}
            />
            </div>
            <div className=" items-center justify-center">
                <BreadcrumbNav />
                <CrudPlanes/>
            </div>
        </div>
    );
}