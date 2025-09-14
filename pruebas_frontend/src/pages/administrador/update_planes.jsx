import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import FormUpdatePlans from "../../components/form_update_planes.jsx";
import BreadcrumbNav from "../../components/breadcrumb.jsx";
import { useBreadcrumb } from "../../context/breadcrumb_context.jsx";
import { useParams } from "react-router-dom";

export default function UpdatePlanes() {
    const { id } = useParams();
    const {addBreadcrumb} = useBreadcrumb();

    useEffect(() => {
        addBreadcrumb({ title: `Editar Plan ${id}`, path: `/update-planes/${id}`})
    }, [id]);

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
            <div className="mt-25 mb-20 items-center justify-center gap-16">
                <BreadcrumbNav />
                <FormUpdatePlans />
            </div>

        </div>
    );
}
