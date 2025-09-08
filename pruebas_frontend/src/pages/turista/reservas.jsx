import { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import CardComponent from "../../components/card.jsx";
import FormReservas from "../../components/form_reservas.jsx";

export default function Reservas() {
    return (
        <div>
            <Nav
                showFilter={false}
                showTitle={false}
                showNavbar={true}
                showSearch={false}
                showButtonsLogin={false}
                showTitleReservas={true}
            />
            <div>
                <CardComponent />
            </div>
            <div>
                <FormReservas/>
            </div>
        </div>
    );
}
