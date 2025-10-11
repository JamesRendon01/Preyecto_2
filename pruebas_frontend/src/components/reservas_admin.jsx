import { useNavigate } from "react-router-dom";

export default function ContenedorReservas(){
    const navigate = useNavigate();

    const handleReservar = () =>{
        navigate("/listar_reservas_admin");
    }

    return(
        <div className="w-90 h-110 bg-nav border-2 border-black flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <div onClick={handleReservar}>
                <img src="/img/" alt="reservas" className="border-2 border-black w-85 h-90 items-center object-cover" />
                <h1 className="font-title text-6xl text-center">
                    RESERVAS
                </h1>
            </div>
        </div>
    );
}