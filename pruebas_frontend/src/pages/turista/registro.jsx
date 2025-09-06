// Registro.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Componente de registro para nuevos turistas
export default function Registro() {
  const [formData, setFormData] = useState({
    //Estado para manejar los datos del formulario
    correo: "",
    nombre: "",
    fecha_nacimiento: "",
    tipo_identificacion: "",
    identificacion: "",
    contrasena: "",
    confirmar_contrasena: "",
    ciudad_residencia_id: "",
    celular: "",
    direccion: "",
  });

  const [error, setError] = useState("");
  const [ciudades, setCiudades] = useState([]);

  // Cargar ciudades desde el backend
  useEffect(() => {
    fetch("http://localhost:8000/ciudad/")
      .then(res => res.json())
      .then(data => setCiudades(data))
      .catch(err => console.error("Error cargando ciudades:", err));
  }, []);

  // Manejar cambios de inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.contrasena !== formData.confirmar_contrasena) {
      setError("Las contraseñas no coinciden ❌");
      return;
    }
    delete formData.confirmar_contrasena; // Eliminar campo de confirmación antes de enviar

    try {
      const res = await fetch("http://localhost:8000/turista/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      //Si el registro es exitoso, redirige al turista a la pagina de inicio de sesion
      if (res.ok) {
        alert("Registro exitoso ✅");
        window.location.href = "/turista";
      } else {
        //Si los datos ingresados son incorrectos, envia un mensaje de error
        setError(result.detail || "No se pudo registrar");
      }
    } catch (error) {
      //si hay algun tipo de error de conexion, muestra un mensaje de error
      console.error("Error de conexion:", error);
      setError("No se pudo conectar al servidor ❌");
    }
  };

  // Renderizado del formulario de registro
  return (
    // Contenedor principal
    <div className="min-h-screen w-full bg-fondo flex flex-col">
      {/* Header */}
      <header className="w-full flex py-4 relative">
        {/* Estilos para las imagenes de la empresa */}
        <div className="flex ">
          {/* Logo de la empresa */}
          <img className="w-38 h-18 mt-2 sm:w-20 sm:h-12 sm:mt-0 md:w-28 md:h-18 xl:w-40 xl:h-20" src="/img/logo.png" alt="logo" />
          {/* Imagen animada del avion */}
          <img className="w-38 h-18 mt-2 sm:w-20 sm:h-12 sm:mt-0 md:w-28 md:h-18 xl:w-40 xl:h-20" src="/img/avion.gif" alt="logo" />
          {/* Título de la página */}
          <h1 className="flex text-6xl text-black font-bold font-inter sm:text-4xl md:text-5xl lg:ml-30 xl:text-6xl xl:ml-55">
            REGISTRARSE
          </h1>
        </div>
      </header>

      <main className="flex flex-col md:flex-row">
        {/* Divisor del formulario */}
        <div className="w-125 h-auto bg-nav border-4 border-black p-6 rounded-lg text-black sm:w-100 sm:ml-10 md:ml-50 lg:ml-80 xl:ml-130 xl:w-120">
          <div className="self-center w-20 h-20 rounded-full bg-fondo bg-contain bg-no-repeat ml-50 sm:ml-35 xl:ml-45" style={{ backgroundImage: "url('/img/imagen.png')" }}></div>
          {/* Formulario de registro */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* Campo de correo */}
            <label className="mt-4">Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Campo de nombre Completo */}
            <label className="mt-4">Nombre Completo:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Campo de fecha de nacimiento */}
            <label className="mt-4">Fecha de nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Campo de tiempo de identificacion */}
            <label className="mt-4">Tipo de identificacion</label>
            <select
              name="tipo_identificacion"
              value={formData.tipo_identificacion}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            >
              <option value="">Seleccione un tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="PP">Pasaporte</option>
              <option value="PPT">Permiso por proteccion Temporal</option>
            </select>

            {/* Campo de identificacion */}
            <label className="mt-4">Identificacion:</label>
            <input
              type="number"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Campo de contraseña */}
            <label className="mt-4">Contraseña:</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Campo de confirmar contraseña */}
            <label className="mt-4">Confirmar contraseña:</label>
            <input
              type="password"
              name="confirmar_contrasena"
              value={formData.confirmar_contrasena}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Campo de ciudad de residencia */}
            <label className="mt-4">Ciudad de residencia:</label>
            <select
              name="ciudad_residencia_id"
              value={formData.ciudad_residencia_id}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>

            {/* Campo de celular */}
            <label className="mt-4">Numero de celular:</label>
            <input
              type="number"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Campo de direccion */}
            <label className="mt-4">Direccion:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="w-full p-1 rounded-md text-black mt-2 bg-gray-200"
            />

            {/* Enlace para iniciar sesion en caso de que ya tenga una cuenta creada */}
            <p className="text-center mt-2 text-sm">
              <Link to="/inicio_turista" className="underline text-black">
                ¿Ya tienes Cuenta? Inicia Sesion
              </Link>
            </p>
            {/* Boton para enviar el formulario */}
            <button
              type="submit"
              className="bg-fondo text-black font-bold px-4 py-2 rounded-md mt-4 hover:bg-white"
            >
              Registrarme
            </button>
          </form>
        </div>


      </main>
    </div>
  );
}
