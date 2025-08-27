import { Link } from "react-router-dom";

export default function LoginForm({ formData, handleChange, handleSubmit, rol }) {
    return (
        <div className={`container-form ${rol}`}>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Correo:</label>
                <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />

                <label>Contraseña:</label>
                <input
                    type="password"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                />

                {rol === "turista" && (
                    <>
                        <p>
                            <Link to="/ingresar_correo" className="link">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </p>
                        <p>
                            <Link to="/registro" className="link">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </p>
                    </>
                )}

                {rol === "admin" && (
                    <>
                        <p>
                            <Link to="/ingresar_correo" className="link">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </p>
                        
                    </>
                )}

                <button type="submit">Continuar</button>
            </form>
        </div>
    );
}