import { useState } from "react";
import Header from "../../components/header.jsx";
import LoginForm from "../../components/login_form.jsx";
import Sidebar from "../../components/sidebar.jsx";
import { Navigate, useNavigate } from "react-router-dom";


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

      if (res.ok) {
        alert("Inicio de sesión exitoso ✅");
        navigate("/inicio");
      } else {
        alert("Error: " + (result.detail || "Credenciales inválidas"));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor ❌");
    }
  };

  return (
    <div className="inicio-container">
      <Header rol="turista" titulo="Inicio Sesión Turista" />
      <main className="inicio-main">
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
