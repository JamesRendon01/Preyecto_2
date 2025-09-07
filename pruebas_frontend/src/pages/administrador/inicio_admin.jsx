import { useState } from "react";
import Header from "../../components/header.jsx";
import LoginForm from "../../components/login_form.jsx";
import Sidebar from "../../components/sidebar.jsx";
// Componente de inicio de sesión para administradores
export default function InicioAdministrador() {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  // Manejo cambios de inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //Conexion y envio de datos del form al backend
    try {
      const res = await fetch("http://localhost:8000/administrador/iniciarsesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      //Si el inicio de sesion es exitoso, redirige al administrador a la pagina principal
      if (res.ok) {
        alert("Inicio de sesión exitoso ✅");
        window.location.href = "/pagina_principal.html";
      } else {
        //Si los datos ingresados son incorrectos, envia un mensjae de error
        alert("Error: " + (result.detail || "Credenciales inválidas"));
      }
    } catch (error) {
      //si hay algun tipo de error de conexion, muestra un mensaje de error
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor ❌");
    }
  };

  // Renderizado del formulario de inicio de sesión para el administrador
  return (
    <div className="w-screen min-h-screen bg-gradiente-to-r from-gray-400 to-white">
      <div className="mt-5">
        <Header rol="admin" titulo="ADMINISTRADOR" />
      </div>
      <main>
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          rol="admin"
        />
        <Sidebar rol="admin" />
      </main>
    </div>
  );
}
