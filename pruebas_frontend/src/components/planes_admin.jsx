import { useNavigate } from "react-router-dom";
import { CalendarCheck} from 'lucide-react';

export default function ContenedorPlanes(){
    const navigate = useNavigate();

    const handlePlanes = () =>{
        navigate("/listar_planes_admin");
    }

    return(
        <div className="w-90 h-110 bg-nav border-2 border-black flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <div onClick={handlePlanes}>
                <div className=" w-85 h-85 items-center object-cover" >
                <CalendarCheck size={340}/>
                </div>
                <h1 className="font-title text-6xl text-center">
                    PLANES
                </h1>
            </div>
        </div>
    );
}