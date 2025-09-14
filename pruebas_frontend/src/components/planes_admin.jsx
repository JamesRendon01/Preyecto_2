import { useNavigate } from "react-router-dom";

export default function ContenedorPlanes(){
    const navigate = useNavigate();

    const handleReservar = () =>{
        navigate("/listar_planes_admin");
    }

    return(
        <div className="w-90 h-110 bg-nav border-2 border-black flex items-center justify-center  transform transition-transform duration-300 hover:scale-110">
            <div onClick={handleReservar}>
                <img src="/img/" alt="planes" className="border-2 border-black w-85 h-90 items-center object-cover" />
                <h1 className="font-inter text-6xl text-center">
                    PLANES
                </h1>
            </div>
        </div>
    );
}