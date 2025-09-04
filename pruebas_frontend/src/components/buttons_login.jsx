import { Link } from "react-router-dom";
export default function ButtonsLogin() {
    return (
            //Contenedor principal
            <div className="flex ">
                {/*Boton de "Iniciar Sesion" */}
                <Link
                    to="/turista"
                    className="w-48 h-16 mt-6 ml-90 font-bold bg-white border-2 border-black rounded-2xl flex text-black text-xl  items-center justify-center no-underline transitions-colors">
                    Iniciar Sesion
                </Link>

                {/*Boton de "Registrarse" */}
                <Link
                    to="/registro"
                    className="w-48 h-16 mt-6 ml-20 font-bold bg-white border-2 border-black rounded-2xl flex text-black text-xl items-center justify-center no-underline transitions-colors">
                    Registrarse
                </Link>
            </div>
    );
}