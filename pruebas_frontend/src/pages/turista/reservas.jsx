import { useLocation } from "react-router-dom";
import Nav from "../../components/nav.jsx";
import CardComponent from "../../components/card.jsx";
import FormReservas from "../../components/form_reservas.jsx";

export default function Reservas() {
    const location = useLocation();
    const planSeleccionado = location.state?.plan || null; // 👈 viene de CardComponent

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

            {/* Layout con card seleccionada + form */}
            <div className="flex flex-col ">
                {/* Si hay plan seleccionado, muestro la card al lado del form */}
                {planSeleccionado && (
                    <div className="flex">
                        <div className="w-full bg-white text-black text-sm p-2 rounded-md opacity-90 transform transition-transform duration-300 hover:scale-110 hover:shadow-[10px_10px_20px_rgba(0,0,0,0.2)] border-black border-2 relative  sm:w-70 sm:h-90 sm:mt-30 sm:ml-20 sm:mb-0 md:mt-50 md:w-80 md:h-100 md:ml-6 lg:w-90 lg:h-110 lg:ml-40 lg:mt-60 xl:w-110 xl:h-130 xl:ml-55 xl:mt-70">
                            <img
                                src={`http://localhost:8000${planSeleccionado.imagen}`}
                                alt={planSeleccionado.nombre}
                                className="w-full h-[200px] object-cover rounded-md md:h-60 xl:h-80"
                            />
                            <h2 className="text-2xl font-bold mt-4 text-center xl:text-4xl">{planSeleccionado.nombre}</h2>
                            <p className="mt-2 font-piazze text-2xl xl:text-3xl">{planSeleccionado.descripcion}</p>
                        </div>
                        <div className="flex gap-2">
                            <FormReservas plan={planSeleccionado} />
                        </div>
                    </div>
                )}

                {/* Formulario de reservas */}
                
            </div>
        </div>
    );
}
