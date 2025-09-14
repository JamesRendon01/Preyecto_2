import Nav from "../../components/nav.jsx";
import CrudPlanes from "../../components/listar_planes_admin.jsx";
export default function ListarPlanesAdmin() {

    return (
        <div>
            <div>
            <Nav
                showFilter={false}
                showTitleAdmin={true}
                showNavbarAdmin={true}
                showSearch={false}
            />
            </div>
            <div className="flex items-center justify-center">
                <CrudPlanes/>
            </div>
        </div>
    );
}