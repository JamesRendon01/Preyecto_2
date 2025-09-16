import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx"
import FormCrearPlan from "../../components/form_create_plan.jsx";

export default function CreatePlan() {

    return (
        <div>
            <div>
                <Nav
                    showFilter={false}
                    showTitleAdmin={false}
                    showNavbarAdmin={true}
                    showSearch={false}
                    showTitleCrearPlanesAdmin ={true}
                />
            </div>
            <div>

            </div>
            <div className="mt-40 mb-20 flex items-center justify-center gap-16">
                
            <FormCrearPlan />
            </div>

        </div>
    );
}
