import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import ContenedorPlanes from "../../components/planes_admin.jsx";
import ContenedorReservas from "../../components/reservas_admin.jsx";
import FormUpdatePlans from "../../components/form_update_planes.jsx";
export default function UpdatePlanes() {

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
            <div className="mt-40 mb-20 flex items-center justify-center gap-16">
                <FormUpdatePlans />
            </div>

        </div>
    );
}
