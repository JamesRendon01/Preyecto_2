import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';
import { useState } from "react";
import Header from "../../components/header.jsx";
import LoginForm from "../../components/login_form.jsx";
import Sidebar from "../../components/sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

export default function InicioTurista() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/turista/iniciarsesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("Respuesta login:", result); 

      if (res.ok) {
        // Guardar id del turista en localStorage
        localStorage.setItem("id_turista", result.turista.id_turista);

        message.success("Inicio de sesión exitoso");
        navigate("/inicio"); // Redirige a la página principal
      } else {
        message.error(result.detail || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      message.error("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradiente-to-r from-gray-400 to-white">
      <div className="text-center mt-5">
        <Header rol="turista" titulo="INICIO TURISTA" />
      </div>
      <main>
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          rol="turista"
        />
        <Sidebar rol="turista" />
      </main>
    </div>
  );
}
