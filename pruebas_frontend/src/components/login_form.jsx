import { Link } from "react-router-dom";

// Props:
//   * formData: objeto con los valores del formulario (correo, contraseña)
//   * handlecChange: funcion para manejar cambios en los inputs
//   * handleSubmit: funcion que se ejecuta al enviar el formulario
//   * rol: determina si es login de "turista" o "Administrador"

export default function LoginForm({ formData, handleChange, handleSubmit, rol }) {
    return (
        // Contenedor del formulario
        // Estilos y pocision del formulario
        <div
            className={` w-96 h-96 bg-login bg-nav text-white p-8 rounded-lg z-30 border-3 absolute top-35 border-black 
        ${rol === "admin" ? "ml-[300px]" : ""}`}
        >
            {/* Formuario de login */}
            <form className="text-black text-lg font-bold" onSubmit={handleSubmit}>
                {/* Campo para ingresar el correo */}
                <label>Correo:</label>
                <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded-md text-black mt-2 bg-gray-200 focus:outline-none "
                />

                {/* Campo para ingresar la contraseña */}
                <label className="mt-4">Contraseña:</label>
                <input
                    type="password"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded text-black mt-2 bg-gray-200 focus:outline-none"
                />

                {/* Caso: turista */}
                {rol === "turista" && (
                    <>
                        {/* Enlace para recuperacion de contraseña */}
                        <p className="text-center mt-10 text-sm">
                            <Link to="/ingresar_correo" className="underline text-black">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </p>
                        {/* Enlace para registrarse */}
                        <p className="text-center mt-2 text-sm">
                            <Link to="/registro" className="underline text-black">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </p>
                    </>
                )}

                {/* Caso: Administrador */}
                {rol === "admin" && (
                    <>
                        {/* Enlace para recuperar contraseña */}

                        <p className="text-center mt-15 text-sm">
                            <Link to="/ingresar_correo" className="underline text-black">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </p>

                    </>
                )}

                {/* Boton para enviar el formulario */}
                <button
                    type="submit"
                    className="bg-fondo border-2 border-black text-login px-4 py-2 rounded-md font-playfair hover:bg-gray-300 transition-colors ml-25 mt-8"
                >Continuar
                </button>
            </form>
        </div>
    );
}